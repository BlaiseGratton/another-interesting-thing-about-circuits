import { ComponentContainer } from '../component-container.js'

export class HalfAdder extends ComponentContainer {
  constructor() {
    super()
    this.leftPorts = 2
    this.rightPorts = 2
  }

  connectedCallback() {
    this.width = 125
    this.height = 125
    this.setAttribute('leftports', this.leftPorts)
    this.setAttribute('rightports', this.rightPorts)
    super.connectedCallback()

    if (this.svg) {
      this.xorGate = document.createElement('xor-gate')
      this.xorGate.setAttribute('scale', 0.65)
      this.xorGate.x = 24
      this.xorGate.y = 4
      this.appendChild(this.xorGate)

      this.andGate = document.createElement('and-gate')
      this.andGate.setAttribute('scale', 0.5)
      this.andGate.x = 35
      this.andGate.y = 56
      this.appendChild(this.andGate)

      this.inputWire1 = document.createElement('wire-element')
      this.inputWire1.x1 = 8
      this.inputWire1.y1 = 40.5
      this.inputWire1.x2 = 16
      this.inputWire1.y2 = 20
      this.appendChild(this.inputWire1)

      this.inputWire2 = document.createElement('wire-element')
      this.inputWire2.x1 = 8
      this.inputWire2.y1 = 42
      this.inputWire2.x2 = 27
      this.inputWire2.y2 = 76
      this.appendChild(this.inputWire2)

      this.inputWire3 = document.createElement('wire-element')
      this.inputWire3.x1 = 8
      this.inputWire3.y1 = 82
      this.inputWire3.x2 = 16
      this.inputWire3.y2 = 37
      this.appendChild(this.inputWire3)

      this.inputWire4 = document.createElement('wire-element')
      this.inputWire4.x1 = 8
      this.inputWire4.y1 = 84
      this.inputWire4.x2 = 27
      this.inputWire4.y2 = 98
      this.appendChild(this.inputWire4)

      this.sumOutWire = document.createElement('wire-element')
      this.sumOutWire.x1 = 113
      this.sumOutWire.y1 = 28
      this.sumOutWire.x2 = 117
      this.sumOutWire.y2 = 42
      this.appendChild(this.sumOutWire)

      this.carryOutWire = document.createElement('wire-element')
      this.carryOutWire.x1 = 81
      this.carryOutWire.y1 = 87
      this.carryOutWire.x2 = 117
      this.carryOutWire.y2 = 83
      this.appendChild(this.carryOutWire)
    }
  }
}

window.customElements.define('half-adder', HalfAdder)
