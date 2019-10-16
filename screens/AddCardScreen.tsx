import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { NavigationScreenComponent } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import AddCard from '../components/AddCard';

interface NavStateParams {
    otherParam?: string;
}

const AddCardScreen: NavigationScreenComponent<any, NavStateParams> = props => {
    return <AddCard navigation={props.navigation} />;
};

AddCardScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.state.params ? navigation.state.params.otherParam : 'Adicionar cartão',
    headerStyle: {
        paddingRight: 20,
    },
    headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('Help')}>
            <AntDesign size={28} name="infocirlceo" style={{ color: 'black' }} />
        </TouchableOpacity>
    ),
});

export default AddCardScreen;
