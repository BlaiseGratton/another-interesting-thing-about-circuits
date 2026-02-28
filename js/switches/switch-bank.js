import { ComponentContainer } from '../component-container.js'

export class SwitchBank extends ComponentContainer {
  connectedCallback() {
    this.height = 50
    this.width = parseInt(this.getAttribute('width') || 400)
    this.setAttribute('port-scale-inner', 0.2)
    this.bottomPorts = parseInt(this.getAttribute('count') || 8)
    this.setAttribute('bottom-ports', this.bottomPorts)
    super.connectedCallback()

    if (this.svg) {
      const slotWidth = this.width / (this.bottomPorts + 1)
      for (let i = 0; i < this.bottomPorts; i++) {
        this[`switch${i}`] = this.addComponent(
          'simple-switch',
          this.width - slotWidth * (i + 1) - 18.5,
          2,
          { scale: 0.75 }
        )
      }
    }
  }
}

window.customElements.define('switch-bank', SwitchBank)
