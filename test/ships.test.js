jest.mock('../src/ships.js', () => ({
  createShip: jest.fn(),
  hit: jest.fn(),
  isSunk: jest.fn(),
}));

jest.mock('../src/user.js', () => ({
  user: jest.fn(),
}));

const mockShip = require('../src/ships');

describe('ships', () => {
  it('Checks if createShip has been called', () => {
    mockShip.createShip();
    expect(mockShip.createShip).toHaveBeenCalled();
  });

  it ('Checks if hit has been called', () => {
    mockShip.hit();
    expect(mockShip.hit).toHaveBeenCalled();
  });

  it ('Checks if isSunk has been called', () => {
    mockShip.isSunk();
    expect(mockShip.isSunk).toHaveBeenCalled();
  });

  it ('Checks if Ships is an object', () => {
    expect(typeof mockShip).toBe('object');
  });
});