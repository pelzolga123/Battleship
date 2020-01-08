/* eslint-disable max-len */

const SHIP = 0;
const HIT = 2;
let hitsMade = 0;
let hitsCount = 0;
const ships = [5, 4, 3, 3, 2];
const computer = [2, 3, 4, 3, 5];
const positions = [];
const probabilities = [];
const grid = [];

const boardSize = 10;
const classMapping = ['ship', 'miss', 'hit'];
let board;
let playerBoard;
// let volleyButton;
let turn = 'comp';


function generate() {
  const hits = [];
  for (let y = 0; y < boardSize; y += 1) {
    probabilities[y] = [];
    for (let x = 0; x < boardSize; x += 1) {
      probabilities[y][x] = 0;
      if (positions[x][y] === HIT) {
        hits.push([x, y]);
      }
    }
  }
}

function generateComp() {
  const hits = [];
  for (let y = 0; y < boardSize; y += 1) {
    grid[y] = [];
    for (let x = 0; x < boardSize; x += 1) {
      grid[y][x] = 0;
      if (positions[x][y] === HIT) {
        hits.push([x, y]);
      }
    }
  }
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
  while (typeof removeUndefined(elemId) !== 'undefined') {
    return removeUndefined(elemId);
  }
};

const removeUndefined = (elemId) => {
  let findElem;
  if (typeof elemId !== 'undefined') {
    findElem = document.getElementsByClassName(elemId)[0].id;
  }
  return findElem;
};

const computerShoot = (shootId) => {
  setTimeout(() => {
    const cellClass = document.getElementsByClassName(shootId);
    for (let i = 0; i <= cellClass.length; i += 1) {
      cellClass[i].setAttribute('class', 'red');
    }
  }, 2000);
};
const computerMiss = (shootId) => {
  setTimeout(() => {
    const cellClass = document.getElementsByClassName(shootId);
    for (let i = 0; i <= cellClass.length; i += 1) {
      cellClass[i].setAttribute('class', 'green');
    }
  }, 2000);
};

const coords = () => {
  const matrix = matrixValues();
  return matrix;
};

function computerHit() {
  const matrix = coords();
  const getCell = getPlayerCells(matrix);
  if (getCell === 'ship') {
    computerShoot(matrix);
    hitsCount += 1;
  } else {
    computerMiss(matrix);
  }
  return hitsCount;
}

function setupBoard() {
  // initialize positions matrix
  for (let y = 0; y < boardSize; y += 1) {
    positions[y] = [];
    for (let x = 0; x < boardSize; x += 1) {
      positions[y][x] = null;
    }
  }
  distributeShips();
  generate();
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
  distributeShipComp();
  generateComp();
  redrawBoardComp(true);
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

const getTurn = () => {
  if (turn === 'comp') {
    turn = 'user';
  } else if (turn === 'user') {
    turn = 'comp';
  }
  return turn;
};

const fight = () => {
  const winner = document.getElementById('winner-h1');
  const turns = getTurn();
  if (turns === 'comp') {
    winner.innerHTML = 'computer`s turn';
    computerHit();
    playerBoard.classList.remove('freeze');
    board.classList.add('freeze');
    console.log('comp');
  }
  if (turns === 'user') {
    winner.innerHTML = ' user`s turn';
    playerBoard.classList.add('freeze');
    board.classList.remove('freeze');
    console.log('user');
  }
};

function initialize() {
  board = document.getElementById('board');
  playerBoard = document.getElementById('player-board');
  setupBoard();
  setupPlayerBoard();
  setInterval(fight, 5000);
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

function distributeShipComp() {
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

function shipCanOccupyPosition(bool, pos, shipSize, vertical) {
  const x = pos[0];
  const y = pos[1];
  const z = (vertical ? y : x);
  const end = z + shipSize - 1;

  // board border is too close
  if (end > boardSize - 1) return false;

  // check if there's an obstacle
  for (let i = z; i <= end; i += 1) {
    const thisPos = (vertical ? positions[x][i] : positions[i][y]);
    if (thisPos === bool) return false;
  }

  return true;
}

function addEvent() {
  document.querySelectorAll('#board td').forEach((e) => e.addEventListener('click', (n) => {
    if (n.target && n.target.id === 'ship') {
      n.target.style.background = 'red';
      hitsMade += 1;
    } else {
      n.target.style.background = 'blue';
    }
  }));
  return hitsMade;
}

function redrawBoard(status = false) {
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
  // playerBoard.innerHTML = boardHTML;
  addEvent();
}


function redrawBoardComp(status = false) {
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
  playerBoard.innerHTML = boardHTML;
  addEvent();
}
