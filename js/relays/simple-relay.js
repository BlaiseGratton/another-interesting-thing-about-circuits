import { ComponentContainer } from '../component-container.js'

export class SimpleRelay extends ComponentContainer {
  get magnetisedOffsetX() {
    return this.isHorizontal ? 7 : 20
  }
  get magnetisedOffsetY() {
    return this.isHorizontal ? 20 : 7
  }
  get unmagnetisedPositionX() {
    return this.isHorizontal ? 133 : 16
  }
  get unmagnetisedPositionY() {
    return this.isHorizontal ? 16 : 133
  }

  get movementDelay() {
    return parseInt(this.getAttribute('movementdelay')) || 50
  }

  get isHorizontal() {
    return this.getAttribute('orientation') === 'horizontal'
  }

  constructor() {
    super()
    this.leftPorts = 2
    this.rightPorts = 1
  }

  connectedCallback() {
    if (this.isHorizontal) {
      if (!this.width) this.width = 200
      if (!this.height) this.height = 110
      this.setAttribute('leftports', this.leftPorts)
      this.setAttribute('rightports', this.rightPorts)
      super.connectedCallback()
      this.coil = this.addWire(105, 48, 105.2, 105, 'wire-coil')
      this.coilWire = this.addWire(8, 73, 105.2, 105)
      this.ground = this.addWire(105, 48, 175, 92, 'ground-connection')
      this.switchWire1 = this.addWire(8, 36, 60, 36)
      this.switchWire = this.addWire(
        60,
        36,
        this.unmagnetisedPositionX,
        this.unmagnetisedPositionY
      )
      this.switchWire2 = this.addWire(140, 36, 192, 55)
    } else {
      this.topPorts = 2
      this.bottomPorts = 1
      this.width = 110
      this.height = 200
      this.setAttribute('topports', this.topPorts)
      this.setAttribute('bottomports', this.bottomPorts)
      super.connectedCallback()
      this.coil = this.addWire(48, 105, 105, 105.2, 'wire-coil')
      this.coilWire = this.addWire(73, 8, 105, 105.2)
      this.ground = this.addWire(48, 105, 92, 175, 'ground-connection')
      this.leftSwitchWire = this.addWire(36, 8, 36, 60)
      this.switchWire = this.addWire(
        36,
        60,
        this.unmagnetisedPositionX,
        this.unmagnetisedPositionY
      )
      this.switchWire2 = this.addWire(36, 140, 55, 192)
    }

    this.coil.addEventListener('voltage-gained', () => {
      this.onVoltageGained()
    })
    this.coil.addEventListener('voltage-lost', () => this.onVoltageLost())
  }

  onVoltageGained() {
    if (!this.pendingVoltageGain) {
      setTimeout(() => {
        this.switchWire.x2 = this.unmagnetisedPositionX + this.magnetisedOffsetX
        this.switchWire.y2 = this.unmagnetisedPositionY + this.magnetisedOffsetY
        this.pendingVoltageGain = false
      }, 100)
    }
    this.pendingVoltageGain = true
  }

  onVoltageLost() {
    if (!this.pendingVoltageLoss) {
      const stepX = this.magnetisedOffsetX / 3
      const stepY = this.magnetisedOffsetY / 3
      const stepInterval = this.movementDelay / 3
      for (let i = 1; i < 4; i++) {
        setTimeout(() => {
          this.switchWire.x2 = this.unmagnetisedPositionX + (3 - i) * stepX
          this.switchWire.y2 = this.unmagnetisedPositionY + (3 - i) * stepY
        }, i * stepInterval)
      }
      setTimeout(() => {
        this.switchWire.x2 = this.unmagnetisedPositionX
        this.switchWire.y2 = this.unmagnetisedPositionY
        this.pendingVoltageLoss = false
      }, this.movementDelay)
    }
    this.pendingVoltageLoss = true
  }
}

window.customElements.define('simple-relay', SimpleRelay)
