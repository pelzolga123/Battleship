const Ship = (size) => {
  const hitCoords = [];

  const hit = (coords) => {
    hitCoords.push(coords);
    /* const hitSpot = document.getElementById(coords);
    hitSpot.setAttribute('class', 'hit'); */
  };

  const isSunk = () => {
    if (size === hitCoords.length) {
      return true;
    } return false;
  };

  return {
    size,
    hitCoords,
    hit,
    isSunk,
  };
};
export default Ship;
