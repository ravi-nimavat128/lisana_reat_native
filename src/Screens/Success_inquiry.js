import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

export class Success_inquiry extends Component {
  render() {
    return (
      <SafeAreaView
        style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../assets/success_img.png')}
              style={{marginTop: 240, height: 151, width: 264}}></Image>

            <Text style={{color: 'black', fontSize: 24, marginTop: 40}}>
              Congratulations
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 12,
                marginTop: 40,
                opacity: 0.5,
                textAlign: 'center',
                marginHorizontal: 57,
              }}>
              Your inquiry has been successfully created and Lisana will be
              processing it immediately. For further information, We will get in
              touch with you to discuss further details.
            </Text>
            <TouchableOpacity
              style={{flex: 1, marginTop: 120}}
              onPress={() => {
                this.props.navigation.navigate('BottomNavigator');
              }}>
              <View
                style={{
                  marginHorizontal: 24,
                  backgroundColor: '#EC4464',
                  height: 60,
                  borderRadius: 70,
                  marginTop: 40,
                  width: Dimensions.get('screen').width / 1.09,
                  marginBottom: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                  See My Inquiry
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Success_inquiry;
