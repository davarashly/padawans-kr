import { draw } from "../components/canvas/canvas.js"

let editing = false
let renderedTestIdx = 0

const testData = [
  {
    circle: {
      radius: 4,
      x: 2,
      y: -3,
    },
    dot: {
      label: "A",
      x: 2,
      y: 3,
    },
  },
  {
    circle: {
      radius: 4,
      x: -1,
      y: 2,
    },
    dot: {
      label: "A",
      x: 2,
      y: 3,
    },
  },
  {
    circle: {
      radius: 2,
      x: 0,
      y: 0,
    },
    dot: {
      label: "A",
      x: 2,
      y: 3,
    },
  },
  {
    circle: {
      radius: 3,
      x: 0,
      y: 0,
    },
    dot: {
      label: "A",
      x: -1,
      y: 2,
    },
  },
]

export const getTestData = () => testData

export const makeTestHtml = (test, idx) => `<div class="test">
              <div class="input-group mt-1 mb-3">
                <span class="input-group-text">Circle</span>
                <div class="form-floating">
                  <input type="text" disabled class="form-control" placeholder="X" value="${test.circle.x}" />
                  <label>X</label>
                </div>
                <div class="form-floating">
                  <input type="text" disabled class="form-control" placeholder="Y" value="${test.circle.y}" />
                  <label>Y</label>
                </div>
                <div class="form-floating">
                  <input type="text" disabled class="form-control" placeholder="R" value="${test.circle.radius}" />
                  <label>R</label>
                </div>
              </div>
              <div class="input-group">
                <span class="input-group-text">Dot</span>
                <div class="form-floating">
                  <input type="text" disabled class="form-control" placeholder="X" value="${test.dot.x}" />
                  <label>X</label>
                </div>
                <div class="form-floating">
                  <input type="text" disabled class="form-control" placeholder="Y" value="${test.dot.y}" />
                  <label>Y</label>
                </div>
                <div class="form-floating">
                  <input type="text" disabled class="form-control" placeholder="R" value="${test.dot.label}" />
                  <label>Label</label>
                </div>
              </div>
               <button onclick="draw(${idx}, document.querySelector('canvas').getContext('2d'))" class="btn btn-primary ms-auto d-flex mt-3 align-items-center justify-content-center edit-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-palette2 me-2" viewBox="0 0 16 16">
                    <path d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 .5.5v5.277l4.147-4.131a.5.5 0 0 1 .707 0l3.535 3.536a.5.5 0 0 1 0 .708L10.261 10H15.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5H3a2.99 2.99 0 0 1-2.121-.879A2.99 2.99 0 0 1 0 13.044m6-.21 7.328-7.3-2.829-2.828L6 7.188v5.647zM4.5 13a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zM15 15v-4H9.258l-4.015 4H15zM0 .5v12.495V.5z"/>
                    <path d="M0 12.995V13a3.07 3.07 0 0 0 0-.005z"/>
                  </svg>
                Draw
              </button>
            </div>`

export const toggleEdit = (ctx) => {
  ;[...document.querySelectorAll(".tests .test")].forEach((testElement, idx) => {
    const testElementInputs = [...testElement.querySelectorAll("input[type=text]")]

    if (editing) {
      const [circleX, circleY, circleRadius, dotX, dotY, dotLabel] = testElementInputs.map((input) => input.value)

      testData[idx].circle = { x: circleX, y: circleY, radius: circleRadius }
      testData[idx].dot = { x: dotX, y: dotY, label: dotLabel }

      renderTests()
    }

    testElementInputs.forEach((input) => (input.disabled = !input.disabled))

    if (renderedTestIdx === idx) {
      requestAnimationFrame(() => draw(ctx, testData[idx].circle, testData[idx].dot))
    }
  })

  editing = !editing
}

export const renderTests = () => {
  const testsElement = document.querySelector(".tests")

  testsElement.innerHTML = testData.reduce((html, test, idx) => html + makeTestHtml(test, idx), "")
}

export const editHandler = (ctx) => (evt) => {
  const btnHtml = editing
    ? `<svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil-fill me-2"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
              />
            </svg>
            Edit`
    : `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-file-earmark-post-fill me-2"
      viewBox="0 0 16 16"
    >
      <path
        d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-5-.5H7a.5.5 0 0 1 0 1H4.5a.5.5 0 0 1 0-1zm0 3h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5z" />
    </svg>
  Save`

  evt.target.innerHTML = btnHtml

  toggleEdit(ctx)
}

window.draw = (idx, ctx) => {
  renderedTestIdx = idx

  requestAnimationFrame(() => draw(ctx, testData[idx].circle, testData[idx].dot))
}
