import React from 'react';
import { View, Button, AsyncStorage, Image } from 'react-native';
import type { NavigationScreenProp } from 'react-navigation';

const deleteItem = (item, navigation) => {
  AsyncStorage.removeItem(item.cardNumber).then(() => {
    navigation.navigate('Loading');
  });
};

type Props = {
  navigation: NavigationScreenProp<any>
}

const ModalScreen = (props: Props) => {
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
