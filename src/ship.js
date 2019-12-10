/* creates each ship with required length and puts it into separate div */

const ship = (lenght, id) => {
  const mainDiv = document.getElementById('content');
  const tableContainer = document.createElement('div');
  const table = document.createElement('table');
  tableContainer.setAttribute('id', 'drag-container');
  table.setAttribute('draggable', 'true');
  table.setAttribute('class', 'ships');
  table.setAttribute('id', `${id}`);

  for (let j = 0; j < lenght; j += 1) {
    const cell = document.createElement('td');
    table.appendChild(cell);
  }
  tableContainer.appendChild(table);
  mainDiv.appendChild(tableContainer);
};

export default ship;
