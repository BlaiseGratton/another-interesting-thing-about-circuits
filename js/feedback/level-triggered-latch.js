import { ComponentContainer } from '../component-container.js'

export class LevelTriggeredLatch extends ComponentContainer {
  constructor() {
    super()
    this.topPorts = 2
    this.bottomPorts = 1
  }

  connectedCallback() {
    this.setAttribute('port-scale-inner', 0.2)
    this.width = 100
    this.height = 150
    this.setAttribute('top-ports', this.topPorts)
    this.setAttribute('bottom-ports', this.bottomPorts)
    super.connectedCallback()

    if (this.svg) {
      this.inverter = this.addComponent('double-throw-relay', 40.5, 10, {
        scale: 0.15,
        'port-scale-outer': 0.2
      })
      this.andGate1 = this.addComponent('and-gate', 10, 24, {
        scale: 0.35,
        'port-scale-outer': 0.2
      })
      this.andGate1 = this.addComponent('and-gate', 64, 24, {
        scale: 0.35,
        'port-scale-outer': 0.2
      })
      this.flipFlop = this.addComponent('flip-flop', 8, 70, {
        scale: 0.85
      })
      // data in
      this.addWire(66, 2, 50, 8)
      this.addWire(67, 2, 73, 22)
      // inverter
      this.addWire(49, 42, 38, 42)
      this.addWire(38, 42, 38, 23)
      this.addWire(38, 23, 27, 23)
      // clock signal
      this.addWire(33, 2, 19, 22)
      this.addWire(33, 2, 75, 8)
      this.addWire(75, 8, 81, 22)
      // set signal
      this.addWire(77, 52, 65, 62)
      // reset signal
      this.addWire(23, 52, 36, 62)
      // Q out
      this.addWire(36, 142, 50, 148)
    }
  }
}

window.customElements.define('level-triggered-latch', LevelTriggeredLatch)
