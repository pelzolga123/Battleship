import randomInt from './randomGen';
/* eslint-disable max-len */

// set grid rows and columns and the size of each square
const rows = 10;
const cols = 10;
const squareSize = 50;

// get the container element
const gameBoardContainer = document.getElementById('gameboard');
const gameBoardCont = document.getElementById('game');
// const computer = document.getElementById('compGrid');
// const player = document.getElementById('playerGrid');


// make the grid columns and rows for gameboard
for (let i = 0; i < cols; i += 1) {
  for (let j = 0; j < rows; j += 1) {
    // create a new div HTML element for each grid square and make it the right size
    const square = document.createElement('div');
    gameBoardContainer.appendChild(square);

    // computer.appendChild(square);
    // player.appendChild(square);

    // give each div element a unique id based on its row and column, like "s00"
    square.id = `s${j}${i}`;

    // set each grid square's coordinates: multiples of the current row or column number
    const topPosition = j * squareSize;
    const leftPosition = i * squareSize;

    // use CSS absolute positioning to place each grid square on the page
    square.style.top = `${topPosition}px`;
    square.style.left = `${leftPosition}px`;
  }
}

// make the grid columns and rows for game
for (let i = 0; i < cols; i += 1) {
  for (let j = 0; j < rows; j += 1) {
    // create a new div HTML element for each grid square and make it the right size
    const sqr = document.createElement('div');
    gameBoardCont.appendChild(sqr);

    // give each div element a unique id based on its row and column, like "s00"
    sqr.id = `s${j}${i}`;

    // set each grid square's coordinates: multiples of the current row or column number
    const topPosition = j * squareSize;
    const leftPosition = i * squareSize;

    // use CSS absolute positioning to place each grid square on the page
    sqr.style.top = `${topPosition}px`;
    sqr.style.left = `${leftPosition}px`;
  }
}

/* lazy way of tracking when the game is won: just increment hitCount on every hit
   in this version, and according to the official Hasbro rules (http://www.hasbro.com/common/instruct/BattleShip_(2002).PDF)
   there are 17 hits to be made in order to win the game:
      Carrier     - 5 hits
      Battleship  - 4 hits
      Destroyer   - 3 hits
      Submarine   - 3 hits
      Patrol Boat - 2 hits
*/
let hitCount = 0;

/* create the 2d array that will contain the status of each square on the board
   and place ships on the board (later, create function for random placement!)
   0 = empty, 1 = part of a ship, 2 = a sunken part of a ship, 3 = a missed shot
*/
const gameBoard = [
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
];

function fireTorpedo(e) {
  // if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
  if (e.target !== e.currentTarget) {
    // extract row and column # from the HTML element's id
    const row = e.target.id.substring(1, 2);
    const col = e.target.id.substring(2, 3);
    // alert("Clicked on row " + row + ", col " + col);

    // if player clicks a square with no ship, change the color and change square's value
    if (gameBoard[row][col] === 0) {
      e.target.style.background = '#bbb';
      // set this square's value to 3 to indicate that they fired and missed
      gameBoard[row][col] = 3;

      // if player clicks a square with a ship, change the color and change square's value
    } else if (gameBoard[row][col] === 1) {
      e.target.style.background = 'red';
      // set this square's value to 2 to indicate the ship has been hit
      gameBoard[row][col] = 2;

      // increment hitCount each time a ship is hit
      hitCount += 1;
      // this definitely shouldn't be hard-coded, but here it is anyway. lazy, simple solution:
      if (hitCount === 17) {
        alert('All enemy battleships have been defeated! You win!');
      }

      // if player clicks a square that's been previously hit, let them know
    } else if (gameBoard[row][col] > 1) {
      alert('Stop wasting your torpedos! You already fired at this location.');
    }
  }
  e.stopPropagation();
}

// set event listener for all elements in gameboard, run fireTorpedo function when square is clicked
gameBoardContainer.addEventListener('click', fireTorpedo, false);
// computer.addEventListener('click', fireTorpedo, false);
// player.addEventListener('click', fireTorpedo, false);

// initial code via
// http://www.kirupa.com/html5/handling_events_for_many_elements.htm:

const b = randomInt(0, 9);
const d = randomInt(0, 9);
const c = randomInt(0, 9);
const t = randomInt(0, 9);
const p = randomInt(0, 9);

// const shipCover = () => ({
//   ships: {
//     battleShip: [[b, b], [b, b + 1], [b, b + 2], [b, b + 3], [b, b + 4]],
//     destroyer: [[d + 1, d], [d + 2, d], [d + 3, d], [d + 4, d]],
//     cruiser: [[c, c + 1], [c, c + 2], [c, c + 3]],
//     patrolBoat: [[p, p + 1], [p, p + 2]],
//     tug: [[t, t]],
//   },
// });
const ships = {
  // battleShip: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
  // destroyer: [[2, 3], [3, 3], [4, 3], [5, 3]],
  // cruiser: [[6, 5], [6, 6], [6, 7]],
  // patrolBoat: [[8, 6], [8, 7]],
  // tug: [[9, 9]],
  battleShip: [[b, b], [b, b + 1], [b, b + 2], [b, b + 3], [b, b + 4]],
  destroyer: [[d + 1, d], [d + 2, d], [d + 3, d], [d + 4, d]],
  cruiser: [[c, c + 1], [c, c + 2], [c, c + 3]],
  patrolBoat: [[p, p + 1], [p, p + 2]],
  tug: [[t, t]],

};


function placeShip() {
  let x;
  let y;

  Object.keys(ships).forEach((item) => {
    for (let i = 0; i < ships[item].length; i += 1) {
      const coord = ships[item][i];
      for (let j = 0; j < coord.length; j += 1) {
        x = coord[0];
        y = coord[1];
      }
      gameBoard[x][y] = 1;
    }
  });
  console.log(gameBoard);
  console.log(randomInt(0, 9));
  // const ship = shipCover();
  // console.log(ship.b);
}

placeShip();
