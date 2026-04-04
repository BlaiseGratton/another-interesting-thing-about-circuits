import { ComponentContainer } from '../component-container.js'

export class AndGateThree extends ComponentContainer {
  constructor() {
    super()
    this.topPorts = 4
    this.bottomPorts = 1
  }

  connectedCallback() {
    this.width = 113
    this.height = 65
    this.topPorts = 3
    this.bottomPorts = 1
    this.setAttribute('top-ports', this.topPorts)
    this.setAttribute('bottom-ports', this.bottomPorts)
    super.connectedCallback()

    if (this.svg) {
      this.powerSource = this.addWire(8, 8, 21, 9, 'power-source')
      this.powerSource.setAttribute('scale', 0.25)

      this.relay1 = this.addComponent('simple-relay', 14, 10, {
        scale: 0.2,
        'port-scale-outer': 0.2
      })

      this.relay2 = this.addComponent('simple-relay', 42, 10, {
        scale: 0.2,
        'port-scale-outer': 0.2
      })

      this.relay3 = this.addComponent('simple-relay', 70, 10, {
        scale: 0.2,
        'port-scale-outer': 0.2
      })

      // 1 to 2
      this.addWire(25, 52, 38, 52)
      this.addWire(38, 52, 38, 9)
      this.addWire(38, 9, 50, 9)
      // 2 to 3
      this.addWire(53, 52, 67, 52)
      this.addWire(67, 52, 67, 9)
      this.addWire(67, 9, 77, 9)
      // output
      this.addWire(81, 52, 56, 57)
    }
  }
}

window.customElements.define('and-gate-three', AndGateThree)
