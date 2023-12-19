import createGameboard from "./createGameboard";
import createPlayer from "./createPlayer";
import createAIPlayer from "./createAIPlayer";
import createShip from "./createShip";
import shipTypes from "../helpers/shipTypes";
import gameboardView from "../views/gameboardView";

// Complete game logic for Battleship
const createGame = () => {
  const player1Gameboard = createGameboard();
  const player2Gameboard = createGameboard();
  const player1 = createPlayer("Player 1", player1Gameboard);
  const player2 = createAIPlayer("Player 2", player2Gameboard);
  let activePlayer = player1;
  let inactivePlayer = player2;
  let winner = null;

  const startGame = () => {
    // Create ships for each player
    const player1Ships = [
      createShip(shipTypes.carrier),
      createShip(shipTypes.battleship),
      createShip(shipTypes.cruiser),
      createShip(shipTypes.submarine),
      createShip(shipTypes.destroyer),
    ];
    const player2Ships = [
      createShip(shipTypes.carrier),
      createShip(shipTypes.battleship),
      createShip(shipTypes.cruiser),
      createShip(shipTypes.submarine),
      createShip(shipTypes.destroyer),
    ];

    // Add ships to gameboards
    player1Ships.forEach((ship) => {
      player1.gameboard.placeShip(ship);
    });
    player2Ships.forEach((ship) => {
      player2.gameboard.placeShip(ship);
    });

    // Render gameboards
    gameboardView.renderGameboard(player1.gameboard, "player1");
    gameboardView.renderGameboard(player2.gameboard, "player2");

    // Add event listeners
    const player2Cells = document.querySelectorAll(".player2-cell");
    player2Cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (activePlayer === player1) {
          const x = e.target.dataset.x;
          const y = e.target.dataset.y;
          const attackResult = player1.attack(x, y);
          if (attackResult === "hit") {
            gameboardView.renderGameboard(player1.gameboard, "player1");
            if (player1.gameboard.allSunk()) {
              winner = player2;
              endGame();
            }
          }
          if (attackResult === "miss") {
            gameboardView.renderGameboard(player1.gameboard, "player1");
            activePlayer = player2;
            inactivePlayer = player1;
            setTimeout(() => {
              computerAttack();
            }, 1000);
          }
        }
      });
    });
  };

  const computerAttack = () => {
    const attackResult = player2.attack();
    if (attackResult === "hit") {
      gameboardView.renderGameboard(player2.gameboard, "player2");
      if (player2.gameboard.allSunk()) {
        winner = player1;
        endGame();
      }
    }
    if (attackResult === "miss") {
      gameboardView.renderGameboard(player2.gameboard, "player2");
      activePlayer = player1;
      inactivePlayer = player2;
    }
  };

  const endGame = () => {
    const winnerMessage = document.createElement("div");
    winnerMessage.classList.add("winner-message");
    winnerMessage.textContent = `${winner.name} wins!`;
    document.body.appendChild(winnerMessage);
  };

  return { startGame };
};

export default createGame;
