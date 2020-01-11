/* eslint-disable no-undef */

import Board from '../src/board';

describe('Board', () => {
  it('is a function', () => {
    expect(typeof Board).toBe('function');
  });
  it('randomBoolean() function is a boolean', () => {
    const board = Board();
    expect(typeof board.randomBoolean()).toBe('boolean');
  });
  it('getRandomPosition() is an object', () => {
    const board = Board();
    expect(typeof board.getRandomPosition()).toBe('object');
  });
  it('getRandomPosition() returns an object', () => {
    const board = Board();
    expect(typeof board.getRandomPosition()).toBe('object');
  });
});
