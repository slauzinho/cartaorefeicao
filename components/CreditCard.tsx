import React from 'react';
import FlipCard from 'react-native-flip-card';
import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native';
import { FunctionComponent } from 'react';

interface IProps {
  number: number | string;
  cvc: string;
  nome: string;
  bgColor?: string;
  focused?: boolean;
  clickable?: boolean;
  cardStyle?: ViewStyle;
}

const CreditCard: FunctionComponent<IProps> = props => {
  const cvc = () => {
    if (!props.cvc) {
      return '•••';
    }
    return props.cvc.toString().length < 4
      ? props.cvc
      : props.cvc.toString().slice(0, 3);
  };

  const number = () => {
    let string = '';

    if (!props.number) {
      string = '';
    } else {
      string = props.number.toString();
    }

    if (string.length > 16) string = string.slice(0, 16);
    while (string.length < 16) {
      string += '•';
    }
    for (let i = 1; i <= 3; i += 1) {
      const spaceIndex = i * 4 + (i - 1);
      string = string.slice(0, spaceIndex) + ' ' + string.slice(spaceIndex);
    }

    return string;
  };
  const getValue = functionToCall => {
    if (functionToCall === 'cvc') return cvc();
    return number();
  };

  return (
    <FlipCard
      style={[
        styles.container,
        { width: 300, height: 190, backgroundColor: props.bgColor },
      ]}
      friction={6}
      perspective={1000}
      flipHorizontal
      flipVertical={false}
      clickable={props.clickable}
      flip={props.focused === true}
    >
      <View style={{ width: 300, height: 190 }}>
        <Image
          source={require('../assets/images/front2.png')}
          style={[styles.bgImage, { width: 300, height: 190 }]}
        />
        <View style={styles.info}>
          <View style={styles.name}>
            <Text style={styles.textNumber}>{getValue('number')}</Text>
          </View>
        </View>
        <View style={styles.cardName}>
          <Text style={styles.textNumber}>{props.nome}</Text>
        </View>
      </View>
      <View style={{ width: 300, height: 190 }}>
        <Image
          source={require('../assets/images/Back.png')}
          style={[styles.bgImage, { width: 300, height: 190 }]}
        />
        {props.children}
        <View style={styles.cvc}>
          <Text style={styles.textCvc}>{getValue('cvc')}</Text>
        </View>
      </View>
    </FlipCard>
  );
};

CreditCard.defaultProps = {
  bgColor: '#F57A7A',
  clickable: true,
};

export default CreditCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 0,
    flex: 0,
  },
  bgImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    borderRadius: 8,
  },
  name: {
    flex: 2,
    paddingTop: 40,
    justifyContent: 'center',
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
  },
  cvc: {
    width: 90,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 115,
  },
  textCvc: {
    color: '#000',
    fontSize: 18,
  },
  info: {
    flex: 1,
  },
  cardName: {
    position: 'absolute',
    left: 32,
    bottom: 20,
  },
});
