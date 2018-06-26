import React from 'react';
import {
  Text,
  View,
  AsyncStorage,
  Image,
  ActivityIndicator
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { material } from 'react-native-typography';
import Parallax from './Parallax';

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

  _changeIndex = index =>
    this.setState({ activeIndex: index });

  updateState = number => {
    const cards = this.state.cards.filter(
      card => card.cardNumber !== number.cardNumber
    );
    this.setState({ cards, activeIndex: 0 });
  };

  _renderNoCardState = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('../assets/images/nocc.png')}
        style={{ width: 363, height: 256 }}
      />
      <View style={{ marginTop: 20 }}>
        <Text style={[material.title, { color: 'rgba(0,0,0,0.4)' }]}>
          {'Não tem nenhum cartão guardado.'}
        </Text>
      </View>
      <View style={{ marginTop: 50 }}>
        <Button
          title="ADICIONAR"
          titleStyle={{ fontWeight: '700', color: 'black' }}
          buttonStyle={{
            backgroundColor: 'rgba(255, 255, 255, 1)',
            width: 300,
            height: 45
          }}
          onPress={() => this.props.navigation.navigate('Adding')}
          icon={<Icon name="plus" size={15} />}
          iconLeft
          clear
        />
      </View>
    </View>
  );

  _renderCardsState = () => (
    <Parallax
      cards={this.state.cards}
      navigate={this.props.navigation.navigate}
      updateState={this.updateState}
      changeIndex={this._changeIndex}
      activeIndex={this.state.activeIndex}
    />
  );

  _renderItem = () => {
    /* if (this.state.cards.length === 0) {
      return this._renderNoCardState();
    } */
    return this._renderCardsState();
  };

  render() {
    return this.state.loading ? (
      <ActivityIndicator size="large" color="grey" />
    ) : (
      this._renderItem()
    );
  }
}
