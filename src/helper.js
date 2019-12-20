/* eslint-disable func-names */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
const createMatrix = () => {
  const x = 10; const y = 10; const arr = [10];
  for (let i = 0; i < x; i += 1) {
    arr[i] = [10];
    for (let j = 0; j < y; j += 1) {
      arr[i][j] = 0;
    }
  }
  return arr;
};

const getRandom = n => Math.floor(Math.random() * (n + 1));

const getElement = id => document.getElementById(id);

const getCoords = (el) => {
  const coords = el.getBoundingClientRect();

  return {
    left: coords.left + window.pageXOffset,
    right: coords.right + window.pageXOffset,
    top: coords.top + window.pageYOffset,
    bottom: coords.bottom + window.pageYOffset,
  };
};


const userfield = getElement('field_user');

const showIcons = (coordsX, coordsY, enemy, side, iconClass) => {
  const div = document.createElement('div');
  div.className = `icon-field ${iconClass}`;
  div.style.cssText = `left:${coordsY * side}px; top:${coordsX * side}px;`;
  enemy.field.appendChild(div);
};

const showServiseText = (text) => {
  const srvText = getElement('text_btm');
  srvText.innerHTML = '';
  srvText.innerHTML = text;
};

const transformCoordinates = (e, instance) => {
  if (!Math.trunc) {
    Math.trunc = function (v) {
      // eslint-disable-next-line no-param-reassign
      v = +v;
      // eslint-disable-next-line no-mixed-operators
      return (v - v % 1) || (!isFinite(v) || v === 0 ? v : v < 0 ? -0 : 0);
    };
  }

  const obj = {};

  obj.x = Math.trunc((e.pageY - instance.fieldX) / instance.shipSide);
  obj.y = Math.trunc((e.pageX - instance.fieldY) / instance.shipSide);
  return obj;
};

const deleteElementMatrix = (array, obj) => {
  for (let i = 0, lh = array.length; i < lh; i += 1) {
    if (array[i][0] === obj.x && array[i][1] === obj.y) {
      array.splice(i, 1);
      break;
    }
  }
};

const checkCell = (enemy, coords, comp) => {
  const icons = enemy.field.querySelectorAll('.icon-field');
  let flag = true;

  [].forEach.call(icons, (el) => {
    const x = el.style.top.slice(0, -2) / comp.shipSide; const
      y = el.style.left.slice(0, -2) / comp.shipSide;

    if (coords.x === x && coords.y === y) {
      const isShaded = el.classList.contains('shaded-cell');

      if (isShaded) {
        el.parentNode.removeChild(el);
        let writeMatrix = comp.matrix[coords.x][coords.y];
        writeMatrix = 0;
        return writeMatrix;
      }
      flag = false;
    }
    return flag;
  });
  return flag;
};

export {
  createMatrix,
  getRandom,
  getElement,
  getCoords,
  userfield,
  showIcons,
  showServiseText,
  transformCoordinates,
  deleteElementMatrix,
  checkCell,
};
