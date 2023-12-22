import { SHIP_TYPES, randCoords, createFleet } from "../helpers/helpers";

const createPlayer = (type = "human") => {
  let fleet = createFleet(SHIP_TYPES);

  const getType = () => type;
  const getFleet = () => fleet;

  // Attacks enemyBoard at coords [y][x];
  const attack = (y, x, enemyBoard) => enemyBoard.receiveAttack(y, x);

  const autoAttack = (enemyBoard) => {
    let [y, x] = randCoords();

    if (autoAttack.lastHit) {
      const possibleCoordinates = [
        [autoAttack.lastHit[0] - 1, autoAttack.lastHit[1]], // Up
        [autoAttack.lastHit[0] + 1, autoAttack.lastHit[1]], // Down
        [autoAttack.lastHit[0], autoAttack.lastHit[1] - 1], // Left
        [autoAttack.lastHit[0], autoAttack.lastHit[1] + 1], // Right
      ];

      // Filter out invalid coordinates
      const validCoordinates = possibleCoordinates.filter((coord) => {
        const [y, x] = coord;
        return (
          y >= 0 &&
          y <= 10 &&
          x >= 0 &&
          x <= 10 &&
          enemyBoard.getBoard()[y][x] !== "miss" &&
          enemyBoard.getBoard()[y][x] !== "hit"
        );
      });

      // Choose a random valid coordinate from the list
      if (validCoordinates.length > 0) {
        [y, x] =
          validCoordinates[Math.floor(Math.random() * validCoordinates.length)];
      } else {
        autoAttack.lastHit = null;
        autoAttack(enemyBoard);
      }
    }

    const cell = enemyBoard.getBoard()[y][x];

    if (cell === "miss" || cell === "hit") {
      // Tries again until a valid cell is picked
      autoAttack(enemyBoard);
    } else {
      // Attacks a valid cell
      enemyBoard.receiveAttack(y, x);

      // Update last hit coordinates if it was a hit
      if (cell === "hit") {
        autoAttack.lastHit = [y, x];
      } else {
        autoAttack.lastHit = null; // Reset lastHit if it was a miss
      }
    }
  };

  const resetFleet = () => (fleet = createFleet(SHIP_TYPES));

  return { getType, getFleet, attack, autoAttack, resetFleet };
};

export default createPlayer;
