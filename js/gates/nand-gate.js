import { ComponentContainer } from '../component-container.js'

export class NandGate extends ComponentContainer {
  constructor() {
    super()
    this.leftPorts = 2
    this.rightPorts = 1
  }

  connectedCallback() {
    this.width = 75
    this.height = 75
    if (this.isHorizontal) {
      this.setAttribute('leftPorts', this.leftPorts)
      this.setAttribute('rightports', this.rightPorts)
      super.connectedCallback()

      if (this.svg) {
        this.inverter1 = this.addComponent('double-throw-relay', 16, 12, {
          scale: 0.2,
          orientation: 'horizontal'
        })
        this.inverter2 = this.addComponent('double-throw-relay', 16, 38, {
          scale: 0.2,
          orientation: 'horizontal'
        })
        this.wire1 = this.addWire(64, 24, 66, 37)
        this.wire2 = this.addWire(64, 50, 66, 39)
      }
    } else {
      this.topPorts = 2
      this.bottomPorts = 1
      this.setAttribute('topports', this.topPorts)
      this.setAttribute('bottomports', this.bottomPorts)
      super.connectedCallback()

      if (this.svg) {
        this.inverter1 = this.addComponent('double-throw-relay', 12, 16, {
          scale: 0.2
        })
        this.inverter2 = this.addComponent('double-throw-relay', 38, 16, {
          scale: 0.2
        })
        this.wire1 = this.addWire(24, 64, 37, 66)
        this.wire2 = this.addWire(50, 64, 39, 66)
      }
    }
  }
}

window.customElements.define('nand-gate', NandGate)
