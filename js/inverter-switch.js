import { Switch } from './switch-element.js'

export class InverterSwitch extends Switch {
  get magnetisedOffsetX() {
    return -7
  }
  get unmagnetisedPositionX() {
    return 140
  }
  get unmagnetisedPositionY() {
    return 48
  }
}

window.customElements.define('inverter-switch', InverterSwitch)
