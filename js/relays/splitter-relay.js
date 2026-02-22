import { SimpleRelay } from './simple-relay.js'

export class SplitterRelay extends SimpleRelay {
  constructor() {
    super()
    this.leftPorts = 1
    this.rightPorts = 2
  }

  get switch2OffsetX() {
    return 0
  }
  get switch2OffsetY() {
    return 164
  }

  connectedCallback() {
    this.height = 200
    super.connectedCallback()

    // shift existing components and add power to switch
    this.coilWire.y1 += 27
    this.coilWire.y2 += 12
    this.coil.y1 += 12
    this.coil.y2 += 12
    this.ground.y2 += 12
    this.ground.y1 += 12
    this.switchWire2.y2 += 12
    this.switch1Power = this.addWire(12, 26, 8, 37, 'power-source')

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
  }

  onVoltageGained() {
    super.onVoltageGained()
    if (!this.pendingVoltageGain2) {
      setTimeout(() => {
        this.switch2Wire.x2 =
          this.unmagnetisedPositionX +
          this.switch2OffsetX +
          this.magnetisedOffsetX
        this.switch2Wire.y2 =
          this.unmagnetisedPositionY +
          this.switch2OffsetY -
          this.magnetisedOffsetY
        this.pendingVoltageGain2 = false
      }, 100)
    }
    this.pendingVoltageGain2 = true
  }

  onVoltageLost() {
    super.onVoltageLost()
    if (!this.pendingVoltageLoss2) {
      const stepX = this.magnetisedOffsetX / 3
      const stepY = this.magnetisedOffsetY / 3
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
