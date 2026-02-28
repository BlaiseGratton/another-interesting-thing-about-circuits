import { ComponentContainer } from '../component-container.js'

export class NorGate extends ComponentContainer {
  constructor() {
    super()
    this.leftPorts = 2
    this.rightPorts = 1
  }

  connectedCallback() {
    this.width = 75
    this.height = 75

    if (this.isHorizontal) {
      this.setAttribute('left-ports', this.leftPorts)
      this.setAttribute('right-ports', this.rightPorts)
      super.connectedCallback()

      if (this.svg) {
        this.inverter1 = this.addComponent('double-throw-relay', 16, 4, {
          scale: 0.2,
          orientation: 'horizontal'
        })
        this.inverter2 = this.addComponent('inverter-relay', 16, 36, {
          scale: 0.2,
          orientation: 'horizontal'
        })
        this.wire1 = this.addWire(8, 24, 8, 16)
        this.wire2 = this.addWire(64, 16, 64, 31)
        this.wire3 = this.addWire(64, 31, 8, 31)
        this.wire4 = this.addWire(8, 31, 8, 43)
        this.wire5 = this.addWire(64, 47, 67, 37)
      }
    } else {
      this.topPorts = 2
      this.bottomPorts = 1
      this.setAttribute('top-ports', this.topPorts)
      this.setAttribute('bottom-ports', this.bottomPorts)

      super.connectedCallback()

      if (this.svg) {
        this.inverter1 = this.addComponent('double-throw-relay', 4, 16, {
          scale: 0.2
        })
        this.inverter2 = this.addComponent('inverter-relay', 36, 16, {
          scale: 0.2
        })
        this.wire1 = this.addWire(24, 8, 16, 8)
        this.wire2 = this.addWire(16, 64, 31, 64)
        this.wire3 = this.addWire(31, 64, 31, 8)
        this.wire4 = this.addWire(31, 8, 43, 8)
        this.wire5 = this.addWire(47, 64, 37, 67)
      }
    }
  }
}

window.customElements.define('nor-gate', NorGate)
