import createGame from "./functions/createGame";
import { elements } from "./views/base";
import "../styles/styles.css";

let gameType = "singleplayer";
let game = createGame(gameType);

game.renderGrids();
game.renderFleet();

elements.autoPlaceBtn.addEventListener("click", (e) => {
  console.log("autoplaced player fleet");
  game.autoPlace();
});

elements.startBtn.addEventListener("click", (e) => {
  console.log("STAR GAMET");
  game.startGame();
});

elements.playAgainBtn.addEventListener("click", (e) => {
  console.log("PLAY AGAIN?");
  game.playAgain();
});
