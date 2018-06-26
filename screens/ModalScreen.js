import React from 'react';
import { View, Button, AsyncStorage } from 'react-native';

const deleteItem = (item, navigation) => {
  AsyncStorage.removeItem(item.cardNumber).then(() => {
    /* updateState(item); */
    navigation.navigate('Loading');
  });
};

const ModalScreen = props => {
  const { item } = props.navigation.state.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View syle={{ flex: 1, alignItem: 'center' }}>
        <Button
          onPress={() => deleteItem(item, props.navigation)}
          title="Apagar"
          color="red"
        />
        <View style={{ marginTop: 20 }}>
          <Button
            onPress={() => props.navigation.goBack()}
            title="Voltar"
            color="grey"
          />
        </View>
      </View>
    </View>
  );
};

export default ModalScreen;
