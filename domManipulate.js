import { gameController } from "./gameLogic.js";
import {domStuff} from './domsetup.js';
const dynamicListeners = (function () {
    function attachListeners(){
      console.log("attaching");
      console.log(domStuff.gridItems)
  
    domStuff.gridItems.forEach((gridItem) => {
      gridItem.addEventListener("click", gameController.placeSymbol,{once:true});
      console.log("listener attached");
    });}
    attachListeners();
    return {attachListeners};
  }//dom stuff
  )(gameController);
  export{dynamicListeners};