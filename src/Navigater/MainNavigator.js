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
import Setting from '../Screens/Setting';
import Member from '../Screens/Member';
import PersonalSettings from '../Screens/PersonalSettings';
import NotificationSetting from '../Screens/NotificationSetting';
import Language from '../Screens/Language';
import ShareAccount from '../Screens/ShareAccount';
import JobListEvent from '../Screens/JobListEvent';
import InviteFriends from '../Screens/InviteFriends';
import ViewQuote from '../Screens/ViewQuote';
import PreviewQuote from '../Screens/PreviewQuote';
import SeeInquiry from '../Screens/SeeInquiry';
import EditSetDate from '../Screens/EditSetDate';
import EditInquiry from '../Screens/EditInquiry';
import AddReview from '../Screens/AddReview';
import ShowReview from '../Screens/ShowReview';
import Crash from '../Screens/crash';

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
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Member"
          component={Member}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PersonalSettings"
          component={PersonalSettings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NotificationSetting"
          component={NotificationSetting}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Language"
          component={Language}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShareAccount"
          component={ShareAccount}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="JobListEvent"
          component={JobListEvent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="InviteFriends"
          component={InviteFriends}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewQuote"
          component={ViewQuote}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PreviewQuote"
          component={PreviewQuote}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SeeInquiry"
          component={SeeInquiry}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditSetDate"
          component={EditSetDate}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditInquiry"
          component={EditInquiry}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddReview"
          component={AddReview}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShowReview"
          component={ShowReview}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Crash"
          component={Crash}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
