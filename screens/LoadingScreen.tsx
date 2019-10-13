import React, { useEffect, FunctionComponent } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';
import { AppState, Card } from '../types';
import { fetchCardsRequest } from '../actions';

const LoadingScreen: FunctionComponent<NavigationInjectedProps> = props => {
  const dispatch = useDispatch();

  const cards = useSelector<AppState, Card[]>(state => state.cards.cards);
  const loading = useSelector<AppState, boolean>(state => state.cards.loading);

  console.log('LOADING?!?!', loading);

  useEffect(() => {
    dispatch(fetchCardsRequest());
  }, []);

  useEffect(() => {
    if (!loading) {
      if (cards.length > 0) {
        props.navigation.navigate('Home');
      } else {
        props.navigation.navigate('EmptyState');
      }
    }
  }, [cards, loading]);

  return <ActivityIndicator size="large" color="grey" />;
};

export default LoadingScreen;
