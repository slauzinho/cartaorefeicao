import React from 'react';
import HTMLParser from 'fast-html-parser';
import PropTypes from 'prop-types';
import {
  loginEdenred,
  reducerEdenred,
  reducerSantander,
  loginSantander,
  loginEdenredTest
} from '../utilities';

export default class TransactionsWrapper extends React.Component {
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

  componentWillUnmount() {
    this.dataSource = null;
    this.loading = false;
  }

  async fetchEdenred() {
    this.setState({ loading: true });
    this.props.saldo(null);
    const { cardNumber, cardPassword, email } = this.props;
    const {saldo, transactions} = await loginEdenredTest(cardNumber, cardPassword, email);

    this.setState({
      loading: false,
      dataSource: transactions
    });

    this.props.saldo(saldo);
  }

  async fetchSantander() {
    this.setState({ loading: true });
    this.props.saldo(null);
    const { cardNumber, cardPassword } = this.props;

    const postResult = await loginSantander(cardNumber, cardPassword);
    const root = HTMLParser.parse(postResult);
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

  render() {
    return this.props.render(this.state);
  }
}

TransactionsWrapper.propTypes = {
  cardNumber: PropTypes.string.isRequired,
  cardPassword: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  saldo: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired
};
