import React from 'react';
import { View, Button, AsyncStorage, Image } from 'react-native';

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
      <Image
        source={require('../assets/images/trash_bin.png')}
        style={{ width: 174, height: 185 }}
      />
      <View style={{ marginTop: 25 }}>
        <Button
          onPress={() => deleteItem(item, props.navigation)}
          title="Apagar"
          color="red"
        />
        <View style={{ marginTop: 10 }}>
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
