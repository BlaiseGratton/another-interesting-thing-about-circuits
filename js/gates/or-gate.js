import { ComponentContainer } from '../component-container.js'

export class OrGate extends ComponentContainer {
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
      this.setAttribute('right-ports', this.rightPorts)
      super.connectedCallback()

      if (this.svg) {
        this.relay1 = this.addComponent('simple-relay', 16, 10, {
          scale: 0.2,
          orientation: 'horizontal'
        })
        this.powerSource1 = this.addWire(8, 8, 8, 17, 'power-source')
        this.powerSource1.setAttribute('scale', 0.25)
        this.relay2 = this.addComponent('simple-relay', 16, 36, {
          scale: 0.2,
          orientation: 'horizontal'
        })
        this.powerSource2 = this.addWire(8, 34, 8, 43, 'power-source')
        this.powerSource2.setAttribute('scale', 0.25)
        this.wire1 = this.addWire(64, 21, 67, 36.5)
        this.wire2 = this.addWire(64, 47, 67, 38)
      }
    } else {
      this.topPorts = 2
      this.bottomPorts = 1
      this.setAttribute('top-ports', this.topPorts)
      this.setAttribute('bottom-ports', this.bottomPorts)
      super.connectedCallback()

      if (this.svg) {
        this.relay1 = this.addComponent('simple-relay', 10, 16, {
          scale: 0.2
        })
        this.powerSource1 = this.addWire(8, 8, 17, 8, 'power-source')
        this.powerSource1.setAttribute('scale', 0.25)
        this.relay2 = this.addComponent('simple-relay', 36, 16, {
          scale: 0.2
        })
        this.powerSource2 = this.addWire(34, 8, 43, 8, 'power-source')
        this.powerSource2.setAttribute('scale', 0.25)
        this.wire1 = this.addWire(21, 64, 36.5, 67)
        this.wire2 = this.addWire(47, 64, 38, 67)
      }
    }
  }
}

window.customElements.define('or-gate', OrGate)
