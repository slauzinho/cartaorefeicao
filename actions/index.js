import { FETCH_CARDS_REQUEST, FETCH_CARDS_SUCCESS } from './types';

export const fetchCardsRequest = () => ({
    type: FETCH_CARDS_REQUEST
})

export const fetchCardSuccess = cards => ({
    type: FETCH_CARDS_SUCCESS,
    cards: cards.map(card => JSON.parse(card))
})