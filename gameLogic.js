const gameBoard = (function () {
    let gameStateArray = ["", "", "", "", "", "", "", "", ""];
    function resetGameState(){
         gameStateArray = ["", "", "", "", "", "", "", "", ""];
    }
    function setGameState(index, playerSelection) {
      gameStateArray.splice(index, 1, playerSelection);
    }
    function getGameState() {
      return gameStateArray;
    }
    return { gameStateArray, setGameState, getGameState,resetGameState };
  })();

  export {gameBoard};