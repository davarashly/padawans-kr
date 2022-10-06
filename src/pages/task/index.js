import "./index.css"

import setupCanvas, { draw } from "../../components/canvas/canvas.js"
import { editHandler, getTestData, renderTests } from "../../modules/test.js"

const { canvasElement, ctx } = setupCanvas()

document.querySelector("button.edit-btn").onclick = editHandler(ctx)

renderTests()

const testData = getTestData()

requestAnimationFrame(() => draw(ctx, testData[0].circle, testData[0].dot))
