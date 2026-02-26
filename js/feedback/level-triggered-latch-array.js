import { ComponentContainer } from '../component-container.js'

export class LevelTriggeredLatchArray extends ComponentContainer {
  constructor() {
    super()
    this.leftPorts = 1
  }

  connectedCallback() {
    this.height = 75
    const bits = parseInt(this.getAttribute('bits') || 8)
    this.width = bits * 50
    this.topPorts = bits
    this.bottomPorts = bits
    this.setAttribute('topports', this.topPorts)
    this.setAttribute('bottomports', this.bottomPorts)
    this.setAttribute('leftports', this.leftPorts)
    super.connectedCallback()

    if (this.svg) {
      const slotWidth = this.width / (bits + 1)
      for (let i = 0; i < bits; i++) {
        this[`flipFlop${i}`] = this.addComponent(
          'level-triggered-latch',
          this.width - slotWidth * (i + 1) - 18 * this.scale,
          10 * this.scale,
          {
            scale: 0.37,
            portscaleouter: 0.2
          }
        )
        this.addWire(
          this.width - slotWidth * (i + 1),
          8 * this.scale,
          this.width - slotWidth * (i + 1) + 6,
          8 * this.scale
        )
        this.addWire(
          this.width - slotWidth * (i + 1) - 6 * this.scale,
          8 * this.scale,
          this.width - slotWidth * (i + 1) - 20 * this.scale,
          4 * this.scale
        )
        if (i < bits - 1) {
          this.addWire(
            this.width - slotWidth * (i + 1) - 20 * this.scale,
            4 * this.scale,
            this.width - slotWidth - slotWidth * (i + 1) - 20 * this.scale,
            4 * this.scale
          )
        }
      }
      this.addWire(
        8 * this.scale,
        this.height / 2,
        this.width - slotWidth * bits - 20 * this.scale,
        4 * this.scale
      )
    }
  }
}

window.customElements.define(
  'level-triggered-latch-array',
  LevelTriggeredLatchArray
)
