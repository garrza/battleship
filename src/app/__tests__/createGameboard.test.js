import createGameboard from "../functions/createGameboard";
import createShip from "../functions/createShip";

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
    const ship = createShip("Destroyer", [0, 1, 2]);
    gameboard.placeShip(ship);
    expect(gameboard.board[0].ship).toEqual(ship);
    expect(gameboard.board[1].ship).toEqual(ship);
    expect(gameboard.board[2].ship).toEqual(ship);
    expect(gameboard.board[3].ship).toBe(null);
  });

  test("receiveAttack method marks the cell as hit", () => {
    gameboard.receiveAttack(0);
    expect(gameboard.board[0].hit).toBe(true);
  });

  test("isAllSank method returns false if not all ships are sank", () => {
    expect(gameboard.isAllSank()).toBe(false);
  });

  test("isAllSank method returns true if all ships are sank", () => {
    const ship = createShip("Destroyer", [0, 1, 2]);
    gameboard.placeShip(ship);
    gameboard.receiveAttack(0);
    gameboard.receiveAttack(1);
    gameboard.receiveAttack(2);
    expect(gameboard.isAllSank()).toBe(true);
  });
});
