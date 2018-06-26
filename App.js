import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Home from './components/Home';
import AddCard from './components/AddCard';
import ModalScreen from './screens/ModalScreen';
import LoadingScreen from './screens/LoadingScreen';
import NoCardScreen from './screens/NoCardScreen';

const MainStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      headerMode: 'none',
      header: null,
      navigationOptions: {
        header: null
      }
    },
    Add: AddCard
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen',
    cardStyle: {
      backgroundColor: 'white',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center'
    }
  }
);

const NoCardStack = createStackNavigator(
  {
    Home: {
      screen: NoCardScreen,
      headerMode: 'none',
      header: null,
      navigationOptions: {
        header: null
      }
    },
    Add: AddCard
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen',
    cardStyle: {
      backgroundColor: 'white',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center'
    }
  }
);

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
