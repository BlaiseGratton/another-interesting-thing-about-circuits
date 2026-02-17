import { ComponentContainer } from '../component-container.js'

export class FullAdder extends ComponentContainer {
  constructor() {
    super()
    this.topPorts = 3
    this.bottomPorts = 2
  }

  connectedCallback() {
    this.width = 145
    this.height = 200
    this.setAttribute('topports', this.topPorts)
    this.setAttribute('bottomports', this.bottomPorts)
    super.connectedCallback()

    if (this.svg) {
      this.halfAdder1 = document.createElement('half-adder')
      this.halfAdder1.setAttribute('scale', 0.5)
      this.halfAdder1.x = 30
      this.halfAdder1.y = 20
      this.appendChild(this.halfAdder1)

      this.halfAdder2 = document.createElement('half-adder')
      this.halfAdder2.setAttribute('scale', 0.5)
      this.halfAdder2.x = 68
      this.halfAdder2.y = 88
      this.appendChild(this.halfAdder2)

      this.orGate = document.createElement('or-gate')
      this.orGate.setAttribute('scale', 0.5)
      this.orGate.x = 17
      this.orGate.y = 124
      this.appendChild(this.orGate)

      this.carryInWire1 = document.createElement('wire-element')
      this.carryInWire1.x1 = 109
      this.carryInWire1.y1 = 8
      this.carryInWire1.x2 = 109
      this.carryInWire1.y2 = 87
      this.appendChild(this.carryInWire1)

      this.carryInWire2 = document.createElement('wire-element')
      this.carryInWire2.x1 = 109
      this.carryInWire2.y1 = 87
      this.carryInWire2.x2 = 60
      this.carryInWire2.y2 = 87
      this.appendChild(this.carryInWire2)

      this.carryInWire3 = document.createElement('wire-element')
      this.carryInWire3.x1 = 60
      this.carryInWire3.y1 = 87
      this.carryInWire3.x2 = 60
      this.carryInWire3.y2 = 109
      this.appendChild(this.carryInWire3)

      this.sumOutWire1 = document.createElement('wire-element')
      this.sumOutWire1.x1 = 139
      this.sumOutWire1.y1 = 109
      this.sumOutWire1.x2 = 142
      this.sumOutWire1.y2 = 177
      this.appendChild(this.sumOutWire1)

      this.sumOutWire2 = document.createElement('wire-element')
      this.sumOutWire2.x1 = 142
      this.sumOutWire2.y1 = 177
      this.sumOutWire2.x2 = 97
      this.sumOutWire2.y2 = 192
      this.appendChild(this.sumOutWire2)

      this.aInputWire1 = document.createElement('wire-element')
      this.aInputWire1.x1 = 72
      this.aInputWire1.y1 = 8
      this.aInputWire1.x2 = 25
      this.aInputWire1.y2 = 20
      this.appendChild(this.aInputWire1)

      this.aInputWire2 = document.createElement('wire-element')
      this.aInputWire2.x1 = 25
      this.aInputWire2.y1 = 20
      this.aInputWire2.x2 = 22
      this.aInputWire2.y2 = 41
      this.appendChild(this.aInputWire2)

      this.adder1SumOutWire1 = document.createElement('wire-element')
      this.adder1SumOutWire1.x1 = 101
      this.adder1SumOutWire1.y1 = 41
      this.adder1SumOutWire1.x2 = 105
      this.adder1SumOutWire1.y2 = 85
      this.appendChild(this.adder1SumOutWire1)

      this.adder1SumOutWire2 = document.createElement('wire-element')
      this.adder1SumOutWire2.x1 = 105
      this.adder1SumOutWire2.y1 = 85
      this.adder1SumOutWire2.x2 = 58
      this.adder1SumOutWire2.y2 = 85
      this.appendChild(this.adder1SumOutWire2)

      this.adder1SumOutWire3 = document.createElement('wire-element')
      this.adder1SumOutWire3.x1 = 58
      this.adder1SumOutWire3.y1 = 85
      this.adder1SumOutWire3.x2 = 60
      this.adder1SumOutWire3.y2 = 129
      this.appendChild(this.adder1SumOutWire3)

      this.bInputWire1 = document.createElement('wire-element')
      this.bInputWire1.x1 = 36
      this.bInputWire1.y1 = 8
      this.bInputWire1.x2 = 17
      this.bInputWire1.y2 = 20
      this.appendChild(this.bInputWire1)

      this.bInputWire2 = document.createElement('wire-element')
      this.bInputWire2.x1 = 17
      this.bInputWire2.y1 = 20
      this.bInputWire2.x2 = 22
      this.bInputWire2.y2 = 62
      this.appendChild(this.bInputWire2)

      this.adder1CarryOutWire1 = document.createElement('wire-element')
      this.adder1CarryOutWire1.x1 = 101
      this.adder1CarryOutWire1.y1 = 62
      this.adder1CarryOutWire1.x2 = 101
      this.adder1CarryOutWire1.y2 = 83
      this.appendChild(this.adder1CarryOutWire1)

      this.adder1CarryOutWire2 = document.createElement('wire-element')
      this.adder1CarryOutWire2.x1 = 101
      this.adder1CarryOutWire2.y1 = 83
      this.adder1CarryOutWire2.x2 = 10
      this.adder1CarryOutWire2.y2 = 83
      this.appendChild(this.adder1CarryOutWire2)

      this.adder1CarryOutWire3 = document.createElement('wire-element')
      this.adder1CarryOutWire3.x1 = 10
      this.adder1CarryOutWire3.y1 = 83
      this.adder1CarryOutWire3.x2 = 4
      this.adder1CarryOutWire3.y2 = 160
      this.appendChild(this.adder1CarryOutWire3)

      this.adder1CarryOutWire4 = document.createElement('wire-element')
      this.adder1CarryOutWire4.x1 = 4
      this.adder1CarryOutWire4.y1 = 160
      this.adder1CarryOutWire4.x2 = 9
      this.adder1CarryOutWire4.y2 = 166
      this.appendChild(this.adder1CarryOutWire4)

      this.adder2CarryOutWire1 = document.createElement('wire-element')
      this.adder2CarryOutWire1.x1 = 138
      this.adder2CarryOutWire1.y1 = 130
      this.adder2CarryOutWire1.x2 = 138
      this.adder2CarryOutWire1.y2 = 152
      this.appendChild(this.adder2CarryOutWire1)

      this.adder2CarryOutWire2 = document.createElement('wire-element')
      this.adder2CarryOutWire2.x1 = 138
      this.adder2CarryOutWire2.y1 = 152
      this.adder2CarryOutWire2.x2 = 66
      this.adder2CarryOutWire2.y2 = 152
      this.appendChild(this.adder2CarryOutWire2)

      this.adder2CarryOutWire3 = document.createElement('wire-element')
      this.adder2CarryOutWire3.x1 = 66
      this.adder2CarryOutWire3.y1 = 152
      this.adder2CarryOutWire3.x2 = 53
      this.adder2CarryOutWire3.y2 = 120
      this.appendChild(this.adder2CarryOutWire3)

      this.adder2CarryOutWire4 = document.createElement('wire-element')
      this.adder2CarryOutWire4.x1 = 53
      this.adder2CarryOutWire4.y1 = 120
      this.adder2CarryOutWire4.x2 = 16
      this.adder2CarryOutWire4.y2 = 120
      this.appendChild(this.adder2CarryOutWire4)

      this.adder2CarryOutWire5 = document.createElement('wire-element')
      this.adder2CarryOutWire5.x1 = 16
      this.adder2CarryOutWire5.y1 = 120
      this.adder2CarryOutWire5.x2 = 9
      this.adder2CarryOutWire5.y2 = 145
      this.appendChild(this.adder2CarryOutWire5)

      this.carryOutWire = document.createElement('wire-element')
      this.carryOutWire.x1 = 63
      this.carryOutWire.y1 = 156
      this.carryOutWire.x2 = 48
      this.carryOutWire.y2 = 192
      this.appendChild(this.carryOutWire)
    }
  }
}

window.customElements.define('full-adder', FullAdder)
