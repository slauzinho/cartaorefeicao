import React from "react";
import { AsyncStorage, ActivityIndicator } from "react-native";
import Parallax from "./Parallax";

export default class Home extends React.Component {
  state = {
    cards: [],
    activeIndex: 0,
    loading: true
  };

  async componentDidMount() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cards = [];
      await Promise.all(
        keys.map(key =>
          AsyncStorage.getItem(key, (error, result) =>
            cards.push(JSON.parse(result))
          )
        )
      );
      if (cards.length > 0) {
        this.setState({ cards, loading: false });
      } else {
        this.setState({ loading: false });
      }
    } catch (error) {
      throw error;
    }
  }

  _changeIndex = index => this.setState({ activeIndex: index });

  _renderCardsState = () => (
    <Parallax
      cards={this.state.cards}
      changeIndex={this._changeIndex}
      activeIndex={this.state.activeIndex}
    />
  );

  render() {
    return this.state.loading ? (
      <ActivityIndicator size="large" color="grey" />
    ) : (
      this._renderCardsState()
    );
  }
}
