
// Query Selectors
var playerOneSymbol = document.querySelector(`.player-one-symbol`)
var playerTwoSymbol = document.querySelector(`.player-two-symbol`)

var playerOneWinCount = document.querySelector(`.win-one-count`)
var playerTwoWinCount = document.querySelector(`.win-two-count`)

var shuffleStartButton = document.querySelector(`.shuffle-start-button`)
var playersTurnStatement = document.querySelector(`.players-turn-statement`)

var topLeftBox = document.querySelector(`.top-left`)
var topCenterBox = document.querySelector(`.top-center`)
var topRightBox = document.querySelector(`.top-right`)

var centerLeftBox = document.querySelector(`.center-left`)
var centerCenterBox = document.querySelector(`.center-center`)
var centerRightBox = document.querySelector(`.center-right`)

var bottomLeftBox = document.querySelector(`.bottom-left`)
var bottomCenterBox = document.querySelector(`.bottom-center`)
var bottomRightBox = document.querySelector(`.bottom-left`)


// Event Listeners
// playerOneWinCount
// playerTwoWinCount
// 
topLeftBox.addEventListener('click', checkBox);
topCenterBox.addEventListener('click', checkBox);
topRightBox.addEventListener('click', checkBox);

centerLeftBox.addEventListener('click', checkBox);
centerCenterBox.addEventListener('click', checkBox);
centerRightBox.addEventListener('click', checkBox);

bottomLeftBox.addEventListener ('click', checkBox);
bottomCenterBox.addEventListener('click', checkBox);
bottomRightBox.addEventListener('click', checkBox);

shuffleStartButton.addEventListener('click', shuffleStart)


// Data Model



// Functions

var players = [
    {id: 'player 1', token:'X', wins: 0, goesFirst: true, moves:[]},
    {id: 'player 2', token: 'O', wins: 0, goesFirst: true, moves:[]}
];

// function players(id, token, wins){
    // return {
        // id: id,
        // token: token,
        // wins: 0,
        // goesFirst: true,
    // }
// }

function shuffleStart(){
    var randomArray = [1, 2, 3, 4, 5, 6]
    var randomNumber = Math.floor(Math.random() * randomArray.length)

    if(randomNumber % 2){
        players[0].goesFirst =true
        players[1].goesFirst = false
        console.log(players)
        return playersTurnStatement.innerText = 'Player 1 goes first!'
    }else{
        players[1].goesFirst = true
        players[0].goesFirst = false
        return playersTurnStatement.innerText = 'Player 2 goes first!'  
        }
}

function selectFirstToken(){
    if(player[0].goesFirst=true){

    }
}
// 

// function checkBox(event){
    // console.log(event.target)
    // shuffleStart()
    // return event.target
// }
// 
// 
// 