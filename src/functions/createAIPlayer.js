import createPlayer from "./createPlayer";

const createAIPlayer = () => {
  const player = createPlayer("AI", "O");

  const attack = (gameboard) => {
    // 1. If there are no previous attacks, attack a random square
    if (player.attacks.length === 0) {
      const randomIndex = Math.floor(Math.random() * 100);
      player.attacks.push(randomIndex);
      return randomIndex;
    }

    // 2. If there are previous attacks, attack a random adjacent square
    //    to the last attack
    const lastAttack = player.attacks[player.attacks.length - 1];
    const adjacentSquares = getAdjacentSquares(lastAttack);
    const unattackedAdjacentSquares = adjacentSquares.filter((square) => {
      return !player.attacks.includes(square);
    });
    if (unattackedAdjacentSquares.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * unattackedAdjacentSquares.length
      );
      const randomAdjacentSquare = unattackedAdjacentSquares[randomIndex];
      player.attacks.push(randomAdjacentSquare);
      return randomAdjacentSquare;
    }

    // 3. If there are previous attacks and all adjacent squares have
    //    been attacked, attack a random square
    const unattackedSquares = gameboard.board
      .map((square, index) => {
        return index;
      })
      .filter((square) => {
        return !player.attacks.includes(square);
      });
    const randomIndex = Math.floor(Math.random() * unattackedSquares.length);
    const randomSquare = unattackedSquares[randomIndex];
    player.attacks.push(randomSquare);
    return randomSquare;
  };

  const getAdjacentSquares = (index) => {
    const adjacentSquares = [];
    if (index % 10 !== 0) {
      adjacentSquares.push(index - 1);
    }
    if ((index + 1) % 10 !== 0) {
      adjacentSquares.push(index + 1);
    }
    if (index >= 10) {
      adjacentSquares.push(index - 10);
    }
    if (index <= 89) {
      adjacentSquares.push(index + 10);
    }
    return adjacentSquares;
  };

  return { player, attack };
};

export default createAIPlayer;
