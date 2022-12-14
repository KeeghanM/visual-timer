// Set the colours for each colour selector, as well
// as then set the global colour on selection
document.querySelectorAll(".color-option").forEach((option) => {
  let colorValue = option.children[0].value
  option.style.setProperty("--myColor", colorValue)
  option.addEventListener("change", function () {
    let root = document.querySelector(":root")
    root.style.setProperty("--timerColor", colorValue)
  })
})

// Changing the size of the input box
// for a pretty display of the title
let timerTitleInput = document.querySelector(".timer-input")
let timerTitleSpan = document.querySelector(".timer-text")
timerTitleInput.addEventListener("input", resizeInput)
function resizeInput() {
  timerTitleSpan.innerHTML = this.value
}
resizeInput.call(timerTitleInput)

// Updating the timer numbers based on
// what has been selected
let timeValueInput = document.querySelector(".time-value")
let timeTypeSelector = document.querySelector(".time-types")
let timeLabels = document.querySelectorAll(".time-label")

timeValueInput.addEventListener("input", updateTimeValues)
timeTypeSelector.addEventListener("change", updateTimeValues)

function updateTimeValues() {
  let timeValue = timeValueInput.value
  let timeType = timeTypeSelector.value
  let timeStep = timeValue / 4
  for (let i = 0; i < timeLabels.length - 1; i++) {
    let timeLabel = timeLabels[i]
    timeLabel.innerHTML = timeValue + " " + timeType
    timeValue -= timeStep
  }
}

// Actually running the timer
let timerLength, timeRemaining, updateDelay
let timer = document.querySelector(".timer")
document.querySelector(".timer-start").addEventListener("click", () => {
  document.querySelector(".start-container").hidden = true

  updateDelay = timeTypeSelector.value == "Hours" ? 60000 : 1000
  timerLength = timeValueInput.value * updateDelay * 60
  timeRemaining = timerLength

  updateTimer()
})

function updateTimer() {
  let percentageRemaining = (timeRemaining / timerLength) * 100 + "%"
  timer.style.setProperty("--timerHeight", percentageRemaining)
  timeRemaining -= updateDelay
  if (timeRemaining > 0) {
    setTimeout(updateTimer, updateDelay)
  } else {
    document.querySelector(".start-container").hidden = false
    timer.style.setProperty("--timerHeight", "100%")
  }
}
