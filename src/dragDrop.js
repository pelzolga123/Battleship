const dragDrop = () => {
  const draggable = document.querySelectorAll('.ships');
  const droppable = document.querySelectorAll('.cell');


  draggable.forEach((element) => {
    element.addEventListener('dragstart', dragStart);
  });

  droppable.forEach((element) => {
    element.addEventListener('dragover', dragOver);
    element.addEventListener('drop', dragAndDrop);
  });


  function dragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
  }

  function dragOver(event) {
    if (!event.target.classList.contains('dropped')) {
      event.preventDefault();
    }
  }

  function dragAndDrop(event) {
    event.preventDefault();
    const draggableElementData = event.dataTransfer.getData('text');
    this.innerHtml = event.target.id;
    const instance = document.getElementById(event.target.id);
    instance.setAttribute('colSpan', '2');

    this.append(draggable[0]);
  }

};
export default dragDrop;
