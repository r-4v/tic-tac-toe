const actionNodes = (function () {
    let gameGrid = document.querySelector("#game-grid");
    let playerTurnDiv = document.querySelector("#player-turn");
    let resetButton = document.querySelector("#restart-button");
    function gameInfoDisplay(message){
      playerTurnDiv.innerText = message;
    }
    function removeListeners(){
      let gridItems = document.querySelectorAll(".grid-item");
      gridItems.forEach((gridItem) => {
       gridItem.replaceWith(gridItem.cloneNode(true));
      });}
    return {resetButton, playerTurnDiv,gameGrid ,gameInfoDisplay,removeListeners};
  })();
  
  const domStuff = (function(){
      function resetGrid(){
    actionNodes.gameGrid.innerHTML = "";
    actionNodes.gameGrid.setAttribute(
    "style",
    "display:grid; grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);height:450px;width:450px;border:5px solid #3500d3"
  );
  for (let i = 0; i < 9; i++) {
    let gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridItem.gridpos = i;
    actionNodes.gameGrid.appendChild(gridItem);
    gridItem.setAttribute(
      "style",
      "border:2px solid #3500d3;color:white; text-align:center;padding:50px;font-size:35px;font-family:sans-serif;background-color:#1a1a1d;"
    );
  }
}
resetGrid();
let gridItems = document.querySelectorAll(".grid-item");

function playerChoiceSetter(e,currentPlayerSymbol){
  e.target.innerText = currentPlayerSymbol;
}
  return {gridItems,resetGrid,playerChoiceSetter};
  })();
 
export {actionNodes,domStuff};
  
  
  
  
  
  
  
  
  
  
  
  