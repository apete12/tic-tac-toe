
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
var bottomRightBox = document.querySelector(`.bottom-right`)


var boxes = document.querySelectorAll(".box")


// Event Listeners
gameGrid.addEventListener('click', function(event){
    checkRepeat(event)
})

window.addEventListener('load', function(event){
    randomizePlayerStart(event);
})


// Data Models
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

var winCombinations = [['1', '2', '3'], 
                       ['4', '5', '6'],
                       ['7', '8', '9'], 
                       ['1', '5', '9'], 
                       ['3', '5', '7'], 
                       ['1', '4', '7'], 
                       ['2', '5', '8'], 
                       ['3', '6', '9']
                    ]

var playerList = [playerOne, playerTwo];
var startingPlayer;

// Functions
function getRandomNumber(playerList){
    return Math.floor(Math.random() * playerList.length)
}

function randomizePlayerStart(){
    var randomNumber = getRandomNumber(playerList)
    console.log(randomNumber)

    if (randomNumber == 0){
        playerOne.currentTurn = true;
        playerTwo.currentTurn = false;
        startingPlayer = playerOne

        announcePlayerTurn()

    } else if(!randomNumber == 0){
        playerOne.currentTurn = false;
        playerTwo.currentTurn = true;
        startingPlayer = playerTwo

        announcePlayerTurn()

    }
}

function alternateTurn(){
    if(playerOne.currentTurn === true){
        playerOne.currentTurn = false
        playerTwo.currentTurn = true
        console.log('alternate turn', playerList)
        announcePlayerTurn()

    }else if(playerTwo.currentTurn === true){
        playerOne.currentTurn = true
        playerTwo.currentTurn = false
        console.log('alternate turn', playerList)
        announcePlayerTurn()
    }
}

function announcePlayerTurn(){
    if(playerOne.currentTurn === true){
        currentTurnStatement.innerText = 'It\'s Player One\'s Turn!'
    }else if(playerTwo.currentTurn === true){
        currentTurnStatement.innerText = 'It\'s Player Two\'s Turn!'
    }
}

function updateDisplayTokens(event) {
    var currentEventTargetId = event.target.id;
  
    for (var i = 0; i < boxes.length; i++) {
      if (boxes[i].getAttribute('id') == currentEventTargetId && playerOne.currentTurn === true) {
        var boxToChange = boxes[i];
        boxToChange.innerHTML += `
                  <img class="ariana-token token" src="${playerOne.token}"/>
              `;
        playerOne.moves.push(event.target.id);
        if (!checkWinCombo(event) && !checkDrawCombo(event)) {
          alternateTurn(event);
        }
      } else if (boxes[i].getAttribute('id') == currentEventTargetId &&playerTwo.currentTurn === true) {
        var boxToChange = boxes[i];
        boxToChange.innerHTML += `
                  <img class="worm-token token" src="${playerTwo.token}"/>
              `;
        playerTwo.moves.push(event.target.id);
        if (!checkWinCombo(event) && !checkDrawCombo(event)) {
          alternateTurn(event);
        }
      }
    }
  }
  

function checkRepeat(event){
    var idCheck = event.target.id

    if(playerOne.moves.includes(idCheck) || playerTwo.moves.includes(idCheck)){
        return true
    }else{
        updateDisplayTokens(event)
    }
}

function checkWinCombo(event){

    for (var i=0; i < winCombinations.length; i++){
        
        var playerOneWin = winCombinations[i].every(function(position){
            return (playerOne.moves.includes(position))
        });
        var playerTwoWin = winCombinations[i].every(function(position){
            return (playerTwo.moves.includes(position))
        });

        if(playerOneWin){
            playerOne.wins +=1
            announcePlayerOneWin()
            resetGame(event)
            return true;

        }else if(playerTwoWin){
            playerTwo.wins +=1
            announcePlayerTwoWin()
            resetGame(event)
            return true;
        }
    }
    checkDrawCombo(event)
    return false;
}

function announcePlayerOneWin(){
    currentTurnStatement.innerText = 'Player One Wins!';
    playerOneWinCount.innerText = `Number of Wins: ${playerOne.wins}`

}

function announcePlayerTwoWin(){
    currentTurnStatement.innerText = 'Player Two Wins!';
    playerTwoWinCount.innerText = `Number of Wins: ${playerTwo.wins}`
}

function checkDrawCombo(event){
    var totalMoves = playerOne.moves.length + playerTwo.moves.length
    if (totalMoves === 9){
        currentTurnStatement.innerText = 'This match is a tie!'
        playerOne.wins += 0;
        playerTwo.wins += 0;
        resetGame(event)
        return true
    }
    return false;
}

function resetGame(){
    setTimeout(function() {
        for(i=0; i<boxes.length; i++){
            var boxesToReset = boxes[i]
            boxesToReset.innerHTML = ``
            playerOne.moves =[];
            playerTwo.moves=[];
        }
        resetPlayerTurn();
      }, 4000);
    
}

function resetPlayerTurn(){
    if(startingPlayer === playerOne){
        startingPlayer = playerTwo;
        playerTwo.currentTurn = true;
        playerOne.currentTurn = false;
        announcePlayerTurn()
    }else if(startingPlayer === playerTwo){
        startingPlayer = playerOne
        playerTwo.currentTurn = false;
        playerOne.currentTurn = true;
        announcePlayerTurn()
    }
}