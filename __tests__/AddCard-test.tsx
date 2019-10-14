import React from 'react';
import {
  render,
  fireEvent,
  flushMicrotasksQueue,
  waitForElement,
} from 'react-native-testing-library';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AddCard from '../components/AddCard';
import reducer from '../reducers';
import { loginEdenred, loginSantander } from '../utilities/login';
import { mocked } from 'ts-jest/utils';
import { Button } from 'react-native-elements';
import { addCardRequest } from '../actions';
import { Picker } from 'react-native';
import { act } from 'react-test-renderer';
import CreditCard from '../components/CreditCard';

jest.mock('../utilities/login');
jest.mock('../actions');

const mockedLoginEdenred = mocked(loginEdenred, true);
const mockedLoginSantander = mocked(loginSantander, true);

const createTestProps = (props?: object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
});

function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState) }: any = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

describe('AddCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('renders the screen correctly', () => {
    const props = createTestProps();
    const { toJSON } = renderWithRedux(<AddCard {...(props as any)} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('allows me to submit my santander card details', async () => {
    mockedLoginSantander.mockResolvedValueOnce({
      saldo: '100 €',
      transactions: [],
    });
    const props = createTestProps();
    const redux = require('react-redux');
    redux.useDispatch = jest.fn(() => jest.fn());

    const { getByType, getByText } = renderWithRedux(
      <AddCard {...(props as any)} />
    );

    fireEvent.changeText(getByText(/Numero cartão/i), '2424242424242424');
    fireEvent.changeText(getByText(/CSV/i), '24242424');
    fireEvent.press(getByType(Button));

    await flushMicrotasksQueue();

    expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
    expect(props.navigation.navigate).toHaveBeenCalledWith('Loading');
    expect(addCardRequest).toHaveBeenCalledWith({
      cardColor: '#F57A7A',
      cardName: '',
      cardNumber: '2424242424242424',
      cardPassword: '24242424',
      email: '',
      tipo: 'santander',
    });
    expect(mockedLoginSantander).toHaveBeenCalledTimes(1);
  });

  it('allows me to submit my edenred card details', async () => {
    mockedLoginEdenred.mockResolvedValueOnce({
      saldo: '100 €',
      transactions: [],
    });
    const props = createTestProps();
    const redux = require('react-redux');
    redux.useDispatch = jest.fn(() => jest.fn());

    const { getByType, getByText } = renderWithRedux(
      <AddCard {...(props as any)} />
    );

    fireEvent(getByType(Picker), 'onValueChange', 'edenred');

    fireEvent.changeText(getByText(/Numero cartão/i), '2424242424242424');
    fireEvent.changeText(getByText(/Email/i), 'test@example.com');
    fireEvent.changeText(getByText(/Password/i), 'randomPassword');
    fireEvent.press(getByType(Button));

    await flushMicrotasksQueue();

    expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
    expect(props.navigation.navigate).toHaveBeenCalledWith('Loading');
    expect(addCardRequest).toHaveBeenCalledWith({
      cardColor: '#F57A7A',
      cardName: '',
      cardNumber: '2424242424242424',
      cardPassword: 'randomPassword',
      email: 'test@example.com',
      tipo: 'edenred',
    });
    expect(mockedLoginSantander).toHaveBeenCalledTimes(0);
    expect(mockedLoginEdenred).toHaveBeenCalledTimes(1);
  });

  it('handles wrong login details for santander', async () => {
    mockedLoginSantander.mockRejectedValueOnce('Fail to login');
    const props = createTestProps();
    const redux = require('react-redux');
    redux.useDispatch = jest.fn(() => jest.fn());

    const { getByType, getByText } = renderWithRedux(
      <AddCard {...(props as any)} />
    );

    fireEvent.changeText(getByText(/Numero cartão/i), '2424242424242424');
    fireEvent.changeText(getByText(/CSV/i), '24242424');
    fireEvent.press(getByType(Button));

    await waitForElement(() => getByText('Falhou ao tentar fazer login'));
  });

  it('handles wrong login details for edenred', async () => {
    mockedLoginEdenred.mockRejectedValueOnce('Fail to login');
    const props = createTestProps();
    const redux = require('react-redux');
    redux.useDispatch = jest.fn(() => jest.fn());

    const { getByType, getByText } = renderWithRedux(
      <AddCard {...(props as any)} />
    );

    fireEvent(getByType(Picker), 'onValueChange', 'edenred');

    fireEvent.changeText(getByText(/Numero cartão/i), '2424242424242424');
    fireEvent.changeText(getByText(/Email/i), 'test@example.com');
    fireEvent.changeText(getByText(/Password/i), 'randomPassword');
    fireEvent.press(getByType(Button));

    await waitForElement(() => getByText('Falhou ao tentar fazer login'));
  });

  it('allows me to choose different colours', async () => {
    const props = createTestProps();
    const redux = require('react-redux');
    redux.useDispatch = jest.fn(() => jest.fn());

    const { getByTestId, getByType } = renderWithRedux(
      <AddCard {...(props as any)} />
    );

    fireEvent.press(getByTestId('pinkColorBtn'));
    expect(getByType(CreditCard).props.bgColor).toBe('#F57A7A');
    fireEvent.press(getByTestId('greenColorBtn'));
    expect(getByType(CreditCard).props.bgColor).toBe('#5CB15A');
    fireEvent.press(getByTestId('blueColorBtn'));
    expect(getByType(CreditCard).props.bgColor).toBe('#2D5B99');
    fireEvent.press(getByTestId('yellowColorBtn'));
    expect(getByType(CreditCard).props.bgColor).toBe('#F0C41B');
    fireEvent.press(getByTestId('greyColorBtn'));
    expect(getByType(CreditCard).props.bgColor).toBe('#A3A3A3');
  });
});
