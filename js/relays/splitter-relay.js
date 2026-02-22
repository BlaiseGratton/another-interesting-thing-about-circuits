import { SimpleRelay } from './simple-relay.js'

export class SplitterRelay extends SimpleRelay {
  constructor() {
    super()
    this.leftPorts = 1
    this.rightPorts = 2
    this.height = 200
  }

  get switch2OffsetX() {
    return 0
  }
  get switch2OffsetY() {
    return 152
  }

  connectedCallback() {
    super.connectedCallback()

    // shift existing components
    this.leftCoilWire.y1 += 17
    this.leftCoilWire.y2 += 5
    this.coil.y1 += 5
    this.coil.y2 += 5
    this.ground.y2 += 5
    this.rightSwitchWire.y2 += 5
    const switch1Power = document.createElement('power-source')
    switch1Power.x1 = 12
    switch1Power.y1 = 26
    switch1Power.x2 = 8
    switch1Power.y2 = 41
    this.appendChild(switch1Power)
    this.switch1Power = switch1Power

    this.switchWire.setAttribute('id', 'show')

    // add second switch circuit
    const switch2Power = document.createElement('power-source')
    switch2Power.x1 = 12
    switch2Power.y1 = 150
    switch2Power.x2 = 12
    switch2Power.y2 = 160
    this.appendChild(switch2Power)
    this.switch2Power = switch2Power
    const leftSwitchWire2 = document.createElement('wire-element')
    leftSwitchWire2.x1 = 12
    leftSwitchWire2.y1 = 160
    leftSwitchWire2.x2 = 60
    leftSwitchWire2.y2 = 160
    this.appendChild(leftSwitchWire2)
    this.leftSwitchWire2 = leftSwitchWire2
    const switchWire2 = document.createElement('wire-element')
    switchWire2.x1 = 60
    switchWire2.y1 = 160
    switchWire2.x2 = this.unmagnetisedPositionX + this.switch2OffsetX
    switchWire2.y2 = this.unmagnetisedPositionY + this.switch2OffsetY
    this.appendChild(switchWire2)
    this.switchWire2 = switchWire2
    const leftSwitchWire3 = document.createElement('wire-element')
    leftSwitchWire3.x1 = 140
    leftSwitchWire3.y1 = 160
    leftSwitchWire3.x2 = 192
    leftSwitchWire3.y2 = 134
    this.appendChild(leftSwitchWire3)
    this.leftSwitchWire3 = leftSwitchWire3
  }

  onVoltageGained() {
    super.onVoltageGained()
    if (!this.pendingVoltageGain2) {
      setTimeout(() => {
        this.switchWire2.x2 =
          this.unmagnetisedPositionX +
          this.switch2OffsetX +
          this.magnetisedOffsetX
        this.switchWire2.y2 =
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
          this.switchWire2.x2 =
            this.unmagnetisedPositionX + this.switch2OffsetX + (3 - i) * stepX
          this.switchWire2.y2 =
            this.unmagnetisedPositionY + this.switch2OffsetY - (3 - i) * stepY
        }, i * stepInterval)
      }
      setTimeout(() => {
        this.switchWire2.x2 = this.unmagnetisedPositionX + this.switch2OffsetX
        this.switchWire2.y2 = this.unmagnetisedPositionY + this.switch2OffsetY
        this.pendingVoltageLoss2 = false
      }, this.movementDelay)
    }
    this.pendingVoltageLoss2 = true
  }
}

window.customElements.define('splitter-relay', SplitterRelay)
