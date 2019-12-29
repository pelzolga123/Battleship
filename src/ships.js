import randomInt from './randomGen';


const shipFactory = () => ({
  len: 5,
  hitCoords: [],
  hits: 0,
  // battleShip: [[2, 2], [3, 2], [4, 2]],

  // generate random number between 0 - 9
  // make random number the first number in the array of array
  // if vertical add 1 to the first number else add 1 to the second number
  battleShip() {
    const i = randomInt(0, 5);
    return [[i, i], [i + 1, i], [i + 2, i]];
  },

  cruiser() {
    const j = randomInt(0, 5);
    return [[j, j], [j + 1, j]];
  },

  // return this.hits >= this.length;
  // isSunk() {
  //   if (this.hits >= this.len) {
  //     return true;
  //   }
  //   return false;
  // },

  // hit() {
  //   if (this.isSunk === true) {
  //     this.hits += 1;
  //   }
  // isSunk() ? undefined : this.hits += 1;
  // },
});

export default shipFactory;
