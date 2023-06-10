
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
    checkRepeat(event)
})

window.addEventListener('load', function(event){
    randomizePlayerStart(event);
})


// Data Model
var playerOne = {
    id: 'player 1',
    token: 'assets/team-ariana.png',
    wins: 0, 
    currentTurn: true,
    moves:[]
}

var playerTwo = {
    id: 'player 2',
    token: 'assets/worm-with-mustach.png',
    wins: 0, 
    currentTurn: false,
    moves:[]
}

// var winCombinations = [['1', '2', '3']
                    //    ['4', '5', '6']
                    //    ['7', '8', '9']
                    //    ['1', '5', '9']
                    //    ['3', '5', '7']
                    //    ['1', '5', '7']
                    //    ['2', '6', '8']
                    //    ['3', '6', '9']
// ]
// 

var playerList = [playerOne, playerTwo];

// Functions

function createPlayer(id, token, wins){
    return {id: id,
    token: token,
    wins: wins,
    goesFirst: true,
    currentTurn: true,
    moves:[]
    }
}

// get random number shuffles the index positions between 0 and 1 for the playerList array
function getRandomNumber(playerList){
    return Math.floor(Math.random() * playerList.length)
}


// shuffle start reassigns .goesFirst and .currentTurn values upon click
function randomizePlayerStart(event){
    var randomNumber = getRandomNumber(playerList)
    console.log(randomNumber)

    if (randomNumber == 0){
        playerOne.currentTurn = true;
        playerTwo.currentTurn = false;

        announcePlayerTurn()

    } else if(!randomNumber == 0){
        playerOne.currentTurn = false;
        playerTwo.currentTurn = true;

        announcePlayerTurn()

    }
}

// alternate token data model
function alternateTurn(event){
    if(playerOne.currentTurn === true){
        playerOne.currentTurn = false
        playerTwo.currentTurn = true
        announcePlayerTurn(event)

    }else if(playerTwo.currentTurn === true){
        playerOne.currentTurn = true
        playerTwo.currentTurn = false
        announcePlayerTurn(event)
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


// check for player one turn, if yes and clicked box matches iterated box --> place token player 1
// push the event target id into that player moves array --> box id
// check for player two turn, if yes and clicked box matches iterated box --> place token player 2
// push the event target id into that player moves array --> box id
function updateDisplayTokens(event){
    var currentEventTargetId = event.target.id
    
    for( var i = 0; i<boxes.length; i++){
        if (boxes[i].getAttribute('id') == currentEventTargetId && playerOne.currentTurn === true){
            var boxToChange = boxes[i]
            boxToChange.innerHTML += `
                    <img class="ariana-token token" src="${playerOne.token}"/>
                `
            playerOne.moves.push(event.target.id)
            alternateTurn(event)

        }else if (boxes[i].getAttribute('id') == currentEventTargetId && playerTwo.currentTurn === true){
            var boxToChange = boxes[i]
            boxToChange.innerHTML += `
                    <img class="worm-token token" src="${playerTwo.token}"/>
                `
            playerTwo.moves.push(event.target.id)
            alternateTurn(event)
        }
    }
    console.log(playerList)
}

function checkRepeat(event){
    var idCheck = event.target.id
    if(playerOne.moves.includes(idCheck) || playerTwo.moves.includes(idCheck)){
        return true
    }else{
        updateDisplayTokens(event)
    }
}


// would love for this to work!!!!!!! 
// function announceRepeat(event){
    // if(checkRepeat(event) === true){
        // idCheck.disabled = true
        // currentTurnStatement.innerText = 'PLEASE SELECT OPEN BOX'
    // }
// }
// 

// if playerOne.moves.length includes winingCombos[i]
// function checkWinCombosPlayerOne(event){
    // for(i=0; i<playerOne.moves.length; i++){
        // if(playerOne.moves[i].includes)
    // }
// 
// 
