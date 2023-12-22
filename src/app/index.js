import createGame from "./functions/createGame";
import elements from "./views/base";

let game = createGame();

game.renderGrids();
game.renderFleet();

elements.autoPlaceBtn.addEventListener("click", (e) => {
  console.log("autoplaced player fleet");
  game.autoPlace();
});

elements.startBtn.addEventListener("click", (e) => {
  console.log("START GAME");
  game.startGame();
});

elements.playAgainBtn.addEventListener("click", (e) => {
  console.log("PLAY AGAIN?");
  game.playAgain();
});
