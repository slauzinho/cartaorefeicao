import { FETCH_CARDS_SUCCESS, FETCH_CARDS_REQUEST } from '../actions/types';

export default function card(state = {cards: []}, action = {}) {
    switch (action.type) {
        case FETCH_CARDS_SUCCESS:
            return {...state, cards: action.cards};
        default:
            return state;
    }
}