import { ComponentContainer } from '../component-container.js'
import { createSVGElement } from '../svg.js'

export class BinaryToDecimalBank extends ComponentContainer {
  constructor() {
    super()
    this.topPorts = 8
    this.bottomPorts = 8
  }

  connectedCallback() {
    this.height = 40
    this.setAttribute('topPorts', this.topPorts)
    this.setAttribute('bottomPorts', this.bottomPorts)
    this.digitWires = []
    this.displayElements = []
    super.connectedCallback()

    if (this.svg) {
      this.slotWidth = this.width / (this.topPorts + 1)
      for (let i = 0; i < this.topPorts; i++) {
        const wire = document.createElement('wire-element')
        wire.x1 = this.slotWidth * (i + 1)
        wire.x2 = this.slotWidth * (i + 1)
        wire.y1 = 8
        wire.y2 = this.height - 8
        wire.value = 2 ** (7 - i)
        this.appendChild(wire)
        this.digitWires.push(wire)
        wire.addEventListener('voltage-changed', () =>
          this.handleVoltageChange()
        )

        const displayElement = createSVGElement('text')
        displayElement.setAttribute('x', wire.x1)
        displayElement.setAttribute('y', wire.y1)
        displayElement.classList.add('bit-display')
        this.svg.appendChild(displayElement)
        this.displayElements.push(displayElement)
      }

      const cx = (this.width / 2) * this.parentScale
      const cy = (this.height / 2) * this.parentScale
      const rect = createSVGElement('rect')
      rect.setAttribute('stroke', 'black')
      rect.setAttribute('fill', 'white')
      rect.setAttribute('x', cx / 2)
      rect.setAttribute('y', cy / 2)
      rect.setAttribute('width', cx)
      rect.setAttribute('height', cy)
      this.svg.appendChild(rect)

      const totalDisplay = createSVGElement('text')
      totalDisplay.classList.add('total-display')
      totalDisplay.setAttribute('x', cx - 10)
      totalDisplay.setAttribute('y', cy + 4)
      this.svg.appendChild(totalDisplay)
      this.total = totalDisplay
    }
  }

  handleVoltageChange() {
    const binaryRep = this.digitWires
      .map((w, index) => {
        const hasVoltage = Boolean(w.getAttribute('voltage'))
        this.displayElements[index].textContent = hasVoltage ? w.value : 0
        return hasVoltage ? '1' : '0'
      })
      .join('')
    const value = parseInt(binaryRep, 2)
    this.total.textContent = value
  }
}

window.customElements.define('binary-to-decimal-bank', BinaryToDecimalBank)
