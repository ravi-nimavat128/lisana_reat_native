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
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: '',
      address: '',
      phone_number: '',
      email: '',
      personal_number: '',
      business_name: '',
      VAT_number: '',
      org_number: '',
      checkbox_value: false,
    };
  }

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
                  onChangeText={text =>
                    this.setState({
                      email: text,
                    })
                  }></TextInput>
              </View>
              <View style={styles.edt_box}>
                <TextInput
                  style={styles.edt_txt}
                  placeholder="Personal number"
                  onChangeText={text =>
                    this.setState({
                      personal_number: text,
                    })
                  }></TextInput>
              </View>
            </View>

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
              onPress={() => this.props.navigation.navigate('BottomNavigator')}>
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
            <TouchableOpacity>
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

export default SignIn;
