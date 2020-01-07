const Gameboard = (ship) => ({
  ship,
  board: new Array(100),
  missed: [],
  alignment(index, orientation = false) {
    if (orientation === true) {
      return index + 10 * this.ship.length;
    }
    return index + this.ship.length;
  },
  placeShips() {
    return this.alignment;
  },
  receiveAttack(x, y) {

  },
});
export default Gameboard;
