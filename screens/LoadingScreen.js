// @flow
import React from "react";
import { ActivityIndicator, AsyncStorage } from "react-native";
import type { NavigationScreenProp } from 'react-navigation';

type Props = {
  navigation: NavigationScreenProp<any>
}

export default class LoadingScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this._fetchCards();
  }
  _fetchCards = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const cards = [];
    await Promise.all(
      keys.map(key =>
        AsyncStorage.getItem(key, (error, result) =>
          cards.push(JSON.parse(result))
        )
      )
    );
    const cardsToBeRemoved = await cards.filter(
      card =>
        card.tipo === "edenred" && (!("email" in card) || card.email === "")
    );
    const cardsWithRemovedOldEdenred = await cards.filter(
      card =>
        !(card.tipo === "edenred" && (!("email" in card) || card.email === ""))
    );
    if (cardsToBeRemoved) {
      await Promise.all(
        cardsToBeRemoved.map(card => AsyncStorage.removeItem(card.cardNumber))
      );
    }
    if (cardsWithRemovedOldEdenred.length > 0) {
      this.props.navigation.navigate("App");
    } else {
      this.props.navigation.navigate("EmptyState");
    }
  };
  render() {
    return <ActivityIndicator size="large" color="grey" />;
  }
}
