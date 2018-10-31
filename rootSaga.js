import { takeLatest } from 'redux-saga/effects';
import { FETCH_CARDS_REQUEST } from './actions/types';
import { fetchCardsSaga } from './sagas/cardSaga';

export function* rootSaga() {
    yield takeLatest(FETCH_CARDS_REQUEST, fetchCardsSaga);
}