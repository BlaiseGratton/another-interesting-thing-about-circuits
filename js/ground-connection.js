import { createSVGElement } from './svg.js'
import { Wire } from './wire-element.js'

const BAR_SPACING = 6

export class GroundConnection extends Wire {
  constructor() {
    super()
    this.end2.remove()
    this.end2 = undefined
    this.line1 = createSVGElement('line')
    this.line2 = createSVGElement('line')
    this.line3 = createSVGElement('line')
    this.line1.setAttribute('stroke', 'black')
    this.line2.setAttribute('stroke', 'black')
    this.line3.setAttribute('stroke', 'black')
  }

  connectedCallback() {
    super.connectedCallback()
    if (this.svg) {
      this.drawSymbol()
      this.svg.appendChild(this.line1)
      this.svg.appendChild(this.line2)
      this.svg.appendChild(this.line3)
    }
  }

  handleDraw(attribute, value) {
    super.handleDraw(attribute, value)
    if (attribute[1] === '2') {
      this.drawSymbol()
    }
  }

  drawSymbol() {
    this.line1.setAttribute(
      'x1',
      (this.x2 - 14 * this.scale) * this.parentScale
    )
    this.line1.setAttribute('y1', this.y2 * this.parentScale)
    this.line1.setAttribute(
      'x2',
      (this.x2 + 14 * this.scale) * this.parentScale
    )
    this.line1.setAttribute('y2', this.y2 * this.parentScale)
    this.line1.setAttribute('stroke-width', 3 * this.parentScale * this.scale)

    this.line2.setAttribute(
      'x1',
      (this.x2 - 10 * this.scale) * this.parentScale
    )
    this.line2.setAttribute(
      'y1',
      (this.y2 + BAR_SPACING * this.scale) * this.parentScale
    )
    this.line2.setAttribute(
      'x2',
      (this.x2 + 10 * this.scale) * this.parentScale
    )
    this.line2.setAttribute(
      'y2',
      (this.y2 + BAR_SPACING * this.scale) * this.parentScale
    )
    this.line2.setAttribute('stroke-width', 3 * this.parentScale * this.scale)

    this.line3.setAttribute('x1', (this.x2 - 7 * this.scale) * this.parentScale)
    this.line3.setAttribute(
      'y1',
      (this.y2 + BAR_SPACING * 2 * this.scale) * this.parentScale
    )
    this.line3.setAttribute('x2', (this.x2 + 7 * this.scale) * this.parentScale)
    this.line3.setAttribute(
      'y2',
      (this.y2 + BAR_SPACING * 2 * this.scale) * this.parentScale
    )
    this.line3.setAttribute('stroke-width', 3 * this.parentScale * this.scale)
  }
}

window.customElements.define('ground-connection', GroundConnection)
