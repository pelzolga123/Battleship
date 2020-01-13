/* eslint-disable max-len */
import Ship from './ships';
import Board from './board';

let hitsCount = 0;
let turn = 'comp';
const getUserShips = Ship();
const getCompShips = Ship();

const compShips = [
  Ship(5),
  Ship(4),
  Ship(3),
  Ship(3),
  Ship(2),
];

const userShips = [
  Ship(5),
  Ship(4),
  Ship(3),
  Ship(3),
  Ship(2),
];

function getRandomPosition() {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  return [x, y];
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
  const table = document.getElementById('playerBoard');
  for (let i = 0; i < table.rows.length; i += 1) {
    for (let j = 0; j < table.rows[i].cells.length; j += 1) {
      const cell = table.rows[i].cells[j];
      cell.setAttribute('class', `${i}${j}`);
    }
  }
  const findElem = document.getElementsByClassName(elemId)[0].id;
  return findElem;
};


const computerShoot = (shootId) => {
  const data = document.getElementsByClassName(shootId)[0];
  data.style.background = 'red';
};

const computerMiss = (shootId) => {
  const data = document.getElementsByClassName(shootId)[0];
  data.style.background = 'green';
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
    getUserShips.hit(matrix);
  } else {
    computerMiss(matrix);
  }
  return hitsCount;
}

const getTurn = () => {
  if (turn === 'comp') {
    turn = 'user';
  } else if (turn === 'user') {
    turn = 'comp';
  }
  return turn;
};

function addEvent() {
  const table = document.getElementById('board');
  for (let i = 0; i < table.rows.length; i += 1) {
    for (let j = 0; j < table.rows[i].cells.length; j += 1) {
      const cell = table.rows[i].cells[j];
      cell.setAttribute('class', `c-${i}${j}`);
    }
  }

  document.querySelectorAll('#board td').forEach((td) => {
    td.addEventListener('click', (e) => {
      if (e.target && e.target.id === 'ship') {
        getCompShips.hit(e.target.classList[0]);
        e.target.style.background = 'red';
      } else {
        e.target.style.background = 'blue';
      }
    });
  });
}

const fight = () => {
  const winner = document.getElementById('winner-h1');
  const board = document.getElementById('board');
  const playerBoard = document.getElementById('playerBoard');
  const turns = getTurn();
  if (turns === 'comp') {
    playerBoard.classList.remove('freeze');
    board.classList.add('freeze');
    winner.innerHTML = 'computer`s turn';
    computerHit();
  }
  if (turns === 'user') {
    playerBoard.classList.add('freeze');
    board.classList.remove('freeze');
    winner.innerHTML = ' user`s turn';
    addEvent();
  }
};

const freeze = () => {
  const board = document.getElementById('board');
  const playerBoard = document.getElementById('playerBoard');
  board.classList.add('freeze');
  playerBoard.classList.add('freeze');
};

function initialize() {
  Board(userShips).setupBoard('board');
  Board(compShips).setupBoard('playerBoard');

  document.getElementById('volley').addEventListener('click', () => {
    document.getElementById('playField').setAttribute('class', 'visible');
    document.getElementById('volley').setAttribute('class', 'boards');
    const winner = document.getElementById('winner-h1');
    const receiveAttack = setInterval(() => {
      fight();
      if (getUserShips.isSunk() === 17 && getCompShips.isSunk() < 17) {
        clearInterval(receiveAttack);
        freeze();
        winner.innerHTML = 'Computer wins!!!';
      }
      if (getUserShips.isSunk() < 17 && getCompShips.isSunk() === 17) { 
        clearInterval(receiveAttack);
        freeze();
        winner.innerHTML = 'User wins!!!';
      }
    }, 1500);
  });
}

initialize();
