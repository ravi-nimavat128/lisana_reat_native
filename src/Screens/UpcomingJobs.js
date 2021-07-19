import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';

export default class UpcomingJobs extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{marginHorizontal: 24, marginTop: 24, flexDirection: 'row'}}>
          <Image
            source={require('../assets/inq_img.png')}
            style={{
              height: 83,
              width: 76,
              marginRight: 16,
              resizeMode: 'contain',
            }}></Image>
          <View style={{flex: 1}}>
            <Text style={{color: '#333333', fontSize: 18, fontWeight: 'bold'}}>
              Renovating Bathroom
            </Text>
            <Text style={{fontSize: 11, color: '#A3A3A3', marginTop: 16}}>
              Acceptance date
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/calendar_icon.png')}
                style={{
                  width: 16,
                  height: 16,
                  tintColor: '#A3A3A3',
                  marginRight: 8,
                }}></Image>

              <Text
                style={{
                  color: '#000000',
                  fontSize: 12,
                  marginRight: 5,
                }}>
                Tuesday, March 9th
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
