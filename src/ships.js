const shipFactory = (length, coords) => {
  const hitCoords = [];

  const isSunk = () => {
    if (length === hitCoords.length) {
      return true;
    }
    return false;
  };

  const hit = () => hitCoords.push(coords);
  return {
    hitCoords,
    isSunk,
    hit,
  };
};

export default shipFactory;
