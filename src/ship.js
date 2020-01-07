const Ship = (size) => ({
  size,
  position: [],
  hits: 0,
  hit() {
    if (this.isSunk()) {
      return undefined;
    }
    return this.hits === this.hits + 1;
  },
  isSunk() {
    return this.hits >= this.size;
  },
});

export default Ship;

// number of ships sunk
