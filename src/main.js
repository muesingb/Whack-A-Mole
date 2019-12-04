let moleImageURL = "https://image.shutterstock.com/image-vector/cartoon-cute-mole-260nw-274323440.jpg"
let moleCounter = 0
let score = document.querySelector("#score")
let container = document.querySelector(".container")
let clickable = false
let timer = 0
let startButton = document.querySelector('#start-button')

fetch('http://localhost:3000')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })

//start game
let interval;
function startGame() {
  score.textContent = "0"
  interval = setInterval(function(){ molePopUp() }, 1000);//mole timing
};

function molePopUp() {
  //can do Date.now() and see what difference is
  if (timer < 5) {
    if (document.querySelector('.mole')) {
      removeMole()
      renderMole()
      } else {
        renderMole()
      }
      timer++
  } else {
      endGame()
  }
};

//end game function
function endGame() {
  timer = 0
  clearInterval(interval)
  if (document.querySelector('.mole')) {removeMole()}
  console.log(score)
  //end game
    //render end game screen
    //send post/patch request to back end
 };

//mole render
function renderMole() {
  clickable = true
  randomHole()
  
  let moleHTML = `
    <img class="mole" src=${moleImageURL}>
    `
    randomHole().insertAdjacentHTML('beforeend', moleHTML)

    moleCounter += 1
}

//pick a hole
function randomHole() {
  let holeID = Math.floor((Math.random() * 9) + 1)
  return document.querySelector(`[data-id="${holeID}"]`)
}

//listen for mole click
container.addEventListener("click", function(e) {

  if (e.target.className === "mole" && clickable) {
    score.innerHTML = parseInt(score.textContent) + 1
    removeMole()
    clickable = false
  }
})

//event listener for start game button
startButton.addEventListener('click', function(event) {
  startGame()
});

//helper function remove mole
function removeMole() {
  document.querySelector('.mole').remove()
};