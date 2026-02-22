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
      this.setAttribute('rightports', this.rightPorts)
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
        this.wire1 = this.addWire(65, 22, 67, 36)
        this.wire2 = this.addWire(65, 47, 67, 38)
      }
    } else {
      this.topPorts = 2
      this.bottomPorts = 1
      this.setAttribute('topports', this.topPorts)
      this.setAttribute('bottomports', this.bottomPorts)
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
        this.wire1 = this.addWire(22, 65, 36, 67)
        this.wire2 = this.addWire(47, 65, 38, 67)
      }
    }
  }
}

window.customElements.define('or-gate', OrGate)
