const shipFactory = () => ({
  len: 5,
  hitCoords: [],
  hits: 0,
  battleShip: [[2, 2], [3, 2], [4, 2]],

  // generate random number between 0 - 9
  // make random number the first number in the array of array
  // if vertical add 1 to the first number else add 1 to the second number


  // return this.hits >= this.length;
  isSunk() {
    if (this.hits >= this.len) {
      return true;
    }
    return false;
  },

  hit() {
    if (this.isSunk === true) {
      this.hits += 1;
    }
    // isSunk() ? undefined : this.hits += 1;
  },
});

export default shipFactory;
