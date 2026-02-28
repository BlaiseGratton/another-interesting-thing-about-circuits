import { ComponentContainer } from '../component-container.js'

export class AndGate extends ComponentContainer {
  constructor() {
    super()
    this.leftPorts = 2
    this.rightPorts = 1
  }

  connectedCallback() {
    if (this.isHorizontal) {
      this.width = 75
      this.height = 75
      this.setAttribute('left-ports', this.leftPorts)
      this.setAttribute('right-ports', this.rightPorts)
      super.connectedCallback()

      if (this.svg) {
        this.relay1 = this.addComponent('simple-relay', 16, 4, {
          scale: 0.2,
          orientation: 'horizontal',
          'port-scale-outer': 0.2
        })
        this.powerSource = this.addWire(8, 8, 14, 11, 'power-source')
        this.powerSource.setAttribute('scale', 0.25)
        this.wire1 = this.addWire(8, 24, 14, 19)
        this.relay2 = this.addComponent('simple-relay', 16, 45, {
          scale: 0.2,
          orientation: 'horizontal',
          'port-scale-outer': 0.2
        })

        this.wire2 = this.addWire(58, 15, 58, 37)
        this.wire3 = this.addWire(58, 37, 14, 37)
        this.wire4 = this.addWire(14, 37, 14, 52)
        this.wire5 = this.addWire(8, 50, 14, 60)
        this.wire6 = this.addWire(58, 55, 67, 37)
      }
    } else {
      this.width = 75
      this.height = 75
      this.topPorts = 2
      this.bottomPorts = 1
      this.setAttribute('top-ports', this.topPorts)
      this.setAttribute('bottom-ports', this.bottomPorts)
      super.connectedCallback()

      if (this.svg) {
        this.relay1 = this.addComponent('simple-relay', 4, 16, {
          scale: 0.2,
          'port-scale-outer': 0.2
        })
        this.powerSource = this.addWire(8, 8, 11, 14, 'power-source')
        this.powerSource.setAttribute('scale', 0.25)
        this.wire1 = this.addWire(24, 8, 19, 14)
        this.relay2 = this.addComponent('simple-relay', 45, 16, {
          scale: 0.2,
          'port-scale-outer': 0.2
        })

        this.wire2 = this.addWire(15, 58, 37, 58)
        this.wire3 = this.addWire(37, 58, 37, 14)
        this.wire4 = this.addWire(37, 14, 52, 14)
        this.wire5 = this.addWire(50, 8, 60, 14)
        this.wire6 = this.addWire(55, 58, 37, 67)
      }
    }
  }
}

window.customElements.define('and-gate', AndGate)
