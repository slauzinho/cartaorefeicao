import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import CreditCard from './CreditCard';
import { Card } from '../types';

interface Iprops {
  item: Card;
}

const CarouselItem: FunctionComponent<
  NavigationInjectedProps & Iprops
> = props => {
  const { item, navigation } = props;
  return (
    <View>
      <CreditCard
        number={item.cardNumber}
        cvc={item.tipo === 'edenred' ? '' : item.cardPassword}
        bgColor={item.cardColor}
        nome={item.cardName}
      >
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon
            raised
            name="trash"
            type="font-awesome"
            color="black"
            onPress={() => navigation.navigate('MyModal', { item })}
          />
        </View>
      </CreditCard>
    </View>
  );
};

export default withNavigation(CarouselItem);
