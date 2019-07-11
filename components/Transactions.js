import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSiteRequest } from '../actions';

class TransactionsWrapper extends React.Component {
  componentDidMount() {
    const { cardNumber, cardPassword, email, tipo } = this.props;
    this.props.fetchSiteRequest(cardNumber, cardPassword, email, tipo);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cardNumber !== this.props.cardNumber) {
      if (this.props.cardNumber !== prevProps.cardNumber) {
        this.props.fetchSiteRequest(cardNumber, cardPassword, email, tipo);
      }
    }
  }

  render() {
    return this.props.render();
  }
}

function mapStateToProps(state: any) {
  return {
    ...state.index,
  };
}

export default connect(
  mapStateToProps,
  { fetchSiteRequest }
)(TransactionsWrapper);

TransactionsWrapper.propTypes = {
  cardNumber: PropTypes.string.isRequired,
  cardPassword: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};
