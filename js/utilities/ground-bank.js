import { ComponentContainer } from '../component-container.js'

export class GroundBank extends ComponentContainer {
  constructor() {
    super()
  }

  connectedCallback() {
    this.width = this.getAttribute('width') || 400
    this.height = 35
    this.topPorts = this.getAttribute('topports') || 8
    this.setAttribute('topports', this.topPorts)
    super.connectedCallback()

    if (this.svg) {
      if (this.topPorts) {
        const slot = this.width / 9

        for (let i = 0; i < this.topPorts; i++) {
          const ground = document.createElement('ground-connection')
          ground.setAttribute('scale', 0.5)
          ground.x1 = slot * (i + 1)
          ground.x2 = slot * (i + 1)
          ground.y1 = 8
          ground.y2 = this.height - 8
          this.appendChild(ground)
        }
      }
    }
  }
}

window.customElements.define('ground-bank', GroundBank)
