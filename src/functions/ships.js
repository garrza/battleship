const createShip = (length) => {
  let numberOfHits = 0;
  let sank = false;

  const hit = () => {
    numberOfHits++;
    isSank(); // Call isSank() after each hit to update the sank status
  };

  const isSank = () => {
    sank = numberOfHits === length;
  };

  return { length, numberOfHits, sank, hit, isSank };
};

export default createShip;
