import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AllInquiries from '../Screens/AllInquiries';
import QuotesInq from '../Screens/QuotesInq';
import SentInq from '../Screens/SentInq';

const Tab = createMaterialTopTabNavigator();

export default class Inquiries extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={require('../assets/back_btn.png')}
              style={{height: 56, width: 56}}></Image>
          </TouchableOpacity>
          <Text
            style={{
              color: '#1F1F1F',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Inquiries
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Notification');
            }}
            style={{
              height: 56,
              width: 56,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#E6E6E8',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/notification_icon.png')}
              style={{height: 22, width: 22, resizeMode: 'center'}}></Image>
          </TouchableOpacity>
        </View>

        {/* <Text> this is Inquirues screen </Text> */}
        <Tab.Navigator
          swipeEnabled={false}
          initialRouteName="All_Inquiries"
          // screenOptions={({route}) => ({
          //   tabBarLabel: ({focused, color, size}) => {
          //     if (route.name === 'Delivery') return button1();
          //     if (route.name === 'Takeaway') return button2();
          //   },
          // })}
          tabBarOptions={{
            swipeEnabled: true,
            activeTintColor: '#000000',
            labelStyle: {
              fontSize: 16,
              textTransform: 'capitalize',
            },
            showLabel: true,
            scrollEnabled: false,

            // style: {position: 'absolute', top: 0},

            tabStyle: {
              justifyContent: 'center',
              alignSelf: 'flex-start',
              alignContent: 'center',
              backgroundColor: null,
              height: 65,
              opacity: 0.7,
              width: 120,
            },
            indicatorStyle: {
              backgroundColor: '#EC4464',
              height: '3%',
              // marginLeft: 19,
              // marginBottom: 8,
              // width: '35%',
            },

            // labelStyle: {fontSize: 20, textTransform: 'capitalize'},
          }}>
          <Tab.Screen
            name="All_Inquiries"
            component={AllInquiries}
            listeners={{
              tabPress: e => {
                // Prevent default action
                // Alert.alert('Delivery', props.is_order);
                // props.is_order_type('1');
              },
            }}
            options={{
              // tabBarLabel: () => (
              //   <View>
              //     <TouchableOpacity onPress={() => Alert.alert('vjs')}>
              //       <Text>Lol</Text>
              //     </TouchableOpacity>
              //   </View>
              // ),

              gestureEnabled: true,
            }}
          />
          <Tab.Screen
            name="Sent"
            component={SentInq}
            listeners={{
              tabPress: e => {
                // Prevent default action
                // alert(props.token);
                // props.is_order_type('2');
              },
            }}
            options={{
              // tabBarButton: () => (
              //   <TouchableOpacity onPress={() => Alert.alert('askgfasjkhj')}>
              //     <Text>HEllo</Text>
              //   </TouchableOpacity>
              // ),
              // tabBarLabel: 'Takeaway',
              // tabBarLabel: () => (
              //   <View>
              //     <TouchableOpacity
              //       onPress={() => {
              //         Alert.alert('lol');
              //       }}>
              //       <Text>HEllo</Text>
              //     </TouchableOpacity>
              //   </View>
              // ),
              // tabBarLabel: 'Takeaway',
              gestureEnabled: true,
            }}
          />

          <Tab.Screen
            name="Quotes"
            component={QuotesInq}
            listeners={{
              tabPress: e => {
                // Prevent default action
                // alert(props.token);
                // props.is_order_type('2');
              },
            }}
            options={{
              // tabBarButton: () => (
              //   <TouchableOpacity onPress={() => Alert.alert('askgfasjkhj')}>
              //     <Text>HEllo</Text>
              //   </TouchableOpacity>
              // ),
              // tabBarLabel: 'Takeaway',
              // tabBarLabel: () => (
              //   <View>
              //     <TouchableOpacity
              //       onPress={() => {
              //         Alert.alert('lol');
              //       }}>
              //       <Text>HEllo</Text>
              //     </TouchableOpacity>
              //   </View>
              // ),
              // tabBarLabel: 'Takeaway',
              gestureEnabled: true,
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
