import { ComponentContainer } from '../component-container.js'

export class ClockSource extends ComponentContainer {
  constructor() {
    super()
    this.leftPorts = 1
    this.rightPorts = 1
  }

  connectedCallback() {
    this.setAttribute('port-scale-inner', 0.2)
    this.width = 50
    this.height = 75
    this.setAttribute('left-ports', this.leftPorts)
    this.setAttribute('right-ports', this.rightPorts)
    super.connectedCallback()

    if (this.svg) {
      this.inverter = this.addComponent('double-throw-relay', 13, 22, {
        scale: 0.2
      })
      this.inverter.inverterSwitch.setAttribute(
        'movement-delay',
        this.getAttribute('movement-delay') || 1000
      )
      this.addWire(25, 71, 10, 71)
      this.addWire(10, 71, 10, 14)
      this.addWire(10, 14, 25, 14)
      this.addWire(25, 14, 40, 14)
      this.addWire(40, 14, 48, 37.5)
      this.addWire(10, 71, 2, 37.5)
    }
  }
}

window.customElements.define('clock-source', ClockSource)
