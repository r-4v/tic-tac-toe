import { actionNodes, domStuff } from "./domsetup.js";
import { dynamicListeners } from "./domManipulate.js";
import { gameBoard, gameController } from "./gameLogic.js";
function startGame() {
  //setting up game
  console.log("starting");
  gameBoard.resetGameState();
  // setup over
  //dom setup
  domStuff.resetGrid();
  domStuff.gridItems = document.querySelectorAll(".grid-item");
  //dom manipulate
  gameController.setInitialGameState();
  dynamicListeners.attachListeners();
}
startGame();

const resetGame = (function () {
  let resetButton = document.querySelector("#restart-button");
  resetButton.addEventListener("click", reset);
  function reset() {
    console.log("restarting");
    startGame();
  }
  return { reset };
})();
