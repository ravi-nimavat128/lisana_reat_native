import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Touchable,
} from 'react-native';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../assets/back_btn.png')}
              style={{height: 56, width: 56}}></Image>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 56,
            }}>
            <Text
              style={{
                color: '#1F1F1F',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Notification
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: '#1F1F1F',
            marginTop: 40,
            marginLeft: 24,
            fontSize: 16,
          }}>
          Your Notification
        </Text>

        <View
          style={{marginHorizontal: 24, marginTop: 24, flexDirection: 'row'}}>
          <Image
            source={require('../assets/new_invitation.png')}
            style={{
              height: 48,
              width: 48,
              marginRight: 24,
              resizeMode: 'contain',
            }}></Image>
          <View style={{flex: 1}}>
            <Text style={{color: '#EC4464', fontSize: 18, fontWeight: 'bold'}}>
              New invitation
            </Text>
            <Text
              style={{
                color: '#1F1F1F',
                fontSize: 12,
                marginRight: 35,
                opacity: 0.5,
                marginTop: 8,
              }}>
              You have new discuss invitation from Lisana. Tap here to view the
              invitation
            </Text>
            <Text
              style={{
                color: '#686868',
                fontSize: 12,
                marginRight: 16,
                marginTop: 10,
              }}>
              March 09, 2021 (08:00 pm)
            </Text>
          </View>
        </View>
        <View
          style={{marginHorizontal: 24, marginTop: 24, flexDirection: 'row'}}>
          <Image
            source={require('../assets/new_quots.png')}
            style={{
              height: 48,
              width: 48,
              marginRight: 24,
              resizeMode: 'contain',
            }}></Image>
          <View style={{flex: 1}}>
            <Text style={{color: '#A3A3A3', fontSize: 18, fontWeight: 'bold'}}>
              New Quote
            </Text>
            <Text
              style={{
                color: '#686868',
                fontSize: 12,
                marginRight: 35,
                opacity: 0.5,
                marginTop: 8,
              }}>
              Lisana has sent you the quote for your latest inquiry. Tap here to
              view the quote
            </Text>
            <Text
              style={{
                color: '#BBBBBB',
                fontSize: 12,
                marginRight: 16,
                marginTop: 10,
              }}>
              March 09, 2021 (08:00 pm)
            </Text>
          </View>
        </View>
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
  },
});
export default Notification;
