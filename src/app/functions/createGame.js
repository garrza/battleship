import createGameboard from "./createGameboard";
import createPlayer from "./createPlayer";
import createAIPlayer from "./createAIPlayer";
import createDrag from "./createDrag";
import gameboardView from "../views/gameboardView";
import elements from "../views/base";

const createGame = () => {
  const player = createPlayer("human");
