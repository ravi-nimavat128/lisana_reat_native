/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {PersistGate} from 'redux-persist/integration/react';
// import Splash from './screens/Splash';
// import Login from './screens/Login';

import {connect, Provider} from 'react-redux';
import reduxStore from './src/Store/store';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MainNavigator from './src/Navigater/MainNavigator';

const App = () => {
  const {store, persistor} = reduxStore();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
