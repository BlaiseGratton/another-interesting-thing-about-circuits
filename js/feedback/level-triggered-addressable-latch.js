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
      this.addComponent('splitter-relay', 4, 4, {
        scale: 0.05,
        'port-scale-outer': 0.2
      })
      this.addComponent('splitter-relay', 15, 4, {
        scale: 0.05,
        'port-scale-outer': 0.2
      })
      this.addComponent('splitter-relay', 4, 42, {
        scale: 0.05,
        'port-scale-outer': 0.2
      })
      this.addComponent('splitter-relay', 15, 42, {
        scale: 0.05,
        'port-scale-outer': 0.2
      })
      this.addWire(9, 2, 8, 37)
      this.addWire(20, 2, 8, 37)
      this.addWire(9, 41, 8, 37)
      this.addWire(20, 41, 8, 37)
      this.addWire(7, 16, slotWidth - 7, 8)
      this.addWire(11, 16, slotWidth * 2 - 7, 8)
      this.addWire(18, 16, slotWidth * 3 - 7, 8)
      this.addWire(22, 16, slotWidth * 4 - 7, 8)
      this.addWire(7, 54, slotWidth * 5 - 7, 8)
      this.addWire(11, 54, slotWidth * 6 - 7, 8)
      this.addWire(18, 54, slotWidth * 7 - 7, 8)
      this.addWire(22, 54, slotWidth * 8 - 7, 8)
    }
  }
}

window.customElements.define(
  'level-triggered-addressable-latch',
  LevelTriggeredAddressableLatch
)
