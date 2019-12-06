const dragDrop = (chosenShip, empties) => {
  console.log(chosenShip);
  console.log(empties);
  const fill = document.querySelector(chosenShip);
  console.log(fill);
  const dragOver = (e) => {
    e.preventDefault();
  };

  function dragAndDrop () {
    this.className = 'cell';
    this.append(fill);
  };

  for (const empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('drop', dragAndDrop);
  }
};
export default dragDrop;
