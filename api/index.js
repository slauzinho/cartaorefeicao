import { AsyncStorage } from 'react-native';

const fetchAllCardsFromStorare = async () => {
  const keys = await AsyncStorage.getAllKeys();
  return Promise.all(
    keys.map(key =>
      AsyncStorage.getItem(key, (error, result) => {
        if (error) {
          throw error;
        }
        return result;
      })
    )
  );
};

export default {
  card: {
    fetchAll: fetchAllCardsFromStorare,
  },
};
