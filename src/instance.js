/* eslint-disable func-names */
import { Ships } from './ships';
import {
  getElement,
  getCoords,
  userfield,
} from './helper';
import user from './user';

const Instance = () => ({

  pressed: false,

  setObserver() {
    const fieldUser = getElement('field_user');
    const initialShips = getElement('ships_collection');
    fieldUser.addEventListener('mousedown', this.onMouseDown.bind(this));
    fieldUser.addEventListener('contextmenu', this.rotationShip.bind(this));
    initialShips.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  },

  onMouseDown(e) {
    if (e.which !== 1 || userfield.startGame) return;
    const el = e.target.closest('.ship');
    if (!el) return;
    this.pressed = true;
    this.draggable = {
      elem: el,
      downX: e.pageX,
      downY: e.pageY,
      kx: 0,
      ky: 1,
    };

    if (el.parentElement.getAttribute('id') === 'field_user') {
      const name = el.getAttribute('id');
      this.getDirectionShip(name);
      const computedStyle = getComputedStyle(el);
      this.draggable.left = computedStyle.left.slice(0, -2);
      this.draggable.top = computedStyle.top.slice(0, -2);
      this.cleanShip(el);
    }
  },

  onMouseMove(e) {
    if (this.pressed === false || !this.draggable.elem) return;
    let coords;
    if (!this.clone) {
      this.clone = this.creatClone();
      if (!this.clone) return;

      coords = getCoords(this.clone);

      this.shiftX = this.draggable.downX - coords.left;
      this.shiftY = this.draggable.downY - coords.top;

      document.body.appendChild(this.clone);

      this.clone.style.zIndex = '1000';
      this.decks = this.getCountDecks();
    }

    const currLeft = e.pageX - this.shiftX;
    const currTop = e.pageY - this.shiftY;

    this.clone.style.left = `${currLeft}px`;
    this.clone.style.top = `${currTop}px`;

    coords = getCoords(this.clone);

    const currBtm = coords.bottom;
    const currRight = coords.right;

    if (currLeft >= user.fieldY - 14 && currRight <= user.fieldRight + 14
        && currTop >= user.fieldX - 14 && currBtm <= user.fieldBtm + 14) {
      coords = this.getCoordsClone(this.decks);
      const result = user.checkLocationShip(coords.x, coords.y,
        this.draggable.kx, this.draggable.ky, this.decks);

      if (result) {
        this.clone.classList.remove('unsuccess');
        this.clone.classList.add('success');
      } else {
        this.clone.classList.remove('success');
        this.clone.classList.add('unsuccess');
      }
    } else {
      this.clone.classList.remove('success');
      this.clone.classList.add('unsuccess');
    }
  },

  onMouseUp() {
    this.pressed = false;
    if (!this.clone) return;
    if (this.clone.classList.contains('unsuccess')) {
      this.clone.classList.remove('unsuccess');
      this.clone.rollback();
      if (this.draggable.left !== undefined && this.draggable.top !== undefined) {
        this.draggable.elem.style.cssText = `left:${this.draggable.left}px; top:${this.draggable.top}px;`;
      }
    } else {
      const coords = this.getCoordsClone(this.decks);
      user.field.appendChild(this.clone);
      this.clone.style.left = `${coords.left}px`;
      this.clone.style.top = `${coords.top}px`;

      const fc = {
        shipname: this.clone.getAttribute('id'),
        x: coords.x,
        y: coords.y,
        kx: this.draggable.kx,
        ky: this.draggable.ky,
        decks: this.decks,
      };
      const ship = Ships(user, fc);

      ship.createShip();
      getElement(ship.shipname).style.zIndex = null;
      getElement('field_user').removeChild(this.clone);
    }
    this.cleanClone();
  },

  creatClone() {
    const clone = this.draggable.elem;

    const old = {
      parent: clone.parentNode,
      nextSibling: clone.nextSibling,
      left: clone.left || '',
      top: clone.top || '',
      zIndex: clone.zIndex || '',
    };
    clone.rollback = function () {
      old.parent.insertBefore(clone, old.nextSibling);
      clone.style.left = old.left;
      clone.style.top = old.top;
      clone.style.zIndex = old.zIndex;
    };
    return clone;
  },

  findDroppable(e) {
    this.clone.hidden = true;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    this.clone.hidden = false;
    return el.closest('.ships');
  },

  getCountDecks() {
    const type = this.clone.getAttribute('id').slice(0, -1);
    for (let i = 1, { length } = user.shipsData; i < length; i += 1) {
      if (user.shipsData[i][1] === type) {
        return user.shipsData[i][0];
      }
    }
    return user.shipsData;
  },

  getCoordsClone(decks) {
    const pos = this.clone.getBoundingClientRect();
    const left = pos.left - user.fieldY;
    const right = pos.right - user.fieldY;
    const top = pos.top - user.fieldX;
    const bottom = pos.bottom - user.fieldX;
    const coords = {};
    let coordsTop = coords.top;
    let coordsLeft = coords.left;

    if (top < 0) {
      coordsTop = 0;
      if (bottom > user.fieldSide) {
        coordsTop = user.fieldSide - user.shipSide;
      }
    } else {
      coordsTop = top;
    }

    coordsTop = Math.round(coordsTop / user.shipSide) * user.shipSide;
    coords.x = coordsTop / user.shipSide;

    if (left < 0) {
      coordsLeft = 0;
      if (right > user.fieldSide) {
        coordsLeft = user.fieldSide - user.shipSide * decks;
      }
    } else {
      coordsLeft = left;
    }

    coordsLeft = Math.round(coordsLeft / user.shipSide) * user.shipSide;
    coords.y = coordsLeft / user.shipSide;
    return coords;
  },

  cleanClone() {
    delete this.clone;
    delete this.draggable;
  },

  rotationShip(e) {
    if (e.which !== 3 || userfield.startGame) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    const id = e.target.getAttribute('id');

    for (let i = 0, { length } = user.squadron; i < length; i += 1) {
      const data = user.squadron[i];
      if (data.shipname === id && data.decks !== 1) {
        let kx = (data.kx === 0) ? 1 : 0;
        let ky = (data.ky === 0) ? 1 : 0;

        this.cleanShip(e.target);
        user.field.removeChild(e.target);

        const result = user.checkLocationShip(data.x0, data.y0, kx, ky, data.decks);
        if (result === false) {
          kx = (kx === 0) ? 1 : 0;
          ky = (ky === 0) ? 1 : 0;
        }

        const fc = {
          shipname: data.shipname,
          x: data.x0,
          y: data.y0,
          kx,
          ky,
          decks: data.decks,
        };
        const ship = Ships(user, fc);

        ship.createShip();
        if (result === false) {
          const el = getElement(ship.shipname);
          el.classList.add('unsuccess');
          setTimeout(() => {
            el.classList.remove('unsuccess');
          }, 500);
        }
      }
    }
  },

  cleanShip(el) {
    const coords = el.getBoundingClientRect();
    const x = Math.round((coords.top - user.fieldX) / user.shipSide);
    const y = Math.round((coords.left - user.fieldY) / user.shipSide);
    let data;
    let k;
    for (let i = 0, { length } = user.squadron; i < length; i += 1) {
      data = user.squadron[i];
      if (data.x0 === x && data.y0 === y) {
        k = 0;
        while (k < data.decks) {
          user.matrix[x + k * data.kx][y + k * data.ky] = 0;
          k += 1;
        }
        user.squadron.splice(i, 1);
        return;
      }
    }
  },

  getDirectionShip(shipname) {
    let data;
    for (let i = 0, { length } = user.squadron; i < length; i += 1) {
      data = user.squadron[i];
      if (data.shipname === shipname) {
        this.draggable.kx = data.kx;
        this.draggable.ky = data.ky;
        return;
      }
    }
  },
});

export default Instance;
