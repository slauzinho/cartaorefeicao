import {
  FETCH_CARDS_SUCCESS,
  CHANGE_ACTIVE_INDEX,
  RESET_ACTIVE_STATE,
  FETCH_SITE_SUCCESS,
  FETCH_SITE_REQUEST,
  FETCH_SITE_FAILURE,
  FETCH_CARDS_REQUEST,
  REMOVE_CARD_REQUEST,
  REMOVE_CARD_SUCCESS,
  ADD_CARD_REQUEST,
  ADD_CARD_SUCCESS,
} from '../actions/types';
import { IndexState, CardState } from '../types';
import { CardActionTypes } from '../actions/types';

export function card(
  state: CardState = { cards: [], loading: true },
  action: CardActionTypes
) {
  switch (action.type) {
    case ADD_CARD_REQUEST:
      return { ...state, loading: true };
    case ADD_CARD_SUCCESS:
      const oldCardsFiltered = state.cards.filter(
        card => card.cardNumber !== action.card.cardName
      );
      return {
        ...state,
        loading: false,
        cards: [...oldCardsFiltered, action.card],
      };
    case REMOVE_CARD_REQUEST:
      return { ...state, loading: true };
    case REMOVE_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        cards: state.cards.filter(
          card => card.cardNumber !== action.cardNumber
        ),
      };
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
