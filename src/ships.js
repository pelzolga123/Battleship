/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import { getElement, deleteElementMatrix } from './helper';
import user from './user';

const Ships = (player, fc) => ({

  player,
  shipname: fc.shipname,
  decks: fc.decks,
  x0: fc.x,
  y0: fc.y,
  kx: fc.kx,
  ky: fc.ky,
  hits: 0,
  matrix: [],

  createShip() {
    let k = 0;
    const x = this.x0;
    const y = this.y0;
    const { kx } = this;
    const { ky } = this;
    const { decks } = this;
    const { player } = this;

    while (k < decks) {
      player.matrix[x + k * kx][y + k * ky] = 1;
      this.matrix.push([x + k * kx, y + k * ky]);
      k += 1;
    }

    player.squadron.push(this);
    if (player === user) this.showShip();
    if (user.squadron.length === 10) {
      getElement('play').setAttribute('data-hidden', 'false');
    }
  },

  getDeck() {
    return this.deck;
  },

  showShip() {

    const div = document.createElement('div');
    const dir = (this.kx === 1) ? ' vertical' : '';
    const classname = this.shipname.slice(0, -1);
    const { player } = this;

    div.setAttribute('id', this.shipname);
    div.className = `ship ${classname}${dir}`;
    div.style.cssText = `left:${this.y0 * player.shipSide}px; top:${this.x0 * player.shipSide}px;`;
    player.field.appendChild(div);
  },
});

const checkMaxDecks = () => {
  const arr = [];
  for (let i = 0, { length } = user.squadron; i < length; i += 1) {
    arr.push(user.squadron[i].decks);
  }
  return Math.max.apply(null, arr);
};

const isSunk = (hits) => {
  const max = checkMaxDecks(user);
  if (hits >= max) {
    return true;
  }
  return false;
};

const hit = (coords, comp) => {
  let newCoords = coords;
  if (comp.shootMatrixAround.length > 0) {
    newCoords = comp.shootMatrixAround.pop();
    if (comp.shootMatrixAI.length > 0) {
      newCoords = comp.shootMatrixAI.pop();
    }
  } else {
    newCoords = comp.shootMatrix.pop();
  }
  const obj = {
    x: newCoords[0],
    y: newCoords[1],
  };

  if (comp.shootMatrixAI.length !== 0) {
    deleteElementMatrix(comp.shootMatrixAI, obj);
  }
  deleteElementMatrix(comp.shootMatrix, obj);

  return obj;
};


export { Ships, isSunk, hit };
