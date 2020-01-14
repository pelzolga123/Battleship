/* eslint-disable no-undef */
import mockShip from '../src/ships';


describe('Ship', () => {
  it('is a function', () => {
    expect(typeof mockShip).toBe('function');
  });

  it('was hit() once', () => {
    const newShip = mockShip(4);
    newShip.hit(1);
    expect(newShip.hitCoords.size).toBe(1);
  });

  it('was hit() five times', () => {
    const newShip = mockShip(4);
    newShip.hit(1);
    newShip.hit(2);
    newShip.hit(3);
    newShip.hit(4);
    newShip.hit(5);
    expect(newShip.hitCoords.size).toBe(5);
  });
});
