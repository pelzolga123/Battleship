import gameBoard from './board';
import ship from './ship';

gameBoard();
const empties = document.querySelectorAll('.cell');
ship(3, empties, 'first');
