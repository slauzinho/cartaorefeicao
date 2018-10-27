// @flow
import * as React from 'react'
import FlipCard from 'react-native-flip-card';
import { View, Text, StyleSheet, Image } from 'react-native';
import frontCard from '../assets/images/front2.png';

type Props = {
  number: number,
  cvc: string,
  nome: string,
  bgColor: string,
  focused: boolean,
  children?: React.Node,
  clickable: boolean
}

export default class CreditCard extends React.Component<Props> {

  static defaultProps = {
    number: null,
    cvc: null,
    focused: null,
    bgColor: '#F57A7A',
    nome: '',
    children: null,
    clickable: true,
  };

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
    for (let i = 1; i <= 3; i += 1) {
      const spaceIndex = (i * 4) + (i - 1);
      string = string.slice(0, spaceIndex) + ' ' + string.slice(spaceIndex);
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
          flipHorizontal
          flipVertical={false}
          clickable={this.props.clickable}
          flip={this.props.focused === true}
        >
          <View style={[styles.front, { width: 300, height: 190 }]}>
            <Image
              source={frontCard}
              style={[styles.bgImage, { width: 300, height: 190 }]}
            />
            <View style={styles.info}>
              <View style={styles.name}>
                <Text style={styles.textNumber}>{this.props.number}</Text>
              </View>
            </View>
            <View style={styles.cardName}>
              <Text style={styles.textNumber}>{this.props.nome}</Text>
            </View>
            {/* <Image
              source={require('../assets/images/cartao2.png')}
              style={[styles.bgLogo, { width: 100, height: 50 }]}
            /> */}
          </View>
          <View style={[styles.front, { width: 300, height: 190 }]}>
            <Image
              source={require('../assets/images/Back.png')}
              style={[styles.bgImage, { width: 300, height: 190 }]}
            />
            {this.props.children}
            <View style={styles.cvc}>
              <Text style={styles.textCvc}>{this.props.cvc}</Text>
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
