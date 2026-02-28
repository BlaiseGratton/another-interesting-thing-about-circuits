import { ComponentContainer } from '../component-container.js'

export class TwoToOneSelector extends ComponentContainer {
  constructor() {
    super()
    this.topPorts = 3
    this.bottomPorts = 1
  }

  connectedCallback() {
    this.setAttribute('port-scale-inner', 0.2)
    this.width = 100
    this.height = 100
    this.setAttribute('top-ports', this.topPorts)
    this.setAttribute('bottom-ports', this.bottomPorts)
    super.connectedCallback()

    if (this.svg) {
      this.inverter = this.addComponent('double-throw-relay', 40.5, 2, {
        scale: 0.15,
        'port-scale-outer': 0.2
      })
      this.aAndGate = this.addComponent('and-gate', 7, 24, {
        scale: 0.35,
        'port-scale-outer': 0.2
      })
      this.bAndGate = this.addComponent('and-gate', 67, 24, {
        scale: 0.35,
        'port-scale-outer': 0.2
      })
      this.orGate = this.addComponent('or-gate', 33, 62, {
        scale: 0.45,
        'port-scale-outer': 0.2
      })
      this.addWire(25, 2, 16, 22)
      this.addWire(75, 2, 84, 22)
      this.addWire(50, 2, 66, 2)
      this.addWire(66, 2, 76, 22)
      this.addWire(50, 34, 36, 34)
      this.addWire(36, 34, 36, 22)
      this.addWire(36, 22, 25, 22)
      this.addWire(20, 52, 44, 60)
      this.addWire(56, 60, 80, 52)
    }
  }
}

window.customElements.define('two-to-one-selector', TwoToOneSelector)
