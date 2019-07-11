// @flow
import React from 'react';
import type { NavigationScreenProp, NavigationState } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  Picker,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Input, Overlay, Button, Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import CreditCard from './CreditCard';
import { loginEdenred, loginSantander } from '../utilities/login';

type State = {
  cardNumber: string,
  cardPassword: string,
  tipo: string,
  isFocused: boolean,
  isVisible: boolean,
  message: ?string,
  cardName: string,
  cardColor: string,
  isLoading: boolean,
  email: string,
};

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
};

const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

export default class AddCard extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Adicionar Cartão',
    headerStyle: {
      backgroundColor: '#FFF',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  state = {
    cardNumber: '',
    cardPassword: '',
    tipo: 'santander',
    isFocused: false,
    isVisible: false,
    message: null,
    cardName: '',
    cardColor: '#F57A7A',
    isLoading: false,
    email: '',
  };

  componentWillUnmount() {
    this.state.cardNumber = '';
    this.state.cardPassword = '';
    this.state.tipo = 'santander';
    this.state.isFocused = false;
    this.state.isVisible = false;
    this.state.message = null;
    this.state.cardName = '';
    this.state.cardColor = '#F57A7A';
    this.state.isLoading = false;
  }

  async handlePress() {
    if (this.state.isLoading) {
      return null;
    }

    this.setState({ isLoading: true });
    const {
      cardNumber,
      cardPassword,
      tipo,
      cardName,
      cardColor,
      email,
    } = this.state;

    if (
      isNumeric(cardNumber) &&
      isNumeric(cardPassword) &&
      tipo === 'santander'
    ) {
      try {
        await loginSantander(cardNumber, cardPassword);
        AsyncStorage.setItem(
          cardNumber,
          JSON.stringify({
            cardNumber,
            cardPassword,
            tipo,
            cardName,
            cardColor,
          })
        ).then(() => this.props.navigation.navigate('Loading'));
      } catch (error) {
        this.setState({ message: error, isLoading: false });
      }
    }
    if (isNumeric(cardNumber) && email !== '' && tipo === 'edenred') {
      try {
        await loginEdenred(cardNumber, cardPassword, email);
        AsyncStorage.setItem(
          cardNumber,
          JSON.stringify({
            cardNumber,
            cardPassword,
            tipo,
            cardName,
            cardColor,
            email,
          })
        ).then(() => this.props.navigation.navigate('Loading'));
      } catch (error) {
        this.setState({ message: error });
      }
    }

    this.setState({ isLoading: false });
    return null;
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 15 }}>
        <ScrollView>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <CreditCard
              number={this.state.cardNumber}
              cvc={this.state.cardPassword}
              focused={this.state.isFocused}
              bgColor={this.state.cardColor}
              nome={this.state.cardName}
              clickable={!(this.state.tipo === 'edenred')}
            />
            <Picker
              selectedValue={this.state.tipo}
              style={{ height: 50, width: 300, color: '#86899E' }}
              onValueChange={itemValue => this.setState({ tipo: itemValue })}
              itemStyle={{ fontWeight: 'bold', fontSize: 300 }}
            >
              <Picker.Item label="Santander" value="santander" />
              <Picker.Item label="Euroticket - Edenred" value="edenred" />
            </Picker>
            <View style={styles.circles}>
              <TouchableOpacity
                style={[styles.circle, { backgroundColor: '#F57A7A' }]}
                onPress={() => this.setState({ cardColor: '#F57A7A' })}
              />
              <TouchableOpacity
                style={[styles.circle, { backgroundColor: '#5CB15A' }]}
                onPress={() => this.setState({ cardColor: '#5CB15A' })}
              />
              <TouchableOpacity
                style={[styles.circle, { backgroundColor: '#2D5B99' }]}
                onPress={() => this.setState({ cardColor: '#2D5B99' })}
              />
              <TouchableOpacity
                style={[styles.circle, { backgroundColor: '#F0C41B' }]}
                onPress={() => this.setState({ cardColor: '#F0C41B' })}
              />
              <TouchableOpacity
                style={[styles.circle, { backgroundColor: '#A3A3A3' }]}
                onPress={() => this.setState({ cardColor: '#A3A3A3' })}
              />
            </View>
            {this.state.tipo === 'edenred' ? (
              <Input
                placeholder="examplo@mail.com"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                inputContainerStyle={styles.input}
                containerStyle={{ marginTop: 15 }}
                label="Email"
              />
            ) : (
              <View />
            )}
            {this.state.tipo === 'edenred' ? (
              <Input
                placeholder="**********"
                onChangeText={cardPassword => this.setState({ cardPassword })}
                value={this.state.cardPassword}
                inputContainerStyle={styles.input}
                containerStyle={{ marginTop: 15 }}
                label="Password"
              />
            ) : (
              <View />
            )}
            <Input
              placeholder="XXXX XXXX XXXX XXXX"
              onChangeText={cardNumber => this.setState({ cardNumber })}
              value={this.state.cardNumber}
              maxLength={16}
              keyboardType="numeric"
              onFocus={() => this.setState({ isFocused: false, message: null })}
              inputContainerStyle={styles.input}
              containerStyle={{ marginTop: 15 }}
              label="Numero cartão"
            />
            {this.state.tipo === 'santander' ? (
              <Input
                placeholder="XXX XXX"
                onChangeText={cardPassword => this.setState({ cardPassword })}
                value={this.state.cardPassword}
                maxLength={6}
                keyboardType="numeric"
                onFocus={() =>
                  this.setState({ isFocused: true, message: null })
                }
                inputContainerStyle={styles.input}
                containerStyle={{ marginTop: 15 }}
                label={'CSV'}
                rightIcon={
                  <Icon
                    name="info-circle"
                    size={24}
                    color="grey"
                    onPress={() =>
                      this.setState({ isVisible: !this.state.isVisible })
                    }
                    underlayColor="white"
                  />
                }
              />
            ) : (
              <View />
            )}
            <Input
              placeholder="Nome opcional para o seu cartão"
              onChangeText={cardName => this.setState({ cardName })}
              value={this.state.cardName}
              maxLength={16}
              onFocus={() => this.setState({ isFocused: false })}
              inputContainerStyle={styles.input}
              containerStyle={{ marginTop: 15 }}
              label="Nome do cartão"
            />
            {this.state.message ? (
              <View
                style={{
                  paddingHorizontal: 50,
                  marginTop: 20,
                  marginBottom: -15,
                  flex: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Badge
                  containerStyle={{
                    backgroundColor: 'red',
                    width: 150,
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ color: 'white' }}>{this.state.message}</Text>
                </Badge>
                <Badge>
                  <Text style={{ color: 'white' }}>
                    Se estiveres com dificuldades a adicionar um cartão consulta
                    as instruções através do icon no topo superior direito
                  </Text>
                </Badge>
              </View>
            ) : null}
            <Button
              title="ADICIONAR"
              titleStyle={{ fontWeight: '700', color: 'grey' }}
              buttonStyle={{
                backgroundColor: 'rgba(255, 255, 255, 1)',
                width: 300,
                height: 45,
                marginBottom: 60,
              }}
              containerStyle={styles.button}
              loadingProps={{ color: this.state.cardColor }}
              loading={this.state.isLoading}
              disabled={this.state.isLoading}
              onPress={() => this.handlePress()}
            />
          </View>
          <Overlay
            isVisible={this.state.isVisible}
            windowBackgroundColor="rgba(255, 255, 255, .8)"
            width="auto"
            height="auto"
            overlayStyle={styles.overlay}
            fullscreen
          >
            <Image source={require('../assets/images/example.png')} />
            <Icon
              name="times"
              size={30}
              color="black"
              onPress={() =>
                this.setState({ isVisible: !this.state.isVisible })
              }
              containerStyle={styles.close}
              style={styles.close}
              raised
            />
          </Overlay>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'grey',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  overlay: {
    position: 'absolute',
    right: 100,
    top: 0,
  },
  close: {
    position: 'absolute',
    top: -2,
    right: 0,
  },
  button: {
    marginTop: 50,
  },
  warning: {
    marginTop: 15,
    color: 'rgba(255, 0, 0, .8)',
    fontWeight: 'bold',
  },
  circles: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
  },
  circle: {
    height: 30,
    width: 30,
    borderRadius: 50,
  },
});
