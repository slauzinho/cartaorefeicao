import React, { FunctionComponent } from 'react';
import { View, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { material } from 'react-native-typography';
import { NavigationInjectedProps } from 'react-navigation';

const NoCardScreen: FunctionComponent<NavigationInjectedProps> = props => (
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
          height: 45,
        }}
        onPress={() => props.navigation.navigate('Add')}
        icon={<Icon name="plus" size={15} />}
      />
    </View>
  </View>
);

export default NoCardScreen;
