const createShip = (name, position) => {
  let hits = [];

  const hit = (hitIndex) => {
    hits.push(hitIndex);
    isSank();
  };

  const isSank = () => {
    return hits.length === position.length;
  };

  return { name, position, hits, hit, isSank };
};

export default createShip;
