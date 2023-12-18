import createShip from "../functions/createShip";
import shipTypes from "../helpers/shipTypes";

describe("createShip", () => {
  const ship = createShip(shipTypes[0], [0, 1, 2]);

  test("returns an object", () => {
    expect(typeof ship).toBe("object");
  });
  test("has a name property", () => {
    expect(ship).toHaveProperty("name");
  });

  test("has a size property", () => {
    expect(ship).toHaveProperty("size");
  });

  test("has a position property", () => {
    expect(ship).toHaveProperty("position");
  });

  test("has a hits property", () => {
    expect(ship).toHaveProperty("hits");
  });

  test("has a hit method", () => {
    expect(typeof ship.hit).toBe("function");
  });

  test("has a isSank method", () => {
    expect(typeof ship.isSank).toBe("function");
  });

  test("name property is a string", () => {
    expect(typeof ship.name).toBe("string");
  });

  test("position property is an array", () => {
    expect(Array.isArray(ship.position)).toBe(true);
  });

  test("hits property is an array", () => {
    expect(Array.isArray(ship.hits)).toBe(true);
  });

  test("hit method adds a hit to the hits array", () => {
    ship.hit(0);
    expect(ship.hits).toEqual([0]);
  });

  test("isSank method returns false if ship is not sank", () => {
    expect(ship.isSank()).toBe(false);
  });

  test("isSank method returns true if ship is sank", () => {
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSank()).toBe(true);
  });
});
