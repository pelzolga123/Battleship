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
let playerBoard;
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
}

// TODO onclick of cell with class name ship count the number of hits
// TODO remove color of ships
// TODO change color of( ship to red when cell is clicked to signify hits
function fireAtWill() {
  const hit = 0;
}

const getPlayerCells = (elemId) => {
  const table = document.getElementById('player-board');
  for (let i = 0; i < table.rows.length; i += 1) {
    for (let j = 0; j < table.rows[i].cells.length; j += 1) {
      const cell = table.rows[i].cells[j];
      cell.setAttribute('class', `${i}${j}`);
    }
  }
  const findElem = document.getElementsByClassName(elemId)[0].id;
  return findElem;
};

const delayComputerShoot = (shootId) => {
  setTimeout(() => {
    const cellClass = document.getElementsByClassName(shootId);
    for (let i = 0; i <= cellClass.length; i += 1) {
      cellClass[i].setAttribute('class', 'red');
    }
  }, 2000);
};
const delayComputerMiss = (shootId) => {
  setTimeout(() => {
    const cellClass = document.getElementsByClassName(shootId);
    for (let i = 0; i < cellClass.length; i += 1) {
      cellClass[i].setAttribute('class', 'green');
    }
  }, 2000);
};

const computerHit = () => {
  let hit = 0;
  while (hit <= 17) {
    const hitCoords = getRandomPosition();
    const x = hitCoords[0];
    const y = hitCoords[1];
    const shootId = `${x}${y}`;
    const getCell = getPlayerCells(shootId);
    if (getCell === 'ship') {
      delayComputerShoot(shootId);
      hit += 1;
    } else {
      delayComputerMiss(shootId);
    }
  }
};

function setupBoard() {
  // initialize positions matrix
  for (let y = 0; y < boardSize; y += 1) {
    positions[y] = [];
    for (let x = 0; x < boardSize; x += 1) {
      positions[y][x] = null;
    }
  }

  distributeShips();
  recalculateProbabilities();
  redrawBoard(true);
}
function setupPlayerBoard() {
  // initialize positions matrix
  for (let y = 0; y < boardSize; y += 1) {
    positions[y] = [];
    for (let x = 0; x < boardSize; x += 1) {
      positions[y][x] = null;
    }
  }
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
  playerBoard = document.getElementById('player-board');
  // resultMsg = document.getElementById('result');
  // volleyButton = document.getElementById('volley');
  // volleyButton.onclick = (monteCarlo ? runMonteCarlo : beginVolley);
  setupBoard();
  setupPlayerBoard();

  computerHit();
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
  playerBoard.innerHTML = boardHTML;
}

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
        /*
        const winnerDiv = document.getElementById('winner');
        const winner = document.createElement('h1');
        winner.innerHTML = 'You win!';
        winnerDiv.appendChild(winner);
       */
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

  }

  e.stopPropagation();
}
