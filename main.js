// Query Selectors
var playerOneWinCount = document.querySelector(`.win-one-count`);
var playerTwoWinCount = document.querySelector(`.win-two-count`);
var currentTurnStatement = document.querySelector(`.current-turn-statement`);
var gameGrid = document.querySelector('.game-grid');
var boxes = document.querySelectorAll(".box");

// Event Listeners
gameGrid.addEventListener('click', function(event){
    if(clickAllowed === false){
        return
    }else{
        checkRepeat(event);
    }
})

window.addEventListener('load', function(event){
    randomizePlayerStart(event);
})


// Data Models
var playerOne = {
    id: 'player 1',
    token: 'assets/team-ariana.png',
    tokenAltText: 'cartoon of ariana with text saying I was born cool',
    wins: 0, 
    currentTurn: true,
    moves:[]
};

var playerTwo = {
    id: 'player 2',
    token: 'assets/worm-with-mustach.png',
    tokenAltText: 'cartoon of a worm with a mustache and text saying you\'re a worm with a mustache',
    wins: 0, 
    currentTurn: false,
    moves:[]
};

// Global Variables:
var winCombinations = [['1', '2', '3'], 
                       ['4', '5', '6'],
                       ['7', '8', '9'], 
                       ['1', '5', '9'], 
                       ['3', '5', '7'], 
                       ['1', '4', '7'], 
                       ['2', '5', '8'], 
                       ['3', '6', '9']
                    ];

var playerList = [playerOne, playerTwo];

var startingPlayer;

var clickAllowed = true;

// Functions
function getRandomNumber(playerList){
    return Math.floor(Math.random() * playerList.length);
}

function randomizePlayerStart(){
    var randomNumber = getRandomNumber(playerList);

    if (randomNumber === 0){
        playerOne.currentTurn = true;
        playerTwo.currentTurn = false;
        startingPlayer = playerOne;

        announcePlayerTurn();

    } else if(!randomNumber == 0){
        playerOne.currentTurn = false;
        playerTwo.currentTurn = true;
        startingPlayer = playerTwo;

        announcePlayerTurn();

    }
}

function alternateTurn(){
    if(playerOne.currentTurn === true){
        playerOne.currentTurn = false;
        playerTwo.currentTurn = true;
        announcePlayerTurn();

    }else if(playerTwo.currentTurn === true){
        playerOne.currentTurn = true;
        playerTwo.currentTurn = false;
        announcePlayerTurn();
    }
}

function announcePlayerTurn(){
    if(playerOne.currentTurn === true){
        currentTurnStatement.innerText = 'It\'s Player One\'s Turn!';
    }else if(playerTwo.currentTurn === true){
        currentTurnStatement.innerText = 'It\'s Player Two\'s Turn!';
    }
}

function checkRepeat(event){
    var idCheck = event.target.id;

    if(playerOne.moves.includes(idCheck) || playerTwo.moves.includes(idCheck)){
        return true;
    }else{
        updateDisplayTokens(event);
    }
}

  function updateDisplayTokens(event) {
    var currentEventTargetId = event.target.id;

    for (var i = 0; i < boxes.length; i++) {
      if (boxes[i].getAttribute('id') == currentEventTargetId && playerOne.currentTurn === true) {
        var boxToChange = boxes[i];
        boxToChange.innerHTML += `
                  <img class="ariana-token token" src="${playerOne.token}" alt="${playerOne.tokenAltText}"/>
              `;
        playerOne.moves.push(event.target.id);
        checkWinDraw(event);

      } else if (boxes[i].getAttribute('id') == currentEventTargetId && playerTwo.currentTurn === true) {
        var boxToChange = boxes[i];
        boxToChange.innerHTML += `
                  <img class="worm-token token" src="${playerTwo.token}" alt="${playerTwo.tokenAltText}"/>
              `;
        playerTwo.moves.push(event.target.id);
        checkWinDraw(event);
        }
      }
    }

function checkWinDraw(event){
    if(!checkWinCombo(event) && !checkDrawCombo(event)){
        alternateTurn(event);
    }
}

function checkWinCombo(event){
    for (var i = 0; i < winCombinations.length; i++){
        var playerOneWin = winCombinations[i].every(function(position){
            return (playerOne.moves.includes(position));
        });
        var playerTwoWin = winCombinations[i].every(function(position){
            return (playerTwo.moves.includes(position));
        });

        if(playerOneWin){
            playerOne.wins +=1;
            announcePlayerOneWin();
            resetGame(event);
            return true;

        }else if(playerTwoWin){
            playerTwo.wins +=1;
            announcePlayerTwoWin();
            resetGame(event);
            return true;
        }
    }
    checkDrawCombo(event);
    return false;
}

function announcePlayerOneWin(){
    currentTurnStatement.innerText = 'Player One Wins!';
    playerOneWinCount.innerText = `Number of Wins: ${playerOne.wins}`;
    disableBoardClick();
}

function announcePlayerTwoWin(){
    currentTurnStatement.innerText = 'Player Two Wins!';
    playerTwoWinCount.innerText = `Number of Wins: ${playerTwo.wins}`;
    disableBoardClick();
}

function disableBoardClick(){
    clickAllowed = false;
}

function checkDrawCombo(event){
    var totalMoves = playerOne.moves.length + playerTwo.moves.length;
    if (totalMoves === 9){
        playerOne.wins += 0;
        playerTwo.wins += 0;
        announceDraw();
        resetGame(event);
        return true
    }
    return false;
}

function announceDraw(){
    currentTurnStatement.innerText = 'This match is a tie!';
}

function resetGameData(){
    playerOne.moves=[];
    playerTwo.moves=[];
    resetPlayerTurn();
}

function resetGameBoard(){
    for(var i = 0; i<boxes.length; i++){
        var boxesToReset = boxes[i];
        boxesToReset.innerHTML = ``
        clickAllowed = true;
    }
}

function resetPlayerTurn(){
    if(startingPlayer === playerOne){
        startingPlayer = playerTwo;
        playerTwo.currentTurn = true;
        playerOne.currentTurn = false;
        announcePlayerTurn();
    }else if(startingPlayer === playerTwo){
        startingPlayer = playerOne
        playerTwo.currentTurn = false;
        playerOne.currentTurn = true;
        announcePlayerTurn();
    }
}

function resetGame(){
    setTimeout(function() {
            resetGameData();
            resetGameBoard();
        },4000);
}



