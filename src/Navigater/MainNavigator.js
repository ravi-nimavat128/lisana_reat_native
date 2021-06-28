import * as React from 'react';
import {View, Text, Button, Image, StatusBar, Keyboard} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Intro from '../Screens/Intro';
import Splash from '../Screens/Splash';

const Stack = createStackNavigator();

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />

      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
