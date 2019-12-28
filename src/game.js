/* eslint-disable max-len */
import boardGenerator from './boardGenerator';

const startGame = () => ({
  hitCount: 0,
  // rows: 10,
  // cols: 10,
  // squareSize: 50,
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  fireTorpedo(e) {
    // if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
    if (e.target !== e.currentTarget) {
      // extract row and column # from the HTML element's id
      const row = e.target.id.substring(1, 2);
      const col = e.target.id.substring(2, 3);
      // alert("Clicked on row " + row + ", col " + col);

      // if player clicks a square with no ship, change the color and change square's value
      if (this.grid[row][col] === 0) {
        e.target.style.background = '#bbb';
        // set this square's value to 3 to indicate that they fired and missed
        this.grid[row][col] = 3;

        // if player clicks a square with a ship, change the color and change square's value
      } else if (this.grid[row][col] === 1) {
        e.target.style.background = 'red';
        // set this square's value to 2 to indicate the ship has been hit
        this.grid[row][col] = 2;

        // increment hitCount each time a ship is hit
        this.hitCount += 1;
        // this definitely shouldn't be hard-coded, but here it is anyway. lazy, simple solution:
        if (this.hitCount === 5) {
          alert('All enemy battleships have been defeated! You win!');
        }

        // if player clicks a square that's been previously hit, let them know
      } else if (this.grid[row][col] > 1) {
        alert('Stop wasting your torpedos! You already fired at this location.');
      }
    }
    e.stopPropagation();
  },
  attack() {
    const board = boardGenerator();
    board.gameBoardContainer.addEventListener('click', this.fireTorpedo, false);
  },

});

export default startGame;
