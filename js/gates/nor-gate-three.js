import { ComponentContainer } from '../component-container.js'

export class NorGateThree extends ComponentContainer {
  constructor() {
    super()
    this.leftPorts = 3
    this.rightPorts = 1
  }

  connectedCallback() {
    this.movementDelay = this.getAttribute('movement-delay')
    const relayConfig = {
      scale: 0.2,
      'port-scale-outer': 0.2
    }
    if (this.movementDelay) {
      relayConfig['movement-delay'] = this.movementDelay
    }
    if (this.isHorizontal) {
      this.width = 75
      this.height = 100
      this.setAttribute('left-ports', this.leftPorts)
      this.setAttribute('right-ports', this.rightPorts)
      super.connectedCallback()

      if (this.svg) {
        this.inverter1 = this.addComponent(
          'double-throw-relay',
          16,
          4,
          relayConfig
        )
        this.inverter2 = this.addComponent(
          'inverter-relay',
          16,
          36,
          relayConfig
        )
        this.inverter3 = this.addComponent(
          'inverter-relay',
          16,
          70,
          relayConfig
        )
        this.addWire(8, 24, 15, 16.5)
        this.addWire(58, 16.5, 58, 31)
        this.addWire(58, 31, 15, 31)
        this.addWire(15, 31, 15, 43)
        this.addWire(58, 47, 58, 61)
        this.addWire(58, 61, 15, 61)
        this.addWire(15, 61, 15, 77)
        this.addWire(8, 50, 15, 50)
        this.addWire(8, 75, 15, 84)
        this.addWire(58, 81, 67, 50)
      }
    } else {
      this.topPorts = 3
      this.bottomPorts = 1
      this.height = 75
      this.width = 100
      this.setAttribute('top-ports', this.topPorts)
      this.setAttribute('bottom-ports', this.bottomPorts)

      super.connectedCallback()

      if (this.svg) {
        this.inverter1 = this.addComponent(
          'double-throw-relay',
          4,
          16,
          relayConfig
        )
        this.inverter2 = this.addComponent(
          'inverter-relay',
          36,
          16,
          relayConfig
        )
        this.inverter3 = this.addComponent(
          'inverter-relay',
          70,
          16,
          relayConfig
        )
        this.addWire(24, 8, 16.5, 15)
        this.addWire(16.5, 58, 31, 58)
        this.addWire(31, 58, 31, 15)
        this.addWire(31, 15, 43, 15)
        this.addWire(47, 58, 61, 58)
        this.addWire(61, 58, 61, 15)
        this.addWire(61, 15, 77, 15)
        this.addWire(50, 8, 50, 15)
        this.addWire(75, 8, 84, 15)
        this.addWire(81, 58, 50, 67)
      }
    }
  }
}

window.customElements.define('nor-gate-three', NorGateThree)
