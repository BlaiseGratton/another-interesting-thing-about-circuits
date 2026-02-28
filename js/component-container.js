import { ComponentGraph } from './componentGraph.js'
import { createSVGElement } from './svg.js'

export class ComponentContainer extends HTMLElement {
  static observedAttributes = [
    'x',
    'y',
    'height',
    'width',
    'scale',
    'parent-scale'
  ]

  /* prettier-ignore */ get x() { return parseFloat(this.getAttribute('x')) || 0 }
  /* prettier-ignore */ get y() { return parseFloat(this.getAttribute('y')) || 0 }
  /* prettier-ignore */ get height() { return parseFloat(this.getAttribute('height')) || 0 }
  /* prettier-ignore */ get width() { return parseFloat(this.getAttribute('width')) || 0 }
  /* prettier-ignore */ get scale() { return parseFloat(this.getAttribute('scale') || 1) }
  /* prettier-ignore */ get parentScale() { return parseFloat(this.getAttribute('parent-scale') || 1) }
  /* prettier-ignore */ get svg() { return this._svg }
  /* prettier-ignore */ get shadow() { return this._shadow || this.parentElement.shadow }
  /* prettier-ignore */ get isRoot() { return !this.parentElement.classList.contains('component-container') }
  /* prettier-ignore */ get isHorizontal() { return this.getAttribute('orientation') === 'horizontal' }
  get parentOffsetX() {
    if (this.isRoot) return 0
    return this.x * this.parentScale + this.parentElement.parentOffsetX
  }
  get parentOffsetY() {
    if (this.isRoot) return 0
    return this.y * this.parentScale + this.parentElement.parentOffsetY
  }
  get componentGraph() {
    return this.graph || this.parentElement.componentGraph
  }

  /* prettier-ignore */ set x(value) { this.setAttribute('x', value) }
  /* prettier-ignore */ set y(value) { this.setAttribute('y', value) }
  /* prettier-ignore */ set height(value) { this.setAttribute('height', value) }
  /* prettier-ignore */ set width(value) { this.setAttribute('width', value) }

  constructor() {
    super()
    this._svg = createSVGElement('svg')
    this.border = createSVGElement('rect')
  }

  connectedCallback() {
    this.classList.add('component-container')
    this.border.setAttribute('stroke', 'black')
    this.border.setAttribute('fill', 'none')

    if (this.isRoot) {
      this.graph = new ComponentGraph()
      this.style.display = 'block'
      this.style.height =
        this.getAttribute('height') * this.scale * this.parentScale + 'px'
      this.style.width =
        this.getAttribute('width') * this.scale * this.parentScale + 'px'
      const shadow = this.attachShadow({ mode: 'open' })
      const linkElem = document.createElement('link')
      linkElem.setAttribute('rel', 'stylesheet')
      linkElem.setAttribute('href', '/css/svg-style.css')
      const div = document.createElement('div')
      div.appendChild(linkElem)
      div.appendChild(this.svg)
      shadow.appendChild(div)
      this._shadow = shadow
    } else {
      this.parentElement.svg.appendChild(this.svg)
    }

    this.setBorder()
    this.svg.appendChild(this.border)
    this.createPorts('left', this.getAttribute('left-ports'))
    this.createPorts('top', this.getAttribute('top-ports'))
    this.createPorts('right', this.getAttribute('right-ports'))
    this.createPorts('bottom', this.getAttribute('bottom-ports'))

    // wires are created before containers and child containers are created after their parent,
    // so connectedCallback needs to be re-called once this.svg is available
    Array.from(this.children).forEach((child) => {
      if (child.connectedCallback) {
        child.connectedCallback()
      }
    })
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (!this.svg) return
    this.attributeHandlers[name](oldVal, newVal)
  }

  attributeHandlers = {
    x: (oldVal, newVal) => {
      this.svg.setAttribute('x', newVal * this.parentScale)
    },
    y: (oldVal, newVal) => {
      this.svg.setAttribute('y', newVal * this.parentScale)
    },
    height: (oldVal, newVal) => {
      this.svg.setAttribute('height', newVal * this.scale * this.parentScale)
      this.setBorder()
    },
    width: (oldVal, newVal) => {
      this.svg.setAttribute('width', newVal * this.scale * this.parentScale)
      this.setBorder()
    },
    scale: (oldVal, newVal) =>
      this.handleScaleChange(oldVal, newVal * this.parentScale),
    'parent-scale': (oldVal, newVal) =>
      this.handleScaleChange(oldVal, newVal * this.scale)
  }

  handleScaleChange(oldVal, newVal) {
    this.setAttribute('x', this.x)
    this.setAttribute('y', this.y)
    this.setAttribute('height', this.height)
    this.setAttribute('width', this.width)
    this.setBorder()
    const containerChildren = this.querySelectorAll('&> *')
    containerChildren.forEach((container) =>
      container.setAttribute('parent-scale', newVal)
    )
  }

  setBorder() {
    this.border.setAttribute(
      'height',
      this.height * this.scale * this.parentScale
    )
    this.border.setAttribute(
      'width',
      this.width * this.scale * this.parentScale
    )
    this.border.setAttribute('stroke-width', 1 * this.parentScale)
  }

  createPorts(side, portCountAttribute) {
    const portCount = parseInt(portCountAttribute)
    if (this.isRoot || !portCount) return
    const wireSizeOuter =
      8 * (parseFloat(this.getAttribute('port-scale-outer')) || 1)
    const wireSizeInner =
      8 * (parseFloat(this.getAttribute('port-scale-inner')) || 1)

    const outsideHeight = (this.height * this.scale) / (portCount + 1)
    const outsideWidth = (this.width * this.scale) / (portCount + 1)

    for (let i = 1; i <= portCount; i++) {
      if (side === 'left') {
        const offsetLeft = parseFloat(this.getAttribute('offset-left') || 0)
        const outerWire = document.createElement('wire-element')
        outerWire.setAttribute('x1', this.x - wireSizeOuter)
        outerWire.setAttribute('y1', this.y + offsetLeft + outsideHeight * i)
        outerWire.setAttribute('x2', this.x)
        outerWire.setAttribute('y2', this.y + outsideHeight * i)
        outerWire.setAttribute('parent-scale', this.parentScale)
        outerWire.setAttribute('id', 'outer-l' + i)
        this.parentElement.appendChild(outerWire)

        const innerWire = document.createElement('wire-element')
        innerWire.setAttribute('x1', 0)
        innerWire.setAttribute('y1', (this.height / (portCount + 1)) * i)
        innerWire.setAttribute('x2', wireSizeInner)
        innerWire.setAttribute('y2', (this.height / (portCount + 1)) * i)
        innerWire.setAttribute('id', 'inner-l' + i)
        this.appendChild(innerWire)

        outerWire.addWireConnection(innerWire, true)
        outerWire.end2.remove()
        innerWire.end1.remove()
      }
      if (side === 'right') {
        const offsetRight = parseFloat(this.getAttribute('offset-right') || 0)
        const outerWire = document.createElement('wire-element')
        outerWire.setAttribute(
          'x1',
          this.x + this.width * this.scale + wireSizeOuter
        )
        outerWire.setAttribute('y1', this.y + offsetRight + outsideHeight * i)
        outerWire.setAttribute('x2', this.x + this.width * this.scale)
        outerWire.setAttribute('y2', this.y + outsideHeight * i)
        outerWire.setAttribute('parent-scale', this.parentScale)
        outerWire.setAttribute('id', 'outer-r-' + i)
        this.parentElement.appendChild(outerWire)

        const innerWire = document.createElement('wire-element')
        innerWire.setAttribute('x1', this.width)
        innerWire.setAttribute('y1', (this.height / (portCount + 1)) * i)
        innerWire.setAttribute('x2', this.width - wireSizeInner)
        innerWire.setAttribute('y2', (this.height / (portCount + 1)) * i)
        innerWire.setAttribute('id', 'inner-r' + i)
        this.appendChild(innerWire)

        outerWire.addWireConnection(innerWire, true)
        outerWire.end2.remove()
        innerWire.end1.remove()
      }
      if (side === 'top') {
        const offsetTop = parseFloat(this.getAttribute('offset-top') || 0)
        const outerWire = document.createElement('wire-element')
        outerWire.setAttribute('x1', this.x + offsetTop + outsideWidth * i)
        outerWire.setAttribute('y1', this.y - wireSizeOuter)
        outerWire.setAttribute('x2', this.x + outsideWidth * i)
        outerWire.setAttribute('y2', this.y)
        outerWire.setAttribute('parent-scale', this.parentScale)
        outerWire.setAttribute('id', 'outer-t' + i)
        this.parentElement.appendChild(outerWire)

        const innerWire = document.createElement('wire-element')
        innerWire.setAttribute('x1', (this.width / (portCount + 1)) * i)
        innerWire.setAttribute('y1', 0)
        innerWire.setAttribute('x2', (this.width / (portCount + 1)) * i)
        innerWire.setAttribute('y2', wireSizeInner)
        innerWire.setAttribute('id', 'inner-t' + i)
        this.appendChild(innerWire)

        outerWire.addWireConnection(innerWire, true)
        outerWire.end2.remove()
        innerWire.end1.remove()
      }
      if (side === 'bottom') {
        const offsetBottom = parseFloat(this.getAttribute('offset-bottom') || 0)
        const outerWire = document.createElement('wire-element')
        outerWire.setAttribute('x1', this.x + offsetBottom + outsideWidth * i)
        outerWire.setAttribute(
          'y1',
          this.y + this.height * this.scale + wireSizeOuter
        )
        outerWire.setAttribute('x2', this.x + outsideWidth * i)
        outerWire.setAttribute('y2', this.y + this.height * this.scale)
        outerWire.setAttribute('parent-scale', this.parentScale)
        outerWire.setAttribute('id', 'outer-t' + i)
        this.parentElement.appendChild(outerWire)

        const innerWire = document.createElement('wire-element')
        innerWire.setAttribute('x1', (this.width / (portCount + 1)) * i)
        innerWire.setAttribute('y1', this.height)
        innerWire.setAttribute('x2', (this.width / (portCount + 1)) * i)
        innerWire.setAttribute('y2', this.height - wireSizeInner)
        innerWire.setAttribute('id', 'inner-t' + i)
        this.appendChild(innerWire)

        outerWire.addWireConnection(innerWire, true)
        outerWire.end2.remove()
        innerWire.end1.remove()
      }
    }
  }

  getTouchingWireEnds(movedEnd, otherEnd) {
    if (!otherEnd) {
      otherEnd = movedEnd
    } else if (!otherEnd.getAttribute('cx')) {
      return []
    }
    return Array.from(this.svg.querySelectorAll('&> circle.wire-end'))
      .filter((e) => e !== movedEnd && e !== otherEnd)
      .map((end) => {
        const { e: xOffsetMoved, f: yOffsetMoved } = end.getCTM()
        const movedBounds = this.svg.createSVGRect()
        const movedRadius = parseFloat(movedEnd.getAttribute('r'))
        const movedEndX = parseFloat(movedEnd.getAttribute('cx'))
        const movedEndY = parseFloat(movedEnd.getAttribute('cy'))
        movedBounds.x = movedEndX - movedRadius + xOffsetMoved
        movedBounds.y = movedEndY - movedRadius + yOffsetMoved
        movedBounds.width = movedRadius * 2
        movedBounds.height = movedRadius * 2

        const { e: xOffsetOther, f: yOffsetOther } = otherEnd.getCTM()
        const unmovedBounds = this.svg.createSVGRect()
        const unmovedRadius = parseFloat(otherEnd.getAttribute('r'))
        const unmovedEndX = parseFloat(otherEnd.getAttribute('cx'))
        const unmovedEndY = parseFloat(otherEnd.getAttribute('cy'))
        unmovedBounds.x = unmovedEndX - unmovedRadius + xOffsetOther
        unmovedBounds.y = unmovedEndY - unmovedRadius + yOffsetOther
        unmovedBounds.width = unmovedRadius * 2
        unmovedBounds.height = unmovedRadius * 2

        return (
          (this.svg.checkIntersection(end, unmovedBounds) ||
            this.svg.checkIntersection(end, movedBounds)) &&
          end.component
        )
      })
      .filter(Boolean)
  }

  addWire(x1, y1, x2, y2, type) {
    const wire = document.createElement(type || 'wire-element')
    wire.x1 = x1
    wire.y1 = y1
    wire.x2 = x2
    wire.y2 = y2
    this.appendChild(wire)
    return wire
  }

  addComponent(type, x, y, attributes = {}) {
    const component = document.createElement(type)
    component.x = x
    component.y = y
    for (const [key, val] of Object.entries(attributes)) {
      if (val !== null) {
        component.setAttribute(key, val)
      }
    }
    this.appendChild(component)
    return component
  }
}

customElements.define('component-container', ComponentContainer)
