import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import Row from './Row';

const _keyExtractor = item => item.description + item.value + item.date;

const _renderItem = ({ item }) => <Row {...item} />;

const TransactionsList = props => (
      (props.loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      ) : (
        <FlatList
          data={props.dataSource}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
        />
      ))
);

_renderItem.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired
};

TransactionsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })).isRequired
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default TransactionsList;
