import { ComponentContainer } from '../component-container.js'

export class EightBitAdder extends ComponentContainer {
  constructor() {
    super()
    this.topPorts = 16
    this.bottomPorts = 8
    this.rightPorts = 1
    this.leftPorts = 1
  }

  connectedCallback() {
    this.width = 400
    this.height = 125
    this.setAttribute('leftports', this.leftPorts)
    this.setAttribute('topports', this.topPorts)
    this.setAttribute('rightports', this.rightPorts)
    this.setAttribute('bottomports', this.bottomPorts)
    super.connectedCallback()

    if (this.svg) {
      const carryInWire1 = document.createElement('wire-element')
      carryInWire1.x1 = this.width - 9
      carryInWire1.y1 = this.height / 2
      carryInWire1.x2 = this.width - 9
      carryInWire1.y2 = (this.height / 2) * 0.44
      this.appendChild(carryInWire1)

      const carryInWire2 = document.createElement('wire-element')
      carryInWire2.x1 = this.width - 9
      carryInWire2.y1 = 27
      carryInWire2.x2 = this.width - 25
      carryInWire2.y2 = 27
      this.appendChild(carryInWire2)

      const carryOutWire1 = document.createElement('wire-element')
      carryOutWire1.x1 = 28
      carryOutWire1.y1 = this.height - 32
      carryOutWire1.x2 = 8
      carryOutWire1.y2 = this.height - 32
      this.appendChild(carryOutWire1)

      const carryOutWire2 = document.createElement('wire-element')
      carryOutWire2.x1 = 8
      carryOutWire2.y1 = this.height - 32
      carryOutWire2.x2 = 8
      carryOutWire2.y2 = this.height / 2
      this.appendChild(carryOutWire2)

      for (let i = 0; i < 8; i++) {
        const adderName = 'adder' + (i + 1)
        const adder = document.createElement('full-adder')
        const adderScale = 0.25
        adder.setAttribute('scale', adderScale)
        const margin = 10
        const slotWidth = (this.width - margin * 2) / 8
        const slotMargin = (slotWidth - 145 * adderScale) / 2
        adder.x = this.width - margin - slotWidth * (i + 1) + slotMargin
        adder.y = 35
        this.appendChild(adder)
        this[adderName] = adder

        const topPortGap = this.width / (this.topPorts + 1)
        const bottomPortGap = this.width / (this.bottomPorts + 1)
        const aInputWireName = `adder${i + 1}AInput`
        const aInputWire = document.createElement('wire-element')
        aInputWire.x1 = this.width - topPortGap * (i + 1)
        aInputWire.y1 = 8
        aInputWire.x2 = this.width - margin - slotWidth * i - 24
        aInputWire.y2 = 27
        this.appendChild(aInputWire)
        this[aInputWireName] = aInputWire

        const bInputWireName = `adder${i + 1}BInput`
        const bInputWire = document.createElement('wire-element')
        bInputWire.x1 = this.width - topPortGap * (8 + 1 + i)
        bInputWire.y1 = 8
        bInputWire.x2 = this.width - margin - slotWidth * i - 33
        bInputWire.y2 = 27
        this.appendChild(bInputWire)
        this[bInputWireName] = bInputWire

        const outputWireName = `adder${i + 1}Output`
        const outputWire = document.createElement('wire-element')
        outputWire.x1 = this.width - margin - slotWidth * i - 18
        outputWire.y1 = 93
        outputWire.x2 = this.width - bottomPortGap * (i + 1)
        outputWire.y2 = 117
        this.appendChild(outputWire)
        this[outputWireName] = outputWire

        if (i < 7) {
          const carryWire1Name = `adder${i + 1}CarryWire1`
          const carryWire1 = document.createElement('wire-element')
          carryWire1.x1 = this.width - margin - slotWidth * i - 29.5
          carryWire1.y1 = 93
          carryWire1.x2 = this.width - margin - slotWidth * (i + 1) + 1
          carryWire1.y2 = 93
          this.appendChild(carryWire1)
          this[carryWire1Name] = carryWire1

          const carryWire2Name = `adder${i + 1}CarryWire2`
          const carryWire2 = document.createElement('wire-element')
          carryWire2.x1 = this.width - margin - slotWidth * (i + 1) + 1
          carryWire2.y1 = 93
          carryWire2.x2 = this.width - margin - slotWidth * (i + 1) + 1
          carryWire2.y2 = 27
          this.appendChild(carryWire2)
          this[carryWire2Name] = carryWire2

          const carryWire3Name = `adder${i + 1}CarryWire3`
          const carryWire3 = document.createElement('wire-element')
          carryWire3.x1 = this.width - margin - slotWidth * (i + 1) + 1
          carryWire3.y1 = 27
          carryWire3.x2 = this.width - margin - slotWidth * (i + 1) - 14
          carryWire3.y2 = 27
          this.appendChild(carryWire3)
          this[carryWire3Name] = carryWire3
        }
      }
    }
  }
}

window.customElements.define('eight-bit-adder', EightBitAdder)
