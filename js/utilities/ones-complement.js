import { ComponentContainer } from '../component-container.js'

export class OnesComplement extends ComponentContainer {
  constructor() {
    super()
  }

  connectedCallback() {
    this.width = this.getAttribute('width') || 211.5
    this.height = 50
    this.topPorts = this.getAttribute('topports') || 8
    this.bottomPorts = this.getAttribute('bottomports') || 8
    this.leftPorts = 1
    this.setAttribute('topports', this.topPorts)
    this.setAttribute('bottomports', this.bottomPorts)
    this.setAttribute('leftports', this.leftPorts)
    super.connectedCallback()

    if (this.svg) {
      if (this.bottomPorts) {
        const slot = this.width / 9

        const invertWire = document.createElement('wire-element')
        invertWire.x1 = 8
        invertWire.y1 = this.height / 2
        invertWire.x2 = 11
        invertWire.y2 = 35
        this.appendChild(invertWire)

        for (let i = 0; i < this.topPorts; i++) {
          const xorGate = document.createElement('xor-gate')
          xorGate.setAttribute('portscaleouter', 0.05)
          xorGate.setAttribute('scale', 0.13)
          xorGate.x = slot * i + 16 * this.scale
          xorGate.y = 20
          this.appendChild(xorGate)

          const invertWire = document.createElement('wire-element')
          invertWire.x1 = slot * i + 10 * this.scale
          invertWire.y1 = 35
          invertWire.x2 = slot * i + 14 * this.scale
          invertWire.y2 = 27
          this.appendChild(invertWire)

          if (i < this.topPorts - 1) {
            const invertThruWire = document.createElement('wire-element')
            invertThruWire.x1 = slot * i + 11 * this.scale
            invertThruWire.y1 = 37
            invertThruWire.x2 = slot * (i + 1) + 10 * this.scale
            invertThruWire.y2 = 37
            this.appendChild(invertThruWire)
          }

          const inputWire = document.createElement('wire-element')
          inputWire.x1 = slot * (i + 1)
          inputWire.y1 = 8
          inputWire.x2 = slot * i + 14 * this.scale
          inputWire.y2 = 22
          this.appendChild(inputWire)

          const outputWire = document.createElement('wire-element')
          outputWire.x1 = slot * (i + 1) + 10 * this.scale
          outputWire.y1 = 25
          outputWire.x2 = slot * (i + 1)
          outputWire.y2 = this.height - 8
          this.appendChild(outputWire)
        }
      }
    }
  }
}

window.customElements.define('ones-complement', OnesComplement)
