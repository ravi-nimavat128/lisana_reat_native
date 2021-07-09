import React, {Component} from 'react';
import axios from 'axios';

import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
    };
  }

  forgot_pass = () => {
    try {
      this.setState({
        isLoading: true,
      });

      let formData = new FormData();
      formData.append('email', this.state.email);

      axios
        .post('http://binarygeckos.com/lisana/api/forgot_password', formData)
        .then(Response => {
          if (Response.data.status == 1) {
            this.setState({
              isLoading: false,
            });
            this.props.navigation.goBack();
            alert(Response.data.message);
          } else {
            this.setState({
              isLoading: false,
            });
            alert(Response.data.message);
          }
        })
        .catch(err => {
          this.setState({isLoading: false});
          console.log(JSON.stringify(err, null, 2));
        });
    } catch (errr) {
      console.log('catch error', JSON.stringify(errr, null, 2));
    }
  };

  render() {
    console.log('emailll', this.state.email);
    return (
      <SafeAreaView>
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
          <Text style={styles.text_create_acc}>Forgot Password</Text>

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
            </View>
          </View>
          <TouchableOpacity
            style={styles.btn_create}
            onPress={() => {
              if (this.state.email == '') {
                alert('Please enter Email');
              } else {
                this.forgot_pass();
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
              Forgot Password
            </Text>
          </TouchableOpacity>
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

export default ForgotPassword;
