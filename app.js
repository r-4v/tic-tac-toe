let playerOne = playerFactory("X");
let playerTwo = playerFactory("O");

const selectors = (function () {
  let gameGrid = document.querySelector("#game-grid");

  return { gameGrid };
})();

const gameBoard = (function () {
  selectors.gameGrid.setAttribute(
    "style",
    "display:grid; grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);height:450px;width:450px;border:5px solid #3500d3"
  );
  for (let i = 0; i < 9; i++) {
    let gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridItem.gridpos = i;
    selectors.gameGrid.appendChild(gridItem);
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

const displayController = (function () {
  console.log(gameBoard.gridItems);
  function displayContents() {
    Array.from(gameBoard.gridItems).forEach((gridItem) => {
      gridItem.setAttribute(
        "style",
        "border:2px solid #3500d3;color:white; text-align:center;padding:50px;font-size:35px;font-family:sans-serif;background-color:#1a1a1d;"
      );
    });
  }
  displayContents();
})(gameBoard, selectors);

const listeners = (function () {
  gameBoard.gridItems.forEach((gridItem) => {
    gridItem.addEventListener("click", placeSymbol);
  });

  let currentPlayerSymbol = "X";
  function setCurrentPlayerSymbol(symbol) {
    currentPlayerSymbol = symbol;
  }
  function getCurrentPlayerSymbol() {
    return currentPlayerSymbol;
  }
  function placeSymbol(e) {
    console.log(currentPlayerSymbol);
    console.log(e.target.gridpos);
    if(playerOne.playerWinState()|| playerTwo.playerWinState()){
        console.log(playerOne.playerWinState()||playerTwo.playerWinState());
        let gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach((gridItem) => {
    gridItem.replaceWith(gridItem.cloneNode(true));
  });
    }

    if(gameBoard.getGameState().indexOf("")!==-1)
    {e.target.innerText = currentPlayerSymbol;
    gameController(e);}
   
  }
  return { placeSymbol, setCurrentPlayerSymbol, getCurrentPlayerSymbol };
})(selectors, gameBoard);

function gameController(e) {
  if (listeners.getCurrentPlayerSymbol() === "X") {
    playerOne.play(e);
  } else {
    playerTwo.play(e);
  }
}

function playerFactory(playerSymbol) {
  function play(e) {
    if (gameBoard.getGameState()[e.target.gridpos] === "") {
      gameBoard.setGameState(e.target.gridpos,listeners.getCurrentPlayerSymbol());
      console.log(gameBoard.gameStateArray);
      if (listeners.getCurrentPlayerSymbol() === "X") {
        listeners.setCurrentPlayerSymbol("O");
      } else {
        listeners.setCurrentPlayerSymbol("X");
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
    //let currentGameArray = ["X", "X", "O", "O", "X", "X", "X", "X", "O"];
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


let playerOneWinMsg = playerOne.playerWinState();
let playerTwoWinMsg = playerTwo.playerWinState();
console.log(playerOneWinMsg); 
console.log(playerTwoWinMsg);

