import * as React from 'react';
import {View, Text, Button, Image, StatusBar, Keyboard} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Intro from '../Screens/Intro';
import Splash from '../Screens/Splash';
import Register from '../Screens/Register';
import SignIn from '../Screens/SignIn';
import BottomNavigator from '../Navigater/BottomNavigator';
import ForgotPassword from '../Screens/ForgotPassword';
import HowLisanaWork from '../Screens/HowLisanaWork';
import HelpFAQ from '../Screens/HelpFAQ';
import Notification from '../Screens/Notification';
import Success_inquiry from '../Screens/Success_inquiry';
import Inquiries from '../Screens/Inquiries';
import SetDate from '../Screens/SetDate';

const Stack = createStackNavigator();

export default function MainNavigation() {
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
        <Stack.Screen
          name="BottomNavigator"
          component={BottomNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HowLisanaWork"
          component={HowLisanaWork}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HelpFAQ"
          component={HelpFAQ}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Success_inquiry"
          component={Success_inquiry}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SetDate"
          component={SetDate}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
