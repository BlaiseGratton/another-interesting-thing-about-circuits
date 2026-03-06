import { ComponentContainer } from '../component-container.js'

export class AndGateFour extends ComponentContainer {
  constructor() {
    super()
    this.topPorts = 4
    this.bottomPorts = 1
  }

  connectedCallback() {
    this.width = 150
    this.height = 65
    this.topPorts = 4
    this.bottomPorts = 1
    this.setAttribute('top-ports', this.topPorts)
    this.setAttribute('bottom-ports', this.bottomPorts)
    super.connectedCallback()

    if (this.svg) {
      this.powerSource = this.addWire(8, 8, 22, 9, 'power-source')
      this.powerSource.setAttribute('scale', 0.25)

      this.relay1 = this.addComponent('simple-relay', 15, 10, {
        scale: 0.2,
        'port-scale-outer': 0.2
      })

      this.relay2 = this.addComponent('simple-relay', 45, 10, {
        scale: 0.2,
        'port-scale-outer': 0.2
      })

      this.relay3 = this.addComponent('simple-relay', 75, 10, {
        scale: 0.2,
        'port-scale-outer': 0.2
      })

      this.relay4 = this.addComponent('simple-relay', 105, 10, {
        scale: 0.2,
        'port-scale-outer': 0.2
      })

      // 1 to 2
      this.addWire(26, 52, 40, 52)
      this.addWire(40, 52, 40, 9)
      this.addWire(40, 9, 52, 9)
      // 2 to 3
      this.addWire(56, 52, 70, 52)
      this.addWire(70, 52, 70, 9)
      this.addWire(70, 9, 82, 9)
      // 3 to 4
      this.addWire(86, 52, 100, 52)
      this.addWire(100, 52, 100, 9)
      this.addWire(100, 9, 112, 9)
      // output
      this.addWire(116, 52, 75, 57)
    }
  }
}

window.customElements.define('and-gate-four', AndGateFour)
