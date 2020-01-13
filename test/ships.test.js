/* eslint-disable no-undef */
import mockShip from '../src/ships';


describe('Ship', () => {
  it('is a function', () => {
    expect(typeof mockShip).toBe('function');
  });

  // it('hit takes a number and hitCoords has length', () => {
  //   const newShip = mockShip(3);
  //   newShip.hit(3);
  //   newShip.hit(1);
  //   newShip.hit(2);
  //   expect(newShip.hitCoords.length).toBe(3);
  // });


  // it('hitCoords has length', () => {
  //   const arr = [[2], [3], [4], [5]];
  //   const testShip = mockShip(4);
  //   testShip.hitCoords = new Array(...arr);
  //   expect(testShip.hitCoords.length).toBe(4);
  // });


  // it('hits is equal to the ship length', () => {
  //   const newShip = mockShip(4);
  //   newShip.hit(3);
  //   newShip.hit(1);
  //   newShip.hit(2);
  //   newShip.hit(9);
  //   const newSize = newShip.hitCoords.length;
  //   const ship = mockShip(4);
  //   expect(ship.size).toEqual(newSize);
  // });

  // it('large ship is sunk', () => {
  //   const largeShip = mockShip(5);
  //   largeShip.hit(0);
  //   largeShip.hit(2);
  //   largeShip.hit(9);
  //   largeShip.hit(6);
  //   largeShip.hit(3);
  //   expect(largeShip.isSunk()).toBe(5);
  // });

  // it('partially hit should not sink', () => {
  //   const newShip = mockShip(4);
  //   newShip.hit(1);
  //   newShip.hit(3);
  //   expect(newShip.isSunk()).toBe(2);
  // });

  it('was hit() once', () => {
    const newShip = mockShip(4);
    newShip.hit(1);
    expect(newShip.hitCoords.length).toBe(1);
  });

  it('was hit() five times', () => {
    const newShip = mockShip(4);
    newShip.hit(1);
    newShip.hit(2);
    newShip.hit(3);
    newShip.hit(4);
    newShip.hit(5);
    expect(newShip.hitCoords.length).toBe(5);
  });
});
