import { call, put } from 'redux-saga/effects';
import {fetchCardSuccess} from '../actions';
import api from '../api';

export function* fetchCardsSaga() {
    try {
        const cards = yield call(api.card.fetchAll);
        yield put(fetchCardSuccess(cards))
    } catch(error) {
        console.log(error)
    }
}