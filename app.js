import {selectedNodes,domStuff} from './dom.js';
import {gameBoard,gameController} from './gameLogic.js';
function startGame()
{
  //setting up game
console.log("starting");


gameBoard.resetGameState();
// setup over
//dom stuff
domStuff.resetGrid();
domStuff.gridItems = document.querySelectorAll(".grid-item");







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