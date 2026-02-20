import { debounce } from './debounce.js'

export class ComponentGraph {
  // based on https://en.wikipedia.org/wiki/Ford%E2%80%93Fulkerson_algorithm
  constructor() {
    this.elements = new Set()
    this.sources = new Set()
    this.sinks = new Set()
    this.debouncedDetermineFlow = debounce(this._determineFlow, 40)
  }

  get allElements() {
    return this.elements.union(this.sources).union(this.sinks)
  }

  registerElement(element) {
    if (element.nodeName === 'POWER-SOURCE') {
      this.sources.add(element)
    } else if (element.nodeName === 'GROUND-CONNECTION') {
      this.sinks.add(element)
    } else {
      this.elements.add(element)
    }
  }

  determineFlow() {
    this.debouncedDetermineFlow()
  }

  _determineFlow() {
    const visited = new Set()
    const paths = []
    const toVisit = []

    this.sources.forEach((source) => {
      visited.add(source)
      const pathsToVisit = this.getPathsToVisit(source, {}, visited)
      paths.push(...pathsToVisit)
      toVisit.push(...pathsToVisit)
    })

    while (toVisit.length) {
      if (window.logging?.componentGraph?.determineFlow) {
        console.log('Size: ' + toVisit.length)
      }
      const currentWire = toVisit.shift()
      if (window.logging?.componentGraph?.determineFlow) {
        console.log('checking ' + currentWire.element.id)
      }
      if (this.sinks.has(currentWire.element)) {
        this.setVoltagePath(currentWire)
      } else {
        visited.add(currentWire.element)
        const pathsToVisit = this.getPathsToVisit(
          currentWire.element,
          currentWire,
          visited
        )
        toVisit.push(...pathsToVisit)
        paths.push(...pathsToVisit)
      }
    }

    const haveVoltage = paths
      .filter((p) => p.voltageSet)
      .map((p) => [p.element, p.parent.element])
      .flat()
    const needRemoval = this.allElements.difference(new Set(haveVoltage))
    needRemoval.forEach((element) => element.removeAttribute('voltage'))
  }

  getPathsToVisit(component, parent, visited) {
    return [...component.connectedWires.difference(visited)].map((wire) => ({
      element: wire,
      parent: { element: component, parent }
    }))
  }

  setVoltagePath(currentWire) {
    while (currentWire) {
      currentWire.voltageSet = true
      if (currentWire.element && !currentWire.hasVoltage) {
        currentWire.element.setAttribute('voltage', 'true')
      }
      currentWire = currentWire.parent
    }
  }
}
