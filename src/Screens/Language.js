import React, {Component} from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
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
  Dimensions,
} from 'react-native';

export class Language extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select_lan: 1,
    };
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
              Language
            </Text>
          </View>
        </View>

        <ScrollView>
          <TouchableOpacity
            onPress={() => {
              this.setState({select_lan: 1});
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 24,
              marginTop: 41,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../assets/lan_english.png')}
                style={{width: 24, height: 15}}></Image>
              <Text style={{fontSize: 14, marginLeft: 16, color: '#1F1F1F'}}>
                English
              </Text>
            </View>
            {this.state.select_lan == 1 ? (
              <Image
                source={require('../assets/checked_checkbox.png')}
                style={{width: 16, height: 16}}></Image>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({select_lan: 2});
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 24,
              marginTop: 41,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../assets/lan_swedish.png')}
                style={{width: 24, height: 15}}></Image>
              <Text style={{fontSize: 14, marginLeft: 16, color: '#1F1F1F'}}>
                Swedish
              </Text>
            </View>
            {this.state.select_lan == 2 ? (
              <Image
                source={require('../assets/checked_checkbox.png')}
                style={{width: 16, height: 16}}></Image>
            ) : null}
          </TouchableOpacity>
        </ScrollView>
        <View
          style={{
            width: '100%',
            // height: 150,
            justifyContent: 'center',
            alignItems: 'center',
            // position: 'absolute', //Here is the trick
            // bottom: 0,
          }}>
          <TouchableOpacity>
            <View
              style={{
                marginHorizontal: 24,
                backgroundColor: '#EC4464',
                height: 60,
                borderRadius: 70,
                marginTop: 40,
                width: Dimensions.get('screen').width / 1.1,
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
                width: Dimensions.get('screen').width / 1.1,
                marginBottom: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#525252',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Discard Changes
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default Language;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 25,
    alignItems: 'center',
    marginBottom: 35,
  },
  txt: {
    fontSize: 14,
    color: '#1F1F1F',
  },
});
