/* eslint-disable max-len */

const SHIP = 0;
const HIT = 2;
let hitsMade = 0;
let hitsCount = 0;
const ships = [5, 4, 3, 3, 2];
const positions = [];
const probabilities = [];

const boardSize = 10;
const classMapping = ['ship', 'miss', 'hit'];
let board;
let playerBoard;
// let resultMsg;
let volleyButton;
let turn = 'comp';


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

function fireAtWill() {
  const hit = 0;
}

const shootingMatrix = () => {
  const matrix = new Set();

  for (let i = 0; i <= 500; i += 1) {
    const hitCoords = getRandomPosition();
    const x = hitCoords[0];
    const y = hitCoords[1];
    const shootId = `${x}${y}`;
    matrix.add(shootId);
  }
  return matrix;
};
const compMatrix = shootingMatrix();

const matrixValues = () => {
  const data = compMatrix.values();
  const item = data.next().value;
  compMatrix.delete(item);
  console.log(compMatrix);
  return item;
};

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

const coords = () => {
  const matrix = matrixValues();
  return matrix;
};


const computerHit = () => {
  const matrix = coords();
  const getCell = getPlayerCells(matrix);
  if (getCell === 'ship') {
    delayComputerShoot(matrix);
    hitsCount += 1;
  } else {
    delayComputerMiss(matrix);
  }
  return hitsCount;
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
  setupBoard();
  setupPlayerBoard();

  while (computerHit() <= 16) {
    console.log(turn);
    console.log(computerHit());
    if (turn === 'comp') {
      computerHit();
      turn = 'user';
    } else if (turn === 'user') {
      turn = 'comp';
    }
  }
  /*
  const winnerComp = computerHit();
  if (winnerComp >= 16) {
    const winnerDiv = document.getElementById('winner');
    const winner = document.createElement('h1');
    winner.innerHTML = 'You win!';
    winnerDiv.appendChild(winner);
  }*/
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

const boord = document.getElementById('board');
boord.addEventListener('click', (e) => {
  for (let y = 0; y < boardSize; y += 1) {
    for (let x = 0; x < boardSize; x += 1) {
      if (e.target && e.target.id === 'ship') {
        e.target.style.background = 'red';
        hitsMade += 1;
      } else {
        e.target.style.background = 'blue';
      }
    }
  }
});

function shipCanOccupyPosition(criteriaForRejection, pos, shipSize, vertical) {
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
  let boardHTML = '';
  for (let y = 0; y < boardSize; y += 1) {
    boardHTML += '<tr>';
    for (let x = 0; x < boardSize; x += 1) {
      const thisPos = positions[x][y];
      boardHTML += '<td id="';
      if (thisPos !== null) boardHTML += classMapping[thisPos];
      boardHTML += '">';
      boardHTML += '</td>';
    }
    boardHTML += '</tr>';
  }
  board.innerHTML = boardHTML;
  playerBoard.innerHTML = boardHTML;
}


function fire(e) {
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
