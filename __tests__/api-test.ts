import MockStorage from '../__mocks__/MockStorage';
import faker from 'faker';
import api from '../api';

const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);

jest.setMock('AsyncStorage', AsyncStorage);

const fakeCards = [
  '2424242424242424',
  '2121212121212121',
  '2323232323232323',
  '2222222222222222',
];

const fakeDetails = {
  '2424242424242424': {
    cardNumber: '2424242424242424',
    cardPassword: faker.internet.password(),
    cardColor: faker.commerce.color(),
    cardName: faker.name.findName(),
    tipo: 'santander',
  },
  '2121212121212121': {
    cardNumber: '2424242424242424',
    cardPassword: faker.internet.password(),
    cardColor: faker.commerce.color(),
    cardName: faker.name.findName(),
    tipo: 'santander',
  },
  '2323232323232323': {
    cardNumber: '2424242424242424',
    cardPassword: faker.internet.password(),
    cardColor: faker.commerce.color(),
    cardName: faker.name.findName(),
    email: faker.internet.email(),
    tipo: 'edenred',
  },
  '2222222222222222': {
    cardNumber: '2424242424242424',
    cardPassword: faker.internet.password(),
    cardColor: faker.commerce.color(),
    cardName: faker.name.findName(),
    tipo: 'santander',
  },
};

const cardTransactionsGenerator = key => {
  return Promise.resolve(fakeDetails[key]);
};

describe('Api', () => {
  it('Can fetch cards from storage', async () => {
    AsyncStorage.getAllKeys.mockResolvedValueOnce(fakeCards);
    AsyncStorage.getItem.mockImplementation(cardTransactionsGenerator);
    const result = await api.card.fetchAll();
    expect(result).toStrictEqual(fakeCards.map(key => fakeDetails[key]));
  });
});
