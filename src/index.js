/* eslint-disable max-len */

const SHIP = 0;
const MISS = 1;
const HIT = 2;
let hitsMade = 0;
// let hitsToWin;
const ships = [5, 4, 3, 3, 2];
// TODO: look into Int8Array on these big matrices for performance
const positions = [];
const probabilities = [];
// const hitsSkewProbabilities = true;
// const skewFactor = 2;
const boardSize = 10;
const classMapping = ['ship', 'miss', 'hit'];
let board;
// let resultMsg;
let volleyButton;
// const monteCarlo = false;

// run immediately

function recalculateProbabilities() {
  const hits = [];

  // reset probabilities
  for (let y = 0; y < boardSize; y += 1) {
    probabilities[y] = [];
    for (let x = 0; x < boardSize; x += 1) {
      probabilities[y][x] = 0;
      // we remember hits as we find them for skewing
      if (positions[x][y] === HIT) {
        hits.push([x, y]);
      }
    }
  }

  // calculate probabilities for each type of ship
  // for (let i = 0, l = ships.length; i < l; i += 1) {
  //   for (let y = 0; y < boardSize; y += 1) {
  //     for (let x = 0; x < boardSize; x += 1) {
  //       // horizontal check
  //       if (shipCanOccupyPosition(MISS, [x, y], ships[i], false)) {
  //         increaseProbability([x, y], ships[i], false);
  //       }
  //       // vertical check
  //       if (shipCanOccupyPosition(MISS, [x, y], ships[i], true)) {
  //         increaseProbability([x, y], ships[i], true);
  //       }
  //     }
  //   }
  // }

  // skew probabilities for positions adjacent to hits
  // if (hitsSkewProbabilities) {
  //   skewProbabilityAroundHits(hits);
  // }
}

// TODO onclick of cell with class name ship count the number of hits
// TODO remove color of ships
// TODO change color of ship to red when cell is clicked to signify hits
function fireAtWill() {
  const hit = 0;
}


function setupBoard() {
  // initialize positions matrix
  for (let y = 0; y < boardSize; y += 1) {
    positions[y] = [];
    for (let x = 0; x < boardSize; x += 1) {
      positions[y][x] = null;
    }
  }

  // determine hits to win given the set of ships
  // hitsMade = hitsToWin = 0;
  // for (let i = 0, l = ships.length; i < l; i += 1) {
  //   hitsToWin += ships[i];
  // }

  distributeShips();
  recalculateProbabilities();
  redrawBoard(true);
}

function getRandomPosition() {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);

  return [x, y];
}

function randomBoolean() {
  // return (Math.round(Math.random()) === 1);
  return (Math.random() >= 0.5);
}

function placeShip(pos, shipSize, vertical) {
  // "pos" is ship origin
  const x = pos[0];
  const y = pos[1];
  const z = (vertical ? y : x);
  const end = z + shipSize - 1;

  if (shipCanOccupyPosition(SHIP, pos, shipSize, vertical)) {
    for (let i = z; i <= end; i += 1) {
      if (vertical) positions[x][i] = SHIP;
      else positions[i][y] = SHIP;
    }
    return true;
  }

  return false;
}

function initialize() {
  board = document.getElementById('board');
  // resultMsg = document.getElementById('result');
  // volleyButton = document.getElementById('volley');
  // volleyButton.onclick = (monteCarlo ? runMonteCarlo : beginVolley);
  setupBoard();
}

initialize();


function distributeShips() {
  let pos; let shipPlaced; let vertical;
  for (let i = 0, l = ships.length; i < l; i += 1) {
    shipPlaced = false;
    vertical = randomBoolean();
    while (!shipPlaced) {
      pos = getRandomPosition();
      shipPlaced = placeShip(pos, ships[i], vertical);
    }
  }
}

function shipCanOccupyPosition(criteriaForRejection, pos, shipSize, vertical) {
  // TODO: criteriaForRejection is an awkward concept, improve
  // "pos" is ship origin
  const x = pos[0];
  const y = pos[1];
  const z = (vertical ? y : x);
  const end = z + shipSize - 1;

  // board border is too close
  if (end > boardSize - 1) return false;

  // check if there's an obstacle
  for (let i = z; i <= end; i += 1) {
    const thisPos = (vertical ? positions[x][i] : positions[i][y]);
    if (thisPos === criteriaForRejection) return false;
  }

  return true;
}


function redrawBoard(displayProbability) {
  // if (monteCarlo) return; // no need to draw when testing thousands of boards
  let boardHTML = '';
  for (let y = 0; y < boardSize; y += 1) {
    boardHTML += '<tr>';
    for (let x = 0; x < boardSize; x += 1) {
      const thisPos = positions[x][y];
      boardHTML += '<td id="';
      if (thisPos !== null) boardHTML += classMapping[thisPos];
      boardHTML += '">';
      // if (displayProbability && thisPos !== MISS && thisPos !== HIT) boardHTML += probabilities[x][y];
      boardHTML += '</td>';
    }
    boardHTML += '</tr>';
  }
  board.innerHTML = boardHTML;
}


// function increaseProbability(pos, shipSize, vertical) {
//   // "pos" is ship origin
//   const x = pos[0];
//   const y = pos[1];
//   const z = (vertical ? y : x);
//   const end = z + shipSize - 1;

//   for (let i = z; i <= end; i++) {
//     if (vertical) probabilities[x][i] += 1;
//     else probabilities[i][y] += 1;
//   }
// }

// function skewProbabilityAroundHits(toSkew) {
//   const uniques = [];

//   // add adjacent positions to the positions to be skewed
//   for (var i = 0, l = toSkew.length; i < l; i += 1) {
//     toSkew = toSkew.concat(getAdjacentPositions(toSkew[i]));
//   }

//   // store uniques to avoid skewing positions multiple times
//   // TODO: do A/B testing to see if doing this with strings is efficient
//   for (var i = 0, l = toSkew.length; i < l; i++) {
//     const uniquesStr = uniques.join('|').toString();
//     if (uniquesStr.indexOf(toSkew[i].toString()) === -1) {
//       uniques.push(toSkew[i]);

//       // skew probability
//       const x = toSkew[i][0];
//       const y = toSkew[i][1];
//       probabilities[x][y] *= skewFactor;
//     }
//   }
// }

// function getAdjacentPositions(pos) {
//   const x = pos[0];
//   const y = pos[1];
//   const adj = [];

//   if (y + 1 < boardSize) adj.push([x, y + 1]);
//   if (y - 1 >= 0) adj.push([x, y - 1]);
//   if (x + 1 < boardSize) adj.push([x + 1, y]);
//   if (x - 1 >= 0) adj.push([x - 1, y]);

//   return adj;
// }


// function beginVolley() {
//   if (hitsMade > 0) setupBoard();
//   resultMsg.innerHTML = '';
//   volleyButton.disabled = true;
//   let moves = 0;
//   var volley = setInterval(() => {
//     fireAtBestPosition();
//     moves += 1;
//     if (hitsMade === hitsToWin) {
//       resultMsg.innerHTML = `All ships sunk in ${moves} moves.`;
//       clearInterval(volley);
//       volleyButton.disabled = false;
//     }
//   }, 50);
// }
const boord = document.getElementById('board');
boord.addEventListener('click', (e) => {
  // e.preventDefault;
  // e.target.style.background = 'red';
  // fire(e);
  // console.log(positions[1][2]);

  for (let y = 0; y < boardSize; y += 1) {
  // probabilities[y] = [];
    for (let x = 0; x < boardSize; x += 1) {
      // probabilities[y][x] = 0;
      // we remember hits as we find them for skewing
      // const name = document.getElementsByClassName('ship').value;
      // console.log(positions[y][x]);

      // console.log(name);
      if (e.target && e.target.id === 'ship') {
        e.target.style.background = 'red';
        hitsMade += 1;
      } else {
        e.target.style.background = 'blue';
      }

      if (hitsMade === 17) {
        alert('All enemy battleships have been defeated! You win!');
      }
    }
  }


  // TODO if positions[x][y] == null
  // TODO change background to blue
  // TODO count it as a miss and not hit
  // TODO if positions[x][y] == 0
  // TODO change backgronud to red
  // TODO count it as a hit and add 1 to the number of hits
  // TODO check if number of hits is up to the one requred in the game
});


function fire(e) {
//  const pos = getBestUnplayedPosition();
  // const x = pos[0];
  // const y = pos[1];

  // if (positions[x][y] === SHIP) {
  //   positions[x][y] = HIT;
  //   // TODO change color of cell background
  //   e.target.style.background = 'red';
  //   hitsMade += 1;
  // } else {
  //   positions[x][y] = MISS;
  //   e.target.style.background = 'blue';
  // }

  // recalculateProbabilities();
  // redrawBoard(true);
  if (e.target && e.target.id === 'ship') {
    e.target.style.background = 'red';
    hitsMade += 1;
  } else {
    e.target.style.background = 'blue';
  }

  if (hitsMade === 17) {
    alert('All enemy battleships have been defeated! You win!');
  }

  e.stopPropagation();
}

// function fireTorpedo(e) {
//   // if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
//   if (e.target !== e.currentTarget) {
//     // extract row and column # from the HTML element's id
//     const row = e.target.id.substring(1, 2);
//     const col = e.target.id.substring(2, 3);
//     // alert("Clicked on row " + row + ", col " + col);

//     // if player clicks a square with no ship, change the color and change square's value
//     if (gameBoard[row][col] === 0) {
//       e.target.style.background = '#bbb';
//       // set this square's value to 3 to indicate that they fired and missed
//       gameBoard[row][col] = 3;

//       // if player clicks a square with a ship, change the color and change square's value
//     } else if (gameBoard[row][col] === 1) {
//       e.target.style.background = 'red';
//       // set this square's value to 2 to indicate the ship has been hit
//       gameBoard[row][col] = 2;

//       // increment hitCount each time a ship is hit
//       hitCount += 1;
//       // this definitely shouldn't be hard-coded, but here it is anyway. lazy, simple solution:
//       if (hitCount === 17) {
//         alert('All enemy battleships have been defeated! You win!');
//       }

//       // if player clicks a square that's been previously hit, let them know
//     } else if (gameBoard[row][col] > 1) {
//       alert('Stop wasting your torpedos! You already fired at this location.');
//     }
//   }
//   e.stopPropagation();
// }

// function getBestUnplayedPosition() {
//   let bestProb = 0;
//   let bestPos;

//   // so far there is no tie-breaker -- first position
//   // with highest probability on board is returned
//   for (let y = 0; y < boardSize; y += 1) {
//     for (let x = 0; x < boardSize; x += 1) {
//       if (!positions[x][y] && probabilities[x][y] > bestProb) {
//         bestProb = probabilities[x][y];
//         bestPos = [x, y];
//       }
//     }
//   }

//   return bestPos;
// }


// function runMonteCarlo() {
//   let elapsed; let sum = 0;
//   const runs = (hitsSkewProbabilities ? 50 : 1000);

//   elapsed = (new Date()).getTime();

//   for (let i = 0; i < runs; i += 1) {
//     let moves = 0;
//     setupBoard();
//     while (hitsMade < hitsToWin) {
//       fireAtBestPosition();
//       moves += 1;
//     }
//     sum += moves;
//   }

//   elapsed = (new Date()).getTime() - elapsed;
//   console.log(`test duration: ${elapsed}ms`);

//   resultMsg.innerHTML = `Average moves: ${sum / runs}`;
// }
