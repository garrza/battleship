import createGameboard from "../functions/createGameboard";

describe("createGameboard", () => {
  const gameboard = createGameboard();

  test("returns an object", () => {
    expect(typeof gameboard).toBe("object");
  });

  test("has a board property", () => {
    expect(gameboard).toHaveProperty("board");
  });

  test("has a placeShip method", () => {
    expect(typeof gameboard.placeShip).toBe("function");
  });

  test("has a receiveAttack method", () => {
    expect(typeof gameboard.receiveAttack).toBe("function");
  });

  test("has a isAllSank method", () => {
    expect(typeof gameboard.isAllSank).toBe("function");
  });

  test("board property is an array", () => {
    expect(Array.isArray(gameboard.board)).toBe(true);
  });

  test("placeShip method places a ship on the board", () => {
    const ship = { name: "Destroyer", position: [0, 1, 2] };
    gameboard.placeShip(ship, ship.position);
    expect(gameboard.board[0].ship).toEqual(ship);
    expect(gameboard.board[1].ship).toEqual(ship);
    expect(gameboard.board[2].ship).toEqual(ship);
  });

  test("receiveAttack method marks the cell as hit", () => {
    gameboard.receiveAttack(0);
    expect(gameboard.board[0].hit).toBe(true);
  });

  test("receiveAttack method calls the hit method of the ship", () => {
    const ship = { name: "Destroyer", position: [0, 1, 2], hit: jest.fn() };
    gameboard.placeShip(ship, ship.position);
    gameboard.receiveAttack(0);
    expect(ship.hit).toHaveBeenCalledWith(0);
  });

  test("isAllSank method returns false if not all ships are sank", () => {
    expect(gameboard.isAllSank()).toBe(false);
  });

  test("isAllSank method returns true if all ships are sank", () => {
    const ship = {
      name: "Destroyer",
      position: [0, 1, 2],
      isSank: jest.fn(() => true),
    };
    gameboard.placeShip(ship, ship.position);
    expect(gameboard.isAllSank()).toBe(true);
  });
});
