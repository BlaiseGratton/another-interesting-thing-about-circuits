import { svgNameSpace } from './constants.js'

export const createSVGElement = (type) => {
  const element = document.createElementNS(svgNameSpace, type)
  if (!element) throw new Error(`Could not create type ${type} element`)
  return element
}
