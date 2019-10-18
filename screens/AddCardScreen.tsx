import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import AddCard from '../components/AddCard';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

interface NavStateParams {
    otherParam?: string;
}

const AddCardScreen: NavigationStackScreenComponent<NavStateParams, {}> = props => {
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
