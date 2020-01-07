/* eslint-disable no-undef */
jest.mock('../src/ship.js', () => ({
  hits: jest.fn(),
  isSunk: jest.fn(),
}));
const mockShip = require('../src/ship');

describe('ships', () => {
  it('Checks if hit has been called', () => {
    mockShip.hits();
    expect(mockShip.hits).toHaveBeenCalled();
  });

  it('Checks if isSunk has been called', () => {
    mockShip.isSunk();
    expect(mockShip.isSunk).toHaveBeenCalled();
  });

  it('Checks if Ships is an object', () => {
    expect(typeof mockShip).toBe('object');
  });

  it('Checks the Length of the newly created ship', () => {
    const newShip = mockShip(3);
    expect(newShip.size).toBe(3);
  });
});
