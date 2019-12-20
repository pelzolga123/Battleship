/* eslint-disable import/no-cycle */
import { Board } from './board';
import { getElement } from './helper';

const user = Board(getElement('field_user'));

export default user;
