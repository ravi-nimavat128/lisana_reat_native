import React, {Component} from 'react';
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

export class PersonalSettings extends Component {
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
            <ImageBackground
              imageStyle={{resizeMode: 'contain'}}
              source={require('../assets/dummy_img.png')}
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
          </View>

          <View style={styles.edt_box}>
            <TextInput
              placeholder="Enter your full name"
              style={{marginLeft: 20}}></TextInput>
          </View>
          <View style={styles.edt_box}>
            <TextInput
              placeholder="Address"
              style={{marginLeft: 20}}></TextInput>
          </View>
          <View style={styles.edt_box}>
            <TextInput
              placeholder="Phone number"
              style={{marginLeft: 20}}></TextInput>
          </View>
          <View style={styles.edt_box}>
            <TextInput
              placeholder="Email address"
              style={{marginLeft: 20}}></TextInput>
          </View>
          <View style={styles.edt_box}>
            <TextInput
              placeholder="Personal number"
              style={{marginLeft: 20}}></TextInput>
          </View>

          <TouchableOpacity
            onPress={() => {
              this._add_inq();
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
                Save Changes
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
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
                style={{color: '#525252', fontSize: 16, fontWeight: 'bold'}}>
                Discard Changes
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default PersonalSettings;

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
