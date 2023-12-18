import createPlayer from "../functions/createPlayer";

describe("createPlayer", () => {
  const player = createPlayer("Player");

  test("returns an object", () => {
    expect(typeof player).toBe("object");
  });

  test("has a name property", () => {
    expect(player).toHaveProperty("name");
  });

  test("has a ships property", () => {
    expect(player).toHaveProperty("ships");
  });

  test("has a missedAttacks property", () => {
    expect(player).toHaveProperty("missedAttacks");
  });

  test("has a attacks property", () => {
    expect(player).toHaveProperty("attacks");
  });

  test("has a isTurn property", () => {
    expect(player).toHaveProperty("isTurn");
  });

  test("has a isWinner property", () => {
    expect(player).toHaveProperty("isWinner");
  });

  test("name property is a string", () => {
    expect(typeof player.name).toBe("string");
  });

  test("ships property is an array", () => {
    expect(Array.isArray(player.ships)).toBe(true);
  });

  test("missedAttacks property is an array", () => {
    expect(Array.isArray(player.missedAttacks)).toBe(true);
  });

  test("attacks property is an array", () => {
    expect(Array.isArray(player.attacks)).toBe(true);
  });

  test("isTurn property is a boolean", () => {
    expect(typeof player.isTurn).toBe("boolean");
  });

  test("isWinner property is a boolean", () => {
    expect(typeof player.isWinner).toBe("boolean");
  });
});
