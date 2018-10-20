import request from "superagent";
import _ from "lodash";
import axios from "axios";
import moment from 'moment';

export const loginEdenred = async (cardNumber, password, email) => {
  const postData = {
    userId: email,
    password,
    rememberme:true
  };

  const headers = {
    'postman-token': 'f1e2cec5-9d57-6415-127c-ad9abf8610ec',
     'cache-control': 'no-cache',
     'Content-Type': 'application/json',
     Accept: 'application/json'
  };

  try {
      const config = {
        url: "https://www.myedenred.pt/edenred-customer/api/authenticate/default",
        method: "POST",
        headers,
        params: { appVersion: '1.0', appType: 'PORTAL', channel: 'WEB' },
        data: postData,
        withCredentials: true,
        crossdomain: true,
      }
      var {data: {data: {token}}} = await axios(config);
  } catch(err) {
    throw "Login invalido";
  }

  const {
    data: { data: cards }
  } = await axios.get(
    "https://www.myedenred.pt/edenred-customer/api/protected/card/list",
    { headers: { Authorization: token } }
  );

  const card = cards.filter(card => (card.number == cardNumber))[0];

  try {
    var {data: {data: {movementList: transactions}}, data: {data: {account: {availableBalance}}}} = await axios.get(
      `https://www.myedenred.pt/edenred-customer/api/protected/card/${
        card.id
      }/accountmovement?appVersion=1.0`,
      { headers: { Authorization: token } }
    );
  } catch(err) {
    throw "Numero do cartão não existe";
  }

  const transactionParsed =  transactions.map(transaction => {
    const regex = /(.*)\s{2,10}/gm;
    m = regex.exec(transaction.transactionName.trim().replace('Compra: ', ''));
    let description = transaction.transactionName.trim().replace('Compra: ', '');
    if(m) {
      description = m[0].trim()
    } 
    return {
        date: moment(transaction.transactionDate).format("DD-MM-YYYY"),
        description: description,
        value: (transaction.amount + "€").replace('.', ',')
    }
  });

  return {saldo: (availableBalance + "€").replace('.', ','), transactions: transactionParsed}
};

export const loginSantander = async (cardNumber, cardPassword) => {
  const agent = request.agent();
  await agent.get(
    `https://www.particulares.santandertotta.pt/bepp/sanpt/usuarios/loginrefeicao/?accion=3&identificacionUsuario=${cardNumber}&claveConsultiva=${cardPassword}`
  );
  const getResult = await agent.get(
    "https://www.particulares.santandertotta.pt/bepp/sanpt/tarjetas/listadomovimientostarjetarefeicao/0,,,0.shtml"
  );

  return getResult.text;
};

export const reducerSantander = (accumulator, currentValue, index) => {
  if (index === 0) {
    return { ...accumulator, date: currentValue.removeWhitespace().text };
  }
  if (index === 1) {
    return accumulator;
  }
  if (index === 2) {
    return {
      ...accumulator,
      description: !isNaN(
        parseFloat(currentValue.removeWhitespace().text.slice(0, 6))
      )
        ? currentValue.removeWhitespace().text.slice(15)
        : currentValue.removeWhitespace().text
    };
  }
  return {
    ...accumulator,
    value: currentValue.removeWhitespace().text.slice(0, -4) + "€"
  };
};

