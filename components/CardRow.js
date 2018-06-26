import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { material } from 'react-native-typography';

const CardRow = props => (
  <View style={styles.container}>
    <View style={{ flex: 0.2 }}>
      <Icon name="credit-card" size={20} color={'grey'} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={material.body1}>{props.cardNumber}</Text>
    </View>
    <View style={{ flex: 0.2 }}>
      <Icon name="check" size={20} color={'grey'} onPress={props.nav} />
    </View>
  </View>
);

export default CardRow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    borderBottomWidth: 1,
    paddingBottom: 25,
    borderBottomColor: 'rgba(220,220,220, 0.8)',
  }
});
