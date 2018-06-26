import React from 'react';
import { StyleSheet, YellowBox } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Home from './components/Home';
import AddCard from './components/AddCard';
import ParallaxScreen from './screens/ParallaxScreen';
import ModalScreen from './screens/ModalScreen';
import LoadingScreen from './screens/LoadingScreen';
import NoCardScreen from './screens/NoCardScreen';

const MainStack = createStackNavigator(
  {
    Home: Home,
    Add: AddCard
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      headerMode: 'none',
      headerStyle: {
        backgroundColor: '#fff'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    },
    cardStyle: {
      backgroundColor: 'white',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center'
    }
  }
);

const NoCardStack = createStackNavigator({
  Home: NoCardScreen,
  Add: AddCard
});

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack
    },
    MyModal: {
      screen: ModalScreen
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

const RootSwitch = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: RootStack,
    EmptyState: NoCardStack
  },
  {
    initialRouteName: 'Loading'
  }
);

const App = () => <RootSwitch style={styles.container} />;

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
