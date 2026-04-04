import { ComponentContainer } from '../component-container.js'

export class EightBitRippleCounter extends ComponentContainer {
  get movementDelay() {
    return this.getAttribute('movement-delay')
  }

  constructor() {
    super()
    this.leftPorts = 3
    this.rightPorts = 1
    this.bottomPorts = 8
    this.topPorts = 8
  }

  connectedCallback() {
    this.height = 48
    this.width = 400
    this.setAttribute('left-ports', this.leftPorts)
    this.setAttribute('right-ports', this.rightPorts)
    this.setAttribute('bottom-ports', this.bottomPorts)
    this.setAttribute('top-ports', this.topPorts)
    super.connectedCallback()

    if (this.svg) {
      const slotWidth = this.width / 9

      this.addWire(this.width - 8, this.height / 2, this.width - 8, 10)
      this.addWire(this.width - 8, 10, this.width - slotWidth - 11.5, 18)
      this.addWire(8, (this.height / 4) * 3, 13, 45)
      this.addWire(8, this.height / 4, 20, 5)
      const tempPower = this.addWire(15, 35, 13, 45, 'power-source')
      tempPower.setAttribute('scale', 0.1)

      this.initializeFunction = () => {
        setTimeout(() => {
          tempPower.destroy()
        }, 8000)
      }

      for (let i = 0; i < 8; i++) {
        this[`latch${i}`] = this.addComponent(
          'edge-latch-preset-clear',
          this.width - slotWidth * (i + 1) - 24,
          20,
          {
            scale: 0.18,
            'port-scale-outer': 0.2,
            'movement-delay': this.movementDelay
          }
        )

        // preset/clear connections
        this.addComponent(
          'double-throw-relay',
          this.width - slotWidth * (i + 1) + 2,
          5,
          {
            scale: 0.04,
            'port-scale-outer': 0.2,
            'movement-delay': this.movementDelay
          }
        )
        this.addComponent(
          'or-gate',
          this.width - slotWidth * (i + 1) + 10,
          20,
          {
            scale: 0.09,
            'port-scale-outer': 0.2,
            'movement-delay': this.movementDelay
          }
        )
        this.addComponent('and-gate', this.width - slotWidth * (i + 1) + 9, 5, {
          scale: 0.09,
          'port-scale-outer': 0.2,
          'movement-delay': this.movementDelay
        })
        this.addComponent(
          'and-gate',
          this.width - slotWidth * (i + 1) - 26,
          6,
          {
            scale: 0.09,
            'port-scale-outer': 0.2,
            'movement-delay': this.movementDelay
          }
        )
        this.addWire(
          this.width - slotWidth * (i + 1),
          8,
          this.width - slotWidth * (i + 1) + 4,
          4
        )
        this.addWire(
          this.width - slotWidth * (i + 1),
          8,
          this.width - slotWidth * (i + 1) - 21,
          5
        )
        this.addWire(
          this.width - slotWidth * (i + 1) - 23,
          14,
          this.width - slotWidth * (i + 1) - 25,
          29
        )
        this.addWire(
          this.width - slotWidth * (i + 1) - 24,
          5,
          this.width - slotWidth * (i + 1) + 17,
          2
        )
        this.addWire(
          this.width - slotWidth * (i + 1) + 17,
          2,
          this.width - slotWidth * (i + 1) + 13.5,
          4
        )
        this.addWire(
          this.width - slotWidth * (i + 1) + 13,
          13,
          this.width - slotWidth * (i + 1) + 12,
          19
        )
        this.addWire(
          this.width - slotWidth * (i + 1) + 5,
          13,
          this.width - slotWidth * (i + 1) + 11,
          4
        )
        if (i > 0) {
          this.addWire(
            this.width - slotWidth * (i + 1) + 17,
            2,
            this.width - slotWidth * (i + 1) + 20,
            5
          )
        }
        // latch connections
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
          this.width - slotWidth * (i + 1) + 15,
          19,
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
        } else {
          this.addWire(
            this.width - slotWidth * (i + 1) - 27,
            14,
            8,
            this.height / 2
          )
        }
      }
    }
  }
}

window.customElements.define('eight-bit-ripple-counter', EightBitRippleCounter)
