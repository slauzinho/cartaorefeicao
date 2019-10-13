import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

const Error = props => (
  <View style={styles.container}>
    <Text style={styles.warning}>Erro ao tentar encontrar transacções</Text>
    <Button
      title="Tentar Novamente"
      titleStyle={{ fontWeight: '700', color: 'grey' }}
      buttonStyle={{
        backgroundColor: 'rgba(255, 255, 255, 1)',
        width: 300,
        height: 45,
        marginBottom: 60,
      }}
      containerStyle={styles.button}
      onPress={() => props.navigation.navigate('Loading')}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 50,
  },
  warning: {
    marginTop: 15,
    color: 'rgba(255, 0, 0, .8)',
    fontWeight: 'bold',
  },
});

export default withNavigation<NavigationInjectedProps>(Error);
