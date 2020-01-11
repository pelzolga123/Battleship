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


export default Board;
