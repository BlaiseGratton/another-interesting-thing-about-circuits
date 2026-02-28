import { ComponentContainer } from '../component-container.js'

export class TwoToOneSelectorBank extends ComponentContainer {
  constructor() {
    super()
    this.topPorts = 16
    this.bottomPorts = 8
    this.rightPorts = 1
    this.leftPorts = 1
  }

  connectedCallback() {
    this.width = 400
    this.height = 75
    this.setAttribute('port-scale-inner', 0.2)
    this.setAttribute('left-ports', this.leftPorts)
    this.setAttribute('top-ports', this.topPorts)
    this.setAttribute('right-ports', this.rightPorts)
    this.setAttribute('bottom-ports', this.bottomPorts)
    super.connectedCallback()

    if (this.svg) {
      const selectorScale = 0.35
      const slotWidth = this.width / (this.bottomPorts + 1)
      const topPortGap = this.width / (this.topPorts + 1)

      for (let i = 0; i < 8; i++) {
        this[`selector${i}`] = this.addComponent(
          'two-to-one-selector',
          this.width - slotWidth * (i + 1) - 17.5,
          36,
          {
            scale: selectorScale,
            'port-scale-outer': 0.2
          }
        )
        const bOffset = topPortGap * (i + 1)
        const aOffset = topPortGap * (i + 9)
        if (i === 0) {
          this.addWire(
            this.width - 2,
            this.height / 2,
            this.width - slotWidth,
            34
          )
        }
        this.addWire(
          this.width - bOffset,
          2,
          this.width - slotWidth * (i + 1) + 9,
          34
        )
        this.addWire(
          this.width - aOffset,
          2,
          this.width - slotWidth * (i + 1) - 9,
          34
        )
        if (i < 7) {
          this.addWire(
            this.width - slotWidth * (i + 1),
            34,
            this.width - slotWidth * (i + 2),
            34
          )
        } else {
          this.addWire(2, this.height / 2, this.width - slotWidth * (i + 1), 34)
        }
      }
    }
  }
}

window.customElements.define('two-to-one-selector-bank', TwoToOneSelectorBank)
