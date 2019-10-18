import React, { FunctionComponent } from 'react';
import { View, Text, StyleSheet, Image, Picker, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useState } from 'react';

const StanderInstructions: FunctionComponent = () => (
    <View>
        <Card>
            <Text>Não é necessário qualquer registo.</Text>
        </Card>
        <Card>
            <Text>Introduzir o numero do cartão.</Text>
        </Card>
        <Card>
            <Image resizeMode="contain" source={require('../assets/images/example.png')} />
            <Text style={{ marginTop: 50 }}>
                O código corresponde aos ultimos três digitos da parte de trás repetido duas vezes.
            </Text>
        </Card>
    </View>
);

const EdenRedInstructions: FunctionComponent = () => (
    <View>
        <Card>
            <Text>Recentemente a Edenred mudou a forma de consulta dos seus cartões.</Text>
            <Text>
                Atualmente para consultares o saldo tens de criar conta no site da Edenred ou na aplicação Edenred.
            </Text>
        </Card>
        <Card>
            <Text>Se ainda não tens registo feito deves criar conta em https://myedenred.pt</Text>
        </Card>
        <Card>
            <Text>Após efetuares o registo associa o cartão à tua conta edenred</Text>
        </Card>
        <Card>
            <Text>
                Na nossa aplicação basta colocares o email que usaste para o registo, password e o número do cartão que
                associaste.
            </Text>
        </Card>
        <Card>
            <Text>Compatível com todos os cartões Edenred!</Text>
        </Card>
    </View>
);

type Params = { otherParam?: string };

const InstructionsScreen: NavigationStackScreenComponent<Params> = () => {
    const [active, setActive] = useState('santander');
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                    <View style={styles.containerCards}>
                        <Picker
                            selectedValue={active}
                            style={{ height: 50, width: 300 }}
                            onValueChange={setActive}
                            itemStyle={{ fontWeight: 'bold', fontSize: 300, color: 'blue' }}
                        >
                            <Picker.Item label="Santander" value="santander" />
                            <Picker.Item label="Edenred" value="edenred" />
                        </Picker>
                    </View>
                    {active === 'santander' ? <StanderInstructions /> : <EdenRedInstructions />}
                </View>
            </ScrollView>
        </View>
    );
};

InstructionsScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.state.params ? navigation.state.params.otherParam : 'Instruções:',
});

export default InstructionsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        flexDirection: 'column',
    },
    containerCards: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});
