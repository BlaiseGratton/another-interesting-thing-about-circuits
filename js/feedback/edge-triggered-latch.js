import { ComponentContainer } from '../component-container.js'

export class EdgeTriggeredLatch extends ComponentContainer {
  constructor() {
    super()
    this.topPorts = 2
    this.bottomPorts = 2
  }

  connectedCallback() {
    this.setAttribute('port-scale-inner', 0.2)
    this.width = 100
    this.height = 200
    this.setAttribute('top-ports', this.topPorts)
    this.setAttribute('bottom-ports', this.bottomPorts)
    super.connectedCallback()

    if (this.svg) {
      this.clockInverter = this.addComponent('double-throw-relay', 24, 4, {
        scale: 0.15,
        'port-scale-outer': 0.2
      })
      this.dataInverter = this.addComponent('double-throw-relay', 57, 4, {
        scale: 0.15,
        'port-scale-outer': 0.2
      })
      this.andGate1 = this.addComponent('and-gate', 16, 42, {
        scale: 0.35,
        'port-scale-outer': 0.2
      })
      this.andGate2 = this.addComponent('and-gate', 58, 42, {
        scale: 0.35,
        'port-scale-outer': 0.2
      })
      this.flipFlop1 = this.addComponent('flip-flop', 25, 74, {
        scale: 0.5,
        'port-scale-outer': 0.2
      })
      this.andGate3 = this.addComponent('and-gate', 16, 118, {
        scale: 0.35,
        'port-scale-outer': 0.2
      })
      this.andGate4 = this.addComponent('and-gate', 58, 118, {
        scale: 0.35,
        'port-scale-outer': 0.2
      })
      this.flipFlop2 = this.addComponent('flip-flop', 25, 152, {
        scale: 0.5,
        'port-scale-outer': 0.2
      })

      // dataInverter out
      this.addWire(66.5, 36, 33.5, 40)
      // data in to andGate2
      this.addWire(66.5, 2, 80, 3)
      this.addWire(80, 3, 76, 40)
      // clockInverter out
      this.addWire(33.5, 36, 24.5, 40)
      this.addWire(33.5, 36, 66.5, 40)
      // andGate1/2 to flipFlop1
      this.addWire(29, 70, 41.5, 72)
      this.addWire(71, 70, 58.5, 72)
      // flipFlop1 to andGates3/4
      this.addWire(41.5, 113, 33.5, 116)
      this.addWire(58.5, 113, 75, 116)
      // clock in to andGates3/4
      this.addWire(33.4, 2, 14, 3)
      this.addWire(14, 3, 16, 114)
      this.addWire(16, 114, 25, 116)
      this.addWire(16, 114, 66.5, 116)
      // andGates3/4 to flipFlop2
      this.addWire(29, 146, 41.5, 150)
      this.addWire(71, 146, 58.5, 150)
      // Q out
      this.addWire(58.5, 191, 66.5, 198)
      // Q bar out
      this.addWire(41.5, 191, 33.5, 198)
    }
  }
}

window.customElements.define('edge-triggered-latch', EdgeTriggeredLatch)
