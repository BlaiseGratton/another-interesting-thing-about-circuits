import { createSVGElement } from './svg.js'

const observedAttributes = ['x1', 'y1', 'x2', 'y2', 'parent-scale', 'voltage']

export class Wire extends HTMLElement {
  static observedAttributes = observedAttributes

  /* prettier-ignore */ get svg() { return this.parentElement && this.parentElement.svg }
  /* prettier-ignore */ get x1() { return parseFloat(this.getAttribute('x1')) }
  /* prettier-ignore */ get y1() { return parseFloat(this.getAttribute('y1')) }
  /* prettier-ignore */ get x2() { return parseFloat(this.getAttribute('x2')) }
  /* prettier-ignore */ get y2() { return parseFloat(this.getAttribute('y2')) }
  /* prettier-ignore */ get parentScale() { return parseFloat(this.getAttribute('parent-scale') || 1) }
  /* prettier-ignore */ get scale() { return parseFloat(this.getAttribute('scale') || 1)  }
  /* prettier-ignore */ get parentOffsetX() { return this.parentElement.parentOffsetX }
  /* prettier-ignore */ get parentOffsetY() { return this.parentElement.parentOffsetY }
  /* prettier-ignore */ get hasVoltage() { return this.hasAttribute('voltage') }

  /* prettier-ignore */ set x1(value) { return this.setAttribute('x1', value) }
  /* prettier-ignore */ set y1(value) { return this.setAttribute('y1', value) }
  /* prettier-ignore */ set x2(value) { return this.setAttribute('x2', value) }
  /* prettier-ignore */ set y2(value) { return this.setAttribute('y2', value) }

  constructor() {
    super()
    this.line = createSVGElement('line')
    this.strokeWidth = 1
    this.end1 = createSVGElement('circle')
    this.end2 = createSVGElement('circle')
    this.end1.component = this
    this.end2.component = this
    this.connectedWires = new Set()
    this.permanentConnections = new Set()
    this.endRadius = 0.75
    this.color = 'black'
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (!this.svg) return
    if (oldVal !== newVal) {
      switch (name) {
        case 'x1':
          this.handleDraw('x1', newVal)
          break
        case 'y1':
          this.handleDraw('y1', newVal)
          break
        case 'x2':
          this.handleDraw('x2', newVal)
          break
        case 'y2':
          this.handleDraw('y2', newVal)
          break
        case 'parent-scale':
          this.drawAllPoints()
          break
        case 'voltage':
          this.handleVoltageChange(oldVal, newVal)
          break
        default:
          return null
      }
    }
  }

  destroy() {
    this.line.remove()
    this.parentElement.componentGraph.deregisterElement(this)
  }

  connectedCallback() {
    if (this.svg) {
      this.parentElement.componentGraph.registerElement(this)
    }
    if (this.svg) {
      this.svg.appendChild(this.line)
      if (this.end1) {
        this.svg.appendChild(this.end1)
        this.end1.setAttribute('r', this.endRadius * this.scale)
        this.end1.classList.add('wire-end')
        this.addEventListeners(this.end1, 'x1', 'y1')
      }
      if (this.end2) {
        this.svg.appendChild(this.end2)
        this.end2.setAttribute('r', this.endRadius * this.scale)
        this.end2.classList.add('wire-end')
        this.addEventListeners(this.end2, 'x2', 'y2')
      }
      this.line.setAttribute('stroke', this.color)
      this.drawAllPoints()
      this.line.onmouseenter = () => this.changeColor('orange')
      this.line.onmouseleave = () => this.changeColor(this.color)
    }
  }

  handleVoltageChange(oldVal, newVal) {
    if (oldVal === newVal) return
    if (newVal) {
      this.color = 'red'
    } else {
      this.color = 'black'
    }
    this.changeColor(this.color)
    if (this.value) {
      this.dispatchEvent(
        new CustomEvent('voltage-changed', { bubbles: true, cancelable: false })
      )
    }
  }

  handleDraw(attribute, value) {
    if (value !== null) {
      const scale = this.parentScale
      this.line.setAttribute(attribute, value * scale)
      if (attribute[1] === '1' && this.end1) {
        this.end1.setAttribute('cx', this.x1 * scale)
        this.end1.setAttribute('cy', this.y1 * scale)
        this.end1.setAttribute('r', this.endRadius * scale)
        this.end1.setAttribute('stroke-width', this.endRadius * scale)
        this.end1.setAttribute('stroke', this.color)
        this.end1.setAttribute('fill', this.color)
        this.handleComponentMoved(this.end1, this.end2)
      }
      if (attribute[1] === '2' && this.end2) {
        this.end2.setAttribute('cx', this.x2 * scale)
        this.end2.setAttribute('cy', this.y2 * scale)
        this.end2.setAttribute('r', this.endRadius * scale)
        this.end2.setAttribute('stroke-width', this.endRadius * scale)
        this.end2.setAttribute('stroke', this.color)
        this.end2.setAttribute('fill', this.color)
        this.handleComponentMoved(this.end2, this.end1)
      }
    }
  }

  drawAllPoints() {
    this.line.setAttribute('stroke-width', this.strokeWidth * this.parentScale)
    this.handleDraw('x1', this.x1)
    this.handleDraw('y1', this.y1)
    this.handleDraw('x2', this.x2)
    this.handleDraw('y2', this.y2)
  }

  handleComponentMoved(movedEnd, otherEnd) {
    if (this.svg && this.parentElement.initialized) {
      const touchingWires = new Set(
        this.parentElement.getTouchingWireEnds(movedEnd, otherEnd)
      )
      if (this.permanentConnections.size) {
        this.permanentConnections.forEach((el) => touchingWires.add(el))
      }
      const newConnections = touchingWires.difference(this.connectedWires)
      const brokenConnections = this.connectedWires.difference(touchingWires)
      newConnections.forEach((wire) => this.addWireConnection(wire))
      brokenConnections.forEach((wire) => this.disconnectWire(wire))
      if (
        newConnections.size ||
        brokenConnections.size ||
        this.permanentConnections.size
      ) {
        this.parentElement.componentGraph.determineFlow()
      }
    }
  }

  addWireConnection(wireElement, alwaysConnected) {
    if (alwaysConnected) {
      this.permanentConnections.add(wireElement)
      wireElement.permanentConnections.add(this)
    }
    this.connectedWires.add(wireElement)
    wireElement.connectedWires.add(this)
    if (window.logging?.wire?.addWireConnection) {
      console.log(`connected ${this.id} to ${wireElement.id}`)
    }
  }

  disconnectWire(wireElement) {
    this.connectedWires.delete(wireElement)
    wireElement.connectedWires.delete(this)
    if (window.logging?.wire?.disconnectWire) {
      console.log(`disconnected ${this.id} from ${wireElement.id}`)
    }
  }

  addEventListeners(end, endX, endY) {
    if (this.classList.contains('moveable')) {
      end.onmouseenter = () => {
        this.color = 'orange'
        this.changeColor('orange')
        end.setAttribute('r', 3 * this.scale)
      }
      end.onmousedown = () => {
        end.classList.add('draggable')
        this.isDragging = true
        this.endRadius = 3
        console.log('mousedown')
      }
      end.onmouseup = () => {
        end.classList.remove('draggable')
        this.isDragging = false
        this.endRadius = 0.75
        this.drawAllPoints()
      }
      end.onmouseleave = () => {
        end.classList.remove('draggable')
        this.color = this.hasVoltage ? 'red' : 'black'
        this.changeColor(this.color)
        this.isDragging = false
        this.endRadius = 0.75
        this.drawAllPoints()
      }
      end.onmousemove = (event) => {
        if (this.isDragging) {
          this[endX] = (event.offsetX - this.parentOffsetX) / this.parentScale
          this[endY] = (event.offsetY - this.parentOffsetY) / this.parentScale
        }
      }
    }
  }

  changeColor(color) {
    this.line.setAttribute('stroke', color)
    if (this.end1) {
      this.end1.setAttribute('stroke', color)
      this.end1.setAttribute('fill', color)
    }
    if (this.end2) {
      this.end2.setAttribute('stroke', color)
      this.end2.setAttribute('fill', color)
    }
  }
}

customElements.define('wire-element', Wire)
