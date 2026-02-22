import { ComponentContainer } from '../component-container.js'

export class NorGate extends ComponentContainer {
  constructor() {
    super()
    this.leftPorts = 2
    this.rightPorts = 1
  }

  connectedCallback() {
    this.width = 75
    this.height = 125
    this.setAttribute('leftports', this.leftPorts)
    this.setAttribute('rightports', this.rightPorts)
    super.connectedCallback()

    if (this.svg) {
      this.switch1 = document.createElement('double-throw-relay')
      this.switch1.setAttribute('scale', 0.2)
      this.switch1.x = 16
      this.switch1.y = 29
      this.appendChild(this.switch1)

      this.wire1 = document.createElement('wire-element')
      this.wire1.x1 = 64
      this.wire1.y1 = 41
      this.wire1.x2 = 64
      this.wire1.y2 = 56
      this.appendChild(this.wire1)

      this.switch2 = document.createElement('inverter-switch')
      this.switch2.setAttribute('scale', 0.2)
      this.switch2.x = 16
      this.switch2.y = 66.5
      this.appendChild(this.switch2)

      this.wire2 = document.createElement('wire-element')
      this.wire2.x1 = 64
      this.wire2.y1 = 56
      this.wire2.x2 = 8
      this.wire2.y2 = 62
      this.appendChild(this.wire2)

      this.wire3 = document.createElement('wire-element')
      this.wire3.x1 = 8
      this.wire3.y1 = 62
      this.wire3.x2 = 8
      this.wire3.y2 = 75
      this.appendChild(this.wire3)

      this.wire4 = document.createElement('wire-element')
      this.wire4.x1 = 64
      this.wire4.y1 = 79
      this.wire4.x2 = 67
      this.wire4.y2 = 63
      this.appendChild(this.wire4)
    }
  }
}

window.customElements.define('nor-gate', NorGate)
