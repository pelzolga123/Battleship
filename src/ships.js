const Ship = (size) => {
  const hitCoords = new Set();

  const hit = (coords) => {
    hitCoords.add(coords);
  };

  const isSunk = () => hitCoords.size;

  return {
    size,
    hitCoords,
    hit,
    isSunk,
  };
};
export default Ship;
