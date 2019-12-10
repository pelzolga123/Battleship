/* gameBoard creates table with 100 td's, each td has it's own index from 00 to 99 */

const gameBoard = () => {
  const mainDiv = document.getElementById('content');
  const table = document.createElement('table');
  table.setAttribute('border', 1);
  table.setAttribute('id', 'board');

  for (let i = 0; i < 10; i += 1) {
    const row = document.createElement('tr');
    table.appendChild(row);

    for (let j = 0; j < 10; j += 1) {
      const cell = document.createElement('td');
      cell.setAttribute('class', 'cell');
      const index = i.toString() + j.toString();
      cell.setAttribute('id', index);
      row.appendChild(cell);
    }
  }
  mainDiv.appendChild(table);

};

export default gameBoard;
