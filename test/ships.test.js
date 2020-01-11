/* eslint-disable no-undef */
import mockShip from '../src/ships';
// import * as dependency from '../src/ships';


// const Ship = require('../src/ships');
// const mockShip = {
//   hit: jest.fn(),
//   isSunk: jest.fn(),
// };

// jest.mock('../src/ships.js', () => mockShip);

// const mockShip = require('../src/ships');


describe('Ship', () => {
  // it('Checks if hit has been called', () => {
  //   mockShip.hit();
  //   expect(mockShip.hit).toHaveBeenCalled();
  // });

  // it('Checks if Ships is an object', () => {
  //   expect(typeof mockShip).toBe('object');
  // });

  it('isSunk() returns true if the ship hits are equal to the ship length', () => {
    // dependency.hit = jest.fn();
    // const ship = mockShip(4).isSunk();
    // ship.hit();
    // mockShip(4).isSunk();
    const testShip = mockShip(4);
    // testShip.hit(3);
    expect(testShip.isSunk()).toBe(true);
    // expect(mockShip(4).isSunk()).toBe(true);
  });
});


// jest.mock('../src/ships.js', () => ({
//   createShip: jest.fn(),
//   hit: jest.fn(),
//   isSunk: jest.fn(),
// }));

// jest.mock('../src/user.js', () => ({
//   user: jest.fn(),
// }));

// const mockShip = require('../src/ships');

// describe('ships', () => {
//   it('Checks if createShip has been called', () => {
//     mockShip.createShip();
//     expect(mockShip.createShip).toHaveBeenCalled();
//   });

//   it ('Checks if hit has been called', () => {
//     mockShip.hit();
//     expect(mockShip.hit).toHaveBeenCalled();
//   });

//   it ('Checks if isSunk has been called', () => {
//     mockShip.isSunk();
//     expect(mockShip.isSunk).toHaveBeenCalled();
//   });

//   it ('Checks if Ships is an object', () => {
//     expect(typeof mockShip).toBe('object');
//   });
// });
