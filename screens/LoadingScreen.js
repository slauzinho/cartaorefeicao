import React from 'react';
import { ActivityIndicator, AsyncStorage } from 'react-native';

export default class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._fetchCards();
  }
  _fetchCards = async () => {
    const keys = await AsyncStorage.getAllKeys();
    this.props.navigation.navigate(keys.length !== 0 ? 'App' : 'EmptyState');
  };
  render() {
    return <ActivityIndicator size="large" color="grey" />;
  }
}
