import { Card, Details } from '../types';

export const FETCH_CARDS_REQUEST = 'FETCH_CARDS_REQUEST';
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const FETCH_CARDS_ERROR = 'FETCH_CARDS_ERROR';
export const CHANGE_ACTIVE_INDEX = 'CHANGE_ACTIVE_INDEX';
export const FETCH_SITE_REQUEST = 'FETCH_SITE_REQUEST';
export const FETCH_SITE_SUCCESS = 'FETCH_SITE_SUCCESS';
export const FETCH_SITE_FAILURE = 'FETCH_SITE_FAILURE';
export const RESET_ACTIVE_STATE = 'RESET_ACTIVE_STATE';

interface FetchCardsRequest {
  type: typeof FETCH_CARDS_REQUEST;
}

interface FetchCardsSuccess {
  type: typeof FETCH_CARDS_SUCCESS;
  cards: Card[];
}

interface ChangeActiveIndex {
  type: typeof CHANGE_ACTIVE_INDEX;
  index: number;
}

interface FetchSiteSuccess {
  type: typeof FETCH_SITE_SUCCESS;
  payload: Details;
}

interface FetchSiteFailure {
  type: typeof FETCH_SITE_FAILURE;
  error: string;
}

interface ResetActiveState {
  type: typeof RESET_ACTIVE_STATE;
}

export interface FetchSiteRequest {
  type: typeof FETCH_SITE_REQUEST;
  payload: {
    cardNumber: string;
    password: string;
    email?: string;
    tipo: string;
  };
}

interface FetchCardsSuccess {
  type: typeof FETCH_CARDS_SUCCESS;
  cards: Card[];
}

export type CardActionTypes =
  | FetchCardsRequest
  | FetchCardsSuccess
  | ChangeActiveIndex
  | FetchSiteRequest
  | FetchSiteSuccess
  | FetchSiteFailure
  | ResetActiveState;
