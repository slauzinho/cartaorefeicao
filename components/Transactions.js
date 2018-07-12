import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import TransactionsWrapper from './TransactionsWrapper';
import Row from './Row';

const _keyExtractor = item => item.description + item.value + item.date;

const _renderItem = ({ item }) => <Row {...item} />;

const Transactions = props => (
  <TransactionsWrapper
    {...props}
    render={(state) =>
      (state.loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      ) : (
        <FlatList
          data={state.dataSource}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
        />
      ))
    }
  />
);

Transactions.propTypes = {
  cardNumber: PropTypes.string.isRequired,
  cardPassword: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  saldo: PropTypes.func.isRequired
};

_renderItem.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Transactions;
