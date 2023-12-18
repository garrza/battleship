const createPlayer = (name) => {
  let ships = [];
  let missedAttacks = [];
  let attacks = [];
  let isTurn = false;
  let isWinner = false;

  return { name, ships, missedAttacks, attacks, isTurn, isWinner };
};

export default createPlayer;
