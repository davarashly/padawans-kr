import "./canvas.style.css"
import { linearInterpolation } from "../../modules/utils.js"

const drawGraph = (ctx) => {
  const canvasElement = ctx.canvas
  ctx.lineWidth = 3

  ctx.beginPath()
  ctx.moveTo(canvasElement.width / 2, 20)
  ctx.lineTo(canvasElement.width / 2, canvasElement.height - 20)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(canvasElement.width / 2 - 5, 30)
  ctx.lineTo(canvasElement.width / 2, 20)
  ctx.lineTo(canvasElement.width / 2 + 5, 30)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(20, canvasElement.height / 2)
  ctx.lineTo(canvasElement.width - 20, canvasElement.height / 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(canvasElement.width - 30, canvasElement.height / 2 - 5)
  ctx.lineTo(canvasElement.width - 20, canvasElement.height / 2)
  ctx.lineTo(canvasElement.width - 30, canvasElement.height / 2 + 5)
  ctx.stroke()
}

const drawLines = (ctx, linesAmount) => {
  const canvasElement = ctx.canvas

  ctx.strokeStyle = "black"
  ctx.lineWidth = 2

  for (let i = 0; i < linesAmount; i++) {
    const x = linearInterpolation(40, canvasElement.width - 40, i / (linesAmount - 1))

    ctx.fillStyle = "#000"

    if (x) {
      ctx.beginPath()
      ctx.moveTo(x, canvasElement.height / 2 - 5)
      ctx.lineTo(x, canvasElement.height / 2 + 5)
      ctx.font = "bold " + linearInterpolation(2, 10, 12 / linesAmount) + "px sans-serif"

      const digit = ~~linearInterpolation(-linesAmount / 2, linesAmount / 2, i / (linesAmount - 1))

      ctx.textAlign = "center"
      ctx.textBaseline = "bottom"

      ctx.fillText(digit, x - (digit ? 0 : 10), canvasElement.height / 2 - 10)
      ctx.stroke()
    }

    const y = linearInterpolation(40, canvasElement.height - 40, i / (linesAmount - 1))

    if (y) {
      ctx.beginPath()
      ctx.moveTo(canvasElement.width / 2 - 5, y)
      ctx.lineTo(canvasElement.width / 2 + 5, y)
      ctx.font = "bold " + linearInterpolation(2, 10, 12 / linesAmount) + "px sans-serif"

      const digit = -~~linearInterpolation(-linesAmount / 2, linesAmount / 2, i / (linesAmount - 1))

      ctx.textAlign = "center"
      ctx.textBaseline = "top"

      ctx.fillText(digit || "", canvasElement.width / 2 - 12, y - 4)
      ctx.stroke()
    }
  }
}

const drawCircle = (ctx, linesAmount, circle) => {
  const canvasElement = ctx.canvas

  ctx.strokeStyle = "#864"
  ctx.lineWidth = 3

  const drawRadius = ((canvasElement.width - 80) * circle.radius) / (linesAmount - 1)

  const x = ctx.canvas.width / 2 + (circle.x * (ctx.canvas.width - 80)) / (linesAmount - 1)
  const y = ctx.canvas.height / 2 - (circle.y * (ctx.canvas.height - 80)) / (linesAmount - 1)

  ctx.beginPath()
  ctx.arc(x, y, drawRadius, 0, Math.PI * 2)
  ctx.stroke()

  drawDot(ctx, linesAmount, { label: "O", x: circle.x, y: circle.y }, "#864")
}

const drawDot = (ctx, linesAmount, dot, color = "#335") => {
  const x = ctx.canvas.width / 2 + (dot.x * (ctx.canvas.width - 80)) / (linesAmount - 1)
  const y = ctx.canvas.height / 2 - (dot.y * (ctx.canvas.height - 80)) / (linesAmount - 1)

  ctx.beginPath()

  ctx.fillStyle = color
  ctx.arc(x, y, 2, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.font = "bold " + linearInterpolation(2, 10, 12 / linesAmount) + "px sans-serif"

  ctx.textAlign = "left"
  ctx.textBaseline = "bottom"

  ctx.fillText(`${dot.label} (${dot.x}; ${dot.y})`, x + 5, y)
  ctx.stroke()
}

export const draw = (ctx, circle = { radius: 1, startX: 0, startY: 0 }, dot = { label: "", x: null, y: null }) => {
  const linesAmount = circle.radius * 2 + 3

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  ctx.canvas.width = 0
  ctx.canvas.width = ctx.canvas.parentElement.getBoundingClientRect().width - 40
  // ctx.canvas.height = window.innerWidth >= 576 ? window.innerHeight - 40 : ctx.canvas.width
  ctx.canvas.height = ctx.canvas.width

  drawGraph(ctx)
  drawCircle(ctx, linesAmount, circle)
  drawLines(ctx, linesAmount)
  drawDot(ctx, linesAmount, dot)

  requestAnimationFrame(draw.bind(null, ctx, circle, dot))
}

const setupCanvas = (selector = "canvas") => {
  const canvasElement = document.querySelector(selector)
  const ctx = canvasElement.getContext("2d")

  canvasElement.width = canvasElement.parentElement.getBoundingClientRect().width - 40
  // canvasElement.height = window.innerWidth >= 576 ? window.innerHeight - 40 : canvasElement.width
  canvasElement.height = canvasElement.width

  return { canvasElement, ctx }
}

export default setupCanvas
