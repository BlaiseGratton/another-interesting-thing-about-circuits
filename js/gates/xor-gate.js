import { ComponentContainer } from '../component-container.js'

export class XorGate extends ComponentContainer {
  constructor() {
    super()
    this.leftPorts = 2
    this.rightPorts = 1
  }

  connectedCallback() {
    this.width = 125
    this.height = 75
    this.setAttribute('leftPorts', this.leftPorts)
    this.setAttribute('rightports', this.rightPorts)
    super.connectedCallback()

    if (this.svg) {
      this.orGate = document.createElement('or-gate')
      this.orGate.setAttribute('scale', 0.28)
      this.orGate.x = 21
      this.orGate.y = 1
      this.appendChild(this.orGate)

      this.inputWire1 = document.createElement('wire-element')
      this.inputWire1.x1 = 8.5
      this.inputWire1.y1 = 23.5
      this.inputWire1.x2 = 12.5
      this.inputWire1.y2 = 13
      this.appendChild(this.inputWire1)

      this.inputWire2 = document.createElement('wire-element')
      this.inputWire2.x1 = 8.5
      this.inputWire2.y1 = 26
      this.inputWire2.x2 = 12.5
      this.inputWire2.y2 = 50
      this.appendChild(this.inputWire2)

      this.inputWire3 = document.createElement('wire-element')
      this.inputWire3.x1 = 8.5
      this.inputWire3.y1 = 49
      this.inputWire3.x2 = 12.5
      this.inputWire3.y2 = 25
      this.appendChild(this.inputWire3)

      this.inputWire4 = document.createElement('wire-element')
      this.inputWire4.x1 = 8.5
      this.inputWire4.y1 = 51
      this.inputWire4.x2 = 12.5
      this.inputWire4.y2 = 61
      this.appendChild(this.inputWire4)

      this.nandGate = document.createElement('nand-gate')
      this.nandGate.setAttribute('scale', 0.28)
      this.nandGate.x = 21
      this.nandGate.y = 38
      this.appendChild(this.nandGate)

      this.andGate = document.createElement('and-gate')
      this.andGate.setAttribute('scale', 0.5)
      this.andGate.x = 71.5
      this.andGate.y = 6
      this.appendChild(this.andGate)

      this.orOutputWire = document.createElement('wire-element')
      this.orOutputWire.x1 = 50
      this.orOutputWire.y1 = 19
      this.orOutputWire.x2 = 63
      this.orOutputWire.y2 = 27
      this.appendChild(this.orOutputWire)

      this.nandOutputWire = document.createElement('wire-element')
      this.nandOutputWire.x1 = 50
      this.nandOutputWire.y1 = 55
      this.nandOutputWire.x2 = 63
      this.nandOutputWire.y2 = 48
      this.appendChild(this.nandOutputWire)
    }
  }
}

window.customElements.define('xor-gate', XorGate)
