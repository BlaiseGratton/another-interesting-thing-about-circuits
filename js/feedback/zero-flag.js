import { ComponentContainer } from '../component-container.js'

export class ZeroFlag extends ComponentContainer {
  constructor() {
    super()
    this.topPorts = 8
    this.leftPorts = 1
    this.rightPorts = 1
    this.bottomPorts = 1
  }

  connectedCallback() {
    this.width = 400
    this.height = 75
    this.setAttribute('top-ports', this.topPorts)
    this.setAttribute('left-ports', this.leftPorts)
    this.setAttribute('right-ports', this.rightPorts)
    this.setAttribute('bottom-ports', this.bottomPorts)
    this.setAttribute('port-scale-inner', 0.4)
    super.connectedCallback()

    if (this.svg) {
      const slotWidth = this.width / 9

      for (let i = 0; i < 8; i++) {
        if (i < 7) {
          this.addComponent(
            'inverter-relay',
            this.width - slotWidth * (i + 1) - 7.5,
            6,
            {
              scale: 0.1,
              'port-scale-outer': 0.4
            }
          )
          this.addWire(
            this.width - slotWidth * (i + 1) - 4,
            3,
            this.width - slotWidth * (i + 1) - 20,
            3
          )
          this.addWire(
            this.width - slotWidth * (i + 1) - 20,
            3,
            this.width - slotWidth * (i + 1) - 20,
            29
          )
          if (i < 6) {
            this.addWire(
              this.width - slotWidth * (i + 1) - 20,
              29,
              this.width - slotWidth * (i + 2) - 2,
              29
            )
          }
        } else {
          this.addComponent('double-throw-relay', slotWidth - 6, 6, {
            scale: 0.1,
            'port-scale-outer': 0.4
          })
          this.addWire(
            this.width - slotWidth * i - 20,
            29,
            this.width - slotWidth * (i + 1),
            29
          )
        }
      }

      this.addComponent(
        'edge-latch-preset-clear',
        this.width / 2 - 20,
        this.height / 2 + 4,
        {
          scale: 0.2
        }
      )

      this.addWire(3, this.height / 2, this.width / 2 - 6, this.height / 2 - 4)
      this.addWire(
        this.width - slotWidth - 3,
        29,
        this.width / 2 + 7,
        this.height / 2 - 4
      )
      this.addWire(
        this.width / 2,
        this.height - 3,
        this.width / 2 + 7,
        this.height - 7
      )
      this.addWire(
        this.width - 3,
        this.height / 2,
        this.width / 2 + 28,
        this.height - 24
      )
    }
  }
}

window.customElements.define('zero-flag', ZeroFlag)
