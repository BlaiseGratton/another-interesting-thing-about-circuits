import { ComponentContainer } from './component-container.js'

export class Switch extends ComponentContainer {
  get magnetisedOffsetX() {
    return 7
  }
  get magnetisedOffsetY() {
    return 20
  }
  get unmagnetisedPositionX() {
    return 133
  }
  get unmagnetisedPositionY() {
    return 28
  }

  get movementDelay() {
    return parseInt(this.getAttribute('movementdelay')) || 50
  }

  constructor() {
    super()
    this.leftPorts = 2
    this.rightPorts = 1
    this.width = 200
    this.height = 125
  }

  connectedCallback() {
    this.setAttribute('leftports', this.leftPorts)
    this.setAttribute('rightports', this.rightPorts)
    super.connectedCallback()
    const coil = document.createElement('wire-coil')
    coil.x1 = 60
    coil.y1 = 93
    coil.x2 = 140
    coil.y2 = 92.9
    this.appendChild(coil)
    this.coil = coil
    const leftCoilWire = document.createElement('wire-element')
    leftCoilWire.x1 = 8
    leftCoilWire.y1 = 83
    leftCoilWire.x2 = 60
    leftCoilWire.y2 = 93
    this.appendChild(leftCoilWire)
    this.leftCoilWire = leftCoilWire
    const ground = document.createElement('ground-connection')
    ground.x1 = 175
    ground.y1 = 108
    ground.x2 = 140
    ground.y2 = 93
    this.appendChild(ground)
    this.ground = ground
    const leftSwitchWire = document.createElement('wire-element')
    leftSwitchWire.x1 = 8
    leftSwitchWire.y1 = 42
    leftSwitchWire.x2 = 60
    leftSwitchWire.y2 = 48
    this.appendChild(leftSwitchWire)
    this.leftSwitchWire = leftSwitchWire
    const switchWire = document.createElement('wire-element')
    switchWire.x1 = 60
    switchWire.y1 = 48
    switchWire.x2 = this.unmagnetisedPositionX
    switchWire.y2 = this.unmagnetisedPositionY
    this.appendChild(switchWire)
    this.switchWire = switchWire
    const rightSwitchWire = document.createElement('wire-element')
    rightSwitchWire.x1 = 140
    rightSwitchWire.y1 = 48
    rightSwitchWire.x2 = 192
    rightSwitchWire.y2 = 62
    this.appendChild(rightSwitchWire)
    this.rightSwitchWire = rightSwitchWire

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

window.customElements.define('switch-element', Switch)
