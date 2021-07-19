import * as React from 'react';
import {View, Text, Button, Image, StatusBar, Keyboard} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';
import {platform} from 'react-native';

import Home from '../Screens/Home';
import Job from '../Screens/Job';
import Inquiries from '../Screens/Inquiries';
import Message from '../Screens/Message';
import AddInquiry from '../Screens/AddInquiry';

var home_icon = require('../assets/icon_home.png');
var inq_icon = require('../assets/icon_inquiries.png');
var messsage_icon = require('../assets/icon_message.png');
var job_icon = require('../assets/icon_job.png');
var rad_plus = require('../assets/rad_plus.png');

// var select_home_icon = require('../assets/image/select_home_icon.png');
// var select_search_icon = require('../assets/image/select_search_icon.png');
// var select_tag_icon = require('../assets/image/select_tag_icon.png');
// var select_cart_icon = require('../assets/image/select_cart_icon.png');
// var select_profile_icon = require('../assets/image/select_profile_icon.png');

const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();
// const mapStateToProps = state => ({
//   myItems: state.cartItems.items,
// });

// const mapDispatchToProps = {
//   addToCart,
// };
const BottomNavigator = props => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#BE984A',

        showLabel: false,
        style: {
          position: 'absolute',
          height: 112,
          borderColor: '#E6E6E8',
          borderLeftColor: '#E6E6E8',
          borderRightColor: '#E6E6E8',
          borderTopWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,

          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color, size}) => (
            <View>
              {focused ? (
                <View>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>Home</Text>
                  <View
                    style={{
                      width: 15,
                      height: 4,
                      backgroundColor: 'black',
                      borderRadius: 10,
                      alignSelf: 'center',
                      marginTop: 8,
                    }}></View>
                </View>
              ) : (
                <Image
                  source={home_icon}
                  style={{
                    width: 24,
                    height: 24,
                  }}></Image>
              )}
            </View>
            // <Image
            //   source={focused ? select_home_icon : home_icon}
            //   style={{
            //     width: 20,
            //     height: 20,
            //   }}
            // />
          ),
        }}
      />

      <Tab.Screen
        name="Inquiries"
        component={Inquiries}
        options={{
          tabBarLabel: 'Inquiries',
          tabBarIcon: ({focused, color, size}) => (
            <View>
              {focused ? (
                <View>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                    Inquiries
                  </Text>
                  <View
                    style={{
                      width: 15,
                      height: 4,
                      backgroundColor: 'black',
                      borderRadius: 10,
                      alignSelf: 'center',
                      marginTop: 8,
                    }}></View>
                </View>
              ) : (
                <Image
                  source={inq_icon}
                  style={{
                    width: 24,
                    height: 24,
                  }}></Image>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Red"
        component={AddInquiry}
        options={{
          tabBarLabel: 'Red',
          tabBarVisible: false,
          tabBarIcon: ({focused, color, size}) => (
            <View>
              <Image
                source={rad_plus}
                style={{
                  width: 60,
                  height: 60,
                }}></Image>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Job"
        component={Job}
        options={{
          tabBarLabel: 'Job',
          tabBarIcon: ({focused, color, size}) => (
            <View>
              {focused ? (
                <View>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>Job</Text>
                  <View
                    style={{
                      width: 15,
                      height: 4,
                      backgroundColor: 'black',
                      borderRadius: 10,
                      alignSelf: 'center',
                      marginTop: 8,
                    }}></View>
                </View>
              ) : (
                <Image
                  source={job_icon}
                  style={{
                    width: 24,
                    height: 24,
                  }}></Image>
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarLabel: 'Message',
          //   tabBarBadge: props.myItems.length == 0 ? null : props.myItems.length,
          //   tabBarBadgeStyle: {
          //     backgroundColor: '#BE984A',
          //     marginTop: 10,
          //     fontWeight: 'bold',
          //     fontSize: 12,
          //   },
          tabBarIcon: ({focused, color, size}) => (
            <View>
              {focused ? (
                <View>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                    Message
                  </Text>
                  <View
                    style={{
                      width: 15,
                      height: 4,
                      backgroundColor: 'black',
                      borderRadius: 10,
                      alignSelf: 'center',
                      marginTop: 8,
                    }}></View>
                </View>
              ) : (
                <Image
                  source={messsage_icon}
                  style={{
                    width: 24,
                    height: 24,
                  }}></Image>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
