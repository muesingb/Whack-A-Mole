let moleImageURL = "https://image.shutterstock.com/image-vector/cartoon-cute-mole-260nw-274323440.jpg"
let moleCounter = 0
let scoreSelector = document.querySelector("#score")
let container = document.querySelector(".container")
let clickableMole = false
let startButton = document.querySelector('#start-button')
let timer = 10
let countdownTimer = document.querySelector('#countdown-timer')
let playAgainButton = document.querySelector('#play-again-button')
let EndGameModal = document.querySelector('#EndGameModal')
let HomeScreenModal = document.querySelector('#HomeScreenModal')
let leaderboardModal = document.querySelector('#leaderboardModal')
let EndGameModalContent = document.querySelector("#EndGameModalContent")
let HomeScreenModalContent = document.querySelector("#HomeScreenModalContent")
let leaderboardModalContent = document.querySelector("#leaderboardModalContent")
let gameInfo = document.querySelector('#info')
let form = document.querySelector(".form")
let homeS = document.querySelector("#HomeScreenModal")
let userId= 0;
//fetch get request to rails api
fetch('http://localhost:3000/users')
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
  updateScore()
  timer = 10
  clearInterval(timerInterval)
  clearInterval(interval)
  if (document.querySelector('.mole')) {removeMole()}
  //toggleStartButton()
  renderEndGame()
  // console.log(parseInt(scoreSelector.textContent))
  //end game
    //send post/patch request to back end
 };

 // create score with relation to user <post request>
 function updateScore() {
   
   fetch("http://localhost:3000/games", {
     method: "POST",
     headers: {
      "Content-Type": "application/json",
      Accepete: "application/json" 
     },
    body: JSON.stringify({
      user_id: userId,
      score: parseInt(scoreSelector.textContent)   })     })
    .then(function(resp) {
      return resp.json();   })
    .then(function(data) {
    renderEndGame()
  
    })
 }
//timer countdown
function timerCountdown() {
      let newTime;
      if (timer >= 10) {
        newTime = ("00:" + timer.toString())
      } else if (timer >= 0) {
        newTime = ("00:0" + timer.toString())
      }
      if (timer === 1) {console.log(timer)}
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
  InfoToggleOn()
  toggleStartButton()
});

/** ~~~~~~~~~~~~~Home Screen Modal ~~~~~~~~~~~~ */
document.addEventListener('click', function(event) {
  if (event.target.className === "submit") {
      HomeScreenModal.style.display = "none";
      HomeScreenModalContent.innerHTML = "";
  }
})

/** ~~~~~~~~~~~~~End Game Modal ~~~~~~~~~~~~~~*/
function renderEndGame() {
  EndGameModal.style.display = "block"
  EndGameModalContent.innerHTML = ""
  let endGameHTML = `
    <h1>Thanks for Playing!</h1>
    <p>Score: ${parseInt(scoreSelector.textContent)}</p>
    <p>High Score:</p>
    <button class="button" id="play-again-button">Play Again?</button>
    <button class="button" id="leaderboard-button">Leaderboard</button>
  `
  EndGameModalContent.insertAdjacentHTML('beforeend', endGameHTML)
};
//event listener for both play again button and leaderboard button
document.addEventListener('click', function(event) {
  if (event.target.id === "play-again-button") { //if user hits play-again, starts a new game
      EndGameModal.style.display = "none";
      leaderboardModal.style.display = "none";
      startGame()
  } else if (event.target.id === "leaderboard-button") {
    EndGameModal.style.display = "none";
    renderLeaderboard()
  }
});

/** ~~~~~~~~~~~~~~~Leaderboard Modal~~~~~~~~~~~~~~~ */
function renderLeaderboard() {
  leaderboardModal.style.display = "block"
  leaderboardModalContent.innerHTML = ""
  let leaderboardHTML = `
    <h1>LeaderBoard</h1>
    <button class="button" id="play-again-button">Play Again?</button>
  `
  leaderboardModalContent.insertAdjacentHTML('beforeend', leaderboardHTML)
};

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

//show or hide start button
function toggleStartButton() {
  if (startButton.style.display === "none") {
    startButton.style.display = "block";
  } else {
    startButton.style.display = "none";
  }
};

//show hidden timer and score information
function InfoToggleOn() {
  gameInfo.style.display = "block"
}

//post request to create new user
form.addEventListener("submit", function(e) {
  let username = document.querySelector("#username")
  e.preventDefault()

  fetch("http://localhost:3000/users",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accepete: "application/json" },
    body: JSON.stringify({
     username: e.target[0].value  })
   })
   .then(function(resp) {
     return resp.json();    })
   .then(function(data) {
    homeS.remove()
    userId = data.id
    username.innerHTML = e.target[0].value
   })
})