import { call, put } from 'redux-saga/effects';
import {
  fetchCardsSuccess,
  fetchSiteSuccess,
  fetchSiteFailure,
  removeCardSuccess,
  addCardSuccess,
} from '../actions';
import api from '../api';
import {
  FetchSiteRequest,
  RemoveCardRequest,
  AddCardRequest,
} from '../actions/types';
import { AsyncStorage } from 'react-native';

export function* fetchCardsSaga() {
  try {
    yield put({ type: 'RESET_ACTIVE_STATE' });
    const cards = yield call(api.card.fetchAll);
    yield put(fetchCardsSuccess(cards));
  } catch (error) {
    console.log(error);
  }
}

export function* fetchSite(action: FetchSiteRequest) {
  const { cardNumber, password, email, tipo } = action.payload;

  try {
    let details;
    if (tipo === 'edenred') {
      details = yield call(api.edenred.fetch, cardNumber, password, email);
    } else {
      details = yield call(api.santander.fetch, cardNumber, password);
    }
    yield put(fetchSiteSuccess(details));
  } catch (error) {
    yield put(fetchSiteFailure(error));
  }
}

export function* removeCard(action: RemoveCardRequest) {
  yield call(AsyncStorage.removeItem, action.cardNumber);
  yield put(removeCardSuccess(action.cardNumber));
}

export function* addCard(action: AddCardRequest) {
  yield call(
    AsyncStorage.setItem,
    action.card.cardNumber,
    JSON.stringify(action.card)
  );
  yield put(addCardSuccess(action.card));
}
