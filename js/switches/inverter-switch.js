import { SimpleRelay } from '../relays/simple-relay.js'

export class InverterSwitch extends SimpleRelay {
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
