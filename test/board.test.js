/* eslint-disable no-undef */
jest.mock('../src/board.js', () => ({
  randomLocationShips: jest.fn(),
  cleanField: jest.fn(),
  allSunk: jest.fn(),
  missedHit: jest.fn(),
  checkLocationShip: jest.fn(),
  getCoordinatesDecks: jest.fn(),
  getEnemy: jest.fn(),
}));

jest.mock('../src/ships.js', () => ({
  getDeck: jest.fn(),
}));

const mockDb = require('../src/board');
const mockShip = require('../src/ships');


describe('board', () => {
  it('Check if the clean field has not been called', () => {
    expect(mockDb.cleanField).not.toHaveBeenCalled();
  });

  it('Check if the clean field has been called', () => {
    mockDb.cleanField();
    expect(mockDb.cleanField).toHaveBeenCalled();
  });

  it('Check if coordinate field has been called with arguments', () => {
    const decks = mockShip.getDeck();
    mockDb.getCoordinatesDecks(decks);
    expect(mockDb.getCoordinatesDecks).toHaveBeenCalledWith(decks);
  });
});
