import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Row from './Row';
import Error from './Error';
import { Transaction, AppState, Card } from '../types';
import { fetchSiteRequest } from '../actions';

const _keyExtractor = (item: Transaction) =>
  item.description + item.value + item.date;

const _renderItem = ({ item }) => <Row {...item} />;

const TransactionsList = () => {
  const error = useSelector<AppState, String>(state => state.index.error);
  const loading = useSelector<AppState, boolean>(state => state.index.loading);
  const dataSource = useSelector<AppState, Transaction[]>(
    state => state.index.transactions
  );
  const activeCard = useSelector<AppState, Card>(
    state => state.cards.cards[state.index.activeIndex]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchSiteRequest(
        activeCard.cardNumber,
        activeCard.cardPassword,
        activeCard.email,
        activeCard.tipo
      )
    );
  }, [activeCard]);

  console.log(loading, dataSource, error);

  if (error) {
    return <Error />;
  }

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    );
  }

  return (
    <FlatList<Transaction>
      data={dataSource}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
    />
  );
};

export default TransactionsList;
