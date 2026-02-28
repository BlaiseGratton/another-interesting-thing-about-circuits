import { ComponentContainer } from '../component-container.js'

export class HalfAdder extends ComponentContainer {
  constructor() {
    super()
    this.leftPorts = 2
    this.rightPorts = 2
  }

  connectedCallback() {
    this.setAttribute('port-scale-inner', 0.2)
    this.width = 100
    this.height = 100
    if (this.isHorizontal) {
      this.setAttribute('left-ports', this.leftPorts)
      this.setAttribute('right-ports', this.rightPorts)
      super.connectedCallback()

      if (this.svg) {
        this.xorGate = this.addComponent('xor-gate', 10, 4, {
          scale: 0.65,
          orientation: 'horizontal',
          'port-scale-outer': 0.2
        })
        this.andGate = this.addComponent('and-gate', 10, 58, {
          scale: 0.5,
          orientation: 'horizontal',
          'port-scale-outer': 0.2
        })
        this.wire1 = this.addWire(2, 33, 8, 20)
        this.wire2 = this.addWire(2, 33, 8, 71)
        this.wire3 = this.addWire(2, 66, 8, 37)
        this.wire4 = this.addWire(2, 66, 8, 83)
        this.wire5 = this.addWire(90, 28, 98, 33)
        this.wire6 = this.addWire(49, 77, 98, 67)
      }
    } else {
      this.topPorts = 2
      this.bottomPorts = 2
      this.setAttribute('top-ports', this.topPorts)
      this.setAttribute('bottom-ports', this.bottomPorts)
      super.connectedCallback()

      if (this.svg) {
        this.xorGate = this.addComponent('xor-gate', 48, 10, {
          scale: 0.65,
          'port-scale-outer': 0.2
        })
        this.andGate = this.addComponent('and-gate', 4, 10, {
          scale: 0.5,
          'port-scale-outer': 0.2
        })
        this.wire1 = this.addWire(33, 2, 17, 8)
        this.wire2 = this.addWire(33, 2, 64, 8)
        this.wire3 = this.addWire(66, 2, 29, 8)
        this.wire4 = this.addWire(66, 2, 80, 8)
        this.wire5 = this.addWire(23, 49, 33, 98)
        this.wire6 = this.addWire(72, 90, 67, 98)
      }
    }
  }
}

window.customElements.define('half-adder', HalfAdder)
