
// Query Selectors
var playerOneSymbol = document.querySelector(`.player-one-symbol`)
var playerTwoSymbol = document.querySelector(`.player-two-symbol`)

var playerOneWinCount = document.querySelector(`.win-one-count`)
var playerTwoWinCount = document.querySelector(`.win-two-count`)

var currentTurnStatement = document.querySelector(`.current-turn-statement`)

var gameGrid = document.querySelector('.game-grid')

var topLeftBox = document.querySelector(`.top-left`)
var topCenterBox = document.querySelector(`.top-center`)
var topRightBox = document.querySelector(`.top-right`)

var centerLeftBox = document.querySelector(`.center-left`)
var centerCenterBox = document.querySelector(`.center-center`)
var centerRightBox = document.querySelector(`.center-right`)

var bottomLeftBox = document.querySelector(`.bottom-left`)
var bottomCenterBox = document.querySelector(`.bottom-center`)
var bottomRightBox = document.querySelector(`.bottom-left`)


var boxes = document.querySelectorAll(".box")


// Event Listeners
gameGrid.addEventListener('click', function(event){
    alternateTokens(event)
})

window.addEventListener('load', function(event){
    randomizePlayerStart(event);
})


// Data Model
var playerOne = {
    id: 'player 1',
    token: 'assets/team-ariana.png',
    wins: 0, 
    goesFirst: true,
    currentTurn: true,
    moves:[]
}

var playerTwo = {
    id: 'player 2',
    token: 'assets/worm-with-mustach.png',
    wins: 0, 
    goesFirst: false,
    currentTurn: false,
    moves:[]
}


var playerList = [playerOne, playerTwo];

var gameGrid = [];


// Functions

// get random number shuffles the index positions between 0 and 1 for the playerList array
function getRandomNumber(playerList){
    return Math.floor(Math.random() * playerList.length)
}


// shuffle start reassigns .goesFirst and .currentTurn values upon click
function randomizePlayerStart(event){
    var randomNumber = getRandomNumber(playerList)
    console.log(randomNumber)

    if (randomNumber == 0){
        playerOne.goesFirst = true;
        playerOne.currentTurn = true;
        playerTwo.goesFirst = false;
        playerTwo.currentTurn = false;

        announcePlayerTurn()

    } else if(!randomNumber == 0){
        playerOne.goesFirst = false;
        playerOne.currentTurn = false;
        playerTwo.goesFirst = true;
        playerTwo.currentTurn = true;

        announcePlayerTurn()

    }
}

// update DOM with player turn
function announcePlayerTurn(){
    if(playerOne.currentTurn === true){
        currentTurnStatement.innerText = 'It\'s Player One\'s Turn!'
    }else if(playerTwo.currentTurn === true){
        currentTurnStatement.innerText = 'It\'s Player Two\'s Turn!'
    }
}

// alternate token on board click
function alternateTokens(event){
    var currentEventTargetId = event.target.id
    
    for( var i = 0; i<boxes.length; i++){
        if(boxes[i].getAttribute('id') == currentEventTargetId && playerOne.currentTurn === true){
            var boxToChange = boxes[i]
            boxToChange.innerHTML += `
                    <img class="ariana-token token" src="${playerOne.token}"/>
                `
            playerOne.currentTurn = false
            playerTwo.currentTurn = true
            playerOne.moves.push(currentEventTargetId)
            announcePlayerTurn()

        }else if (boxes[i].getAttribute('id') == currentEventTargetId && playerTwo.currentTurn === true){
            var boxToChange = boxes[i]
            boxToChange.innerHTML += `
                    <img class="worm-token token" src="${playerTwo.token}"/>
                `
            playerOne.currentTurn = true
            playerTwo.currentTurn = false
            playerTwo.moves.push(currentEventTargetId)
            announcePlayerTurn()
        }
    }

}