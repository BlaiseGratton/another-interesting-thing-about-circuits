import { ComponentContainer } from '../component-container.js'

export class NandGate extends ComponentContainer {
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
      this.switch1 = document.createElement('double-throw-relay')
      this.switch1.setAttribute('scale', 0.2)
      this.switch1.x = 16
      this.switch1.y = 29
      this.appendChild(this.switch1)

      this.wire1 = document.createElement('wire-element')
      this.wire1.x1 = 64
      this.wire1.y1 = 41
      this.wire1.x2 = 66
      this.wire1.y2 = 61
      this.appendChild(this.wire1)

      this.switch2 = document.createElement('double-throw-relay')
      this.switch2.setAttribute('scale', 0.2)
      this.switch2.x = 16
      this.switch2.y = 70.5
      this.appendChild(this.switch2)

      this.wire2 = document.createElement('wire-element')
      this.wire2.x1 = 64
      this.wire2.y1 = 83
      this.wire2.x2 = 66
      this.wire2.y2 = 64
      this.appendChild(this.wire2)
    }
  }
}

window.customElements.define('nand-gate', NandGate)
