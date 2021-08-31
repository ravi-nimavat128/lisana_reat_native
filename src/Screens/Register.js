import React, {Component} from 'react';
import axios from 'axios';
import {Toast, DURATION, POSTION} from 'rn-simple-toast';
// import {CheckBox} from 'react-native-elements';
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
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {addUserId, add_login_status} from '../Reducer/UserReducer/user_actions';
let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,

      select_tab: 1,
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
      password_vv: true,
      toastRef: null,
    };
  }

  _get_register = () => {
    this.setState({
      isLoading: true,
    });

    let formData = new FormData();
    formData.append('name', this.state.full_name);
    formData.append('business_name', this.state.business_name);
    formData.append('email', this.state.email);
    formData.append('mobile_no', this.state.phone_number);
    formData.append('vat_no', this.state.VAT_number);
    formData.append('org_no', this.state.org_number);
    formData.append('address', this.state.address);
    formData.append('type', this.state.select_tab);
    formData.append('password', this.state.password);
    // formData.append('referral_code', this.state.txt_leandmark);

    axios
      .post('http://binarygeckos.com/lisana/api/add_user', formData)
      .then(response => {
        if (response.data.status == 1) {
          this.setState({
            isLoading: false,
          });
          // Alert.alert('', '');
          this.state.toastRef.show(
            'your account has been created successfully',
            'green',
            DURATION.LONG,
          );
          this.props.navigation.navigate('BottomNavigator');
          this.props.add_login_status(true);
          this.props.addUserId(response.data.user_id);
        } else {
          this.setState({
            isLoading: false,
          });
          alert(response.data.message);
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
          <Text style={styles.text_create_acc}>Create an account as</Text>
          <View
            style={{
              flexDirection: 'row',
              height: 58,
              marginHorizontal: 24,
              marginTop: 41,
            }}>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  select_tab: 1,
                })
              }
              style={[
                styles.tab_bg,
                {
                  backgroundColor:
                    this.state.select_tab == 1 ? '#EC4464' : 'white',
                  borderColor:
                    this.state.select_tab == 1 ? '#EC4464' : '#DFDFE2',
                  borderWidth: 1,
                },
              ]}>
              <Text
                style={[
                  styles.tab_txt,
                  {color: this.state.select_tab == 1 ? '#FFFFFF' : 'black'},
                ]}>
                Personal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.setState({
                  select_tab: 2,
                })
              }
              style={[
                styles.tab_bg,
                {
                  backgroundColor:
                    this.state.select_tab == 2 ? '#EC4464' : 'white',
                  borderColor:
                    this.state.select_tab == 2 ? '#EC4464' : '#DFDFE2',
                  borderWidth: 1,
                },
              ]}>
              <Text
                style={[
                  styles.tab_txt,
                  {color: this.state.select_tab == 2 ? '#FFFFFF' : 'black'},
                ]}>
                Business
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tab_container}>
            {this.state.select_tab == 1 ? (
              <View>
                <View style={styles.edt_box}>
                  <TextInput
                    placeholderTextColor="#CCCCCC"
                    style={styles.edt_txt}
                    returnKeyType="next"
                    placeholder="Enter your full name"
                    onSubmitEditing={() => {
                      this.address.focus();
                    }}
                    onChangeText={text =>
                      this.setState({
                        full_name: text,
                      })
                    }></TextInput>
                </View>
                <View style={styles.edt_box}>
                  <TextInput
                    placeholderTextColor="#CCCCCC"
                    style={styles.edt_txt}
                    onSubmitEditing={() => {
                      this.phone_number.focus();
                    }}
                    ref={input => {
                      this.address = input;
                    }}
                    returnKeyType="next"
                    placeholder="Address"
                    onChangeText={text =>
                      this.setState({
                        address: text,
                      })
                    }></TextInput>
                </View>
                <View style={styles.edt_box}>
                  <TextInput
                    placeholderTextColor="#CCCCCC"
                    style={styles.edt_txt}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.email.focus();
                    }}
                    ref={input => {
                      this.phone_number = input;
                    }}
                    placeholder="Phone number"
                    maxLength={10}
                    keyboardType={'phone-pad'}
                    onChangeText={text =>
                      this.setState({
                        phone_number: text,
                      })
                    }></TextInput>
                </View>
                <View style={styles.edt_box}>
                  <TextInput
                    placeholderTextColor="#CCCCCC"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.password.focus();
                    }}
                    ref={input => {
                      this.email = input;
                    }}
                    style={styles.edt_txt}
                    placeholder="Email"
                    keyboardType="email-address"
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
                    placeholderTextColor="#CCCCCC"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.personal_number.focus();
                    }}
                    ref={input => {
                      this.password = input;
                    }}
                    style={[styles.edt_txt, {flex: 1}]}
                    placeholder="Password"
                    secureTextEntry={this.state.password_v}
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
                <View style={styles.edt_box}>
                  <TextInput
                    placeholderTextColor="#CCCCCC"
                    returnKeyType="next"
                    // onSubmitEditing={() => { this.personal_number.focus(); }}
                    ref={input => {
                      this.personal_number = input;
                    }}
                    style={styles.edt_txt}
                    placeholder="Personal number"
                    keyboardType="number-pad"
                    onChangeText={text =>
                      this.setState({
                        personal_number: text,
                      })
                    }></TextInput>
                </View>
              </View>
            ) : (
              <View>
                <View style={styles.edt_box}>
                  <TextInput
                    placeholderTextColor="#CCCCCC"
                    onSubmitEditing={() => {
                      this.business_name.focus();
                    }}
                    // ref={input => {
                    //   this.password = input;
                    // }}
                    returnKeyType="next"
                    style={styles.edt_txt}
                    placeholder="Enter your full name"
                    onChangeText={text =>
                      this.setState({
                        full_name: text,
                      })
                    }></TextInput>
                </View>
                <View style={styles.edt_box}>
                  <TextInput
                    placeholderTextColor="#CCCCCC"
                    onSubmitEditing={() => {
                      this.address.focus();
                    }}
                    ref={input => {
                      this.business_name = input;
                    }}
                    returnKeyType="next"
                    style={styles.edt_txt}
                    placeholder="Enter your business name"
                    onChangeText={text =>
                      this.setState({
                        business_name: text,
                      })
                    }></TextInput>
                </View>
                <View style={styles.edt_box}>
                  <TextInput
                    placeholderTextColor="#CCCCCC"
                    onSubmitEditing={() => {
                      this.phone_number.focus();
                    }}
                    ref={input => {
                      this.address = input;
                    }}
                    returnKeyType="next"
                    style={styles.edt_txt}
                    placeholder="Address"
                    onChangeText={text =>
                      this.setState({
                        address: text,
                      })
                    }></TextInput>
                </View>
                <View style={styles.edt_box}>
                  <TextInput
                    placeholderTextColor="#CCCCCC"
                    onSubmitEditing={() => {
                      this.email.focus();
                    }}
                    ref={input => {
                      this.phone_number = input;
                    }}
                    returnKeyType="next"
                    style={styles.edt_txt}
                    placeholder="Phone number"
                    maxLength={10}
                    keyboardType="phone-pad"
                    onChangeText={text =>
                      this.setState({
                        phone_number: text,
                      })
                    }></TextInput>
                </View>
                <View style={styles.edt_box}>
                  <TextInput
                    placeholderTextColor="#CCCCCC"
                    onSubmitEditing={() => {
                      this.password.focus();
                    }}
                    ref={input => {
                      this.email = input;
                    }}
                    returnKeyType="next"
                    style={styles.edt_txt}
                    placeholder="Email"
                    keyboardType={'email-address'}
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
                    placeholderTextColor="#CCCCCC"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.VAT_number.focus();
                    }}
                    ref={input => {
                      this.password = input;
                    }}
                    style={[styles.edt_txt, {flex: 1}]}
                    placeholder="Password"
                    secureTextEntry={this.state.password_v}
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
                <View style={{flexDirection: 'row'}}>
                  <View style={[styles.edt_box, {flex: 1, marginRight: 10}]}>
                    <TextInput
                      placeholderTextColor="#CCCCCC"
                      onSubmitEditing={() => {
                        this.org_number.focus();
                      }}
                      ref={input => {
                        this.VAT_number = input;
                      }}
                      returnKeyType="next"
                      style={styles.edt_txt}
                      placeholder="VAT number"
                      keyboardType="number-pad"
                      onChangeText={text =>
                        this.setState({
                          VAT_number: text,
                        })
                      }></TextInput>
                  </View>
                  <View style={[styles.edt_box, {flex: 1, marginLeft: 10}]}>
                    <TextInput
                      placeholderTextColor="#CCCCCC"
                      onSubmitEditing={() => {
                        this.personal_number.focus();
                      }}
                      ref={input => {
                        this.org_number = input;
                      }}
                      returnKeyType="next"
                      style={styles.edt_txt}
                      keyboardType="number-pad"
                      placeholder="Org. Number"
                      onChangeText={text =>
                        this.setState({
                          org_number: text,
                        })
                      }></TextInput>
                  </View>
                </View>
                <View style={styles.edt_box}>
                  <TextInput
                    placeholderTextColor="#CCCCCC"
                    //  onSubmitEditing={() => {
                    //     this.personal_number.focus();
                    //   }}
                    ref={input => {
                      this.personal_number = input;
                    }}
                    returnKeyType="next"
                    style={styles.edt_txt}
                    placeholder="Personal number"
                    keyboardType="number-pad"
                    onChangeText={text =>
                      this.setState({
                        personal_number: text,
                      })
                    }></TextInput>
                </View>
              </View>
            )}
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
                // borderColor={{true: '#E5EAF4'}}
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
                  fontWeight: '500',
                  fontFamily: 'Montserrat-Regular',
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
                    fontFamily: 'Montserrat-Regular',
                    fontWeight: '500',
                  }}>
                  terms {'&'} conditions
                </Text>
              </TouchableOpacity>
            </View>
            <Toast ref={_ref => (this.state.toastRef = _ref)} />

            <TouchableOpacity
              style={styles.btn_create}
              onPress={() => {
                if (this.state.select_tab == 1) {
                  if (this.state.full_name == '') {
                    this.state.toastRef.show(
                      'Please enter your full name',
                      'red',
                      DURATION.LONG,
                    );
                  } else if (this.state.address == '') {
                    this.state.toastRef.show(
                      'Please enter your address',
                      'red',
                      DURATION.LONG,
                    );
                    // alert('Please enter your address');
                  } else if (this.state.phone_number == '') {
                    // alert('Please enter your phone number');
                    this.state.toastRef.show(
                      'Please enter your phone number',
                      'red',
                      DURATION.LONG,
                    );
                  } else if (this.state.phone_number.length != 10) {
                    // alert('Please enter proper Phone number');
                    this.state.toastRef.show(
                      'Please enter proper phone number',
                      'red',
                      DURATION.LONG,
                    );
                  } else if (this.state.email == '') {
                    // alert('Please enter your email');
                    this.state.toastRef.show(
                      'Please enter your email',
                      'red',
                      DURATION.LONG,
                    );
                  } else if (reg.test(this.state.email) == false) {
                    // alert('Please enter Correct Email..');
                    this.state.toastRef.show(
                      'Please enter Correct Email..',
                      'red',
                      DURATION.LONG,
                    );
                  } else if (this.state.password == '') {
                    // alert('Please enter your Password');
                    this.state.toastRef.show(
                      'Please enter your Password',
                      'red',
                      DURATION.LONG,
                    );
                  } else if (this.state.password.length == 6) {
                    // alert(
                    //   'The password must be of minimum length 8 characters',
                    // );
                    this.state.toastRef.show(
                      'The password must be of minimum length 8 characters',
                      'red',
                      DURATION.LONG,
                    );
                  } else if (this.state.personal_number == '') {
                    // alert('Please enter your Personal number');
                    this.state.toastRef.show(
                      'Please enter your Personal number',
                      'red',
                      DURATION.LONG,
                    );
                  } else if (this.state.checkbox_value == false) {
                    // alert('Agree to terms & condition');
                    this.state.toastRef.show(
                      'Agree to terms & condition',
                      'red',
                      DURATION.LONG,
                    );
                  } else {
                    this._get_register();
                  }
                } else {
                  if (this.state.full_name == '') {
                    // alert('Please enter your full name');
                    this.state.toastRef.show(
                      'Please enter your full name',
                      'red',
                      DURATION.LONG,
                    );
                  } else if (this.state.business_name == '') {
                    // alert('Please enter your Business name');
                    this.state.toastRef.show(
                      'Please enter your Business name',
                      'red',
                      DURATION.LONG,
                    );
                  } else if (this.state.address == '') {
                    // alert('Please enter your address');
                    this.state.toastRef.show(
                      'Please enter your address',
                      'red',
                      DURATION.LONG,
                    );
                  } else if (this.state.phone_number == '') {
                    // alert('Please enter your Phone number');
                    this.state.toastRef.show(
                      'Please enter your phone number',
                      'red',
                      DURATION.LONG,
                    );
                  } else if (this.state.phone_number.length != 10) {
                    // alert('Please enter proper Phone number');
                    this.state.toastRef.show(
                      'Please enter your proper phone number',
                      'red',
                      DURATION.LONG,
                    );
                  } else if (this.state.email == '') {
                    // alert('Please enter your email');
                    this.state.toastRef.show(
                      'Please enter your email',
                      'red',
                      DURATION.LONG,
                    );
                  } else if (this.state.password == '') {
                    // alert('Please enter your Password');
                    this.state.toastRef.show(
                      'Please enter your password',
                      'red',
                      DURATION.LONG,
                    );
                  } else if (reg.test(this.state.email) == false) {
                    // alert('Please enter Correct Email..');
                    this.state.toastRef.show(
                      'Please enter Correct Email...',
                      'red',
                      DURATION.LONG,
                    );
                  } else if (this.state.password.length == 6) {
                    // alert(
                    //   'The password must be of minimum length 8 characters',
                    // );
                    this.state.toastRef.show(
                      'The password must be of minimum length 8 characters',
                      'red',
                      DURATION.LONG,
                    );
                  } else if (this.state.VAT_number == '') {
                    // alert('Please enter your VAT number');
                    this.state.toastRef.show(
                      'Please enter your VAT number',
                      'red',
                      DURATION.LONG,
                    );
                  } else if (this.state.org_number == '') {
                    // alert('Please enter your ORG number');
                    this.state.toastRef.show(
                      'Please enter your ORG number',
                      'red',
                      DURATION.LONG,
                    );
                  } else if (this.state.personal_number == '') {
                    // alert('Please enter your Personal number');
                    this.state.toastRef.show(
                      'Please enter your Personal number',
                      'red',
                      DURATION.LONG,
                    );
                  } else if (this.state.checkbox_value == false) {
                    // alert('Agree to terms & condition');
                    this.state.toastRef.show(
                      'Agree to terms & condition',
                      'red',
                      DURATION.LONG,
                    );
                  } else {
                    this._get_register();
                  }
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
                Create with Bank ID
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignIn')}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 16,
                  marginTop: 24,
                  color: '#EC4464',
                  marginLeft: 8,
                  // fontWeight: 'bold',
                  fontFamily: 'Montserrat-Bold',
                  marginBottom: 40,
                }}>
                Sign in
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
    fontFamily: 'Montserrat-Regular',
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
    fontFamily: 'Montserrat-Regular',
  },
  btn_create: {
    height: 60,
    backgroundColor: '#EC4464',
    borderRadius: 70,
    marginHorizontal: 32,
    marginTop: 41,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapStateToProps = state => ({});

const mapDispatchToProps = {
  add_login_status,
  addUserId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
