import { ComponentContainer } from '../component-container.js'

export class XorGate extends ComponentContainer {
  constructor() {
    super()
    this.leftPorts = 2
    this.rightPorts = 1
  }

  connectedCallback() {
    this.setAttribute('port-scale-inner', 0.25)
    if (this.isHorizontal) {
      this.width = 120
      this.height = 75
      this.setAttribute('left-ports', this.leftPorts)
      this.setAttribute('right-ports', this.rightPorts)
      super.connectedCallback()

      if (this.svg) {
        this.orGate = this.addComponent('or-gate', 14, 4, {
          scale: 0.4,
          orientation: 'horizontal',
          'port-scale-outer': 0.4
        })
        this.nandGate = this.addComponent('nand-gate', 14, 40, {
          scale: 0.4,
          orientation: 'horizontal',
          'port-scale-outer': 0.4
        })
        this.andGate = this.addComponent('and-gate', 58, 9, {
          scale: 0.75,
          orientation: 'horizontal',
          'port-scale-outer': 0.4
        })
        this.wire1 = this.addWire(2, 24, 10, 14)
        this.wire2 = this.addWire(2, 24, 10, 50)
        this.wire3 = this.addWire(2, 50, 10, 24)
        this.wire3 = this.addWire(2, 50, 10, 60)
        this.wire4 = this.addWire(47, 19, 55, 28)
        this.wire5 = this.addWire(47, 55, 55, 47)
      }
    } else {
      this.width = 75
      this.height = 120
      this.topPorts = 2
      this.bottomPorts = 1
      this.setAttribute('top-ports', this.topPorts)
      this.setAttribute('bottom-ports', this.bottomPorts)
      super.connectedCallback()

      if (this.svg) {
        this.orGate = this.addComponent('or-gate', 4, 14, {
          scale: 0.4,
          'port-scale-outer': 0.4
        })
        this.nandGate = this.addComponent('nand-gate', 40, 14, {
          scale: 0.4,
          'port-scale-outer': 0.4
        })
        this.andGate = this.addComponent('and-gate', 9, 58, {
          scale: 0.75,
          'port-scale-outer': 0.4
        })
        this.wire1 = this.addWire(24, 2, 14, 10)
        this.wire2 = this.addWire(24, 2, 50, 10)
        this.wire3 = this.addWire(50, 2, 24, 10)
        this.wire3 = this.addWire(50, 2, 60, 10)
        this.wire4 = this.addWire(19, 47, 28, 55)
        this.wire5 = this.addWire(55, 47, 47, 55)
      }
    }
  }
}

window.customElements.define('xor-gate', XorGate)
