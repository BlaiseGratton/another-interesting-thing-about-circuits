import { ComponentContainer } from '../component-container.js'

export class EightBitRippleCounter extends ComponentContainer {
  constructor() {
    super()
    this.leftPorts = 1
    this.rightPorts = 1
    this.bottomPorts = 8
  }

  connectedCallback() {
    this.height = 48
    this.width = 400
    this.setAttribute('left-ports', this.leftPorts)
    this.setAttribute('right-ports', this.rightPorts)
    this.setAttribute('bottom-ports', this.bottomPorts)
    super.connectedCallback()

    if (this.svg) {
      const slotWidth = this.width / 9

      this.addComponent('double-throw-relay', this.width - slotWidth - 5, 20, {
        scale: 0.087,
        'port-scale-outer': 0.2
      })
      // clock in
      this.addWire(this.width - 8, this.height / 2, this.width - 8, 10)
      this.addWire(this.width - 8, 10, this.width - slotWidth * 2 - 11.5, 18)
      this.addWire(this.width - 8, 10, this.width - slotWidth * 2 - 11.5, 18)
      this.addWire(this.width - 8, 10, this.width - slotWidth, 18)
      this.addWire(8, this.height / 2, 13, 45)

      for (let i = 1; i < 8; i++) {
        this[`latch${i}`] = this.addComponent(
          'edge-latch-preset-clear',
          this.width - slotWidth * (i + 1) - 24,
          20,
          {
            scale: 0.18,
            'port-scale-outer': 0.2
          }
        )

        this.addWire(
          this.width - slotWidth * (i + 1) - 11.5,
          40,
          this.width - slotWidth * (i + 1) - 27,
          40
        )
        this.addWire(
          this.width - slotWidth * (i + 1) - 27,
          40,
          this.width - slotWidth * (i + 1) - 27,
          14
        )
        this.addWire(
          this.width - slotWidth * (i + 1) - 27,
          14,
          this.width - slotWidth * (i + 1),
          18
        )
        this.addWire(
          this.width - slotWidth * (i + 1) + 13.5,
          29,
          this.width - slotWidth * (i + 1) + 13.5,
          45
        )
        this.addWire(
          this.width - slotWidth * (i + 1) + 13.5,
          45,
          this.width - slotWidth * (i + 2) + 13.5,
          45
        )

        if (i < 7) {
          this.addWire(
            this.width - slotWidth * (i + 1) - 27,
            14,
            this.width - slotWidth * (i + 2) - 11.5,
            18
          )
        }
      }
    }
  }
}

window.customElements.define('eight-bit-ripple-counter', EightBitRippleCounter)
