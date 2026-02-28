import { ComponentContainer } from '../component-container.js'

export class OnesComplement extends ComponentContainer {
  constructor() {
    super()
  }

  connectedCallback() {
    this.width = this.getAttribute('width') || 211.5
    this.height = 50
    this.topPorts = this.getAttribute('top-ports') || 8
    this.bottomPorts = this.getAttribute('bottom-ports') || 8
    this.leftPorts = 1
    this.setAttribute('top-ports', this.topPorts)
    this.setAttribute('bottom-ports', this.bottomPorts)
    this.setAttribute('left-ports', this.leftPorts)
    super.connectedCallback()

    if (this.svg) {
      if (this.bottomPorts) {
        const slot = this.width / 9

        this.invertWire1 = this.addWire(8, this.height / 2, 8, 4)

        for (let i = 0; i < this.topPorts; i++) {
          const xorGate = document.createElement('xor-gate')
          xorGate.setAttribute('port-scale-outer', 0.2)
          xorGate.setAttribute('scale', 0.25)
          xorGate.x = slot * i + 11 * this.scale
          xorGate.y = 10
          this.appendChild(xorGate)

          this.addWire(
            slot * i + 8 * this.scale,
            4,
            slot * i + 17 * this.scale,
            8
          )

          if (i < this.topPorts - 1) {
            this.addWire(
              slot * i + 8 + this.scale,
              4,
              slot * (i + 1) + 10 * this.scale,
              4
            )
          }

          this.addWire(
            slot * (i + 1) - 3,
            this.height - 8,
            slot * (i + 1),
            this.height - 8
          )
        }
      }
    }
  }
}

window.customElements.define('ones-complement', OnesComplement)
