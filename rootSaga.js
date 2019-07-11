import { takeLatest } from 'redux-saga/effects';
import { FETCH_CARDS_REQUEST, FETCH_SITE_REQUEST } from './actions/types';
import { fetchCardsSaga, fetchSite } from './sagas/cardSaga';

export function* rootSaga() {
    yield takeLatest(FETCH_CARDS_REQUEST, fetchCardsSaga);
    yield takeLatest(FETCH_SITE_REQUEST, fetchSite);
}