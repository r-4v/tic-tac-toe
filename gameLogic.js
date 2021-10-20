import {selectedNodes,domStuff} from './domsetup.js';
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
    let currentPlayerSymbol = "X";
    selectedNodes.playerTurnDiv.innerText = "Player X turn"; // dom stuff
    //initial stage set -----------------------------
  
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
        e.target.innerText = currentPlayerSymbol; //dom stuff
        turnController(e);
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
  
    return {
      turnController,
      placeSymbol,
      setCurrentPlayerSymbol,
      getCurrentPlayerSymbol,
    };
  })(gameBoard);






  export {gameBoard,gameController};