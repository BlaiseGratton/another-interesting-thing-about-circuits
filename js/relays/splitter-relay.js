import { SimpleRelay } from './simple-relay.js'

export class SplitterRelay extends SimpleRelay {
  constructor() {
    super()
    this.leftPorts = 1
    this.rightPorts = 2
  }

  get switch2OffsetX() {
    return this.isHorizontal ? 0 : 164
  }
  get switch2OffsetY() {
    return this.isHorizontal ? 164 : 0
  }
  // get magnetisedOffsetX() {
  //   return this.isHorizontal ? super.magnetisedOffsetX : -20
  // }

  connectedCallback() {
    if (this.isHorizontal) {
      this.height = 200
      super.connectedCallback()

      // shift existing components and add power to switch
      this.coilWire.y1 += 27
      this.coilWire.y2 += 27
      this.coil.y1 += 27
      this.coil.y2 += 27
      this.ground.y2 += 12
      this.ground.y1 += 27
      this.switchWire2.y2 += 12
      this.switch1Power = this.addWire(14, 26, 8, 37, 'power-source')

      // add second switch circuit
      this.switch2Power = this.addWire(12, 150, 12, 160, 'power-source')
      this.switch2Wire1 = this.addWire(12, 160, 60, 160)
      this.switch2Wire = this.addWire(
        60,
        160,
        this.unmagnetisedPositionX + this.switch2OffsetX,
        this.unmagnetisedPositionY + this.switch2OffsetY
      )
      this.switch2Wire2 = this.addWire(140, 160, 192, 134)
    } else {
      this.topPorts = 1
      this.bottomPorts = 2
      this.width = 200
      super.connectedCallback()

      // shift existing components and add power to switch
      this.coilWire.x1 += 27
      this.coilWire.x2 += 27
      this.coil.x1 += 27
      this.coil.x2 += 27
      this.ground.x2 += 12
      this.ground.x1 += 27
      this.switchWire2.x2 += 12
      this.switch1Power = this.addWire(16, 20, 37, 8, 'power-source')

      // add second switch circuit
      this.switch2Power = this.addWire(150, 12, 160, 12, 'power-source')
      this.switch2Wire1 = this.addWire(160, 12, 160, 60)
      this.switch2Wire = this.addWire(
        160,
        60,
        this.unmagnetisedPositionX + this.switch2OffsetX,
        this.unmagnetisedPositionY + this.switch2OffsetY
      )
      this.switch2Wire2 = this.addWire(160, 140, 134, 192)
    }
  }

  onVoltageGained() {
    super.onVoltageGained()
    const magnetisedOffsetX = this.isHorizontal
      ? this.magnetisedOffsetX
      : -this.magnetisedOffsetX
    const magnetisedOffsetY = this.isHorizontal
      ? this.magnetisedOffsetY
      : -this.magnetisedOffsetY
    if (!this.pendingVoltageGain2) {
      setTimeout(() => {
        this.switch2Wire.x2 =
          this.unmagnetisedPositionX + this.switch2OffsetX + magnetisedOffsetX
        this.switch2Wire.y2 =
          this.unmagnetisedPositionY + this.switch2OffsetY - magnetisedOffsetY
        this.pendingVoltageGain2 = false
      }, 100)
    }
    this.pendingVoltageGain2 = true
  }

  onVoltageLost() {
    super.onVoltageLost()
    const magnetisedOffsetX = this.isHorizontal
      ? this.magnetisedOffsetX
      : -this.magnetisedOffsetX
    const magnetisedOffsetY = this.isHorizontal
      ? this.magnetisedOffsetY
      : -this.magnetisedOffsetY
    if (!this.pendingVoltageLoss2) {
      const stepX = magnetisedOffsetX / 3
      const stepY = magnetisedOffsetY / 3
      const stepInterval = this.movementDelay / 3
      for (let i = 1; i < 4; i++) {
        setTimeout(() => {
          this.switch2Wire.x2 =
            this.unmagnetisedPositionX + this.switch2OffsetX + (3 - i) * stepX
          this.switch2Wire.y2 =
            this.unmagnetisedPositionY + this.switch2OffsetY - (3 - i) * stepY
        }, i * stepInterval)
      }
      setTimeout(() => {
        this.switch2Wire.x2 = this.unmagnetisedPositionX + this.switch2OffsetX
        this.switch2Wire.y2 = this.unmagnetisedPositionY + this.switch2OffsetY
        this.pendingVoltageLoss2 = false
      }, this.movementDelay)
    }
    this.pendingVoltageLoss2 = true
  }
}

window.customElements.define('splitter-relay', SplitterRelay)
