import MockStorage from '../__mocks__/mockStorage';
import api from '../api';
import fakeStoredItems from '../utilities/tests/cards';

const storageCache = fakeStoredItems;
const AsyncStorage = new MockStorage(storageCache);

jest.setMock('AsyncStorage', AsyncStorage);

describe('Api', () => {
    it('Can fetch cards from storage', async () => {
        const result = await api.card.fetchAll();
        expect(result).toStrictEqual(Object.keys(fakeStoredItems).map(key => fakeStoredItems[key]));
    });
});
