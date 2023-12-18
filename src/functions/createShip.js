const createShip = (shipType, position) => {
  const name = shipType.name;
  const size = shipType.size;
  let hits = [];

  const hit = (hitIndex) => {
    hits.push(hitIndex);
    isSank();
  };

  const isSank = () => {
    return hits.length === position.length;
  };

  return { name, size, position, hits, hit, isSank };
};

export default createShip;
