import { ComponentContainer } from '../component-container.js'
import { createSVGElement } from '../svg.js'

export class SimpleSwitch extends ComponentContainer {
  get x2() {
    return this.on ? 25 : 20
  }

  get y2() {
    return this.on ? 48 : 45
  }

  constructor() {
    super()
    this.offLabel = this.getAttribute('off') || 'Off'
    this.onLabel = this.getAttribute('on') || 'On'
    this.on = this.getAttribute('initial') === 'on'
    this.labelScale = parseFloat(this.getAttribute('label-scale') || 1)
  }

  connectedCallback() {
    this.height = 50
    this.width = 50
    this.bottomPorts = 1
    this.setAttribute('bottom-ports', this.bottomPorts)
    this.setAttribute('port-scale-inner', 0.2)
    super.connectedCallback()

    if (this.svg) {
      this.powerSource = this.addWire(25, 40, this.x2, this.y2, 'power-source')
      this.powerSource.setAttribute('scale', 0.2)
      // off/on buttons
      const offRect = createSVGElement('rect')
      offRect.setAttribute('x', 2 * this.scale * this.parentScale)
      offRect.setAttribute('y', 2 * this.scale * this.parentScale)
      offRect.setAttribute('width', 46 * this.scale * this.parentScale)
      offRect.setAttribute('height', 12 * this.scale * this.parentScale)
      offRect.setAttribute('fill', this.on ? 'white' : 'orange')
      offRect.setAttribute('stroke', 'black')
      offRect.setAttribute('style', 'cursor: pointer;')
      this.svg.appendChild(offRect)
      this.offRect = offRect

      const offLabelText = createSVGElement('text')
      offLabelText.textContent = this.offLabel
      offLabelText.setAttribute('x', 5 * this.scale * this.parentScale)
      offLabelText.setAttribute('y', 11 * this.scale * this.parentScale)
      offLabelText.setAttribute(
        'style',
        `cursor: pointer; font-family: sans-serif; font-size: ${10 * this.scale * this.parentScale * this.labelScale}`
      )
      this.svg.appendChild(offLabelText)
      this.offLabelText = offLabelText

      const onRect = createSVGElement('rect')
      onRect.setAttribute('x', 2 * this.scale * this.parentScale)
      onRect.setAttribute('y', 16 * this.scale * this.parentScale)
      onRect.setAttribute('width', 46 * this.scale * this.parentScale)
      onRect.setAttribute('height', 12 * this.scale * this.parentScale)
      onRect.setAttribute('fill', this.on ? 'orange' : 'white')
      onRect.setAttribute('stroke', 'black')
      onRect.setAttribute('style', 'cursor: pointer;')
      this.svg.appendChild(onRect)
      this.onRect = onRect

      const onLabelText = createSVGElement('text')
      onLabelText.textContent = this.onLabel
      onLabelText.setAttribute('x', 5 * this.scale * this.parentScale)
      onLabelText.setAttribute('y', 25 * this.scale * this.parentScale)
      onLabelText.setAttribute(
        'style',
        `cursor: pointer; font-family: sans-serif; font-size: ${10 * this.scale * this.parentScale * this.labelScale}`
      )
      this.svg.appendChild(onLabelText)
      this.onLabelText = onLabelText

      // click event handlers
      this.onRect.addEventListener('click', () => {
        this.on = true
        this.updateComponents()
      })
      this.onLabelText.addEventListener('click', () => {
        this.on = true
        this.updateComponents()
      })
      this.offRect.addEventListener('click', () => {
        this.on = false
        this.updateComponents()
      })
      this.offLabelText.addEventListener('click', () => {
        this.on = false
        this.updateComponents()
      })
    }
  }

  updateComponents() {
    this.powerSource.x2 = this.x2
    this.powerSource.y2 = this.y2
    this.onRect.setAttribute('fill', this.on ? 'orange' : 'white')
    this.offRect.setAttribute('fill', this.on ? 'white' : 'orange')
  }

  handleScaleChange(oldVal, newVal) {
    super.handleScaleChange(oldVal, newVal)
    this.offRect?.setAttribute('x', 2 * this.scale * this.parentScale)
    this.offRect?.setAttribute('y', 2 * this.scale * this.parentScale)
    this.offRect?.setAttribute('width', 46 * this.scale * this.parentScale)
    this.offRect?.setAttribute('height', 12 * this.scale * this.parentScale)
    this.onRect?.setAttribute('x', 2 * this.scale * this.parentScale)
    this.onRect?.setAttribute('y', 16 * this.scale * this.parentScale)
    this.onRect?.setAttribute('width', 46 * this.scale * this.parentScale)
    this.onRect?.setAttribute('height', 12 * this.scale * this.parentScale)
    this.offLabelText?.setAttribute('x', 5 * this.scale * this.parentScale)
    this.offLabelText?.setAttribute('y', 11 * this.scale * this.parentScale)
    this.offLabelText?.setAttribute(
      'style',
      `cursor: pointer; font-family: sans-serif; font-size: ${10 * this.scale * this.parentScale * this.labelScale}`
    )
    this.onLabelText?.setAttribute('x', 5 * this.scale * this.parentScale)
    this.onLabelText?.setAttribute('y', 25 * this.scale * this.parentScale)
    this.onLabelText?.setAttribute(
      'style',
      `cursor: pointer; font-family: sans-serif; font-size: ${10 * this.scale * this.parentScale * this.labelScale}`
    )
  }
}

window.customElements.define('simple-switch', SimpleSwitch)
