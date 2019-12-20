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
  // gets coordinates of four sides of game field frame in regard to document

  fieldX: field.getBoundingClientRect().top + window.pageYOffset,
  fieldY: field.getBoundingClientRect().left + window.pageXOffset,
  fieldRight: field.getBoundingClientRect().left + window.pageXOffset + 330,
  fieldBtm: field.getBoundingClientRect().top + window.pageYOffset + 330,
  squadron: [],
  // implements after button 'Play' is pressed. Forbids from moving ships.
  startGame: false,

  // creates 2d array, that will recive coordinates of decks, hits, shots.

  randomLocationShips() {
    this.matrix = createMatrix();
    // i is equal to number of ship type. 1 for fourdeck, 2 for tripledeck and so on
    for (let i = 1, { length } = this.shipsData; i < length; i += 1) {
      // number of decks for current type of ship
      const decks = this.shipsData[i][0];
      for (let j = 0; j < i; j += 1) {
        // gets coordinates of first deck and direction of decks
        const fc = this.getCoordinatesDecks(decks);
        // number of decks
        fc.decks = decks;
        // unique name of ship that will be it`s id
        fc.shipname = this.shipsData[i][1] + String(j + 1);
        const ship = Ships(this, fc);
        // generates new ship and displayes it on screen
        ship.createShip();
      }
    }
  },
  // ship direction
  // kx == 0 и ky == 1 — horizontal,
  // kx == 1 и ky == 0 - vertical.

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
    // checks if coordinates are valid, no ship can be placed in neighbor cell
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

    // forms indexes of beginning and end of line.
    // for example: if x==0, deck is in first line.

    const fromX = (x === 0) ? x : x - 1;
    // if true ship is displayed vertical and between the ship and bottom border
    // is no more cells
    if (x + kx * decks === 10 && kx === 1) toX = x + kx * decks;
    // if true ship is displayed vertical and between the ship and bottom border
    // is one more cell, this last cell coordinate will be index of the end
    else if (x + kx * decks < 10 && kx === 1) toX = x + kx * decks + 1;
    // if true ship is displayed horizontal and along the bottom border
    else if (x === 9 && kx === 0) toX = x + 1;
    // ship is somewhere in the middle of gameboard
    else if (x < 9 && kx === 0) toX = x + 2;
    // formes indexes same way for columns
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
    // creates field object for deleting ships
    const parent = this.field;
    const id = parent.getAttribute('id');
    // collections of all ships, that should be deleted
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
