import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

class SentInq extends Component {
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
            <View style={{flexDirection: 'row', marginTop: 8}}>
              <Text
                style={{
                  color: '#A3A3A3',
                  fontSize: 12,
                  marginRight: 3,
                  opacity: 0.5,
                }}>
                Expired on:
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  marginRight: 16,
                  opacity: 0.5,
                }}>
                15 March 2021
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginRight: 5,
                }}>
                Processing
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#EC4464',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  Edit{' '}
                </Text>
                <Image
                  source={require('../assets/down_arrow.png')}
                  style={{
                    width: 9,
                    height: 11,
                    resizeMode: 'center',
                    tintColor: '#EC4464',
                    transform: [{rotate: '270deg'}],
                  }}></Image>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default SentInq;
