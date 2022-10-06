import "./index.css"

import setupCanvas, { draw } from "../../components/canvas/canvas.js"

const { canvasElement, ctx } = setupCanvas()

const btns = [...document.querySelectorAll("button")]

let circle = { radius: 4, x: 2, y: -3 }
let dot = { label: "A", x: 2, y: 3 }

requestAnimationFrame(() => draw(ctx, circle, dot))

btns.forEach((btn, idx) => {
  btn.onclick = () => {
    if (!idx) {
      circle = { radius: 4, x: 2, y: -3 }
      dot = { label: "A", x: 2, y: 3 }
    } else {
      circle = { radius: 4, x: -1, y: 2 }
      dot = { label: "A", x: 2, y: 3 }
    }

    requestAnimationFrame(() => draw(ctx, circle, dot))
  }
})
