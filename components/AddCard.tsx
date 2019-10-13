import React, { FunctionComponent, useState } from 'react';
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
import { Input, Button, Badge } from 'react-native-elements';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationInjectedProps } from 'react-navigation';
import CreditCard from './CreditCard';
import { loginEdenred, loginSantander } from '../utilities/login';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Card } from '../types';
import { addCardRequest } from '../actions';

const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

const AddCard: FunctionComponent<NavigationInjectedProps> = props => {
  const [visible, setVisible] = useState(false);
  const [isFocused, setFocus] = useState(false);
  const [message, setMessage] = useState();
  const dispatch = useDispatch();

  const onSubmit = async (
    { cardNumber, cardPassword, tipo, cardName, cardColor, email }: Card,
    actions
  ) => {
    if (
      isNumeric(cardNumber) &&
      isNumeric(cardPassword) &&
      tipo === 'santander'
    ) {
      try {
        await loginSantander(cardNumber, cardPassword);
        const card = {
          cardNumber,
          cardPassword,
          tipo,
          cardName,
          cardColor,
          email,
        };
        dispatch(addCardRequest(card));
        props.navigation.navigate('Loading');
      } catch (error) {
        setMessage(error);
        actions.setSubmitting(false);
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
        ).then(() => props.navigation.navigate('Loading'));
      } catch (error) {
        setMessage(error);
      }
    }
    actions.setSubmitting(false);
    return null;
  };
  return (
    <View style={{ flex: 1, paddingTop: 15 }}>
      <ScrollView>
        <Formik
          initialValues={{
            cardNumber: '',
            cardPassword: '',
            tipo: 'santander',
            cardName: '',
            cardColor: '#F57A7A',
            email: '',
          }}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, isSubmitting, handleSubmit }) => (
            <View style={{ flex: 1, alignItems: 'center' }}>
              <CreditCard
                number={values.cardNumber}
                cvc={values.cardPassword}
                focused={isFocused}
                bgColor={values.cardColor}
                nome={values.cardName}
                clickable={!(values.tipo === 'edenred')}
              />
              <Picker
                selectedValue={values.tipo}
                style={{ height: 50, width: 300 }}
                onValueChange={handleChange('tipo')}
                itemStyle={{ fontWeight: 'bold', fontSize: 300 }}
              >
                <Picker.Item label="Santander" value="santander" />
                <Picker.Item label="Euroticket - Edenred" value="edenred" />
              </Picker>
              <View style={styles.circles}>
                <TouchableOpacity
                  style={[styles.circle, { backgroundColor: '#F57A7A' }]}
                  onPress={() => handleChange('cardColor')('#F57A7A')}
                />
                <TouchableOpacity
                  style={[styles.circle, { backgroundColor: '#5CB15A' }]}
                  onPress={() => handleChange('cardColor')('#5CB15A')}
                />
                <TouchableOpacity
                  style={[styles.circle, { backgroundColor: '#2D5B99' }]}
                  onPress={() => handleChange('cardColor')('#2D5B99')}
                />
                <TouchableOpacity
                  style={[styles.circle, { backgroundColor: '#F0C41B' }]}
                  onPress={() => handleChange('cardColor')('#F0C41B')}
                />
                <TouchableOpacity
                  style={[styles.circle, { backgroundColor: '#A3A3A3' }]}
                  onPress={() => handleChange('cardColor')('#A3A3A3')}
                />
              </View>
              {values.tipo === 'edenred' ? (
                <Input
                  placeholder="examplo@mail.com"
                  onChangeText={handleChange('email')}
                  value={values.email}
                  inputContainerStyle={styles.input}
                  containerStyle={{ marginTop: 15 }}
                  label="Email"
                />
              ) : (
                <View />
              )}
              {values.tipo === 'edenred' ? (
                <Input
                  placeholder="**********"
                  onChangeText={handleChange('cardPassword')}
                  value={values.cardPassword}
                  inputContainerStyle={styles.input}
                  containerStyle={{ marginTop: 15 }}
                  label="Password"
                />
              ) : (
                <View />
              )}
              <Input
                placeholder="XXXX XXXX XXXX XXXX"
                onChangeText={handleChange('cardNumber')}
                value={values.cardNumber}
                maxLength={16}
                keyboardType="numeric"
                onFocus={() => setFocus(false)}
                inputContainerStyle={styles.input}
                containerStyle={{ marginTop: 15 }}
                label="Numero cartão"
              />
              {values.tipo === 'santander' ? (
                <Input
                  placeholder="XXX XXX"
                  onChangeText={handleChange('cardPassword')}
                  value={values.cardPassword}
                  maxLength={6}
                  keyboardType="numeric"
                  onFocus={() => setFocus(true)}
                  inputContainerStyle={styles.input}
                  containerStyle={{ marginTop: 15 }}
                  label={'CSV'}
                  rightIcon={
                    <Icon
                      name="info-circle"
                      size={24}
                      color="grey"
                      onPress={() => setVisible(true)}
                    />
                  }
                />
              ) : (
                <View />
              )}
              <Input
                placeholder="Nome opcional para o seu cartão"
                onChangeText={handleChange('cardName')}
                value={values.cardName}
                maxLength={16}
                onFocus={() => setFocus(false)}
                inputContainerStyle={styles.input}
                containerStyle={{ marginTop: 15 }}
                label="Nome do cartão"
              />
              {message ? (
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
                    <Text style={{ color: 'white' }}>{message}</Text>
                  </Badge>
                  <Badge>
                    <Text style={{ color: 'white' }}>
                      Se estiveres com dificuldades a adicionar um cartão
                      consulta as instruções através do icon no topo superior
                      direito
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
                loadingProps={{ color: values.cardColor }}
                loading={isSubmitting}
                disabled={isSubmitting}
                onPress={() => handleSubmit()}
              />
            </View>
          )}
        </Formik>
        <Modal
          isVisible={visible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          onBackdropPress={() => setVisible(false)}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={require('../assets/images/example.png')}
            resizeMode="contain"
          />
          <MaterialCommunityIcons
            name="close"
            size={30}
            style={{ color: 'white' }}
          />
        </Modal>
      </ScrollView>
    </View>
  );
};

export default AddCard;

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
