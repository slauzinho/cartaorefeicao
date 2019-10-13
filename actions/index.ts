import {
  FETCH_CARDS_REQUEST,
  FETCH_CARDS_SUCCESS,
  CHANGE_ACTIVE_INDEX,
  FETCH_SITE_SUCCESS,
  FETCH_SITE_FAILURE,
  FETCH_SITE_REQUEST,
  CardActionTypes,
} from './types';
import { Details } from '../types';

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
