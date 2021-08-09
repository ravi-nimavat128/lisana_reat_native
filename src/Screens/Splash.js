import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
// import {connect} from 'react-redux';
// import {add_pushnotification_token} from '../reducers/UserReducer/user_actions';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import PushNotification from 'react-native-push-notification';
// import Firebase from '@react-native-firebase/app';
// import messaging from '@react-native-firebase/messaging';
// import {EventRegister} from 'react-native-event-listeners';

// var logo = require('../src/asset/image/logo_main.png');
class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      {
        this.props.intro_status == true
          ? this.props.login_status != false
            ? this.props.navigation.replace('BottomNavigator')
            : this.props.navigation.replace('Register')
          : this.props.navigation.replace('Intro');
      }
    }, 2000);
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../assets/logo_main.png')}
          style={{height: 200, width: 200, resizeMode: 'contain'}}
        />
      </View>
    );
  }
}
// const mapStateToProps = state => ({
//   tokenn: state.userDetails.add_pushnotification_token,
// });

// const mapDispatchToProps = {
//   add_pushnotification_token,
// };

const mapStateToProps = state => ({
  user_idd: state.userDetails.user_id,
  intro_status: state.userDetails.intro_status,
  login_status: state.userDetails.login_status,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 60,
  },
});
