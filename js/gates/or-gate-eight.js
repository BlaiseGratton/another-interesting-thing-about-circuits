import { ComponentContainer } from '../component-container.js'

export class OrGateEight extends ComponentContainer {
  constructor() {
    super()
    this.topPorts = 8
    this.bottomPorts = 1
  }

  connectedCallback() {
    this.width = 200
    this.height = 50
    this.setAttribute('top-ports', this.topPorts)
    this.setAttribute('bottom-ports', this.bottomPorts)
    this.setAttribute('port-scale-inner', 0.2)
    super.connectedCallback()

    if (this.svg) {
      this.addComponent('simple-relay', this.width / 2 - 5.5, 26.5, {
        scale: 0.1,
        'port-scale-outer': 0.2
      })

      this.powerSource = this.addWire(
        this.width / 2 - 40,
        24,
        this.width / 2 - 3,
        25,
        'power-source'
      )
      this.powerSource.setAttribute('scale', 0.2)

      const slotWidth = this.width / 9

      for (let i = 0; i < 8; i++) {
        const multiplier = -3 + i
        this.addWire(
          this.width - slotWidth * (i + 1),
          2,
          this.width / 2 - 8 * multiplier + 3,
          14
        )
        this.addWire(
          this.width / 2 - 8 * multiplier + 3,
          14,
          this.width / 2 + 2,
          24
        )
      }
    }
  }
}

window.customElements.define('or-gate-eight', OrGateEight)
