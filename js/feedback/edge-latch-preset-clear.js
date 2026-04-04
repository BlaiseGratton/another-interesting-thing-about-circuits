import { ComponentContainer } from '../component-container.js'

export class EdgeTriggeredLatchWithPresetClear extends ComponentContainer {
  constructor() {
    super()
    this.topPorts = 2
    this.rightPorts = 1
    this.leftPorts = 1
    this.bottomPorts = 2
  }

  connectedCallback() {
    this.width = 200
    this.height = 100
    this.setAttribute('port-scale-inner', 0.2)
    this.setAttribute('top-ports', this.topPorts)
    this.setAttribute('bottom-ports', this.bottomPorts)
    this.setAttribute('left-ports', this.leftPorts)
    this.setAttribute('right-ports', this.rightPorts)
    this.movementDelay = this.getAttribute('movement-delay')
    super.connectedCallback()

    if (this.svg) {
      const tempPower = this.addWire(110, 64, 138, 63, 'power-source')
      tempPower.setAttribute('scale', 0.1)
      this.initializeFunction = () => {
        setTimeout(() => {
          tempPower.destroy()
        }, 1000)
      }
      this.addComponent('double-throw-relay', 80, 4, {
        scale: 0.1,
        'port-scale-outer': 0.2,
        'movement-delay': this.movementDelay
      })
      this.addComponent('nor-gate-three', 20, 33, {
        scale: 0.3,
        'port-scale-outer': 0.2,
        'movement-delay': this.movementDelay
      })
      this.addComponent('nor-gate-three', 60, 33, {
        scale: 0.3,
        'port-scale-outer': 0.2,
        'movement-delay': this.movementDelay
      })
      this.addComponent('nor-gate-three', 110, 33, {
        scale: 0.3,
        'port-scale-outer': 0.2,
        'movement-delay': this.movementDelay
      })
      this.addComponent('nor-gate-three', 150, 33, {
        scale: 0.3,
        'port-scale-outer': 0.2,
        'movement-delay': this.movementDelay
      })

      const flipFlopAttrs = {
        scale: 0.3,
        'port-scale-outer': 0.2
      }
      if (this.movementDelay) {
        flipFlopAttrs['movement-delay'] = this.movementDelay
      }
      this.addComponent('nor-gate-three', 40, 65, flipFlopAttrs)
      this.addComponent('nor-gate-three', 130, 65, flipFlopAttrs)

      //data in
      this.addWire(133, 2, 35, 5)
      this.addWire(35, 5, 28, 31)
      // clock in
      this.addWire(66.5, 2, 86, 2)
      // inverter out
      this.addWire(86, 26, 75, 31)
      this.addWire(86, 26, 117.5, 31)
      // preset in
      this.addWire(2, 50, 10, 25)
      this.addWire(10, 25, 35, 31)
      this.addWire(10, 25, 125, 31)
      this.addWire(10, 25, 20, 60)
      this.addWire(20, 60, 55, 63.5)
      // clear in
      this.addWire(198, 50, 190, 32)
      this.addWire(190, 32, 173, 31)
      this.addWire(198, 50, 190, 60)
      this.addWire(190, 60, 153, 63)
      // 1 to 2 and 4
      this.addWire(35, 57, 51, 55)
      this.addWire(51, 55, 60, 28)
      this.addWire(60, 28, 67.5, 31)
      this.addWire(60, 28, 165, 31)
      // 2 to 1 and 5
      this.addWire(75, 57, 58, 55)
      this.addWire(58, 55, 50, 30)
      this.addWire(50, 30, 43, 31)
      this.addWire(75, 57, 47.5, 63)
      // 3 to 2, 6, and 4
      this.addWire(125, 57, 100, 55)
      this.addWire(100, 55, 95, 32)
      this.addWire(95, 32, 83, 31)
      this.addWire(125, 57, 145, 63)
      this.addWire(125, 57, 142, 56)
      this.addWire(142, 56, 148, 32)
      this.addWire(148, 32, 157, 31)
      // 4 to 3
      this.addWire(165, 57, 149, 56)
      this.addWire(149, 56, 141, 32)
      this.addWire(141, 32, 132.5, 31)
      // 5 to 6 and Q bar out
      this.addWire(55, 89, 90, 89)
      this.addWire(90, 89, 110, 64)
      this.addWire(110, 64, 138, 63)
      this.addWire(55, 89, 66.5, 98)
      // 6 to 5 and Q out
      this.addWire(145, 89, 110, 89)
      this.addWire(110, 89, 90, 64)
      this.addWire(90, 64, 62, 63)
      this.addWire(145, 89, 133, 98)
    }
  }
}

window.customElements.define(
  'edge-latch-preset-clear',
  EdgeTriggeredLatchWithPresetClear
)
