import { createSVGElement } from './svg.js'
import { Wire } from './wire-element.js'

export class WireCoil extends Wire {
  constructor() {
    super()
    this.paths = []
  }

  connectedCallback() {
    super.connectedCallback()
  }

  changeColor(color) {
    super.changeColor(color)
    for (const path of this.paths) {
      path.setAttribute('stroke', color)
    }
  }

  handleVoltageChange(oldVal, newVal) {
    super.handleVoltageChange(oldVal, newVal)
    if (this.hasVoltage) {
      setTimeout(() => {
        this.dispatchEvent(
          new CustomEvent('voltage-gained', {
            bubbles: true,
            cancelable: true,
            detail: null
          })
        )
      }, 10)
    } else {
      setTimeout(() => {
        this.dispatchEvent(
          new CustomEvent('voltage-lost', { bubbles: true, cancelable: false })
        )
      }, 10)
    }
  }

  handleDraw(attribute, value) {
    super.handleDraw(attribute, value)
    this.paths.forEach((path) => path.remove())
    const cycles = 6
    const x1 = this.x1 * this.parentScale
    const y1 = this.y1 * this.parentScale
    const x2 = this.x2 * this.parentScale
    const y2 = this.y2 * this.parentScale
    const xDistance = x2 - x1
    const yDistance = y2 - y1
    const cycleXDistance = xDistance / cycles
    const cycleYDistance = yDistance / cycles
    let lastXStart = x1
    let lastYStart = y1
    const angle = Math.tan(yDistance / xDistance)
    const slope = yDistance / xDistance
    const yIntercept = y1 - slope * x1
    const oppositeSlope = -(xDistance / yDistance)
    const hypotenuse = Math.sqrt(cycleXDistance ** 2 + cycleYDistance ** 2)

    const pole1Base = hypotenuse / 2
    const pole1X = Math.cos(angle) * pole1Base
    const pole1Y = Math.sin(angle) * pole1Base
    const pole1YIntercept = pole1Y - oppositeSlope * pole1X
    const pole1XIntercept = -pole1YIntercept / oppositeSlope
    const pole1AxisDistanceX = pole1X - pole1XIntercept
    const pole1AxisDistanceY = pole1Y - pole1YIntercept
    const pole1AxisDistance = Math.sqrt(
      pole1AxisDistanceX ** 2 + pole1AxisDistanceY ** 2
    )
    const pole1Ratio = (30 / pole1AxisDistance) * this.parentScale
    const pole1XDistance = pole1AxisDistanceX * pole1Ratio
    const pole1YDistance = pole1AxisDistanceY * pole1Ratio

    const pole2Base = hypotenuse - pole1Base
    const pole2X = Math.cos(angle) * pole2Base
    const pole2Y = Math.sin(angle) * pole2Base
    const pole2YIntercept = pole2Y - oppositeSlope * pole2X
    const pole2XIntercept = -pole2YIntercept / oppositeSlope
    const pole2AxisDistanceX = pole2X - pole2XIntercept
    const pole2AxisDistanceY = pole2Y - pole2YIntercept
    const pole2AxisDistance = Math.sqrt(
      pole2AxisDistanceX ** 2 + pole2AxisDistanceY ** 2
    )
    const pole2Ratio = (-50 / pole2AxisDistance) * this.parentScale
    const pole2XDistance = pole2AxisDistanceX * pole2Ratio
    const pole2YDistance = pole2AxisDistanceY * pole2Ratio
    const paths = []

    while (paths.length < cycles) {
      const path = createSVGElement('path')
      path.setAttribute('stroke-width', this.parentScale)
      const xEnd = lastXStart + cycleXDistance
      const yEnd = lastYStart + cycleYDistance
      path.setAttribute(
        'd',
        `M${lastXStart},${lastYStart} c${pole1XDistance},${pole1YDistance} ${pole2XDistance},${pole2YDistance} ${cycleXDistance},${cycleYDistance}`
      )
      lastXStart = xEnd
      lastYStart = yEnd
      paths.push(path)
    }

    this.paths = paths

    for (const path of paths) {
      this.svg.append(path)
      path.setAttribute('stroke', 'grey')
      path.setAttribute('fill', 'none')
    }
  }
}

window.customElements.define('wire-coil', WireCoil)
