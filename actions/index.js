import { FETCH_CARDS_REQUEST, FETCH_CARDS_SUCCESS, CHANGE_ACTIVE_INDEX, FETCH_SITE_SUCCESS, FETCH_SITE_REQUEST, FETCH_SITE_FAILURE } from './types';

export const fetchCardsRequest = () => ({
    type: FETCH_CARDS_REQUEST
})
export const fetchSiteRequest = (cardNumber, password, email, tipo) => ({
    type: FETCH_SITE_REQUEST,
    payload: {cardNumber, password, email, tipo}
})

export const fetchCardsSuccess = cards => ({
    type: FETCH_CARDS_SUCCESS,
    cards: cards.map(card => JSON.parse(card))
})

export const changeActiveIndex = (index) => ({
    type: CHANGE_ACTIVE_INDEX,
    index
})

export const fetchSiteSuccess =  (details) => ({
    type: FETCH_SITE_SUCCESS,
    payload: {...details}
})

export const fetchSiteFailure = (error) => ({
    type: FETCH_SITE_FAILURE,
    error
})