import React from 'react';
import { Icon } from 'react-native-elements';
import AddCard from '../components/AddCard';

class AddCardScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params
      ? navigation.state.params.otherParam
      : 'Adicionar cartão',
    headerStyle: {
      paddingRight: 20,
    },
    headerRight: (
      <Icon
        onPress={() => navigation.navigate('Help')}
        title="Info"
        color="#111"
        name="info-with-circle"
        type="entypo"
      />
    ),
  });

  render() {
    return <AddCard {...this.props} />;
  }
}

export default AddCardScreen;
