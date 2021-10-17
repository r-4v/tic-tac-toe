function startGame()
{let playerOne = playerFactory("X");
let playerTwo = playerFactory("O");
const selectors = (function () {
  let gameGrid = document.querySelector("#game-grid");
  return { gameGrid };
})();

const staticListeners = (function () {
  let playerTurnDiv = document.querySelector("#player-turn");
  let resetButton = document.querySelector("#restart-button");
  return {resetButton, playerTurnDiv };
})();

const gameBoard = (function () {
    selectors.gameGrid.innerHTML = "";
    selectors.gameGrid.setAttribute(
    "style",
    "display:grid; grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);height:450px;width:450px;border:5px solid #3500d3"
  );
  for (let i = 0; i < 9; i++) {
    let gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridItem.gridpos = i;
    selectors.gameGrid.appendChild(gridItem);
    gridItem.setAttribute(
      "style",
      "border:2px solid #3500d3;color:white; text-align:center;padding:50px;font-size:35px;font-family:sans-serif;background-color:#1a1a1d;"
    );
  }

  let gridItems = document.querySelectorAll(".grid-item");
  let gameStateArray = ["", "", "", "", "", "", "", "", ""];
  
  function setGameState(index, playerSelection) {
    gameStateArray.splice(index, 1, playerSelection);
  }
  function getGameState() {
    return gameStateArray;
  }
  return { gameStateArray, gridItems, setGameState, getGameState };
})(selectors);

const gameController = (function () {
  let currentPlayerSymbol = "X";
  staticListeners.playerTurnDiv.innerText = "Player X turn";
  function setCurrentPlayerSymbol(symbol) {
    currentPlayerSymbol = symbol;
  }
  function getCurrentPlayerSymbol() {
    return currentPlayerSymbol;
  }

  function turnController(e) {
    if (getCurrentPlayerSymbol() === "X") {
      staticListeners.playerTurnDiv.innerText = "Player O turn";
      playerOne.play(e);
    } else {
      staticListeners.playerTurnDiv.innerText = "Player X turn";
      playerTwo.play(e);
    }
  }
  function checkTieState(){
    if (gameBoard.getGameState().indexOf("") === -1 && !(playerOne.playerWinState() || playerTwo.playerWinState())){
      console.log("game tied");
      staticListeners.playerTurnDiv.innerText = "Game Tied";
    }
  }
  function checkWinState() {
    if (playerOne.playerWinState() || playerTwo.playerWinState()) {
      console.log(playerOne.playerWinState() || playerTwo.playerWinState());
      staticListeners.playerTurnDiv.innerText =
        playerOne.playerWinState() || playerTwo.playerWinState();
      gameBoard.gridItems.forEach((gridItem) => {
        gridItem.replaceWith(gridItem.cloneNode(true));
        console.log("removing listeners");
      });
    }
  }
  function gameProgressChecker(e) {
    checkTieState();
    checkWinState();
    if (gameBoard.getGameState().indexOf("") !== -1) {
      e.target.innerText = currentPlayerSymbol;
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

const dynamicListeners = (function () {
  function attachListeners(){
  gameBoard.gridItems.forEach((gridItem) => {
    gridItem.addEventListener("click", gameController.placeSymbol);
    console.log("listener attached");
  });}
  attachListeners();
  return {attachListeners};
})(gameBoard, gameController);


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

  function playerWinState() {
    let currentGameArray = gameBoard.getGameState();
    for (i = 0; i < winConditionState.length; i++) {
      if (
        currentGameArray[winConditionState[i][0]] === playerSymbol &&
        currentGameArray[winConditionState[i][1]] === playerSymbol &&
        currentGameArray[winConditionState[i][2]] === playerSymbol
      ) {
        return `Player ${playerSymbol} wins`;
      }
    }
  }
  return { playerSymbol, playerWinState, play };
}
}
startGame();

const resetGame = (function(){
  let resetButton = document.querySelector("#restart-button");
  resetButton.addEventListener("click",reset);
  function reset(){
    startGame();
  }
  return {reset};
})()