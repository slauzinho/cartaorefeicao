import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, Card } from '../types';
import { fetchCardsRequest } from '../actions';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

const LoadingScreen: NavigationStackScreenComponent = props => {
    const dispatch = useDispatch();

    const cards = useSelector<AppState, Card[]>(state => state.cards.cards);
    const loading = useSelector<AppState, boolean>(state => state.cards.loading);

    useEffect(() => {
        dispatch(fetchCardsRequest());
    }, [dispatch]);

    useEffect(() => {
        if (!loading) {
            if (cards.length > 0) {
                props.navigation.navigate('Home');
            } else {
                props.navigation.navigate('EmptyState');
            }
        }
    }, [cards, loading, props.navigation]);

    return <ActivityIndicator size="large" color="grey" />;
};

export default LoadingScreen;
