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
import {connect} from 'react-redux';
import {addInqTab} from '../Reducer/DateReducer/date_actions';

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

            <Text
              style={{
                color: 'black',
                fontSize: 24,
                marginTop: 40,
                fontFamily: 'Montserrat-Regular',
              }}>
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
                fontFamily: 'Montserrat-Regular',
              }}>
              Your inquiry has been successfully created and Lisana will be
              processing it immediately. For further information, We will get in
              touch with you to discuss further details.
            </Text>
            <View style={{flex: 1, marginTop: 120}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.addInqTab(1);
                  this.props.navigation.replace('BottomNavigator');
                }}
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
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  See My Inquiry
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  addInqTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(Success_inquiry);
