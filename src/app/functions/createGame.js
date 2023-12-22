import createGameboard from "./createGameboard";
import createPlayer from "./createPlayer";
import createDrag from "./createDrag";
import gameboardView from "../views/gameboardView";
import elements from "../views/base";

const createGame = () => {
  const player = createPlayer("human");
  const computer = createPlayer("computer");

  const playerBoard = createGameboard();
  const computerBoard = createGameboard();

  const drag = createDrag(player, playerBoard);

  const resetGame = () => {
    player.resetFleet;
    computer.resetFleet;
    playerBoard.resetBoard;
    computerBoard.resetBoard;
  };

  const addRotateEventListeners = () => {
    const ships = document.querySelectorAll(".ship");
    ships.forEach((ship) => {
      ship.addEventListener("dblclick", (e) => {
        const shipElement = e.target.parentElement;
        const ship = p1.getFleet()[shipElement.dataset.ship];
        ship.changeDirection();
        shipElement.classList.toggle("vertical");
      });
    });
  };

  const renderFleet = () => {
    gameboardView.renderFleet(player.getFleet());
    drag.addDragAndDropEvenListeners();
    addRotateEventListeners();
  };

  const addGridEventListeners = () => {
    elements.computerGrid.addEventListener("click", ctrlAttack);
  };

  const ctrlAttack = (e) => {
    const cell = e.target;
    if (cell.classList.contains("grid-cell")) {
      const y = cell.dataset.y;
      const x = cell.dataset.x;
      const boardCell = computerBoard.getBoard()[y][x];
      if (boardCell !== "miss" && boardCell !== "hit") {
        player.attack(y, x, computerBoard);
        computer.autoAttack(playerBoard);
        renderGrids();

        if (playerBoard.areAllShipsSunk() || computerBoard.areAllShipsSunk()) {
          let winner = "";
          if (playerBoard.areAllShipsSunk()) {
            winner = "Computer wins!";
          } else if (computerBoard.areAllShipsSunk()) {
            winner = "You win!";
          }
          elements.computerGrid.removeEventListener("click", ctrlAttack);
          gameboardView.renderWinner(winner);
        }
      }
    }
  };

  const renderGrids = () => {
    gameboardView.renderGrid(
      elements.playerGrid,
      playerBoard,
      player.getType()
    );
    gameboardView.renderGrid(
      elements.computerGrid,
      computerBoard,
      computer.getType()
    );
  };

  const autoPlace = () => {
    playerBoard.reset();
    playerBoard.autoPlaceFleet(player.getFleet());
    renderGrids();
    gameboardView.autoPlace();
  };

  const startGame = () => {
    addGridEventListeners();
    if (computer.getType() === "computer")
      computerBoard.autoPlaceFleet(computer.getFleet());
    gameboardView.startGame();
  };

  const playAgain = () => {
    resetGame();
    resetFleet();
    gameboardView.playAgain();
    renderFleet();
  };

  return {
    renderGrids,
    renderFleet,
    autoPlace,
    startGame,
    playAgain,
  };
};

export default createGame;
