import {
    createMatrix,
    getElement,
    getRandom,
    userfield,
    showIcons,
    showServiseText,
    transformCoordinates,
    deleteElementMatrix,
    checkCell,
  } from './helper';
  import user from './user';
  import { Board, missedHit, allSunk } from './board';
  import Instance from './instance';
  import { isSunk, hit } from './ships';
  
  const game = () => {
    const compfield = getElement('field_comp');
    let comp;
  
    const Controller = (() => {
      let player;
      let enemy;
      let self;
      let coords;
      let text;
      const srvText = getElement('text_btm');
  
      const battle = {
        init() {
          self = this;
          const rnd = getRandom(1);
          player = (rnd === 0) ? user : comp;
          enemy = (player === user) ? comp : user;
          comp.shootMatrix = [];
          comp.shootMatrixAI = [];
          comp.shootMatrixAround = [];
          comp.startPoints = [
            [[6, 0], [2, 0], [0, 2], [0, 6]],
            [[3, 0], [7, 0], [9, 2], [9, 6]],
          ];
          self.resetTempShip();
          self.setShootMatrix();
  
          if (player === user) {
            compfield.addEventListener('click', self.shoot);
            compfield.addEventListener('contextmenu', self.setEmptyCell);
            showServiseText('You shoot first.');
          } else {
            showServiseText('Computer shoots first.');
            setTimeout(() => self.shoot(), 1000);
          }
        },
  
        shoot(e) {
          if (e !== undefined) {
            if (e.which !== 1) return false;
            coords = transformCoordinates(e, enemy);
          } else {
            coords = hit(coords, comp);
          }
          const icons = enemy.field.querySelectorAll('.shaded-cell');
          const val = enemy.matrix[coords.x][coords.y];
          switch (val) {
            case 0:
              missedHit(coords.x, coords.y, enemy, enemy.shipSide, player);
              player = (player === user) ? comp : user;
              enemy = (player === user) ? comp : user;
  
              if (player === comp) {
                compfield.removeEventListener('click', self.shoot);
                compfield.removeEventListener('contextmenu', self.setEmptyCell);
  
                if (comp.shootMatrixAround.length === 0) {
                  self.resetTempShip();
                }
  
                setTimeout(() => self.shoot(), 1000);
              } else {
                compfield.addEventListener('click', self.shoot);
                compfield.addEventListener('contextmenu', self.setEmptyCell);
              }
              break;
            case 1:
  
              enemy.matrix[coords.x][coords.y] = 4;
              showIcons(coords.x, coords.y, enemy, enemy.shipSide, 'red-cross');
              text = (player === user) ? 'You hit, shoot again.' : 'Computer hit. Computer shoots again.';
              showServiseText(text);
  
              for (let i = enemy.squadron.length - 1; i >= 0; i -= 1) {
                const
                  warship = enemy.squadron[i];
                const arrayDescks = warship.matrix;
  
                for (let j = 0, { length } = arrayDescks; j < length; j += 1) {
                  if (arrayDescks[j][0] === coords.x && arrayDescks[j][1] === coords.y) {
                    warship.hits += 1;
  
                    if (warship.hits === warship.decks) {
                      if (player === comp) {
                        comp.tempShip.x0 = warship.x0;
                        comp.tempShip.y0 = warship.y0;
                      }
                      enemy.squadron.splice(i, 1);
                    }
                    break;
                  }
                }
              }
              if (allSunk(enemy)) {
                let winnerText = text;
                const printText = srvText;
                winnerText = (player === user) ? 'You won!' : 'You lost';
                printText.innerHTML = winnerText;
  
                if (player === user) {
                  compfield.removeEventListener('click', self.shoot);
                  compfield.removeEventListener('contextmenu', self.setEmptyCell);
                } else {
                  for (let i = 0, { length } = comp.squadron; i < length; i += 1) {
                    const div = document.createElement('div');
                    const dir = (comp.squadron[i].kx === 1) ? ' vertical' : '';
                    const classname = comp.squadron[i].shipname.slice(0, -1);
  
                    div.className = `ship ${classname}${dir}`;
                    div.style.cssText = `left:${comp.squadron[i].y0 * comp.shipSide}px; top:${comp.squadron[i].x0 * comp.shipSide}px;`;
                    comp.field.appendChild(div);
                  }
                }
              } else if (player === comp) {
                comp.tempShip.totalHits += 1;
                let points = [
                  [coords.x - 1, coords.y - 1],
                  [coords.x - 1, coords.y + 1],
                  [coords.x + 1, coords.y - 1],
                  [coords.x + 1, coords.y + 1],
                ];
                self.markEmptyCell(points);
                if (isSunk(comp.tempShip.totalHits)) {
                  if (comp.tempShip.totalHits === 1) {
                    points = [
                      [comp.tempShip.x0 - 1, comp.tempShip.y0],
                      [comp.tempShip.x0 + 1, comp.tempShip.y0],
                      [comp.tempShip.x0, comp.tempShip.y0 - 1],
                      [comp.tempShip.x0, comp.tempShip.y0 + 1],
                    ];
                  } else {
                    const x1 = comp.tempShip.x0 - comp.tempShip.kx;
                    const y1 = comp.tempShip.y0 - comp.tempShip.ky;
                    const x2 = comp.tempShip.x0 + comp.tempShip.kx * comp.tempShip.totalHits;
                    const y2 = comp.tempShip.y0 + comp.tempShip.ky * comp.tempShip.totalHits;
                    points = [
                      [x1, y1],
                      [x2, y2],
                    ];
                  }
                  self.markEmptyCell(points);
                  self.resetTempShip();
                } else {
                  self.setShootMatrixAround();
                }
                setTimeout(() => self.shoot(), 1000);
              }
              break; 
            case 2:
  
              [].forEach.call(icons, (el) => {
                const x = el.style.top.slice(0, -2) / comp.shipSide; const
                  y = el.style.left.slice(0, -2) / comp.shipSide;
  
                if (coords.x === x && coords.y === y) {
                  el.classList.add('shaded-cell_red');
                  setTimeout(() => {
                    el.classList.remove('shaded-cell_red');
                  }, 500);
                }
              });
              break;
            case 3:
            case 4:
              text = "Can't hit same spot more than once";
              showServiseText(text);
              break;
            default:
              break;
          }
          return val;
        },
  
        setEmptyCell(e) {
          if (e.which !== 3) return false;
          e.preventDefault();
          coords = transformCoordinates(e, comp);
          const ch = checkCell(enemy, coords, comp);
  
          if (ch) {
            showIcons(coords.x, coords.y, enemy, enemy.shipSide, 'shaded-cell');
            comp.matrix[coords.x][coords.y] = 2;
          }
          return ch;
        },
        setShootMatrix() {
          for (let i = 0; i < 10; i += 1) {
            for (let j = 0; j < 10; j += 1) {
              comp.shootMatrix.push([i, j]);
            }
          }
  
          for (let i = 0, { length } = comp.startPoints; i < length; i += 1) {
            const arr = comp.startPoints[i];
            for (let j = 0, lh = arr.length; j < lh; j += 1) {
              let x = arr[j][0]; let
                y = arr[j][1];
  
              switch (i) {
                case 0:
                  while (x <= 9 && y <= 9) {
                    comp.shootMatrixAI.push([x, y]);
                    x = (x <= 9) ? x : 9;
                    y = (y <= 9) ? y : 9;
                    x += 1; y += 1;
                  }
                  break;
  
                case 1:
                  while (x >= 0 && x <= 9 && y <= 9) {
                    comp.shootMatrixAI.push([x, y]);
                    if (x >= 0 && x <= 9) {
                      if (x < 0) {
                        x = 0;
                      }
                    } else {
                      x = 9;
                    }
  
                    y = (y <= 9) ? y : 9;
                    x -= 1; y += 1;
                  }
                  break;
                default:
                  break;
              }
            }
          }
  
          function compareRandom() {
            return Math.random() - 0.5;
          }
          comp.shootMatrix.sort(compareRandom);
          comp.shootMatrixAI.sort(compareRandom);
        },
  
        setShootMatrixAround() {
          if (comp.tempShip.kx === 0 && comp.tempShip.ky === 0) {
            if (Object.keys(comp.tempShip.firstHit).length === 0) {
              comp.tempShip.firstHit = coords;
            } else {
              comp.tempShip.nextHit = coords;
              comp.tempShip.kx = (Math.abs(comp.tempShip.firstHit.x - comp.tempShip.nextHit.x) === 1)
                ? 1
                : 0;
              comp.tempShip.ky = (Math.abs(comp.tempShip.firstHit.y - comp.tempShip.nextHit.y) === 1)
                ? 1
                : 0;
            }
          }
  
          if (coords.x > 0 && comp.tempShip.ky === 0) {
            comp.shootMatrixAround.push([coords.x - 1, coords.y]);
          }
          if (coords.x < 9 && comp.tempShip.ky === 0) {
            comp.shootMatrixAround.push([coords.x + 1, coords.y]);
          }
          if (coords.y > 0 && comp.tempShip.kx === 0) {
            comp.shootMatrixAround.push([coords.x, coords.y - 1]);
          }
          if (coords.y < 9 && comp.tempShip.kx === 0) {
            comp.shootMatrixAround.push([coords.x, coords.y + 1]);
          }
          for (let i = comp.shootMatrixAround.length - 1; i >= 0; i -= 1) {
            const x = comp.shootMatrixAround[i][0]; const
              y = comp.shootMatrixAround[i][1];
  
            if (user.matrix[x][y] !== 0 && user.matrix[x][y] !== 1) {
              comp.shootMatrixAround.splice(i, 1);
              deleteElementMatrix(comp.shootMatrix, coords);
            }
          }
          if (comp.shootMatrixAround.length === 0) {
            self.resetTempShip();
          }
        },
  
        resetTempShip() {
          comp.shootMatrixAround = [];
          comp.tempShip = {
            totalHits: 0,
            firstHit: {},
            nextHit: {},
            kx: 0,
            ky: 0,
          };
        },
  
        markEmptyCell(points) {
          let obj;
          for (let i = 0, lh = points.length; i < lh; i += 1) {
            obj = {
              x: points[i][0],
              y: points[i][1],
            };
  
            if (obj.x < 0 || obj.x > 9 || obj.y < 0 || obj.y > 9) continue;
  
            if (user.matrix[obj.x][obj.y] !== 0) continue;
  
            showIcons(coords.x, coords.y, enemy, enemy.shipSide, 'shaded-cell');
            user.matrix[obj.x][obj.y] = 2;
  
            deleteElementMatrix(comp.shootMatrix, obj);
            if (comp.shootMatrixAround.length !== 0) {
              deleteElementMatrix(comp.shootMatrixAround, obj);
            }
            if (comp.shootMatrixAI.length !== 0) {
              deleteElementMatrix(comp.shootMatrixAI, obj);
            }
            deleteElementMatrix(comp.shootMatrix, obj);
          }
        },
        getComp() {
          return comp;
        },
      };
  
      return ({
        battle,
        init: battle.init,
      });
    })();
  
    getElement('type_placement').addEventListener('click', (e) => {
      const el = e.target;
      if (el.tagName !== 'SPAN') return;
      const shipsCollection = getElement('ships_collection');
  
      getElement('play').setAttribute('data-hidden', true);
  
      user.cleanField();
  
      const type = el.getAttribute('data-target');
      const typeGeneration = {
        random() {
          shipsCollection.setAttribute('data-hidden', true);
          user.randomLocationShips();
        },
        manually() {
          user.matrix = createMatrix();
  
  
          if (shipsCollection.getAttribute('data-hidden') === 'true') {
            shipsCollection.setAttribute('data-hidden', false);
            const instance = Instance();
  
            instance.setObserver();
          } else {
            shipsCollection.setAttribute('data-hidden', true);
          }
        },
      };
      typeGeneration[type]();
    });
  
    getElement('play').addEventListener('click', () => {
      getElement('instruction').setAttribute('data-hidden', true);
  
      document.querySelector('.field-comp').setAttribute('data-hidden', false);
      comp = Board(compfield);
      comp.randomLocationShips();
  
      getElement('play').setAttribute('data-hidden', true);
      getElement('text_top').innerHTML = "Let's fight!";
  
      userfield.startGame = true;
  
      Controller.battle.init();
    });
  };
  
  export default game;
  