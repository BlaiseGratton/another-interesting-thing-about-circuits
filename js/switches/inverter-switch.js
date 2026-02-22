import { SimpleRelay } from '../relays/simple-relay.js'

export class InverterSwitch extends SimpleRelay {
  get magnetisedOffsetX() {
    return this.isHorizontal ? -7 : 12
  }
  get magnetisedOffsetY() {
    return this.isHorizontal ? 12 : -3
  }
  get unmagnetisedPositionX() {
    return this.isHorizontal ? 140 : 36
  }
  get unmagnetisedPositionY() {
    return this.isHorizontal ? 36 : 140
  }
}

window.customElements.define('inverter-switch', InverterSwitch)
