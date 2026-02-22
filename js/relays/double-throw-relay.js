import { ComponentContainer } from '../component-container.js'

export class DoubleThrowRelay extends ComponentContainer {
  constructor() {
    super()
    this.leftPorts = 1
    this.rightPorts = 1
  }

  connectedCallback() {
    if (this.isHorizontal) {
      this.width = 200
      this.height = 125
      this.setAttribute('leftports', this.leftPorts)
      this.setAttribute('rightports', this.rightPorts)
      super.connectedCallback()

      if (this.svg) {
        this.inverterSwitch = this.addComponent('inverter-relay', 34, 21, {
          scale: 0.75,
          orientation: 'horizontal'
        })
        this.inputWire = this.addWire(8, 62, 26, 76)
        this.powerSource = this.addWire(20, 30, 26, 48, 'power-source')
      }
    } else {
      this.topPorts = 1
      this.bottomPorts = 1
      this.width = 125
      this.height = 200
      this.setAttribute('topports', this.topPorts)
      this.setAttribute('bottomports', this.bottomPorts)
      super.connectedCallback()

      this.inverterSwitch = this.addComponent('inverter-relay', 21, 34, {
        scale: 0.75
      })
      this.inputWire = this.addWire(62, 8, 76, 26)
      this.powerSource = this.addWire(30, 20, 48, 26, 'power-source')
    }
  }
}

window.customElements.define('double-throw-relay', DoubleThrowRelay)
