import React from 'react';
import { View, Text, StyleSheet, Image, Picker, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

const StanderInstructions = () => (
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

const EdenRedInstructions = () => (
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

class InstructionsScreen extends React.Component {
    state = {
        active: 'santander',
    };

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params ? navigation.state.params.otherParam : 'Instruções:',
    });

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        <View style={styles.containerCards}>
                            <Picker
                                selectedValue={this.state.active}
                                style={{ height: 50, width: 300 }}
                                onValueChange={itemValue => this.setState({ active: itemValue })}
                                itemStyle={{ fontWeight: 'bold', fontSize: 300, color: 'blue' }}
                            >
                                <Picker.Item label="Santander" value="santander" />
                                <Picker.Item label="Edenred" value="edenred" />
                            </Picker>
                        </View>
                        {this.state.active === 'santander' ? <StanderInstructions /> : <EdenRedInstructions />}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

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

export default InstructionsScreen;
