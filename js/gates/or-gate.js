import { ComponentContainer } from '../component-container.js'

export class OrGate extends ComponentContainer {
  constructor() {
    super()
    this.leftPorts = 2
    this.rightPorts = 1
    this.width = 75
    this.height = 125
  }

  connectedCallback() {
    this.setAttribute('leftPorts', this.leftPorts)
    this.setAttribute('rightports', this.rightPorts)
    super.connectedCallback()

    if (this.svg) {
      this.switch1 = document.createElement('switch-element')
      this.switch1.setAttribute('scale', 0.2)
      this.switch1.x = 16
      this.switch1.y = 25
      this.appendChild(this.switch1)

      this.powerSource1 = document.createElement('power-source')
      this.powerSource1.setAttribute('scale', 0.5)
      this.powerSource1.x1 = 8
      this.powerSource1.y1 = 20
      this.powerSource1.x2 = 8
      this.powerSource1.y2 = 33.5
      this.appendChild(this.powerSource1)

      this.wire1 = document.createElement('wire-element')
      this.wire1.x1 = 64
      this.wire1.y1 = 37
      this.wire1.x2 = 66
      this.wire1.y2 = 61
      this.appendChild(this.wire1)

      this.switch2 = document.createElement('switch-element')
      this.switch2.setAttribute('scale', 0.2)
      this.switch2.x = 16
      this.switch2.y = 66.5
      this.appendChild(this.switch2)

      this.powerSource2 = document.createElement('power-source')
      this.powerSource2.setAttribute('scale', 0.5)
      this.powerSource2.x1 = 8
      this.powerSource2.y1 = 58
      this.powerSource2.x2 = 8
      this.powerSource2.y2 = 75
      this.appendChild(this.powerSource2)

      this.wire2 = document.createElement('wire-element')
      this.wire2.x1 = 64
      this.wire2.y1 = 79
      this.wire2.x2 = 66
      this.wire2.y2 = 64
      this.appendChild(this.wire2)
    }
  }
}

window.customElements.define('or-gate', OrGate)
