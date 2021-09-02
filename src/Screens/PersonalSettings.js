import axios from 'axios';
import React, {Component} from 'react';
import ImgToBase64 from 'react-native-image-base64';
import DocumentPicker from 'react-native-document-picker';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {addInqTab} from '../Reducer/DateReducer/date_actions';
import {Alert} from 'react-native';

export class PersonalSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      full_name: '',
      address: '',
      phone_number: '',
      email: '',
      personal_number: '',
      img_path: '',
      base64: '',
      img_file: [],
      multipleFile: [],
    };
  }

  componentDidMount() {
    this._get_profile_data();
  }

  _get_profile_data = () => {
    this.setState({
      isLoading: true,
    });

    const token = 'Bearer '.concat(this.props.login_token);

    var headers = {
      Authorization: token,
    };

    let formData = new FormData();
    formData.append('user_id', this.props.user_id);
    // formData.append('inquiry_id', this.props.route.params.id);
    // formData.append('rating_star', this.state.rating);
    // formData.append('comment', this.state.comment);

    axios
      .post(
        'http://binarygeckos.com/lisana/api/get_single_user_data',
        formData,
        {
          headers: headers,
        },
      )
      .then(Response => {
        if (Response.data.status == 1) {
          this.setState({
            isLoading: false,
            full_name: Response.data.name,
            address: Response.data.address,
            phone_number: Response.data.mobile_no,
            email: Response.data.email,
            personal_number: Response.data.personal_no,
            img_path: Response.data.profile_image,
          });
          //   this.toggleBottomSheet();
        } else {
          this.setState({isLoading: false});
          alert(Response.data.message);
        }
      });
  };
  _update_profile_data = () => {
    this.setState({
      isLoading: true,
    });

    const token = 'Bearer '.concat(this.props.login_token);

    var headers = {
      Authorization: token,
    };

    let formData = new FormData();
    formData.append('user_id', this.props.user_id);
    formData.append('name', this.state.full_name);
    formData.append('address', this.state.address);
    formData.append('mobile_no', this.state.phone_number);
    formData.append('personal_no', this.state.personal_number);
    formData.append('profile_image', this.state.base64);

    axios
      .post(
        'http://binarygeckos.com/lisana/api/update_user_details',
        formData,
        {
          headers: headers,
        },
      )
      .then(Response => {
        if (Response.data.status == 1) {
          this.setState({
            isLoading: false,
          });
          Alert.alert('', Response.data.message);
          this.props.addInqTab(0);
          this.props.navigation.replace('BottomNavigator');
          //   this.toggleBottomSheet();
        } else {
          this.setState({isLoading: false});
          alert(Response.data.message);
        }
      })
      .catch(err => console.log(err));
  };

  _get_img = async () => {
    // Pick a single file
    // try {
    //   const results = await DocumentPicker.pick({
    //     type: [DocumentPicker.types.images],

    //     //There can me more options as well find above
    //   });
    //   for (const res of results) {
    //     //Printing the log realted to the file
    //     console.log('res : ' + JSON.stringify(res));
    //     console.log('URI : ' + res.uri);
    //     console.log('Type : ' + res.type);
    //     console.log('File Name : ' + res.name);
    //     console.log('File Size : ' + res.size);

    //     this.setState({
    //       img_path: res.uri,
    //     });
    //     this.base64();
    //   }
    //   //Setting the state to show multiple file attributes
    //   this.setState({
    //     img_file: results,
    //   });

    //   // setMultipleFile(results);
    //   // this.base64();
    // } catch (err) {
    //   //Handling any exception (If any)
    //   if (DocumentPicker.isCancel(err)) {
    //     //If user canceled the document selection
    //     alert('Canceled from multiple doc picker');
    //   } else {
    //     //For Unknown Error
    //     alert('Unknown Error: ' + JSON.stringify(err));
    //     throw err;
    //   }
    // }

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
      this.setState({
        img_path: res.uri,
      });
      this.base64();
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  base64 = () => {
    // ImgToBase64.getBase64String(
    //   'file:',
    //   Platform.OS === 'android'
    //     ? this.state.img_path
    //     : this.state.img_path.replace('file://', ''),
    // )
    //   .then(base64String => this.setState({base64: base64String}))
    //   .catch(err => doSomethingWith(err));
    ImgToBase64.getBase64String(this.state.img_path)
      .then(base64String => this.setState({base64: base64String}))
      .catch(err => doSomethingWith(err));
    // const fs = RNFetchBlob.fs;
    // let imagePath = null;
    // RNFetchBlob.config({
    //   fileCache: true,
    // })
    //   .fetch('GET', 'http://www.example.com/image.png')
    //   // the image is now dowloaded to device's storage
    //   .then(resp => {
    //     // the image path you can use it directly with Image component
    //     imagePath = this.state.img_path;
    //     return resp.readFile('base64');
    //   })
    //   .then(base64Data => {
    //     // here's base64 encoded image
    //     console.log('base64 image', base64Data);
    //     // remove the file from storage
    //     return fs.unlink(imagePath);
    //   });

    // console.log();
  };

  render() {
    console.log('Full name', this.state.phone_number);
    console.log('Img path', this.state.img_path);
    console.log('base64', this.state.base64);
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
                fontFamily: 'Montserrat-Bold',
                fontSize: 16,
              }}>
              Personal Settings
            </Text>
          </View>
        </View>

        <ScrollView>
          <View
            style={{
              height: 90,
              width: 90,
              alignSelf: 'center',
              borderRadius: 90 / 2,
            }}>
            <TouchableOpacity onPress={() => this._get_img()}>
              <ImageBackground
                imageStyle={{
                  resizeMode: 'cover',
                  height: 81,
                  width: 81,
                  borderRadius: 81 / 2,
                }}
                source={
                  this.state.img_path == ''
                    ? require('../assets/logo_smoll.png')
                    : {uri: this.state.img_path}
                }
                style={{
                  height: 81,
                  width: 81,
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 81 / 2,
                }}>
                <View></View>
                <Image
                  source={require('../assets/camera_icon_pink.png')}
                  style={{
                    height: 24,
                    width: 24,
                    alignSelf: 'flex-end',

                    borderRadius: 81 / 2,
                  }}></Image>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          {/* <Image
              source={
                this.state.img_path == ''
                  ? require('../assets/logo_smoll.png')
                  : {uri: this.state.img_path}
              }
              style={{height: 80, width: 80}}></Image>
          </TouchableOpacity> */}

          <View style={styles.edt_box}>
            <TextInput
              defaultValue={this.state.full_name}
              onChangeText={txt => this.setState({full_name: txt})}
              placeholderTextColor="#CCCCCC"
              placeholder="Enter your full name"
              style={{marginLeft: 20}}></TextInput>
          </View>
          <View style={styles.edt_box}>
            <TextInput
              defaultValue={this.state.address}
              onChangeText={txt => this.setState({address: txt})}
              placeholderTextColor="#CCCCCC"
              placeholder="Address"
              style={{marginLeft: 20}}></TextInput>
          </View>
          <View style={styles.edt_box}>
            <TextInput
              defaultValue={this.state.phone_number}
              onChangeText={txt => this.setState({phone_number: txt})}
              placeholderTextColor="#CCCCCC"
              placeholder="Phone number"
              maxLength={10}
              keyboardType={'phone-pad'}
              style={{marginLeft: 20}}></TextInput>
          </View>
          <View style={styles.edt_box}>
            <TextInput
              defaultValue={this.state.email}
              onChangeText={txt => this.setState({email: txt})}
              placeholderTextColor="#CCCCCC"
              placeholder="Email address"
              editable={false}
              style={{marginLeft: 20}}></TextInput>
          </View>
          <View style={styles.edt_box}>
            <TextInput
              defaultValue={this.state.personal_number}
              onChangeText={txt => this.setState({personal_number: txt})}
              placeholderTextColor="#CCCCCC"
              placeholder="Personal number"
              style={{marginLeft: 20}}></TextInput>
          </View>

          <TouchableOpacity
            onPress={() => {
              if (this.state.phone_number == '') {
                alert('Enter mobile number');
              } else if (this.state.phone_number.length != 10) {
                alert('Enter valid mobile number');
              } else {
                this._update_profile_data();
              }
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
                Save Changes
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.addInqTab(0);
              this.props.navigation.replace('BottomNavigator');
            }}>
            <View
              style={{
                marginHorizontal: 24,
                borderColor: '#A3A3A3',
                borderWidth: 2,
                height: 60,
                borderRadius: 70,
                marginBottom: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#525252',
                  fontSize: 16,
                  fontFamily: 'Montserrat-Bold',
                }}>
                Discard Changes
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  login_token: state.userDetails.login_token,
  user_id: state.userDetails.user_id,
});

const mapDispatchToProps = {
  // addInqTab,
  addInqTab,
};
export default connect(mapStateToProps, mapDispatchToProps)(PersonalSettings);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 25,
    alignItems: 'center',
    marginBottom: 35,
  },
  edt_box: {
    height: 56,
    marginHorizontal: 24,
    borderColor: '#DFDFE2',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 24,
    justifyContent: 'center',
  },
});
