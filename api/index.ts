import { AsyncStorage } from 'react-native';
import { loginEdenred, loginSantander } from '../utilities';

const fetchAllCardsFromStorage = async () => {
  const keys = await AsyncStorage.getAllKeys();
  return Promise.all(
    keys.map(async key => {
      const result = await AsyncStorage.getItem(key);
      return result;
    })
  );
};

const fetchEdenred = async (cardNumber, password, email) => {
  return loginEdenred(cardNumber, password, email);
};

const fetchSantander = async (cardNumber, password) => {
  return loginSantander(cardNumber, password);
};

export default {
  card: {
    fetchAll: fetchAllCardsFromStorage,
  },
  edenred: {
    fetch: fetchEdenred,
  },
  santander: {
    fetch: fetchSantander,
  },
};
