import {selectedNodes,domStuff} from './dom.js';
import {gameBoard} from './gameLogic.js';
function startGame()
{
  //setting up game
console.log("starting");
let playerOne = playerFactory("X");
let playerTwo = playerFactory("O");

gameBoard.resetGameState();
// setup over
//dom stuff
domStuff.resetGrid();
domStuff.gridItems = document.querySelectorAll(".grid-item");






const gameController = (function () {
  let currentPlayerSymbol = "X";
  selectedNodes.playerTurnDiv.innerText = "Player X turn"; // dom stuff
  function setCurrentPlayerSymbol(symbol) {
    currentPlayerSymbol = symbol;
  }
  function getCurrentPlayerSymbol() {
    return currentPlayerSymbol;
  }
                                                                                      //needs selectedNodes gameBoard playerOne playerTwo playerFactory  domStuff 
  function turnController(e) {
    if (getCurrentPlayerSymbol() === "X") {
      selectedNodes.playerTurnDiv.innerText = "Player O turn"; //dom stuff
      playerOne.play(e);
    } else {
      selectedNodes.playerTurnDiv.innerText = "Player X turn"; //dom stuff
      playerTwo.play(e);
    }
  }
  function checkTieState(){
    if (gameBoard.getGameState().indexOf("") === -1 && !(playerOne.checkPlayerWinState() || playerTwo.checkPlayerWinState())){
      console.log("game tied");
      selectedNodes.playerTurnDiv.innerText = "Game Tied"; //dom stuff
    }
  }
  function checkWinState() {
    if (playerOne.checkPlayerWinState() || playerTwo.checkPlayerWinState()) {
      console.log(playerOne.checkPlayerWinState() || playerTwo.checkPlayerWinState());
      //dom stuff
      selectedNodes.playerTurnDiv.innerText =
        playerOne.checkPlayerWinState() || playerTwo.checkPlayerWinState();
      domStuff.gridItems.forEach((gridItem) => {
        gridItem.replaceWith(gridItem.cloneNode(true));
        console.log("removing listeners");
      });//dom stuff
    }
  }
  function gameProgressChecker(e) {
    checkTieState();
    checkWinState();
    if (gameBoard.getGameState().indexOf("") !== -1) {
      e.target.innerText = currentPlayerSymbol; //dom stuff
      turnController(e);
    }
  }

  function placeSymbol(e) {
    console.log(currentPlayerSymbol);
    console.log(e.target.gridpos);
    gameProgressChecker(e);
    checkWinState();
    checkTieState();
  }
  return {
    turnController,
    placeSymbol,
    setCurrentPlayerSymbol,
    getCurrentPlayerSymbol,
  };
})(gameBoard);
//dom stuff
const dynamicListeners = (function () {
  function attachListeners(){
    console.log("attaching");
    console.log(domStuff.gridItems)

  domStuff.gridItems.forEach((gridItem) => {
    gridItem.addEventListener("click", gameController.placeSymbol,{once:true});
    console.log("listener attached");
  });}
  attachListeners();
  return {};
}//dom stuff
)(gameBoard, gameController);























function playerFactory(playerSymbol) {
  function play(e) {
    if (gameBoard.getGameState()[e.target.gridpos] === "") {
      gameBoard.setGameState(
        e.target.gridpos,
        gameController.getCurrentPlayerSymbol()
      );
      console.log(gameBoard.gameStateArray);
      if (gameController.getCurrentPlayerSymbol() === "X") {
        gameController.setCurrentPlayerSymbol("O");
      } else {
        gameController.setCurrentPlayerSymbol("X");
      }
    }
  }

  let winConditionState = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkPlayerWinState() {
    let currentGameArray = gameBoard.getGameState();
    for (let i = 0; i < winConditionState.length; i++) {
      if (
        currentGameArray[winConditionState[i][0]] === playerSymbol &&
        currentGameArray[winConditionState[i][1]] === playerSymbol &&
        currentGameArray[winConditionState[i][2]] === playerSymbol
      ) {
        return `Player ${playerSymbol} wins`;
      }
    }
  }
  return { playerSymbol, checkPlayerWinState, play };
}
}
startGame();

const resetGame = (function(){
  let resetButton = document.querySelector("#restart-button");
  resetButton.addEventListener("click",reset);
  function reset(){
    console.log('restarting');
    startGame();
  }
  return {reset};
})()



//export{gameBoard};