import {gameBoard,gameController} from './gameLogic.js';
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
  export{playerFactory};