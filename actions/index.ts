import {
  FETCH_CARDS_REQUEST,
  FETCH_CARDS_SUCCESS,
  CHANGE_ACTIVE_INDEX,
  FETCH_SITE_SUCCESS,
  FETCH_SITE_FAILURE,
  FETCH_SITE_REQUEST,
  REMOVE_CARD_SUCCESS,
  REMOVE_CARD_REQUEST,
  ADD_CARD_REQUEST,
  ADD_CARD_SUCCESS,
  CardActionTypes,
} from './types';
import { Details, Card } from '../types';

export const fetchCardsRequest = () => ({
  type: FETCH_CARDS_REQUEST,
});

export const fetchCardsSuccess = (cards: string[]): CardActionTypes => ({
  type: FETCH_CARDS_SUCCESS,
  cards: cards.map(card => JSON.parse(card)),
});

export const changeActiveIndex = (index: number): CardActionTypes => ({
  type: CHANGE_ACTIVE_INDEX,
  index,
});

export const addCardRequest = (card: Card): CardActionTypes => ({
  type: ADD_CARD_REQUEST,
  card,
});

export const addCardSuccess = (card: Card): CardActionTypes => ({
  type: ADD_CARD_SUCCESS,
  card,
});

export const removeCardRequest = (cardNumber: string): CardActionTypes => ({
  type: REMOVE_CARD_REQUEST,
  cardNumber,
});

export const removeCardSuccess = (cardNumber: string): CardActionTypes => ({
  type: REMOVE_CARD_SUCCESS,
  cardNumber,
});

export const fetchSiteRequest = (
  cardNumber: string,
  password: string,
  email: string | undefined,
  tipo: string
): CardActionTypes => ({
  type: FETCH_SITE_REQUEST,
  payload: { cardNumber, password, email, tipo },
});

export const fetchSiteSuccess = (details: Details): CardActionTypes => ({
  type: FETCH_SITE_SUCCESS,
  payload: { ...details },
});

export const fetchSiteFailure = (error: string): CardActionTypes => ({
  type: FETCH_SITE_FAILURE,
  error,
});
