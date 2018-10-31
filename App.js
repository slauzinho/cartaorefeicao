import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import Home from "./components/Home";
import InstructionsScreen from "./screens/InstructionsScreen";
import ModalScreen from "./screens/ModalScreen";
import LoadingScreen from "./screens/LoadingScreen";
import NoCardScreen from "./screens/NoCardScreen";
import AddCardScreen from "./screens/AddCardScreen";
import reducer from './reducers';
import {rootSaga} from './rootSaga';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga);

console.log(store.getState())

const MainStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      headerMode: "none",
      header: null,
      navigationOptions: {
        header: null
      }
    },
    Add: AddCardScreen,
    Help: InstructionsScreen
  },
  {
    initialRouteName: "Home",
    headerMode: "screen",
    cardStyle: {
      backgroundColor: "white",
      flex: 1,
      flexDirection: "row",
      justifyContent: "center"
    }
  }
);

const NoCardStack = createStackNavigator(
  {
    Home: {
      screen: NoCardScreen,
      headerMode: "none",
      header: null,
      navigationOptions: {
        header: null
      }
    },
    Add: AddCardScreen,
    Help: InstructionsScreen
  },
  {
    initialRouteName: "Home",
    headerMode: "screen",
    cardStyle: {
      backgroundColor: "white",
      flex: 1,
      flexDirection: "row",
      justifyContent: "center"
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
    mode: "modal",
    headerMode: "none"
  }
);

const RootSwitch = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: RootStack,
    EmptyState: NoCardStack
  },
  {
    initialRouteName: "Loading"
  }
);

const App = () => <Provider store={store}><RootSwitch style={styles.container} /></Provider>

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  }
});
