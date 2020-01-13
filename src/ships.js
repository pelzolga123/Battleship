const Ship = (size) => {
  const hitCoords = [];

  const hit = (coords) => {
    hitCoords.push(coords);
  };

  const isSunk = () => hitCoords.length;

  return {
    size,
    hitCoords,
    hit,
    isSunk,
  };
};
export default Ship;
