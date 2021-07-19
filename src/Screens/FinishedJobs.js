import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';

export default class FinishedJobs extends Component {
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
            <View
              style={{
                flexDirection: 'row',
                marginTop: 8,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../assets/tick_icon.png')}
                  style={{
                    width: 16,
                    height: 16,
                    tintColor: '#A3A3A3',
                    marginRight: 8,
                  }}></Image>
                <Text style={{fontSize: 12, color: 'black'}}>
                  Job already finish
                </Text>
              </View>
              <Image
                source={require('../assets/rate_icon_red.png')}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 8,
                }}></Image>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#A3A3A3',
                  fontSize: 12,
                  marginRight: 6,
                }}>
                Total cost
              </Text>
              <Text
                style={{
                  color: '#EC4464',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginRight: 5,
                }}>
                $2.450,00
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
