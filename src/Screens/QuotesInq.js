import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

class QuotesInq extends Component {
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
                flexDirection: 'row',
                marginTop: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#A3A3A3',
                  fontSize: 11,
                  marginRight: 5,
                  opacity: 0.5,
                }}>
                Total cost
              </Text>
              <Text
                style={{
                  color: '#EC4464',
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginRight: 16,
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

export default QuotesInq;
