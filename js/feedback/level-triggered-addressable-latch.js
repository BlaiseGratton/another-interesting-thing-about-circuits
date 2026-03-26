import { ComponentContainer } from '../component-container.js'

export class LevelTriggeredAddressableLatch extends ComponentContainer {
  constructor() {
    super()
    this.leftPorts = 1
    this.rightPorts = 1
    this.topPorts = 8
    this.bottomPorts = 8
  }

  connectedCallback() {
    this.height = 75
    this.width = 400
    this.setAttribute('top-ports', this.topPorts)
    this.setAttribute('bottom-ports', this.bottomPorts)
    this.setAttribute('left-ports', this.leftPorts)
    this.setAttribute('right-ports', this.rightPorts)
    super.connectedCallback()

    if (this.svg) {
      const slotWidth = this.width / 9
      for (let i = 0; i < 8; i++) {
        this[`flipFlop${i}`] = this.addComponent(
          'level-triggered-latch',
          this.width - slotWidth * (i + 1) - 18,
          10,
          {
            scale: 0.37,
            'port-scale-outer': 0.2
          }
        )
        this.addWire(
          this.width - slotWidth * (i + 1),
          8,
          this.width - slotWidth * (i + 1) - 6,
          8
        )
        this.addWire(
          this.width - slotWidth * (i + 1) + 7,
          8,
          this.width - slotWidth * (i + 1) + 20,
          4
        )
        if (i < 7) {
          this.addWire(
            this.width - slotWidth * (i + 1) + 20,
            4,
            this.width - slotWidth * (i + 2) + 20,
            4
          )
        }
      }
      this.addWire(
        this.width - 8,
        this.height / 2,
        this.width - slotWidth + 20,
        4
      )

      // reset circuit
      this.addWire(8, this.height / 2, 8, this.height - 1)

      for (let i = 0; i < 4; i++) {
        this.addComponent(
          'splitter-relay',
          slotWidth * 2 * (i + 1) - 32,
          this.height - 9,
          {
            scale: 0.045,
            'port-scale-outer': 0.2,
            orientation: 'horizontal'
          }
        )

        this.addWire(
          slotWidth * 2 * i - (i === 0 ? -8 : 34),
          this.height - 1,
          slotWidth * 2 * (i + 1) - 34,
          this.height - 1
        )
        this.addWire(
          slotWidth * 2 * (i + 1) - 34,
          this.height - 5,
          slotWidth * 2 * (i + 1) - 34,
          this.height - 1
        )

        this.addWire(
          slotWidth * 2 * (i + 1) - 22.1,
          this.height - 6.5,
          slotWidth * 2 * (i + 1) - 24,
          8
        )
        this.addWire(
          slotWidth * 2 * (i + 1) - 24,
          8,
          slotWidth * 2 * (i + 1) - 50,
          8
        )

        this.addWire(
          slotWidth * 2 * (i + 1) - 22,
          this.height - 3.5,
          slotWidth * 2 * (i + 1) - 19,
          8
        )
        this.addWire(
          slotWidth * 2 * (i + 1) - 19,
          8,
          slotWidth * 2 * (i + 1),
          8
        )
      }
    }
  }
}

window.customElements.define(
  'level-triggered-addressable-latch',
  LevelTriggeredAddressableLatch
)
