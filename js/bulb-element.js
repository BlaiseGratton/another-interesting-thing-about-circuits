import { createSVGElement } from './svg.js'
import { Wire } from './wire-element.js'

export class Bulb extends Wire {
  constructor() {
    super()
    this.path = createSVGElement('path')
    this.path.setAttribute('stroke', 'darkgrey')
    this.path.setAttribute('fill', 'none')
  }

  connectedCallback() {
    super.connectedCallback()
    if (this.svg) {
      this.svg.appendChild(this.path)
    }
  }

  changeColor(color) {
    super.changeColor(color)
    this.path.setAttribute('stroke', this.hasVoltage ? 'orange' : 'grey')
  }

  handleDraw(attribute, value) {
    super.handleDraw(attribute, value)
    const pathStartX = ((this.x1 + this.x2) * this.parentScale) / 2
    const pathStartY = ((this.y1 + this.y2) * this.parentScale) / 2
    this.path.setAttribute(
      'd',
      `M${pathStartX},${pathStartY} l-${2 * this.parentScale},${-15 * this.parentScale} a ${15 * this.parentScale} ${15 * this.parentScale} 0 1 1 ${15 * this.parentScale} 0 l-${2 * this.parentScale},${15 * this.parentScale}`
    )
  }
}

window.customElements.define('bulb-element', Bulb)
