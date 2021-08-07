import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';

import {
  addUserId,
  addUserName,
  addBusiness_name,
  addMobile_no,
  addEmail,
  addVAT_no,
  addORG_no,
  addAddress,
  addReferral_code,
  addLoginToken,
} from '../Reducer/UserReducer/user_actions';
import Spinner from 'react-native-loading-spinner-overlay';

import {connect} from 'react-redux';

let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      full_name: '',
      address: '',
      phone_number: '',
      email: '',
      personal_number: '',
      business_name: '',
      VAT_number: '',
      org_number: '',
      checkbox_value: false,
      password: '',
    };
  }
  _logIn = () => {
    this.setState({
      isLoading: true,
    });

    let formData = new FormData();
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    formData.append('device_id', 123);

    axios
      .post('http://binarygeckos.com/lisana/api/login', formData)
      .then(Response => {
        if (Response.data.status == 1) {
          this.setState({
            isLoading: false,
          });
          Alert.alert('', Response.data.message);
          this.props.navigation.navigate('BottomNavigator');
          this.props.addUserId(Response.data.user_id);
          this.props.addUserName(Response.data.name);
          this.props.addBusiness_name(Response.data.business_name);
          this.props.addMobile_no(Response.data.mobile_no);
          this.props.addEmail(Response.data.email);
          this.props.addVAT_no(Response.data.vat_no);
          this.props.addORG_no(Response.data.org_no);
          this.props.addAddress(Response.data.address);
          this.props.addReferral_code(Response.data.referral_code);
          this.props.addLoginToken(Response.data.token);
        } else {
          this.setState({
            isLoading: false,
          });
          alert(Response.data.message);
        }
      });
  };

  render() {
    console.log('is select tab ', this.state.select_tab);
    console.log('full name ', this.state.full_name);
    console.log('address ', this.state.address);
    console.log('phone number ', this.state.phone_number);
    console.log('email ', this.state.email);
    console.log('personal number ', this.state.personal_number);
    console.log('checkbox ', this.state.checkbox_value);
    return (
      <SafeAreaView style={{flex: 1}}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={this.state.isLoading}
          //Text with the Spinner
          textContent={'Loading...'}
          size={'large'}
          animation={'fade'}
          cancelable={false}
          color="#EC4464"
          //Text style of the Spinner Text
          textStyle={{color: '#EC4464', fontSize: 20, marginLeft: 10}}
        />
        <ScrollView style={{flexL: 1}}>
          <Image
            source={require('../assets/logo_smoll.png')}
            style={styles.img_smoll}></Image>
          <Text style={styles.text_create_acc}>
            Login to your existing account
          </Text>

          <View style={styles.tab_container}>
            <View>
              <View style={styles.edt_box}>
                <TextInput
                  style={styles.edt_txt}
                  placeholder="Email"
                  keyboardType={'email-address'}
                  onChangeText={text =>
                    this.setState({
                      email: text,
                    })
                  }></TextInput>
              </View>
              <View style={styles.edt_box}>
                <TextInput
                  style={styles.edt_txt}
                  secureTextEntry
                  placeholder="Password"
                  onChangeText={text =>
                    this.setState({
                      password: text,
                    })
                  }></TextInput>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ForgotPassword')}>
              <Text
                style={{
                  alignSelf: 'flex-end',
                  marginTop: 5,
                  marginRight: 3,
                  fontSize: 13,
                  color: '#EC4464',
                }}>
                Forgot Password
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <CheckBox
                style={{alignSelf: 'center'}}
                // onCheckColor={'#EC4464'}
                tintColors={{true: '#EC4464'}}
                animationDuration={0.5}
                value={this.state.checkbox_value}
                onValueChange={newValue =>
                  this.setState({
                    checkbox_value: newValue,
                  })
                }></CheckBox>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 13,
                  color: '#CCCCCC',
                  marginLeft: 8,
                  fontWeight: 'bold',
                }}>
                Agree to
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 13,
                    color: '#EC4464',
                    marginLeft: 8,
                    fontWeight: 'bold',
                  }}>
                  terms {'&'} conditions
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.btn_create}
              onPress={() => {
                if (this.state.email == '') {
                  alert('Please enter Email');
                } else if (reg.test(this.state.email) == false) {
                  alert('Please enter Correct Email..');
                } else if (this.state.password == '') {
                  alert('Please enter Password');
                } else if (this.state.checkbox_value == false) {
                  alert('Agree to terms & condition');
                } else {
                  this._logIn();
                }
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 16,
                  color: 'white',
                  marginLeft: 8,
                  fontWeight: 'bold',
                }}>
                Sign in
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Register')}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 16,
                  marginTop: 24,
                  color: '#EC4464',
                  marginLeft: 8,
                  fontWeight: 'bold',
                  marginBottom: 40,
                }}>
                Create with Bank ID
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  img_smoll: {
    width: 39,
    height: 33,
    marginTop: 80,
    alignSelf: 'center',
  },
  text_create_acc: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 43,
    alignSelf: 'center',
    marginBottom: 80,
  },
  tab_bg: {
    flex: 1,
    borderRadius: 70,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab_txt: {
    fontSize: 16,
  },
  tab_container: {
    marginTop: 36,
    marginHorizontal: 24,
  },
  edt_box: {
    height: 57,
    borderColor: '#DFDFE2',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 24,
  },
  edt_txt: {
    color: 'black',
    fontSize: 13,
    marginLeft: 20,
  },
  btn_create: {
    height: 60,
    backgroundColor: '#EC4464',
    borderRadius: 70,
    marginHorizontal: 32,
    marginTop: 183,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  addUserId,
  addUserName,
  addBusiness_name,
  addMobile_no,
  addEmail,
  addVAT_no,
  addORG_no,
  addAddress,
  addReferral_code,
  addLoginToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
