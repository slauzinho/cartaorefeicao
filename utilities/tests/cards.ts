import faker from 'faker';

export default {
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
