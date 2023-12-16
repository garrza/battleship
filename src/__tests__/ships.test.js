import createShip from "../functions/ships";

describe("ships", () => {
  let testShip;
  let testSubmarine;

  beforeEach(() => {
    testShip = createShip(2);
    testSubmarine = createShip(3);
  });

  it("returns an object", () => {
    expect(typeof testShip).toBe("object");
  });

  it("accepts a hit", () => {
    testSubmarine.hit();
    expect(testSubmarine.numberOfHits).toBe(1);
  });

  it("accepts multiple hits", () => {
    testShip.hit();
    testShip.hit();
    expect(testShip.numberOfHits).toBe(2);
  });

  it("returns true if ship is sank", () => {
    testSubmarine.hit();
    testSubmarine.hit();
    expect(testSubmarine.isSank()).toBe(true);
  });

  it("returns false if ship is not sank", () => {
    expect(testShip.isSank()).toBe(false);
  });
});
