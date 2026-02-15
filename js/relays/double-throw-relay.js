import { ComponentContainer } from '../component-container.js'

export class DoubleThrowRelay extends ComponentContainer {
  constructor() {
    super()
    this.leftPorts = 1
    this.rightPorts = 1
    this.width = 200
    this.height = 125
  }

  connectedCallback() {
    this.setAttribute('leftports', this.leftPorts)
    this.setAttribute('rightports', this.rightPorts)
    super.connectedCallback()
    if (this.svg) {
      this.inverterSwitch = document.createElement('inverter-switch')
      this.inverterSwitch.x = 50
      this.inverterSwitch.y = 33
      this.inverterSwitch.setAttribute('scale', 0.5)
      this.appendChild(this.inverterSwitch)
      this.leftWire = document.createElement('wire-element')
      this.leftWire.x1 = 8
      this.leftWire.y1 = 62
      this.leftWire.x2 = 42
      this.leftWire.y2 = 75
      this.appendChild(this.leftWire)
      this.rightWire = document.createElement('bulb-element')
      this.rightWire.x1 = 158
      this.rightWire.y1 = 64
      this.rightWire.x2 = 192
      this.rightWire.y2 = 63
      this.appendChild(this.rightWire)
      this.powerSource = document.createElement('power-source')
      this.powerSource.x1 = 20
      this.powerSource.y1 = 30
      this.powerSource.x2 = 42
      this.powerSource.y2 = 54
      this.appendChild(this.powerSource)
    }
  }
}

window.customElements.define('double-throw-relay', DoubleThrowRelay)
