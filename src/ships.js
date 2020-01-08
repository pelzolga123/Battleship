const Ship = (size) => {
  const hitCoords = [];

  const hit = (coords) => {
    hitCoords.push(coords);
  };

  const isSunk = () => {
    let status;
    if (size === hitCoords.length) {
      status = true;
    }
    return status;
  };

  return {
    size,
    hitCoords,
    hit,
    isSunk,
  };
};
export default Ship;
