import React from 'react';
import HTMLParser from 'fast-html-parser';
import request from 'superagent';
import qs from 'qs';
import includes from 'lodash/includes';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import Row from './Row';

const reducerEdenred = (accumulator, currentValue, index) => {
  if (index === 0) {
    return { ...accumulator, date: currentValue.removeWhitespace().text };
  }

  if (index === 3) {
    return {
      ...accumulator,
      description: currentValue.removeWhitespace().text
    };
  }

  if (index === 4) {
    const debit = currentValue
      .removeWhitespace()
      .text.slice(0, -2)
      .replace(',', '.');

    return {
      ...accumulator,
      value: `${0 - debit}€`
    };
  }

  if (index === 5) {
    if (currentValue.removeWhitespace().text === '0,00 €') {
      return accumulator;
    }
    return {
      ...accumulator,
      value: `${currentValue.removeWhitespace().text.slice(0, -2)}€`
    };
  }
  return accumulator;
};

const reducerSantander = (accumulator, currentValue, index) => {
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
    value: currentValue.removeWhitespace().text.slice(0, -4) + '€'
  };
};

export default class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loading: true
    };
  }

  componentDidMount() {
    if (this.props.tipo === 'santander') {
      this.fetchSantander();
    }
    if (this.props.tipo === 'edenred') {
      this.fetchEdenred();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cardNumber !== this.props.cardNumber) {
      if (this.props.cardNumber !== prevProps.cardNumber) {
        if (this.props.tipo === 'santander') {
          this.fetchSantander();
        }
        if (this.props.tipo === 'edenred') {
          this.fetchEdenred();
        }
      }
    }
  }

  async fetchEdenred() {
    this.setState({ loading: true });
    this.props.saldo(null);
    const agent = request.agent();
    const getResult = await agent.get(
      'https://www.myedenred.pt/euroticket/pages/login.jsf'
    );
    let root = HTMLParser.parse(getResult.text);
    const java = root
      .querySelectorAll('input')
      .filter(element => includes(element.id, 'j_id1:javax.faces.ViewState'));
    const javaParam = java[0].attributes.value;
    const payload = {
      'javax.faces.ViewState': javaParam,
      loginform: 'loginform',
      'loginform:username': this.props.cardNumber,
      'loginform:password': this.props.cardPassword,
      'loginform:loginButton': 'Entrar'
    };

    const urlEncoded = qs.stringify(payload);

    const postResult = await agent
      .post('https://www.myedenred.pt/euroticket/pages/login.jsf')
      .send(urlEncoded);
    root = HTMLParser.parse(postResult.text);

    const saldo = root
      .querySelector('table.balance')
      .querySelector('tbody')
      .querySelectorAll('tr')[1]
      .querySelector('td')
      .querySelector('table')
      .querySelector('tbody')
      .querySelector('tr')
      .querySelectorAll('td')[1].text;

    const transactions = root
      .querySelector('tbody.rf-dt-b')
      .querySelectorAll('tr')
      .map(tr => tr.querySelectorAll('td').reduce(reducerEdenred, {}));

    this.setState({
      loading: false,
      dataSource: transactions
    });

    this.props.saldo(saldo);
  }

  async fetchSantander() {
    const { cardNumber, cardPassword } = this.props;

    this.setState({ loading: true });
    this.props.saldo(null);

    const agent = request.agent();
    await agent.get(
      `https://www.particulares.santandertotta.pt/bepp/sanpt/usuarios/loginrefeicao/?accion=3&identificacionUsuario=${cardNumber}&claveConsultiva=${cardPassword}`
    );
    const test = await agent.get(
      'https://www.particulares.santandertotta.pt/bepp/sanpt/tarjetas/listadomovimientostarjetarefeicao/0,,,0.shtml'
    );

    const root = HTMLParser.parse(test.text);
    const transactions = root
      .querySelectorAll('table.trans')[1]
      .querySelector('tbody')
      .querySelectorAll('tr')
      .slice(1)
      .map(tr => tr.querySelectorAll('td').reduce(reducerSantander, {}));
    const saldo =
      root
        .querySelector('table.trans')
        .querySelector('tbody')
        .querySelectorAll('tr')[1]
        .querySelectorAll('td')[2]
        .querySelector('b')
        .text.slice(0, -4) + '€';

    this.setState({
      loading: false,
      dataSource: transactions
    });
    this.props.saldo(saldo);
  }

  componentWillUnmount() {
    this.dataSource = null;
    this.loading = false;
  }

  _keyExtractor = item => item.description + item.value + item.date;

  _renderItem = ({ item }) => <Row {...item} />;

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      );
    }
    return (
      <FlatList
        data={this.state.dataSource}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}

Transactions.propTypes = {
  cardNumber: PropTypes.string.isRequired,
  cardPassword: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  saldo: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
