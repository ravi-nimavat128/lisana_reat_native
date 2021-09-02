import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import {LogOut} from '../Reducer/UserReducer/user_actions';

export class Setting extends Component {
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
                // fontWeight: 'bold',
                fontSize: 16,
                fontFamily: 'Montserrat-Bold',
              }}>
              Settings
            </Text>
          </View>
        </View>

        <ScrollView>
          <View
            style={{flexDirection: 'row', marginHorizontal: 24, marginTop: 28}}>
            <Image
              source={require('../assets/logo_smoll.png')}
              style={{
                height: 56,
                width: 56,
                borderRadius: 56 / 2,
                resizeMode: 'contain',
              }}></Image>
            <View
              style={{
                flexDirection: 'column',
                alignSelf: 'center',
                marginLeft: 16,
              }}>
              <Text
                style={{
                  color: '#7F7F7F',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Regular',
                }}>
                Morning
              </Text>
              <Text
                style={{
                  color: '#040415',
                  fontSize: 24,
                  fontFamily: 'Montserrat-Bold',
                }}>
                Stevenson
              </Text>
            </View>
            <View style={{flex: 1}}></View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('PersonalSettings');
              }}
              style={{
                height: 56,
                width: 56,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/edt_profile.png')}
                style={{height: 24, width: 24, resizeMode: 'center'}}></Image>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('NotificationSetting');
            }}
            style={[styles.box, {marginTop: 45}]}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/notification_icon_small.png')}
                style={styles.small_img}></Image>
              <Text style={styles.txt}>Notification Settings</Text>
            </View>
            <Image
              source={require('../assets/right_arrow.png')}
              style={styles.small_img}></Image>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Language');
            }}
            style={[styles.box, {marginTop: 45}]}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/language_icon.png')}
                style={styles.small_img}></Image>
              <Text style={styles.txt}>Language</Text>
            </View>
            <Image
              source={require('../assets/right_arrow.png')}
              style={styles.small_img}></Image>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('HowLisanaWork');
            }}
            style={[styles.box, {marginTop: 45}]}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/info_icon.png')}
                style={styles.small_img}></Image>
              <Text style={styles.txt}>How Lisana Work</Text>
            </View>
            <Image
              source={require('../assets/right_arrow.png')}
              style={styles.small_img}></Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('HelpFAQ');
            }}
            style={[styles.box, {marginTop: 45}]}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/call_icon.png')}
                style={styles.small_img}></Image>
              <Text style={styles.txt}>Help and FAQ</Text>
            </View>
            <Image
              source={require('../assets/right_arrow.png')}
              style={styles.small_img}></Image>
          </TouchableOpacity>
          <View style={[styles.box, {marginTop: 45}]}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/share_icon_small.png')}
                style={styles.small_img}></Image>
              <Text style={styles.txt}>Share Apps</Text>
            </View>
            <Image
              source={require('../assets/right_arrow.png')}
              style={styles.small_img}></Image>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Member');
            }}
            style={[styles.box, {marginTop: 45}]}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/three_user.png')}
                style={styles.small_img}></Image>
              <Text style={styles.txt}>My Members</Text>
            </View>
            <Image
              source={require('../assets/right_arrow.png')}
              style={styles.small_img}></Image>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => {

            // }}
            onPress={() =>
              Alert.alert(
                '',
                'Are you sure you want to logout?',
                [
                  {
                    text: 'Yes',
                    onPress: () => {
                      this.props.LogOut();
                      this.props.navigation.replace('Splash');
                    },
                  },
                  {
                    text: 'No',
                    onPress: () => console.log('No button clicked'),
                    style: 'cancel',
                  },
                ],
                {
                  cancelable: false,
                },
              )
            }
            style={[styles.box, {marginTop: 45}]}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/logout_icon.png')}
                style={[styles.small_img, {tintColor: 'red'}]}></Image>
              <Text style={[styles.txt, {color: 'red'}]}>Logout</Text>
            </View>
            <Image
              source={require('../assets/right_arrow.png')}
              style={styles.small_img}></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginTop: 81}}
            onPress={() => {
              this.props.navigation.navigate('ShareAccount');
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
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: 'Montserrat-Bold',
                }}>
                Share With Members
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = {
  LogOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);

const styles = StyleSheet.create({
  headerr: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 25,
    alignItems: 'center',
    marginBottom: 35,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    alignItems: 'center',
  },
  small_img: {
    height: 18,
    width: 18,
  },
  txt: {
    fontSize: 14,
    color: '#3B3B3B',
    marginLeft: 14,
    fontFamily: 'Montserrat-SemiBold',
    // fontWeight: '700',
  },
});
