import dragDrop from './dragDrop';

const ship = (lenght, empties, name) => {
  const mainDiv = document.getElementById('content');
  const tableContainer = document.createElement('div');
  const table = document.createElement('table');
  tableContainer.setAttribute('id', 'drag-container');
  table.setAttribute('draggable', 'true');
  table.setAttribute('class', `${name}`);

  for (let j = 0; j < lenght; j += 1) {
    const cell = document.createElement('td');
    table.appendChild(cell);
  }
  tableContainer.appendChild(table);
  mainDiv.appendChild(tableContainer);
  dragDrop(`.${name}`, empties);
};

export default ship;
