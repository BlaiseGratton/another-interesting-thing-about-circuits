export class ComponentBase extends HTMLElement {
  static observedAttributes = ['x', 'y']

  attributeHandlers = {
    x: (self, oldVal, newVal) => {},
    y: (self, oldVal, newVal) => {}
  }

  attributeChangedCallback(name, oldVal, newVal) {
    // console.log(`${name} changed: ${oldVal} -> ${newVal}`)
    if (!this.svg) return
    if (oldVal !== newVal) {
      // this.setAttribute(name, newVal)
      this.attributeHandlers[name](oldVal, newVal)
    }
  }

  get svg() {
    return this.parentElement && this.parentElement.svg
  }

  handleComponentMoved() {}

  constructor() {
    super()
  }

  connectedCallback() {
    if (this.svg) {
      this.parentElement.componentGraph.registerElement(this)
    }
  }
}
