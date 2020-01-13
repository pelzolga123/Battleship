/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/ships.js
const Ship = (size) => {
  const hitCoords = new Set();

  const hit = (coords) => {
    hitCoords.add(coords);
  };

  const isSunk = () => hitCoords.size;

  return {
    size,
    hitCoords,
    hit,
    isSunk,
  };
};
/* harmony default export */ var ships = (Ship);

// CONCATENATED MODULE: ./src/board.js
const Board = (userShips) => {
  const boardSize = 10;
  const classMapping = ['ship', 'miss', 'hit'];
  const positions = [];
  const HIT = 2;
  const SHIP = 0;
  const grid = [];

  const getRandomPosition = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  };

  const randomBoolean = () => (Math.random() >= 0.5);

  const shipCanOccupyPosition = (bool, pos, shipSize, vertical) => {
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
  };

  const placeShip = (pos, shipSize, vertical) => {
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
  };

  const distributeShips = () => {
    let pos; let shipPlaced; let vertical;
    for (let i = 0, l = userShips.length; i < l; i += 1) {
      shipPlaced = false;
      vertical = randomBoolean();
      while (!shipPlaced) {
        pos = getRandomPosition();
        shipPlaced = placeShip(pos, userShips[i].size, vertical);
      }
    }
  };

  const generate = () => {
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
  };

  const redrawBoard = (boardName) => {
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
    const board = document.getElementById(boardName);
    board.innerHTML = boardHTML;
  };

  const setupBoard = (boardName) => {
    // initialize positions matrix
    for (let y = 0; y < boardSize; y += 1) {
      positions[y] = [];
      for (let x = 0; x < boardSize; x += 1) {
        positions[y][x] = null;
      }
    }
    distributeShips();
    generate();
    redrawBoard(boardName);
  };

  return {
    setupBoard,
    randomBoolean,
    getRandomPosition,
  };
};


/* harmony default export */ var board = (Board);

// CONCATENATED MODULE: ./src/index.js
/* eslint-disable max-len */



let hitsCount = 0;
let turn = 'comp';
const getUserShips = ships();
const getCompShips = ships();

const compShips = [
  ships(5),
  ships(4),
  ships(3),
  ships(3),
  ships(2),
];

const userShips = [
  ships(5),
  ships(4),
  ships(3),
  ships(3),
  ships(2),
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
  board(userShips).setupBoard('board');
  board(compShips).setupBoard('playerBoard');

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


/***/ })
/******/ ]);