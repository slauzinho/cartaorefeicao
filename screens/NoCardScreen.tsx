import React, { FunctionComponent } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { material } from 'react-native-typography';
import { NavigationInjectedProps } from 'react-navigation';

const NoCardScreen: FunctionComponent<NavigationInjectedProps> = props => (
    <View style={styles.container}>
        <Image source={require('../assets/images/nocc.png')} style={styles.image} />
        <Text style={[material.title, styles.infoMessage]}>{'Não tem nenhum cartão guardado.'}</Text>
        <View style={styles.buttonContainer}>
            <Button
                title="ADICIONAR"
                titleStyle={styles.placeholder}
                buttonStyle={styles.button}
                onPress={() => props.navigation.navigate('Add')}
                icon={<Icon name="plus" size={15} />}
            />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 363,
        height: 256,
    },
    infoMessage: {
        marginTop: 20,
        color: 'rgba(0, 0, 0, 0.4)',
    },
    buttonContainer: {
        marginTop: 50,
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        width: 300,
        height: 45,
    },
    placeholder: {
        fontWeight: '700',
        color: 'black',
    },
});

export default NoCardScreen;
