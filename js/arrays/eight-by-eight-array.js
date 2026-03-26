import { ComponentContainer } from '../component-container.js'

export class EightByEightArray extends ComponentContainer {
  constructor() {
    super()
    this.topPorts = 1
    this.leftPorts = 12
    this.rightPorts = 8
  }

  connectedCallback() {
    this.width = 220
    this.height = 1000
    this.setAttribute('port-scale-inner', 0.2)
    this.setAttribute('top-ports', this.topPorts)
    this.setAttribute('left-ports', this.leftPorts)
    this.setAttribute('right-ports', this.rightPorts)
    super.connectedCallback()

    if (this.svg) {
      this.addWire(this.width / 2, 2, this.width - 30, 2)

      this.addComponent('simple-switch', this.width / 2 - 9.5, 10, {
        scale: 0.4,
        initial: 'on',
        on: 'Clear'
      })
      this.addWire(this.width / 2, 38, this.width - 30, 58)

      for (let i = 0; i < 8; i++) {
        this.addComponent('eight-by-one-array', 40, 60 + i * 111, {
          scale: 0.4,
          'port-scale-outer': 0.2
        })

        // reset circuit
        this.addWire(
          this.width / 2,
          58 + i * 111,
          this.width - 30,
          58 + i * 111
        )
        this.addWire(
          this.width - 30,
          i === 0 ? 2 : 58 + (i - 1) * 111,
          this.width - 30,
          58 + i * 111
        )

        // data out
        this.addWire(
          this.width - 38,
          (i + 1) * 111,
          this.width - 2,
          (i + 1) * 111
        )
      }

      // selectors in
      this.addWire(2, 77, 38, 77)
      this.addWire(2, 77, 38, 188)
      this.addWire(2, 77, 38, 299)
      this.addWire(2, 77, 38, 410)
      this.addWire(2, 77, 38, 521)
      this.addWire(2, 77, 38, 632)
      this.addWire(2, 77, 38, 743)
      this.addWire(2, 77, 38, 854)

      this.addWire(2, 154, 38, 94)
      this.addWire(2, 154, 38, 205)
      this.addWire(2, 154, 38, 316)
      this.addWire(2, 154, 38, 427)
      this.addWire(2, 154, 38, 538)
      this.addWire(2, 154, 38, 649)
      this.addWire(2, 154, 38, 760)
      this.addWire(2, 154, 38, 871)

      this.addWire(2, 231, 38, 111)
      this.addWire(2, 231, 38, 222)
      this.addWire(2, 231, 38, 333)
      this.addWire(2, 231, 38, 444)
      this.addWire(2, 231, 38, 555)
      this.addWire(2, 231, 38, 666)
      this.addWire(2, 231, 38, 777)
      this.addWire(2, 231, 38, 888)

      this.addWire(2, 308, 38, 128)
      this.addWire(2, 385, 38, 239)
      this.addWire(2, 461, 38, 350)
      this.addWire(2, 538, 38, 461)
      this.addWire(2, 615, 38, 572)
      this.addWire(2, 692, 38, 683)
      this.addWire(2, 769, 38, 794)
      this.addWire(2, 846, 38, 905)

      // write in
      this.addWire(2, 923, 38, 145)
      this.addWire(2, 923, 38, 256)
      this.addWire(2, 923, 38, 367)
      this.addWire(2, 923, 38, 478)
      this.addWire(2, 923, 38, 589)
      this.addWire(2, 923, 38, 700)
      this.addWire(2, 923, 38, 811)
      this.addWire(2, 923, 38, 922)
    }
  }
}

window.customElements.define('eight-by-eight-array', EightByEightArray)
