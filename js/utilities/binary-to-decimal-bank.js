import { ComponentContainer } from '../component-container.js'
import { createSVGElement } from '../svg.js'

export class BinaryToDecimalBank extends ComponentContainer {
  constructor() {
    super()
    this.topPorts = 8
    this.bottomPorts = 8
    this.leftPorts = 1
  }

  connectedCallback() {
    this.height = 40
    this.setAttribute('topPorts', this.topPorts)
    this.setAttribute('bottomPorts', this.bottomPorts)
    this.setAttribute('leftports', this.leftPorts)
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
        displayElement.setAttribute('x', wire.x1 * this.parentScale)
        displayElement.setAttribute('y', wire.y1 * this.parentScale)
        displayElement.classList.add('bit-display')
        displayElement.style.fontSize = `${8 * this.parentScale}px`
        displayElement.wire = wire
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
      this.displayBox = rect

      const totalDisplay = createSVGElement('text')
      totalDisplay.classList.add('total-display')
      totalDisplay.setAttribute('x', cx - 10)
      totalDisplay.setAttribute('y', cy + 4)
      this.svg.appendChild(totalDisplay)
      this.totalDisplay = totalDisplay

      const signedUnsignedSignal = document.createElement('ground-connection')
      signedUnsignedSignal.setAttribute('scale', 0.5)
      signedUnsignedSignal.x1 = 14
      signedUnsignedSignal.y1 = this.height - 8
      signedUnsignedSignal.x2 = 8
      signedUnsignedSignal.y2 = this.height / 2
      signedUnsignedSignal.value = 1
      this.appendChild(signedUnsignedSignal)
      this.signedUnsignedSignal = signedUnsignedSignal
      signedUnsignedSignal.addEventListener('voltage-changed', (event) => {
        this.signed = event.target.hasVoltage
        this.handleVoltageChange()
      })
    }
  }

  handleScaleChange(oldVal, newVal) {
    super.handleScaleChange(oldVal, newVal)
    this.displayElements.forEach((el) => {
      el.style.fontSize = `${8 * this.parentScale}px`
      el.setAttribute('x', el.wire.x1 * this.parentScale)
      el.setAttribute('y', el.wire.y1 * this.parentScale)
    })

    this.totalDisplay.style.fontSize = `${14 * this.parentScale}px`

    const cx = (this.width / 2) * this.parentScale
    const cy = (this.height / 2) * this.parentScale
    this.displayBox.setAttribute('x', cx / 2)
    this.displayBox.setAttribute('y', cy / 2)
    this.displayBox.setAttribute('width', cx)
    this.displayBox.setAttribute('height', cy)
    this.totalDisplay.setAttribute('x', cx - 10 * this.parentScale)
    this.totalDisplay.setAttribute('y', cy + 4 * this.parentScale)
  }

  handleVoltageChange() {
    const binaryRep = this.digitWires
      .map((w, index) => {
        this.displayElements[index].textContent = w.hasVoltage ? w.value : 0
        return w.hasVoltage ? '1' : '0'
      })
      .join('')
    let value
    if (this.signed) {
      if (binaryRep[0] === '1') {
        value = parseInt(binaryRep.slice(1), 2) - 128
      } else {
        value = parseInt(binaryRep, 2)
      }
    } else {
      value = parseInt(binaryRep, 2)
    }
    this.totalDisplay.textContent = value
  }
}

window.customElements.define('binary-to-decimal-bank', BinaryToDecimalBank)
