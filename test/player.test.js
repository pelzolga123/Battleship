/* eslint-disable no-undef */

import player from '../src/player';


describe('Player', () => {
  it('returns player name', () => {
    const newPlayer = player('computer');
    expect(newPlayer).toBe('computer');
  });

  it('name should be string', () => {
    const newPlayer = player('player');
    expect(typeof newPlayer).toBe('string');
  });

  it('name should not be an integer', () => {
    const newPlayer = player(4565476);
    expect(typeof newPlayer === 'string').toBe(false);
  });
});
