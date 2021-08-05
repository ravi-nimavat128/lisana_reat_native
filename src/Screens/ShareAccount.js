import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';

export class ShareAccount extends Component {
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
              Share Account
            </Text>
          </View>
        </View>

        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../assets/share_account_img.png')}
              style={{width: 215, height: 135, marginTop: 45}}></Image>

            <Text style={{marginTop: 44, fontSize: 24, fontWeight: 'bold'}}>
              Share With Member
            </Text>
            <Text
              style={{
                marginTop: 16,
                fontSize: 12,
                color: '#A3A3A3',
                textAlign: 'center',
                marginHorizontal: 50,
              }}>
              You can share this account with your family members to enjoy
              Lisana's benefits together
            </Text>

            <View
              style={{
                height: 56,
                marginHorizontal: 24,
                borderColor: '#DFDFE2',
                borderWidth: 1,
                width: '90%',
                borderRadius: 8,
                marginTop: 24,
                justifyContent: 'center',
              }}>
              <TextInput
                placeholder="Personal number"
                style={{marginLeft: 20}}></TextInput>
            </View>

            <View
              style={{
                height: 56,
                marginHorizontal: 24,
                borderColor: '#DFDFE2',
                borderWidth: 1,
                width: '90%',
                borderRadius: 8,
                marginTop: 24,
                justifyContent: 'center',
              }}>
              <TextInput
                placeholder="Email address"
                style={{marginLeft: 20}}></TextInput>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('InviteFriends');
          }}>
          <View
            style={{
              marginHorizontal: 24,
              backgroundColor: '#EC4464',
              height: 60,
              borderRadius: 70,
              marginTop: 40,
              marginBottom: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              Share Account
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShareAccount);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 25,
    alignItems: 'center',
  },
});
