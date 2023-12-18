import elements from "./base";

const gameboardView = () => {
  const renderCell = (cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    if (cell.ship) {
      cellElement.classList.add("ship");
    }
    if (cell.hit) {
      cellElement.classList.add("hit");
    }
    if (cell.ship == "beenHit") {
      cellElement.classList.add("beenHit");
    }
    cellElement.setAttribute("data-index", index);
    return cellElement;
  };

  const renderBoard = (board) => {
    const boardElement = document.createElement("div");
    boardElement.classList.add("board");
    board.forEach((cell, index) => {
      boardElement.appendChild(renderCell(cell, index));
    });
    return boardElement;
  };

  const renderGameboard = (gameboard) => {
    const gameboardElement = document.createElement("div");
    gameboardElement.classList.add("gameboard");
    gameboardElement.appendChild(renderBoard(gameboard.board));
    return gameboardElement;
  };

  const renderGameboards = (gameboards) => {
    const gameboardsElement = document.createElement("div");
    gameboardsElement.classList.add("gameboards");
    gameboardsElement.appendChild(renderGameboard(gameboards.player));
    gameboardsElement.appendChild(renderGameboard(gameboards.ai));
    return gameboardsElement;
  };

  const render = (gameboards) => {
    elements.gameboardContainer.appendChild(renderGameboards(gameboards));
  };

  return { render };
};

export default gameboardView;
