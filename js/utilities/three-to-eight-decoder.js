import { ComponentContainer } from '../component-container.js'

export class ThreeToEightDecoder extends ComponentContainer {
  constructor() {
    super()
    this.topPorts = 1
    this.bottomPorts = 8
    this.leftPorts = 3
  }

  connectedCallback() {
    this.width = 400
    this.height = 100
    this.setAttribute('top-ports', this.topPorts)
    this.setAttribute('left-ports', this.leftPorts)
    this.setAttribute('bottom-ports', this.bottomPorts)
    this.setAttribute('port-scale-inner', 0.2)
    super.connectedCallback()

    if (this.svg) {
      this.inverter1 = this.addComponent('double-throw-relay', 24, 8, {
        scale: 0.05,
        'port-scale-outer': 0.2
      })
      this.inverter2 = this.addComponent('double-throw-relay', 16, 28, {
        scale: 0.05,
        'port-scale-outer': 0.2
      })
      this.inverter3 = this.addComponent('double-throw-relay', 8, 48, {
        scale: 0.05,
        'port-scale-outer': 0.2
      })

      this.slotWidth = this.width / 9

      for (let i = 1; i <= 8; i++) {
        this[`andGate${i}`] = this.addComponent(
          'and-gate-four',
          this.slotWidth * i - 11,
          80,
          {
            scale: 0.15
          }
        )
        this.addWire(this.width / 2, 2, this.slotWidth * i + 7, 72)
      }

      // s0 to inverter
      this.addWire(2, 25, 27, 6)
      // s0 to a7, a5, a3, a1
      this.addWire(27, 6, 41, 6)
      this.addWire(41, 6, 131, 6)
      this.addWire(131, 6, 221, 6)
      this.addWire(221, 6, 310, 6)
      this.addWire(41, 6, 46.5, 72)
      this.addWire(131, 6, 136.5, 72)
      this.addWire(221, 6, 225, 72)
      this.addWire(310, 6, 314, 72)
      // s0 inverter out to a6, a4, a2, a0
      this.addWire(27, 20, 88, 12)
      this.addWire(88, 12, 177, 12)
      this.addWire(177, 12, 266, 12)
      this.addWire(266, 12, 355.5, 12)
      this.addWire(88, 12, 92, 72)
      this.addWire(177, 12, 180, 72)
      this.addWire(266, 12, 269, 72)
      this.addWire(355.5, 12, 358, 72)
      // s1 to inverter
      this.addWire(2, 50, 19, 27)
      // s1 to a7, a6, a3, a2
      this.addWire(19, 27, 38, 21)
      this.addWire(38, 21, 86, 18)
      this.addWire(86, 18, 218, 18)
      this.addWire(218, 18, 264, 18)
      this.addWire(38, 21, 42, 72)
      this.addWire(86, 18, 87, 72)
      this.addWire(218, 18, 220, 72)
      this.addWire(264, 18, 264, 72)
      // s1 inverter to a5, a4, a1, a0
      this.addWire(19, 40, 55, 27)
      this.addWire(55, 27, 131, 24)
      this.addWire(131, 24, 177, 24)
      this.addWire(177, 24, 310, 24)
      this.addWire(310, 24, 355, 24)
      this.addWire(131, 24, 132, 72)
      this.addWire(177, 24, 176, 72)
      this.addWire(310, 24, 309, 72)
      this.addWire(355, 24, 354, 72)
      // s2 to inverter
      this.addWire(2, 75, 11, 47)
      // s2 to a7, a6, a5, a4
      this.addWire(11, 47, 38, 40)
      this.addWire(38, 40, 80, 32)
      this.addWire(80, 32, 125, 32)
      this.addWire(125, 32, 170, 32)
      this.addWire(38, 40, 38, 72)
      this.addWire(80, 32, 83, 72)
      this.addWire(125, 32, 127, 72)
      this.addWire(170, 32, 171, 72)
      // s2 inverter out to a3, a2, a1, a0
      this.addWire(11, 60, 30, 50)
      this.addWire(30, 50, 216, 40)
      this.addWire(216, 40, 262, 40)
      this.addWire(262, 40, 308, 40)
      this.addWire(308, 40, 353, 40)
      this.addWire(216, 40, 216, 72)
      this.addWire(262, 40, 261, 72)
      this.addWire(308, 40, 305, 72)
      this.addWire(353, 40, 349, 72)
    }
  }
}

window.customElements.define('three-to-eight-decoder', ThreeToEightDecoder)
