const boardGenerator = () => ({ // set grid rows and columns and the size of each square
  rows: 10,
  cols: 10,
  squareSize: 50,

  // get the container element
  gameBoardContainer: document.getElementById('gameboard'),

  board() {
    for (let i = 0; i < this.cols; i += 1) {
      for (let j = 0; j < this.rows; j += 1) {
        // create a new div HTML element for each grid square and make it the right size
        const square = document.createElement('div');
        this.gameBoardContainer.appendChild(square);

        // give each div element a unique id based on its row and column, like "s00"
        square.id = `s${j}${i}`;

        // set each grid square's coordinates: multiples of the current row or column number
        const topPosition = j * this.squareSize;
        const leftPosition = i * this.squareSize;

        // use CSS absolute positioning to place each grid square on the page
        square.style.top = `${topPosition}px`;
        square.style.left = `${leftPosition}px`;
      }
    }
  },

});

export default boardGenerator;
