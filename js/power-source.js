import { createSVGElement } from './svg.js'
import { Wire } from './wire-element.js'

export class PowerSource extends Wire {
  constructor() {
    super()
    this.end1.remove()
    this.end1 = undefined
    this.line1 = createSVGElement('line')
    this.line2 = createSVGElement('line')
    this.line1.setAttribute('stroke', 'black')
    this.line2.setAttribute('stroke', 'black')
  }

  connectedCallback() {
    super.connectedCallback()
    if (this.svg) {
      this.drawSymbol()
      this.svg.appendChild(this.line1)
      this.svg.appendChild(this.line2)
    }
  }

  handleDraw(attribute, value) {
    super.handleDraw(attribute, value)
    if (attribute[1] === '1') {
      this.drawSymbol()
    }
  }

  drawSymbol() {
    this.line1.setAttribute('x1', this.x1 * this.parentScale)
    this.line1.setAttribute('y1', this.y1 * this.parentScale)
    this.line1.setAttribute('x2', (this.x1 - 8 * this.scale) * this.parentScale)
    this.line1.setAttribute(
      'y2',
      (this.y1 - 25 * this.scale) * this.parentScale
    )
    this.line1.setAttribute('stroke-width', 3 * this.parentScale * this.scale)
    this.line2.setAttribute('x1', (this.x1 + 8 * this.scale) * this.parentScale)
    this.line2.setAttribute(
      'y1',
      (this.y1 - 25 * this.scale) * this.parentScale
    )
    this.line2.setAttribute('x2', this.x1 * this.parentScale)
    this.line2.setAttribute('y2', this.y1 * this.parentScale)
    this.line2.setAttribute('stroke-width', 3 * this.parentScale * this.scale)
  }
}

window.customElements.define('power-source', PowerSource)
