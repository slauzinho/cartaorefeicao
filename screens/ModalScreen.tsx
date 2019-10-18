import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Button, Image } from 'react-native';
import { removeCardRequest } from '../actions';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { Card } from '../types';

type Params = { item: Card };

const ModalScreen: NavigationStackScreenComponent<Params> = props => {
    const dispatch = useDispatch();
    const deleteItem = (item, navigation) => {
        dispatch(removeCardRequest(item.cardNumber));
        navigation.navigate('Loading');
    };
    const { item } = props.navigation.state.params;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../assets/images/trash_bin.png')} style={{ width: 174, height: 185 }} />
            <View style={{ marginTop: 25 }}>
                <Button onPress={() => deleteItem(item, props.navigation)} title="Apagar" color="red" />
                <View style={{ marginTop: 10 }}>
                    <Button onPress={() => props.navigation.goBack()} title="Voltar" color="grey" />
                </View>
            </View>
        </View>
    );
};

export default ModalScreen;
