import { combineReducers } from 'redux';
import {card, index} from './card';

function errorMessage(state = null, action) {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
}

export default combineReducers({ cards: card, index });
