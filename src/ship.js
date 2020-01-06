const Ship = (size) => ({
  position: new Array(size),
  hit(num) {
    this.position[num] = 'X';
  },
  isSunk() {
    this.position.every((posit) => posit === 'X');
  },
});

export default Ship;
