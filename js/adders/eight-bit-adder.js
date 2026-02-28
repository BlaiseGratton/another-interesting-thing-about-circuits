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
    this.height = 75
    this.setAttribute('port-scale-inner', 0.5)
    this.setAttribute('left-ports', this.leftPorts)
    this.setAttribute('top-ports', this.topPorts)
    this.setAttribute('right-ports', this.rightPorts)
    this.setAttribute('bottom-ports', this.bottomPorts)
    super.connectedCallback()

    if (this.svg) {
      this.carryInWire1 = this.addWire(
        this.width - 4,
        this.height / 2,
        this.width - 4,
        this.height / 2 - 10 * this.scale
      )
      this.carryInWire2 = this.addWire(this.width - 4, 27, this.width - 25, 27)
      this.carryOutWire1 = this.addWire(
        27,
        this.height - 10,
        5,
        this.height - 10
      )
      this.carryOutWire2 = this.addWire(5, this.height - 10, 5, this.height / 2)
      const adderScale = 0.25
      const margin = 10
      const slotWidth = (this.width - margin * 2) / 8
      const slotMargin = (slotWidth - 145 * adderScale) / 2
      const topPortGap = this.width / (this.topPorts + 1)
      const bottomPortGap = this.width / (this.bottomPorts + 1)

      for (let i = 0; i < 8; i++) {
        const adderName = 'adder' + (i + 1)
        this[adderName] = this.addComponent(
          'full-adder',
          this.width - margin - slotWidth * (i + 1) + slotMargin,
          29,
          {
            scale: adderScale,
            'port-scale-outer': 0.2
          }
        )

        const aInputWireName = `adder${i + 1}AInput`
        this[aInputWireName] = this.addWire(
          this.width - topPortGap * (i + 1),
          4,
          this.width - margin - slotWidth * i - 24,
          27
        )

        const bInputWireName = `adder${i + 1}BInput`
        this[bInputWireName] = this.addWire(
          this.width - topPortGap * (8 + 1 + i),
          4,
          this.width - margin - slotWidth * i - 33,
          27
        )

        const outputWireName = `adder${i + 1}Output`
        this[outputWireName] = this.addWire(
          this.width - margin - slotWidth * i - 18,
          65,
          this.width - bottomPortGap * (i + 1),
          71
        )

        if (i < 7) {
          const carryWire1Name = `adder${i + 1}CarryWire1`
          this[carryWire1Name] = this.addWire(
            this.width - margin - slotWidth * i - 29.5,
            65,
            this.width - margin - slotWidth * (i + 1) + 1,
            65
          )

          const carryWire2Name = `adder${i + 1}CarryWire2`
          this[carryWire2Name] = this.addWire(
            this.width - margin - slotWidth * (i + 1) + 1,
            65,
            this.width - margin - slotWidth * (i + 1) + 1,
            27
          )

          const carryWire3Name = `adder${i + 1}CarryWire3`
          this[carryWire3Name] = this.addWire(
            this.width - margin - slotWidth * (i + 1) + 1,
            27,
            this.width - margin - slotWidth * (i + 1) - 14,
            27
          )
        }
      }
    }
  }
}

window.customElements.define('eight-bit-adder', EightBitAdder)
