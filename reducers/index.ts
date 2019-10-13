import { combineReducers } from 'redux';
import { card, index } from './card';

export default combineReducers({ cards: card, index });
