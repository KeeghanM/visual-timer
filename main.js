// Set the colours for each colour selector, as well
// as then set the global colour on selection
document.querySelectorAll('.color-option').forEach((option) => {
  let colorValue = option.children[0].value
  option.style.setProperty('--myColor', colorValue)
  option.addEventListener('change', function () {
    let root = document.querySelector(':root')
    root.style.setProperty('--timerColor', colorValue)
  })
})

// Updating the timer numbers based on
// what has been selected
let timeValueInput = document.querySelector('.time-value')
let timeTypeSelector = document.querySelector('.time-types')
let timeLabels = document.querySelectorAll('.time-label')

timeValueInput.addEventListener('input', updateTimeValues)
timeTypeSelector.addEventListener('change', updateTimeValues)

function updateTimeValues() {
  let timeValue = timeValueInput.value
  let timeType = timeTypeSelector.value
  let timeStep = timeValue / 4
  for (let i = 0; i < timeLabels.length - 1; i++) {
    let timeLabel = timeLabels[i]
    timeLabel.innerHTML = timeValue + ' ' + timeType
    timeValue -= timeStep
  }
}

// Actually running the timer
let dingSound = new Audio('ding.wav')
let timerLength, timeRemaining, updateDelay
let timer = document.querySelector('.timer')
document.querySelector('.timer-start').addEventListener('click', () => {
  document.querySelector('.start-container').hidden = true

  updateDelay = timeTypeSelector.value == 'Hours' ? 60000 : 1000
  timerLength = timeValueInput.value * updateDelay * 60
  timeRemaining = timerLength

  updateTimer()
})

function updateTimer() {
  let percentageRemaining = (timeRemaining / timerLength) * 100 + '%'
  timer.style.setProperty('--timerHeight', percentageRemaining)
  timeRemaining -= updateDelay
  if (timeRemaining > 0) {
    setTimeout(updateTimer, updateDelay)
  } else {
    dingSound.play()
    document.querySelector('.start-container').hidden = false
    timer.style.setProperty('--timerHeight', '100%')
  }
}

// Add task
let taskList = document.querySelector('.tasks')
document
  .querySelector('.add-task')
  .addEventListener('click', createAddTaskInput)

function createAddTaskInput() {
  let taskId = Math.floor(
    Math.random() * Math.floor(Math.random() * Date.now())
  )
  let newTaskDiv = document.createElement('div')
  newTaskDiv.classList.add('new-task')
  newTaskDiv.setAttribute('data-task-id', taskId)

  let submitButton = document.createElement('button')
  submitButton.innerText = '✓'
  submitButton.classList.add('new-task-submit')
  submitButton.addEventListener('click', () => processNewTask(taskId))

  let deleteButton = document.createElement('button')
  deleteButton.classList.add('new-task-delete')
  deleteButton.innerText = '✕'
  deleteButton.addEventListener('click', () => processNewTask(taskId, true))

  let input = document.createElement('input')
  input.classList.add('new-task-input')
  input.setAttribute('type', 'text')
  input.setAttribute('placeholder', 'Enter task name...')
  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      processNewTask(taskId)
      createAddTaskInput()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      processNewTask(taskId, true)
    }
  })

  newTaskDiv.appendChild(input)
  newTaskDiv.appendChild(submitButton)
  newTaskDiv.appendChild(deleteButton)
  taskList.appendChild(newTaskDiv)

  input.focus()
}

function processNewTask(taskId, toDelete) {
  let newTaskDiv = document.querySelector(
    '.new-task[data-task-id="' + taskId + '"]'
  )

  if (!toDelete) {
    let taskName = newTaskDiv.children[0].value
    if (taskName.length < 1) return

    let task = document.createElement('li')
    task.classList.add('task')
    task.setAttribute('data-task-id', taskId)

    let div = document.createElement('div')

    let span = document.createElement('span')
    span.innerText = taskName

    let completeButton = document.createElement('button')
    completeButton.classList.add('complete-task')
    completeButton.addEventListener('click', () => completeTask(taskId))

    let deleteButton = document.createElement('button')
    deleteButton.classList.add('delete-task')
    deleteButton.innerText = '✕'
    deleteButton.addEventListener('click', () => deleteTask(taskId))

    div.appendChild(completeButton)
    div.appendChild(span)
    task.appendChild(div)
    task.appendChild(deleteButton)

    taskList.appendChild(task)
  }

  newTaskDiv.remove()
}

function completeTask(taskId) {
  let task = document.querySelector('.task[data-task-id="' + taskId + '"]')
  if(task.getAttribute('completed') == "true") {
    task.children[0].children[0].innerText = ""
    task.classList.remove('completed')
    task.setAttribute('completed',false)
  } else {
    task.children[0].children[0].innerText = "X"
    task.classList.add('completed')
    task.setAttribute('completed',true)
  }
}
function deleteTask(taskId) {
  document.querySelector('.task[data-task-id="' + taskId + '"]').remove()
}
