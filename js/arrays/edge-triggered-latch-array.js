import { ComponentContainer } from '../component-container.js'

export class EdgeTriggeredLatchArray extends ComponentContainer {
  constructor() {
    super()
    this.leftPorts = 2
  }

  connectedCallback() {
    this.height = 75
    const bits = parseInt(this.getAttribute('bits') || 8)
    this.width = bits * 75
    this.topPorts = bits
    this.bottomPorts = bits
    this.setAttribute('top-ports', this.topPorts)
    this.setAttribute('bottom-ports', this.bottomPorts)
    this.setAttribute('left-ports', this.leftPorts)
    this.movementDelay = this.getAttribute('movement-delay')
    super.connectedCallback()

    if (this.svg) {
      const slotWidth = this.width / (bits + 1)
      const latchAttrs = {
        scale: 0.27,
        'port-scale-outer': 0.1
      }
      if (this.movementDelay) {
        latchAttrs['movement-delay'] = this.movementDelay
      }

      for (let i = 0; i < bits; i++) {
        this[`flipFlop${i}`] = this.addComponent(
          'edge-latch-preset-clear',
          this.width - slotWidth * (i + 1) - slotWidth / 2,
          15,
          latchAttrs
        )
        this.addWire(
          this.width - slotWidth * (i + 1),
          67,
          this.width - slotWidth * (i + 1) + 2,
          43
        )
        this.addWire(
          this.width - slotWidth * (i + 1),
          8,
          this.width - slotWidth * (i + 1) + 2,
          14
        )
        this.addWire(
          this.width - slotWidth * (i + 1) - 16,
          14,
          this.width - slotWidth * (i + 1) - 30,
          4
        )
        if (i < bits - 1) {
          this.addWire(
            this.width - slotWidth * (i + 1) - 30,
            4,
            this.width - slotWidth - slotWidth * (i + 1) - 30,
            4
          )
        }
      }
      this.addWire(
        8,
        (this.height * 2) / 3,
        this.width - slotWidth * bits - 30,
        4
      )
    }
  }
}

window.customElements.define(
  'edge-triggered-latch-array',
  EdgeTriggeredLatchArray
)
