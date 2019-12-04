let moleImageURL = "https://image.shutterstock.com/image-vector/cartoon-cute-mole-260nw-274323440.jpg"
let moleCounter = 0
let scoreSelector = document.querySelector("#score")
let container = document.querySelector(".container")
let clickableMole = false
let startButton = document.querySelector('#start-button')
let timer = 30
let countdownTimer = document.querySelector('#countdown-timer')

//fetch get request to rails api
fetch('http://localhost:3000')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  });

//start game
let timerInterval;
let interval;
function startGame() {
  scoreSelector.textContent = "0"
  interval = setInterval(function(){ molePopUp() }, 3000);//mole timing
  timerInterval = setInterval(function(){ timerCountdown() }, 1000);// game countdown
};

//molePopUp function
function molePopUp() {
  //make a function to add random photos
  if (timer > 0) {
      if (document.querySelector('.mole')) {
        removeMole()
        renderMole()
        } else {
          renderMole()
        }
      determineSpeed()
  } else {
      endGame()
  }
};

//end game function
function endGame() {
  timer = 30
  clearInterval(timerInterval)
  clearInterval(interval)
  if (document.querySelector('.mole')) {removeMole()}
  toggleStartButton()
  console.log(parseInt(scoreSelector.textContent))
  //end game
    //render end game screen
    //send post/patch request to back end
 };

//timer countdown
function timerCountdown() {
      let newTime;
      if (timer >= 10) {
        newTime = ("00:" + timer.toString())
      } else if (timer >= 0) {
        newTime = ("00:0" + timer.toString())
      }
      countdownTimer.innerText = newTime
      timer--
};

//make timer faster depending on score
function determineSpeed() {
  if (parseInt(scoreSelector.textContent) == 5) {
    clearInterval(interval)
    interval = setInterval(function(){ molePopUp() }, 2000);
  } else if (parseInt(scoreSelector.textContent) == 10) {
    clearInterval(interval)
    interval = setInterval(function(){ molePopUp() }, 1000);
  }
};

//listen for mole click
container.addEventListener("click", function(e) {
  if (e.target.className === "mole" && clickableMole) {
    scoreSelector.innerHTML = parseInt(scoreSelector.textContent) + 1
    removeMole()
    clickableMole = false
  }
});

//event listener for start game button
startButton.addEventListener('click', function(event) {
  startGame()
  toggleStartButton()
});

/** ~~~~~~~~~~~~~~~HELPER FUNCTIONS~~~~~~~~~~~~~~~~ */

//show or hide start button
function toggleStartButton() {
  if (startButton.style.display === "none") {
    startButton.style.display = "block";
  } else {
    startButton.style.display = "none";
  }
};

//mole render
function renderMole() {
  clickableMole = true
  randomHole()
  
  let moleHTML = `
    <img class="mole" src=${moleImageURL}>
    `
    randomHole().insertAdjacentHTML('beforeend', moleHTML)

    moleCounter += 1
};

//pick a hole
function randomHole() {
  let holeID = Math.floor((Math.random() * 9) + 1)
  return document.querySelector(`[data-id="${holeID}"]`)
};

//remove mole
function removeMole() {
  document.querySelector('.mole').remove()
};