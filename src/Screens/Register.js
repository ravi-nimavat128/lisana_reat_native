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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
                    style={styles.edt_txt}
                    placeholder="Phone number"
                    onChangeText={text =>
                      this.setState({
                        phone_number: text,
                      })
                    }></TextInput>
                </View>
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
            ) : (
              <View>
                <View style={styles.edt_box}>
                  <TextInput
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
                    style={styles.edt_txt}
                    placeholder="Phone number"
                    onChangeText={text =>
                      this.setState({
                        phone_number: text,
                      })
                    }></TextInput>
                </View>
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
                <View style={{flexDirection: 'row'}}>
                  <View style={[styles.edt_box, {flex: 1, marginRight: 10}]}>
                    <TextInput
                      style={styles.edt_txt}
                      placeholder="VAT number"
                      onChangeText={text =>
                        this.setState({
                          VAT_number: text,
                        })
                      }></TextInput>
                  </View>
                  <View style={[styles.edt_box, {flex: 1, marginLeft: 10}]}>
                    <TextInput
                      style={styles.edt_txt}
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
                    style={styles.edt_txt}
                    placeholder="Personal number"
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
                  fontWeight: 'bold',
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
    fontWeight: 'bold',
    marginTop: 43,
    alignSelf: 'center',
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
    marginTop: 41,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Register;
