import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStackNavigator } from 'react-navigation-stack';
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import Parallax from './components/Parallax';
import InstructionsScreen from './screens/InstructionsScreen';
import ModalScreen from './screens/ModalScreen';
import LoadingScreen from './screens/LoadingScreen';
import NoCardScreen from './screens/NoCardScreen';
import AddCardScreen from './screens/AddCardScreen';
import reducer from './reducers';
import { rootSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);

sagaMiddleware.run(rootSaga);

const MainStack = createStackNavigator(
  {
    Home: {
      screen: Parallax,
      headerMode: 'none',
      header: null,
      navigationOptions: {
        header: null,
      },
    },
    Add: AddCardScreen,
    Help: InstructionsScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen',
    cardStyle: {
      backgroundColor: 'white',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
  }
);

const NoCardStack = createStackNavigator(
  {
    Home: {
      screen: NoCardScreen,
      headerMode: 'none',
      header: null,
      navigationOptions: {
        header: null,
      },
    },
    Add: AddCardScreen,
    Help: InstructionsScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen',
    cardStyle: {
      backgroundColor: 'white',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: RootStack,
      EmptyState: NoCardStack,
    },
    {
      initialRouteName: 'Loading',
    }
  )
);

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;
