import { ComponentContainer } from '../component-container.js'

export class XorGate extends ComponentContainer {
  constructor() {
    super()
    this.leftPorts = 2
    this.rightPorts = 1
  }

  connectedCallback() {
    this.width = 75
    this.height = 125
    this.setAttribute('leftPorts', this.leftPorts)
    this.setAttribute('rightports', this.rightPorts)
    super.connectedCallback()

    if (this.svg) {
      this.orGate = document.createElement('or-gate')
      this.orGate.setAttribute('scale', 0.35)
      this.orGate.x = 18
      this.orGate.y = 1
      this.appendChild(this.orGate)

      this.inputWire1 = document.createElement('wire-element')
      this.inputWire1.x1 = 8.5
      this.inputWire1.y1 = 40
      this.inputWire1.x2 = 10
      this.inputWire1.y2 = 17
      this.appendChild(this.inputWire1)

      this.inputWire2 = document.createElement('wire-element')
      this.inputWire2.x1 = 8.5
      this.inputWire2.y1 = 43
      this.inputWire2.x2 = 10
      this.inputWire2.y2 = 94
      this.appendChild(this.inputWire2)

      this.inputWire3 = document.createElement('wire-element')
      this.inputWire3.x1 = 8.5
      this.inputWire3.y1 = 82
      this.inputWire3.x2 = 10
      this.inputWire3.y2 = 30
      this.appendChild(this.inputWire3)

      this.inputWire4 = document.createElement('wire-element')
      this.inputWire4.x1 = 8.5
      this.inputWire4.y1 = 85
      this.inputWire4.x2 = 10
      this.inputWire4.y2 = 109
      this.appendChild(this.inputWire4)

      this.nandGate = document.createElement('nand-gate')
      this.nandGate.setAttribute('scale', 0.35)
      this.nandGate.x = 18
      this.nandGate.y = 80
      this.appendChild(this.nandGate)

      this.andGate = document.createElement('and-gate')
      this.andGate.setAttribute('scale', 0.23)
      this.andGate.x = 42
      this.andGate.y = 48
      this.appendChild(this.andGate)

      this.orOutputWire = document.createElement('wire-element')
      this.orOutputWire.x1 = 52
      this.orOutputWire.y1 = 23
      this.orOutputWire.x2 = 34
      this.orOutputWire.y2 = 58
      this.appendChild(this.orOutputWire)

      this.nandOutputWire = document.createElement('wire-element')
      this.nandOutputWire.x1 = 52
      this.nandOutputWire.y1 = 102
      this.nandOutputWire.x2 = 34
      this.nandOutputWire.y2 = 67
      this.appendChild(this.nandOutputWire)
    }
  }
}

window.customElements.define('xor-gate', XorGate)
