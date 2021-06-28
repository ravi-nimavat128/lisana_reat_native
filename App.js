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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MainNavigator from './src/Navigater/MainNavigator';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <MainNavigator />
    </SafeAreaView>
  );
};

export default App;
