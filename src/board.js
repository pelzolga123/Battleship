/* eslint-disable import/no-cycle */
import {
  createMatrix,
  getRandom,
  showServiseText,
  showIcons,

} from './helper';
import { Ships } from './ships';
import user from './user';

const Board = (field) => ({
  shipSide: 33,
  shipsData: [
    '',
    [4, 'fourdeck'],
    [3, 'tripledeck'],
    [2, 'doubledeck'],
    [1, 'singledeck'],
  ],

  field,
  fieldX: field.getBoundingClientRect().top + window.pageYOffset,
  fieldY: field.getBoundingClientRect().left + window.pageXOffset,
  fieldRight: field.getBoundingClientRect().left + window.pageXOffset + 330,
  fieldBtm: field.getBoundingClientRect().top + window.pageYOffset + 330,
  squadron: [],
  startGame: false,

  randomLocationShips() {
    this.matrix = createMatrix();
    for (let i = 1, { length } = this.shipsData; i < length; i += 1) {
      const decks = this.shipsData[i][0];
      for (let j = 0; j < i; j += 1) {
        const fc = this.getCoordinatesDecks(decks);
        fc.decks = decks;
        fc.shipname = this.shipsData[i][1] + String(j + 1);
        const ship = Ships(this, fc);
        ship.createShip();
      }
    }
  },

  getCoordinatesDecks(decks) {
    const kx = getRandom(1);
    const ky = (kx === 0) ? 1 : 0;
    let x; let y;

    if (kx === 0) {
      x = getRandom(9);
      y = getRandom(10 - decks);
    } else {
      x = getRandom(10 - decks);
      y = getRandom(9);
    }

    const result = this.checkLocationShip(x, y, kx, ky, decks);
    if (!result) return this.getCoordinatesDecks(decks);
    const obj = {
      x,
      y,
      kx,
      ky,
    };
    return obj;
  },

  checkLocationShip(x, y, kx, ky, decks) {
    let toX;
    let toY;

    const fromX = (x === 0) ? x : x - 1;

    if (x + kx * decks === 10 && kx === 1) toX = x + kx * decks;
    else if (x + kx * decks < 10 && kx === 1) toX = x + kx * decks + 1;
    else if (x === 9 && kx === 0) toX = x + 1;
    else if (x < 9 && kx === 0) toX = x + 2;

    const fromY = (y === 0) ? y : y - 1;
    if (y + ky * decks === 10 && ky === 1) toY = y + ky * decks;
    else if (y + ky * decks < 10 && ky === 1) toY = y + ky * decks + 1;
    else if (y === 9 && ky === 0) toY = y + 1;
    else if (y < 9 && ky === 0) toY = y + 2;

    if (toX === undefined || toY === undefined) return false;

    for (let i = fromX; i < toX; i += 1) {
      for (let j = fromY; j < toY; j += 1) {
        if (this.matrix[i][j] === 1) return false;
      }
    }
    return true;
  },

  cleanField() {
    const parent = this.field;
    const id = parent.getAttribute('id');
    const divs = document.querySelectorAll(`#${id} > div`);
    [].forEach.call(divs, (el) => {
      parent.removeChild(el);
    });
    this.squadron.length = 0;
  },
});

const missedHit = (coordsX, coordsY, enemy, enemyShipSide, player) => {
  showIcons(coordsX, coordsY, enemy, enemyShipSide, 'dot');
  let writeMatrix = enemy.matrix[coordsX][coordsY];
  writeMatrix = 3;
  const textData = (player === user) ? "You missed. Computer's turn" : 'Computer missed. Your turn.';
  showServiseText(textData);
  return writeMatrix;
};

const allSunk = (enemy) => {
  if (enemy.squadron.length === 0) {
    return true;
  }
  return false;
};

export { Board, missedHit, allSunk };
