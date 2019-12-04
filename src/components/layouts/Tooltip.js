import {getCoordinates} from "./LayoutUtilities";
import {tileSize} from "./Constants";

class Tooltip {
  constructor(canvas, posKey, text) {
    this.div = document.createElement("div");
    this.rect = canvas.getBoundingClientRect();
    this.parent = canvas.parentNode;
    this.text = text;
    this.div.style.cssText = "position:absolute;padding:7px;background:gold;pointer-events:none;";
    this.div.innerHTML = text;
    this.setDivPos(posKey);
    this.parent.appendChild(this.div);
  }

  setDivPos = (posKey) => {
    console.log(this.rect)
    const x1 = this.rect.left;
    const y1 = this.rect.top;
    const {x, y} = getCoordinates(posKey);
    console.log(tileSize)
    let posX = x1 + x;
    let posY = y1 + y;
    console.log(x1, y1, x, y)
    this.div.style.left = posX + "px";
    this.div.style.top = posY + "px";
  }
}

export default Tooltip;
