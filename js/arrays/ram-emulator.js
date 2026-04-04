import { ComponentContainer } from '../component-container.js'
import { createSVGElement } from '../svg.js'

export class RamEmulator extends ComponentContainer {
  constructor() {
    super()
    this.array = []
    this.bankHeight = 6
    this.addressSelectors = []
    this.dataInputs = []
    this.dataOutputs = []
  }

  connectedCallback() {
    this.bits = parseInt(this.getAttribute('bits') || 8)
    this.addressInputs = parseInt(this.getAttribute('address-inputs') || 8)
    this.addressCount = 2 ** this.addressInputs
    this.bankCount = Math.ceil(this.addressCount / 256)
    this.bankWidth = 40

    for (let i = 0; i < this.addressCount; i++) {
      this.array.push({
        value: '',
        element: null
      })
    }

    this.topPorts = this.addressInputs + 1
    this.leftPorts = this.bits
    this.rightPorts = this.bits
    this.topMargin = 14
    this.leftMargin = 7
    this.setAttribute('top-ports', this.topPorts)
    this.setAttribute('left-ports', this.leftPorts)
    this.setAttribute('right-ports', this.rightPorts)
    this.setAttribute('port-scale-inner', 0.5)
    this.width = this.bankWidth * this.bankCount
    this.height =
      this.addressCount > 256
        ? this.bankHeight * 256 + this.topMargin
        : this.bankHeight * this.addressCount + this.topMargin
    super.connectedCallback()

    if (this.svg) {
      this.array.forEach((address, index) => {
        const text = createSVGElement('text')
        text.textContent = address.value
        const bankIndex = Math.floor(index / 256)
        const indexWithinBank = index - bankIndex * 256
        text.setAttribute(
          'x',
          (this.bankWidth * bankIndex + this.leftMargin + 1) *
            this.scale *
            this.parentScale
        )
        text.setAttribute(
          'y',
          (this.bankHeight * indexWithinBank + this.topMargin) *
            this.scale *
            this.parentScale
        )
        text.style.fontSize = `${6 * this.scale * this.parentScale}px`
        this.svg.appendChild(text)
        address.element = text
        text.addEventListener('mouseenter', (event) => {
          const title = createSVGElement('title')
          title.textContent = parseInt(event.target.textContent, 2)
          event.target.appendChild(title)
        })
        text.addEventListener('mouseleave', (event) => {
          event.target.querySelectorAll('title').forEach((el) => el.remove())
        })
      })

      const selector = createSVGElement('rect')
      selector.setAttribute('stroke', 'green')
      selector.setAttribute('fill', 'none')
      selector.setAttribute(
        'width',
        (this.bankWidth - this.leftMargin * 2) * this.scale * this.parentScale
      )
      selector.setAttribute(
        'height',
        this.bankHeight * this.scale * this.parentScale
      )
      selector.setAttribute(
        'x',
        this.leftMargin * this.scale * this.parentScale
      )
      this.svg.appendChild(selector)
      this.selector = selector

      const addressSpacing = this.width / (this.addressInputs + 2)
      const dataSpacing = this.height / (this.bits + 1)

      const writeInput = this.addWire(
        addressSpacing,
        3,
        addressSpacing,
        5,
        'ground-connection'
      )
      writeInput.setAttribute('scale', 0.1)
      writeInput.value = true
      writeInput.addEventListener('voltage-changed', (event) => {
        this.handleWriteSignal(event)
      })

      for (let i = 0; i < this.addressInputs; i++) {
        const selector = this.addWire(
          this.width - addressSpacing * (i + 1),
          3,
          this.width - addressSpacing * (i + 1),
          6,
          'ground-connection'
        )
        selector.setAttribute('scale', 0.1)
        this.addressSelectors.unshift(selector)
        selector.value = true
        selector.addEventListener('voltage-changed', () => {
          this.select()
        })
      }

      for (let i = 0; i < this.bits; i++) {
        const dataInput = this.addWire(
          4,
          dataSpacing * (i + 1),
          4,
          dataSpacing * (i + 1) + 10,
          'ground-connection'
        )
        dataInput.setAttribute('scale', 0.1)
        this.dataInputs.unshift(dataInput)
        dataInput.value = true
        dataInput.addEventListener('voltage-changed', () => {
          this.setInput()
        })

        const dataOutput = this.addComponent(
          'simple-switch',
          this.width - 7,
          dataSpacing * (i + 1) - 13,
          {
            scale: 0.1
          }
        )

        this.dataOutputs.unshift(dataOutput)
      }

      this.select()
    }
  }

  select() {
    const index = parseInt(
      this.addressSelectors.map((r) => (r.hasVoltage ? '1' : '0')).join(''),
      2
    )
    const bankIndex = Math.floor(index / 256)
    const indexWithinBank = index - bankIndex * 256

    this.selector.setAttribute(
      'y',
      (this.bankHeight * indexWithinBank +
        this.topMargin -
        this.bankHeight +
        1) *
        this.scale *
        this.parentScale
    )
    this.selector.setAttribute(
      'x',
      (this.bankWidth * bankIndex + this.leftMargin) *
        this.scale *
        this.parentScale
    )

    this.index = index
    this.setOutput()
  }

  setInput() {
    this.input = this.dataInputs.map((i) => (i.hasVoltage ? '1' : '0')).join('')
  }

  setOutput() {
    const value = this.array[this.index].value

    if (!value) {
      this.dataOutputs.forEach((otp) => {
        otp.on = false
        otp.updateComponents()
      })
    } else {
      this.dataOutputs.map((output, index) => {
        output.on = value[index] === '1'
        output.updateComponents()
      })
    }
  }

  handleWriteSignal(event) {
    if (event.target.hasVoltage) {
      const bank = this.array[this.index]
      bank.value = this.input
      bank.element.textContent = this.input
      this.select()
    }
  }
}

window.customElements.define('ram-emulator', RamEmulator)
