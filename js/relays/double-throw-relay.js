import { ComponentContainer } from '../component-container.js'

export class DoubleThrowRelay extends ComponentContainer {
  constructor() {
    super()
    this.leftPorts = 1
    this.rightPorts = 1
    this.hasMovement = true
  }

  connectedCallback() {
    this.movementDelay = this.getAttribute('movement-delay')

    if (this.isHorizontal) {
      const inverterConfig = {
        scale: 0.75,
        orientation: 'horizontal'
      }
      if (this.movementDelay) {
        inverterConfig['movement-delay'] = this.movementDelay
      }
      this.width = 200
      this.height = 125
      this.setAttribute('left-ports', this.leftPorts)
      this.setAttribute('right-ports', this.rightPorts)
      super.connectedCallback()

      if (this.svg) {
        this.inverterSwitch = this.addComponent(
          'inverter-relay',
          34,
          21,
          inverterConfig
        )
        this.inputWire = this.addWire(8, 62, 26, 76)
        this.powerSource = this.addWire(20, 30, 26, 48, 'power-source')
      }
    } else {
      const inverterConfig = {
        scale: 0.75
      }
      if (this.movementDelay) {
        inverterConfig['movement-delay'] = this.movementDelay
      }
      this.topPorts = 1
      this.bottomPorts = 1
      this.width = 125
      this.height = 200
      this.setAttribute('top-ports', this.topPorts)
      this.setAttribute('bottom-ports', this.bottomPorts)
      super.connectedCallback()

      this.inverterSwitch = this.addComponent(
        'inverter-relay',
        21,
        34,
        inverterConfig
      )
      this.inputWire = this.addWire(62, 8, 76, 26)
      this.powerSource = this.addWire(30, 20, 48, 26, 'power-source')
    }
  }
}

window.customElements.define('double-throw-relay', DoubleThrowRelay)
