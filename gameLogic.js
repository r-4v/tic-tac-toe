import {actionNodes,domStuff} from './domsetup.js';
import { playerFactory } from './playerFactory.js';
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

let playerOne = playerFactory("X");
let playerTwo = playerFactory("O");

  const gameController = (function () {
    
    let currentPlayerSymbol ;
    function setInitialGameState(){
        currentPlayerSymbol = "X";
        actionNodes.gameInfoDisplay("Player X turn");
    } 
    function setCurrentPlayerSymbol(symbol) {
      currentPlayerSymbol = symbol;
    }
    function getCurrentPlayerSymbol() {
      return currentPlayerSymbol;
    }

    function turnController(e) {
      if (getCurrentPlayerSymbol() === "X") {
        actionNodes.gameInfoDisplay( "Player O turn");
        playerOne.play(e);
      } else {
        actionNodes.gameInfoDisplay("Player X turn"); 
        playerTwo.play(e);
      }
    }
    function placeSymbol(e) {
      console.log(currentPlayerSymbol);
      console.log(e.target.gridpos);
      gameProgressChecker(e);
      checkWinState();
      checkTieState();
    }
  
    function gameProgressChecker(e) {
      checkTieState();
      checkWinState();
      if (gameBoard.getGameState().indexOf("") !== -1) {
        domStuff.playerChoiceSetter(e,currentPlayerSymbol); 
        turnController(e);
      }
    }
    function checkTieState(){
      if (gameBoard.getGameState().indexOf("") === -1 && !(playerOne.checkPlayerWinState() || playerTwo.checkPlayerWinState())){
        console.log("game tied");
        actionNodes.gameInfoDisplay("Game Tied"); 
      }
    }
    function checkWinState() {
      if (playerOne.checkPlayerWinState() || playerTwo.checkPlayerWinState()) {
        console.log(playerOne.checkPlayerWinState() || playerTwo.checkPlayerWinState());
        actionNodes.gameInfoDisplay(playerOne.checkPlayerWinState() || playerTwo.checkPlayerWinState());
        actionNodes.removeListeners();
      }
    }
    return {
      turnController,
      placeSymbol,
      setCurrentPlayerSymbol,
      getCurrentPlayerSymbol,
      setInitialGameState,
    };
  })(gameBoard);

  export {gameBoard,gameController};