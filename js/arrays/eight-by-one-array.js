import { ComponentContainer } from '../component-container.js'

export class EightByOneArray extends ComponentContainer {
  constructor() {
    super()
    this.topPorts = 1
    this.leftPorts = 5
    this.rightPorts = 1
  }

  connectedCallback() {
    this.width = 350
    this.height = 256
    this.setAttribute('port-scale-inner', 0.2)
    this.setAttribute('top-ports', this.topPorts)
    this.setAttribute('left-ports', this.leftPorts)
    this.setAttribute('right-ports', this.rightPorts)
    super.connectedCallback()

    if (this.svg) {
      this.addComponent('three-to-eight-decoder', 15, 15, {
        scale: 0.8,
        'port-scale-outer': 0.2
      })
      this.addComponent('level-triggered-addressable-latch', 15, 98, {
        scale: 0.8,
        'port-scale-outer': 0.2
      })
      this.addComponent('eight-to-one-selector', 15, 161, {
        scale: 0.8,
        'port-scale-outer': 0.2
      })
      // clear signal
      this.addWire(175, 2, 13, 2)
      this.addWire(13, 2, 13, 128)
      // data in
      this.addWire(337, 128, 337, 160)
      this.addWire(337, 160, 2, 160)
      this.addWire(2, 160, 2, 171)
      // data out
      this.addWire(175, 243, 348, 243)
      this.addWire(348, 243, 348, 128)
      // write signal
      this.addWire(2, 212.5, 2, 13)
      this.addWire(2, 13, 175, 13)
      // s0
      this.addWire(2, 43, 13, 35)
      this.addWire(2, 43, 13, 181)
      // s1
      this.addWire(2, 86, 13, 55)
      this.addWire(2, 86, 13, 201)
      // s2
      this.addWire(2, 129, 13, 75)
      this.addWire(2, 129, 13, 221)
    }
  }
}

window.customElements.define('eight-by-one-array', EightByOneArray)
