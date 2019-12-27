function makeGridPlayer() {
  const rows = 10;
  const cols = 10;
  const squareSize = 20;

  // get the container element
  const gameBoardContainer = document.getElementById("player");

  for (i = 0; i < cols; i+=1) {
    for (j = 0; j < rows; j+=1) {

      // create a new div HTML element for each grid square and make it the right size
      const square = document.createElement("div");
      gameBoardContainer.appendChild(square);

      // give each div element a unique id based on its row and column, like "s00"
      square.id = 's' + j + i;

      // set each grid square's coordinates: multiples of the current row or column number
      const topPosition = j * squareSize;
      const leftPosition = i * squareSize;

      // use CSS absolute positioning to place each grid square on the page
      square.style.top = topPosition + 'px';
      square.style.left = leftPosition + 'px';
    }
  }
}
