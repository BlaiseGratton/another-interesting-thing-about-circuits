import { ComponentContainer } from './Container.js'

export class Switch extends ComponentContainer {
  get unmagnetisedOffsetX() {
    return -7
  }
  get unmagnetisedOffsetY() {
    return -20
  }
  get magnetisedPositionX() {
    return 140
  }
  get magnetisedPositionY() {
    return 48
  }

  constructor() {
    super()
  }

  connectedCallback() {
    this.width = 200
    this.height = 125
    this.setAttribute('leftports', 2)
    this.setAttribute('rightports', 1)
    super.connectedCallback()
    const coil = document.createElement('wire-coil')
    coil.x1 = 60
    coil.y1 = 93
    coil.x2 = 140
    coil.y2 = 92.9
    this.appendChild(coil)
    this.coil = coil
    const coilWire1 = document.createElement('wire-element')
    coilWire1.x1 = 8
    coilWire1.y1 = 83
    coilWire1.x2 = 60
    coilWire1.y2 = 93
    this.appendChild(coilWire1)
    const ground = document.createElement('ground-connection')
    ground.x1 = 175
    ground.y1 = 108
    ground.x2 = 140
    ground.y2 = 93
    this.appendChild(ground)
    const switchWire1 = document.createElement('wire-element')
    switchWire1.x1 = 8
    switchWire1.y1 = 42
    switchWire1.x2 = 60
    switchWire1.y2 = 48
    this.appendChild(switchWire1)
    const switchWire2 = document.createElement('wire-element')
    switchWire2.x1 = 60
    switchWire2.y1 = 48
    switchWire2.x2 = this.magnetisedPositionX + this.unmagnetisedOffsetX
    switchWire2.y2 = this.magnetisedPositionY + this.unmagnetisedOffsetY
    this.appendChild(switchWire2)
    this.switchWire = switchWire2
    const switchWire3 = document.createElement('wire-element')
    switchWire3.x1 = 140
    switchWire3.y1 = 48
    switchWire3.x2 = 192
    switchWire3.y2 = 62
    this.appendChild(switchWire3)

    this.coil.addEventListener('voltage-gained', () => {
      this.onVoltageGained()
    })
    this.coil.addEventListener('voltage-lost', () => this.onVoltageLost())
  }

  onVoltageGained() {
    this.switchWire.x2 -= this.unmagnetisedOffsetX
    this.switchWire.y2 -= this.unmagnetisedOffsetY
  }

  onVoltageLost() {
    this.switchWire.x2 += this.unmagnetisedOffsetX
    this.switchWire.y2 += this.unmagnetisedOffsetY
  }
}

window.customElements.define('switch-element', Switch)
