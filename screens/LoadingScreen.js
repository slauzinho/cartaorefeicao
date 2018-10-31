// @flow
import React from "react";
import { ActivityIndicator } from "react-native";
import type { NavigationScreenProp } from 'react-navigation';
import { fetchCardsRequest } from '../actions';
import { connect } from 'react-redux';

type Props = {
  navigation: NavigationScreenProp<any>
}

class LoadingScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.props.fetchCards()
  }

  componentDidUpdate() {
    if (this.props.cards.length > 0) {
      this.props.navigation.navigate("App");
    } else {
      this.props.navigation.navigate("EmptyState");
    }
  }
  render() {
    return <ActivityIndicator size="large" color="grey" />;
  }
}

export default connect(
  state => ({ ...state.cards }),
  { fetchCards: fetchCardsRequest }
)(LoadingScreen);