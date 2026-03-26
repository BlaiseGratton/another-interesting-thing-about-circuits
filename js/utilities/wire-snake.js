import { ComponentContainer } from '../component-container.js'

export class WireSnake extends ComponentContainer {
  get topFan() {
    return this.getAttribute('top-fan')
  }
  get bottomFan() {
    return this.getAttribute('bottom-fan')
  }
  get leftFan() {
    return this.getAttribute('left-fan')
  }
  get rightFan() {
    return this.getAttribute('right-fan')
  }

  connectedCallback() {
    if (this.getAttribute('orientation') === 'vertical') {
      this.orientation = 'vertical'
      this.width = 40
      if (!this.height) {
        throw new Error('Height required')
      }
      if (!this.topFan) {
        throw new Error('Top fan required (format top-fan="x1,y1,x2,y2")')
      }
      if (!this.bottomFan) {
        throw new Error('Bottom fan required (format bottom-fan="x1,y1,x2,y2")')
      }
      this.setAttribute('port-scale-inner', this.height / 2 / 8)
      this.setAttribute('top-ports', 8)
      this.setAttribute('bottom-ports', 8)
    }
    if (this.getAttribute('orientation') === 'horizontal') {
      this.orientation = 'horizontal'
      this.height = 40
      if (!this.width) {
        throw new Error('Width required')
      }
      if (!this.leftFan) {
        throw new Error('Left fan required (format left-fan="x1,y1,x2,y2")')
      }
      if (!this.rightFan) {
        throw new Error('Right fan required (format right-fan="x1,y1,x2,y2")')
      }
      this.setAttribute('port-scale-inner', this.width / 2 / 8)
      this.setAttribute('left-ports', 8)
      this.setAttribute('right-ports', 8)
    }
    super.connectedCallback()

    if (this.svg) {
      const parentScale = this.parentElement.scale

      const outsideWidth = (this.width * this.scale) / 9
      const outsideHeight = (this.height * this.scale) / 9
      if (this.orientation === 'vertical') {
        let [x1, y1, x2, y2] = this.topFan.split(',').map(parseFloat)
        let dx = (x2 - x1) / 8
        let dy = (y2 - y1) / 8

        for (let i = 1; i <= 8; i++) {
          const wire = this.parentElement.addWire(
            this.x + outsideWidth * i,
            this.y - 8,
            x1 + i * dx,
            y1 + i * dy,
            'wire-element',
            ['moveable']
          )
          wire.setAttribute('parent-scale', parentScale)
        }

        ;[x1, y1, x2, y2] = this.bottomFan.split(',').map(parseFloat)
        dx = (x2 - x1) / 8
        dy = (y2 - y1) / 8

        for (let i = 1; i <= 8; i++) {
          const wire = this.parentElement.addWire(
            this.x + outsideWidth * i,
            this.y + this.height * this.scale + 8,
            x1 + i * dx,
            y1 + i * dy,
            'wire-element',
            ['moveable']
          )
          wire.setAttribute('parent-scale', parentScale)
        }
      } else if (this.orientation === 'horizontal') {
        let [x1, y1, x2, y2] = this.leftFan.split(',').map(parseFloat)
        let dx = (x2 - x1) / 8
        let dy = (y2 - y1) / 8

        for (let i = 1; i <= 8; i++) {
          const wire = this.parentElement.addWire(
            this.x - 8,
            this.y + outsideHeight * i,
            x1 + (i - 1) * dx,
            y1 + (i - 1) * dy,
            'wire-element',
            ['moveable']
          )
          wire.setAttribute('parent-scale', parentScale)
        }

        ;[x1, y1, x2, y2] = this.rightFan.split(',').map(parseFloat)
        dx = (x2 - x1) / 8
        dy = (y2 - y1) / 8

        for (let i = 1; i <= 8; i++) {
          const wire = this.parentElement.addWire(
            this.x + this.width * this.scale + 8,
            this.y + outsideHeight * i,
            x1 + (i - 1) * dx,
            y1 + (i - 1) * dy,
            'wire-element',
            ['moveable']
          )
          wire.setAttribute('parent-scale', parentScale)
        }
      }
    }
  }
}

window.customElements.define('wire-snake', WireSnake)
