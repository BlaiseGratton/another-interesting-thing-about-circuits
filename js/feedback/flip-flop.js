import { ComponentContainer } from '../component-container.js'

export class FlipFlop extends ComponentContainer {
  constructor() {
    super()
    this.leftPorts = 2
    this.rightPorts = 2
  }

  connectedCallback() {
    this.setAttribute('portscaleinner', 0.2)
    this.width = 75
    this.height = 100

    if (this.isHorizontal) {
      this.setAttribute('leftports', this.leftPorts)
      this.setAttribute('rightports', this.rightPorts)
      super.connectedCallback()

      if (this.svg) {
        this.norGate1 = this.addComponent('nor-gate', 20, 2, {
          scale: 0.5,
          orientation: 'horizontal'
        })
        this.norGate2 = this.addComponent('nor-gate', 20, 60.5, {
          scale: 0.5,
          orientation: 'horizontal'
        })

        // feedback route 1
        const gate1ToGate2Wire = this.addWire(65, 21, 63, 34)
        setTimeout(() => {
          gate1ToGate2Wire.setAttribute('y2', 37)
        }, 200)
        this.addWire(63, 37, 20, 58)
        this.addWire(20, 58, 12, 73)

        // feedback route 2
        this.addWire(65, 79, 63, 63)
        this.addWire(63, 63, 20, 42)
        this.addWire(20, 42, 12, 27)

        // I/O
        this.addWire(2, 33, 12, 15)
        this.addWire(2, 66, 12, 85)
        this.addWire(66, 20, 73, 33)
        this.addWire(66, 80, 73, 66)
      }
    } else {
      this.width = 100
      this.height = 75
      this.topPorts = 2
      this.bottomPorts = 2
      this.setAttribute('topports', this.topPorts)
      this.setAttribute('bottomports', this.bottomPorts)
      super.connectedCallback()

      if (this.svg) {
        this.norGate1 = this.addComponent('nor-gate', 2, 20, {
          scale: 0.5
        })
        this.norGate2 = this.addComponent('nor-gate', 60.5, 20, {
          scale: 0.5
        })

        // feedback route 1
        const gate1ToGate2Wire = this.addWire(21, 65, 32, 63)
        setTimeout(() => {
          gate1ToGate2Wire.setAttribute('x2', 37)
        }, 170)
        this.addWire(37, 63, 58, 20)
        this.addWire(58, 20, 73, 12)

        // feedback route 2
        this.addWire(79, 65, 63, 63)
        this.addWire(63, 63, 42, 20)
        this.addWire(42, 20, 27, 12)

        // I/O
        this.addWire(33, 2, 15, 12)
        this.addWire(66, 2, 85, 12)
        this.addWire(20, 66, 33, 73)
        this.addWire(80, 66, 66, 73)
      }
    }
  }
}

window.customElements.define('flip-flop', FlipFlop)
