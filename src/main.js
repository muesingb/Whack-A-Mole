let moleImageURL = "https://image.shutterstock.com/image-vector/cartoon-cute-mole-260nw-274323440.jpg"
let moleCounter = 0
let container = document.querySelector('.container')

let scoreHTML = document.querySelector('#score')
let scoreCounter = 0

fetch('http://localhost:3000')
  .then(response => response.json())
  .then(data => {
    // console.log(data)
  })

//start game
function startGame() {
  scoreHTML.innerHTML = "0"
  
  setInterval(function(){ molePopUp() }, 1000); //mole timing

  //end game
      //render end game pop-up
      //send post request with users name and score to backend
};

function molePopUp() {
  if (document.querySelector('.mole')) {
    document.querySelector('.mole').remove()
    renderMole()
  } else {
    renderMole()
    }
}

//mole render
function renderMole() {
  randomHole()
  
  let moleHTML = `
    <img class="mole" src=${moleImageURL}>
    `
    randomHole().insertAdjacentHTML('beforeend',moleHTML)

    moleCounter += 1
}

//pick a hole
function randomHole() {
  let holeID = Math.floor((Math.random() * 9) + 1)
  return document.querySelector(`[data-id="${holeID}"]`)
}

//listen for mole click
container.addEventListener('click', function(event) {
  if (event.target.className === "mole") {
    scoreCounter += 1
    scoreHTML.innerHTML = parseInt(scoreCounter) + 1
  }
});

document.addEventListener('DOMContentLoaded', function(event) {
  if (moleCounter >= 10) {
    clearInterval()
    moleCounter = 0
  }
})