import React, {Component} from 'react';
// import Container, {Toast} from 'toastify-react-native';
import {Toast, DURATION, POSTION} from 'rn-simple-toast';
import {CheckBox} from 'react-native-elements';

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
// import CheckBox from '@react-native-community/checkbox';
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
  add_login_status,
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
      password_v: true,
      toastRef: null,
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
          // Alert.alert('', Response.data.message);
          this.state.toastRef.show(
            'Login successfully',
            'green',
            DURATION.LONG,
          );

          this.props.navigation.navigate('BottomNavigator');
          this.props.add_login_status(true);
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
          // Toast.success('Login Successfully...');
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
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        {/* <Container position="top" animationStyle="fancy" /> */}

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
                  placeholderTextColor="#CCCCCC"
                  onChangeText={text =>
                    this.setState({
                      email: text,
                    })
                  }></TextInput>
              </View>
              <View
                style={[
                  styles.edt_box,
                  {flexDirection: 'row', alignItems: 'center'},
                ]}>
                <TextInput
                  style={styles.edt_txt}
                  secureTextEntry={this.state.password_v}
                  placeholder="Password"
                  placeholderTextColor="#CCCCCC"
                  onChangeText={text =>
                    this.setState({
                      password: text,
                    })
                  }></TextInput>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({password_v: !this.state.password_v})
                  }>
                  <Image
                    source={
                      this.state.password_v == true
                        ? require('../assets/o_eye.png')
                        : require('../assets/c_eye.png')
                    }
                    style={{height: 20, width: 20, marginRight: 10}}></Image>
                </TouchableOpacity>
              </View>
            </View>
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              {/* <CheckBox
                style={{alignSelf: 'center'}}
                // onCheckColor={'#EC4464'}
                tintColors={{true: '#EC4464'}}
                animationDuration={0.5}
                value={this.state.checkbox_value}
                onValueChange={newValue =>
                  this.setState({
                    checkbox_value: newValue,
                  })
                }></CheckBox> */}
              <CheckBox
                title={''}
                size={25}
                containerStyle={{
                  backgroundColor: '#00000000',
                  borderColor: '#00000000',
                  // marginVertical: -25,
                  marginLeft: -6,
                }}
                backdropColor={'#00000000'}
                checkedIcon={
                  <Image
                    style={{height: 18, width: 18}}
                    source={require('../assets/checked_checkbox.png')}
                  />
                }
                uncheckedIcon={
                  <Image
                    style={{height: 18, width: 18}}
                    source={require('../assets/white_check_box.png')}
                  />
                }
                iconType="font-awesome"
                // key={key}
                checked={this.state.checkbox_value}
                onPress={() => {
                  // console.log('check change', this.state.all_service);
                  // this.onCheckChanged(item.id);
                  this.setState({
                    checkbox_value: !this.state.checkbox_value,
                    // selected_checkbox_id: this.state.all_service
                    //   .filter(i => i.is_check == true)
                    //   .map(i => i.id),
                    // selected_checkbox_id: this.state.all_service.find(
                    //   i => i.is_check == item.is_check,
                    // ),
                  });
                }}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 13,
                  color: '#CCCCCC',
                  marginLeft: -8,
                  // fontWeight: 'bold',
                  fontFamily: 'Montserrat-Bold',
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
                    // fontWeight: 'bold',
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  terms {'&'} conditions
                </Text>
              </TouchableOpacity>
            </View>
            <Toast ref={_ref => (this.state.toastRef = _ref)} />
            <TouchableOpacity
              style={styles.btn_create}
              onPress={() => {
                if (this.state.email == '') {
                  // alert('Please enter Email');
                  this.state.toastRef.show(
                    'Please enter Email',
                    'red',
                    DURATION.LONG,
                  );
                } else if (reg.test(this.state.email) == false) {
                  this.state.toastRef.show(
                    'Please enter Correct Email..',
                    'red',
                    DURATION.LONG,
                  );
                } else if (this.state.password == '') {
                  this.state.toastRef.show(
                    'Please enter Password',
                    'red',
                    DURATION.LONG,
                  );
                  // } else if (this.state.checkbox_value == false) {
                  //   alert('Agree to terms & condition');
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
                  // fontWeight: 'bold',
                  fontFamily: 'Montserrat-Bold',
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
                  fontFamily: 'Montserrat-Bold',
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
    // fontWeight: 'bold',
    marginTop: 43,
    alignSelf: 'center',

    marginBottom: 80,
    fontFamily: 'Montserrat-Bold',
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
    flex: 1,
    color: 'black',
    fontSize: 13,
    marginLeft: 20,
    fontFamily: 'Montserrat-Regular',
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

  add_login_status,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
