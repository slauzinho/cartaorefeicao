import {
  FETCH_CARDS_SUCCESS,
  CHANGE_ACTIVE_INDEX,
  RESET_ACTIVE_STATE,
  FETCH_SITE_SUCCESS,
  FETCH_SITE_REQUEST,
  FETCH_SITE_FAILURE,
  FETCH_CARDS_REQUEST,
} from '../actions/types';
import { IndexState } from '../types';
import { CardActionTypes } from '../actions/types';

export function card(
  state = { cards: [], loading: true },
  action: CardActionTypes
) {
  switch (action.type) {
    case FETCH_CARDS_REQUEST:
      return { ...state, loading: true };
    case FETCH_CARDS_SUCCESS:
      return { ...state, cards: action.cards, loading: false };
    default:
      return state;
  }
}

const initialIndexState: IndexState = {
  activeIndex: 0,
  saldo: null,
  transactions: [],
  loading: true,
  error: null,
};

export function index(state = initialIndexState, action: CardActionTypes) {
  switch (action.type) {
    case CHANGE_ACTIVE_INDEX:
      return { ...state, activeIndex: action.index };
    case FETCH_SITE_REQUEST:
      return { ...state, loading: true, error: null, transactions: [] };
    case FETCH_SITE_SUCCESS:
      return {
        ...state,
        transactions: action.payload.transactions,
        saldo: action.payload.saldo,
        loading: false,
        error: null,
      };
    case FETCH_SITE_FAILURE:
      return {
        ...state,
        transactions: [],
        saldo: null,
        loading: false,
        error: action.error,
      };
    case RESET_ACTIVE_STATE:
      return initialIndexState;
    default:
      return state;
  }
}
