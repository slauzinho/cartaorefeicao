/* eslint-disable */

import React from 'react';
const { PropTypes, Component } = React;

import FlipCard from 'react-native-flip-card';
import { View,  Text, StyleSheet, Image } from 'react-native';
import frontCard from '../assets/images/front2.png';

export default class CreditCard extends Component {
  getValue(name) {
    return this[name]();
  }

  cvc() {
    if (!this.props.cvc) {
      return '•••';
    }
    return this.props.cvc.toString().length < 4
      ? this.props.cvc
      : this.props.cvc.toString().slice(0, 3);
  }

  number() {
    let string = '';

    if (!this.props.number) {
      string = '';
    } else {
      string = this.props.number.toString();
    }

    if (string.length > 16) string = string.slice(0, 16);
    while (string.length < 16) {
      string += '•';
    }
    for (let i = 1; i <= 3; i++) {
      let space_index = i * 4 + (i - 1);
      string = string.slice(0, space_index) + ' ' + string.slice(space_index);
    }

    return string;
  }

  render() {
    const cardStyle = [
      styles.container,
      { width: 300, height: 190, backgroundColor: 'white' }
    ];
    return (
      <View style={cardStyle}>
        <FlipCard
          style={[
            styles.container,
            { width: 300, height: 190, backgroundColor: this.props.bgColor }
          ]}
          friction={6}
          perspective={1000}
          flipHorizontal={true}
          flipVertical={false}
          clickable={true}
          flip={this.props.focused === true}
        >
          <View style={[styles.front, { width: 300, height: 190 }]}>
            <Image
              source={frontCard}
              style={[styles.bgImage, { width: 300, height: 190 }]}
            />
            <View style={styles.info}>
              <View style={styles.name}>
                <Text style={styles.textNumber}>{this.getValue('number')}</Text>
              </View>
            </View>
              <View style={styles.cardName}>
                <Text style={styles.textNumber}>{this.props.nome}</Text>
              </View>
          </View>
          <View style={[styles.front, { width: 300, height: 190 }]}>
            <Image
              source={require('../assets/images/Back.png')}
              style={[styles.bgImage, { width: 300, height: 190 }]}
            />
            {this.props.children}
            <View style={styles.cvc}>
              <Text style={styles.textCvc}>{this.getValue('cvc')}</Text>
            </View>
          </View>
        </FlipCard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 0,
    flex: null
  },
  bgImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    borderRadius: 8
  },
  name: {
    flex: 2,
    paddingTop: 40,
    justifyContent: 'center'
  },
  textNumber: {
    color: '#fff',
    fontSize: 21,
    textAlign: 'center',
    marginBottom: 10,
    backgroundColor: 'transparent',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontFamily: 'monospace'
  },
  cvc: {
    width: 90,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 115
  },
  textCvc: {
    color: '#000',
    fontSize: 18
  },
  info: {
    flex: 1
  },
  cardName: {
    position: 'absolute',
    left: 32,
    bottom: 20
  }
});

CreditCard.defaultProps = {
  number: null,
  cvc: null,
  name: '',
  expiry: '',
  focused: null,
  expiryBefore: 'month/year',
  expiryAfter: 'valid thru',
  shinyAfterBack: '',
  type: null,
  width: 300,
  height: 180,
  bgColor: '#F57A7A',
  clickable: true,
  nome: 'Cartão'
};
