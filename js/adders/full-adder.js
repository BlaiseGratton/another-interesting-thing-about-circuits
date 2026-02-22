import { ComponentContainer } from '../component-container.js'

export class FullAdder extends ComponentContainer {
  constructor() {
    super()
    this.topPorts = 3
    this.bottomPorts = 2
  }

  connectedCallback() {
    this.width = 145
    this.height = 138
    this.setAttribute('topports', this.topPorts)
    this.setAttribute('bottomports', this.bottomPorts)
    this.setAttribute('portscaleinner', 0.2)
    super.connectedCallback()

    if (this.svg) {
      this.halfAdder1 = this.addComponent('half-adder', 3, 10, {
        scale: 0.65,
        portscaleouter: 0.2
      })
      this.halfAdder2 = this.addComponent('half-adder', 77, 10, {
        scale: 0.65,
        portscaleouter: 0.2
      })
      this.orGate = this.addComponent('or-gate', 26, 90, {
        scale: 0.6,
        portscaleouter: 0.2
      })
      this.wire1 = this.addWire(36, 2, 25, 8)
      this.wire2 = this.addWire(72.5, 2, 46.5, 8)
      this.wire3 = this.addWire(108, 2, 120, 8)
      this.wire4 = this.addWire(46.5, 77, 73, 77)
      this.wire5 = this.addWire(73, 77, 73, 8)
      this.wire6 = this.addWire(73, 8, 99, 8)
      this.wire7 = this.addWire(25, 77, 41, 88)
      this.wire8 = this.addWire(99, 77, 56, 88)
      this.wire9 = this.addWire(120, 77, 97, 136)
    }
  }
}

window.customElements.define('full-adder', FullAdder)
