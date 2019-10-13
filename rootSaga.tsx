import { takeLatest } from 'redux-saga/effects';
import {
  FETCH_CARDS_REQUEST,
  FETCH_SITE_REQUEST,
  REMOVE_CARD_REQUEST,
  ADD_CARD_REQUEST,
} from './actions/types';
import {
  fetchCardsSaga,
  fetchSite,
  removeCard,
  addCard,
} from './sagas/cardSaga';

export function* rootSaga() {
  yield takeLatest(FETCH_CARDS_REQUEST, fetchCardsSaga);
  yield takeLatest(FETCH_SITE_REQUEST, fetchSite);
  yield takeLatest(REMOVE_CARD_REQUEST, removeCard);
  yield takeLatest(ADD_CARD_REQUEST, addCard);
}
