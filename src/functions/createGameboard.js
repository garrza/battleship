import createShip from "./createShip";

const createGameboard = () => {
  const board = [];

  const createBoard = () => {
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        board.push({ ship: null, hit: false });
      }
    }
  };

  const placeShip = (ship, position) => {
    position.forEach((index) => {
      board[index].ship = ship;
    });
  };

  const receiveAttack = (index) => {
    if (board[index].ship) {
      board[index].ship.hit(index);
    }
    board[index].hit = true;
  };

  const isAllSank = () => {
    return board.every((cell) => {
      return cell.ship === null || cell.ship.isSank();
    });
  };

  createBoard();

  return { board, placeShip, receiveAttack, isAllSank };
};

export default createGameboard;
