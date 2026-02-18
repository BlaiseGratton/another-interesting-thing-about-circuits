import { ComponentContainer } from '../component-container.js'

export class PowerBank extends ComponentContainer {
  constructor() {
    super()
  }

  connectedCallback() {
    this.width = this.getAttribute('width') || 211.5
    this.height = 35
    this.bottomPorts = this.getAttribute('bottomports') || 8
    this.setAttribute('bottomports', this.bottomPorts)
    super.connectedCallback()

    if (this.svg) {
      if (this.bottomPorts) {
        const slot = this.width / 9

        for (let i = 0; i < this.bottomPorts; i++) {
          const powerSource = document.createElement('power-source')
          powerSource.setAttribute('scale', 0.25)
          powerSource.x1 = slot * (i + 1)
          powerSource.x2 = slot * (i + 1)
          powerSource.y1 = 8
          powerSource.y2 = this.height - 8
          this.appendChild(powerSource)
        }
      }
    }
  }
}

window.customElements.define('power-bank', PowerBank)
