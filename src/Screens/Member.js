import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {connect} from 'react-redux';

export class Member extends Component {
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
              Members
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginHorizontal: 24}}>
          <View
            style={{flexDirection: 'row', marginHorizontal: 24, marginTop: 28}}>
            <Image
              source={require('../assets/logo_smoll.png')}
              style={{
                height: 56,
                width: 56,
                borderRadius: 56 / 2,
                resizeMode: 'contain',
              }}></Image>
            <View
              style={{
                flexDirection: 'column',
                alignSelf: 'center',
                marginLeft: 16,
              }}>
              <Text
                style={{color: '#040415', fontSize: 24, fontWeight: 'bold'}}>
                Stevenson
              </Text>
              <Text style={{color: '#7F7F7F', fontSize: 14}}>
                1234 - 567 - 8900
              </Text>
            </View>
            <View style={{flex: 1}}></View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Notification');
              }}
              style={{
                height: 56,
                width: 56,

                justifyContent: 'center',
                alignItems: 'center',
              }}></TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: 24}}>
          <View
            style={{flexDirection: 'row', marginHorizontal: 24, marginTop: 28}}>
            <Image
              source={require('../assets/logo_smoll.png')}
              style={{
                height: 56,
                width: 56,
                borderRadius: 56 / 2,
                resizeMode: 'contain',
              }}></Image>
            <View
              style={{
                flexDirection: 'column',
                alignSelf: 'center',
                marginLeft: 16,
              }}>
              <Text
                style={{color: '#040415', fontSize: 24, fontWeight: 'bold'}}>
                Marcus
              </Text>
              <Text style={{color: '#7F7F7F', fontSize: 14}}>
                1234 - 567 - 8900
              </Text>
            </View>
            <View style={{flex: 1}}></View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Notification');
              }}
              style={{
                height: 56,
                width: 56,

                justifyContent: 'center',
                alignItems: 'center',
              }}></TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: 24}}>
          <View
            style={{flexDirection: 'row', marginHorizontal: 24, marginTop: 28}}>
            <Image
              source={require('../assets/logo_smoll.png')}
              style={{
                height: 56,
                width: 56,
                borderRadius: 56 / 2,
                resizeMode: 'contain',
              }}></Image>
            <View
              style={{
                flexDirection: 'column',
                alignSelf: 'center',
                marginLeft: 16,
              }}>
              <Text
                style={{color: '#040415', fontSize: 24, fontWeight: 'bold'}}>
                Travis
              </Text>
              <Text style={{color: '#7F7F7F', fontSize: 14}}>
                1234 - 567 - 8900
              </Text>
            </View>
            <View style={{flex: 1}}></View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Notification');
              }}
              style={{
                height: 56,
                width: 56,

                justifyContent: 'center',
                alignItems: 'center',
              }}></TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Member);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 25,
    alignItems: 'center',
  },
});
