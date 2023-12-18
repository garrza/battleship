import createShip from "./createShip";

const createGameboard = () => {
  const board = [];

  const createBoard = () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        board.push({ ship: null, hit: false });
      }
    }
  };

  const placeShip = (newShip) => {
    newShip.position.forEach((index) => {
      board[index].ship = newShip;
    });
  };

  const receiveAttack = (index) => {
    if (board[index].ship) {
      board[index].ship.hit(index);
      board[index].ship = "beenHit";
    }
    board[index].hit = true;
  };

  const isAllSank = () => {
    return board.every((cell) => {
      return cell.ship == null || cell.ship == "beenHit";
    });
  };

  createBoard();

  return { board, placeShip, receiveAttack, isAllSank };
};

export default createGameboard;
