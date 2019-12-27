const location = () => ({
  // isShip: true,
  display: ' ',
  hit() {
    const hitHelper = Math.round(Math.random() * (1 - 0) + 0);
    if (hitHelper === 0) {
      return false;
    }
    return true;
  },
  isShip() {
    const shipHelper = Math.round(Math.random() * (5 - 0) + 0);
    if (shipHelper > 0) {
      return true;
    }
    return false;
  },
});

export default location;
