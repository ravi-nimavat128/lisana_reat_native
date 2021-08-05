import React, {Component} from 'react';
import Clipboard from '@react-native-community/clipboard';

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Touchable,
} from 'react-native';
import {connect} from 'react-redux';

var txt = 'STEVEN01';

export class InviteFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copy_text: '',
    };
  }

  componentDidUpdate(preState, preProps) {
    if (preState.copy_text !== this.state.copy_text) {
      this.fetchCopiedText();
    }
  }

  fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    this.setState({copy_text: text});
  };

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
              Invite Friends
            </Text>
          </View>
        </View>

        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../assets/invite_frds_img.png')}
              style={{width: 215, height: 135, marginTop: 45}}></Image>

            <Text style={{marginTop: 44, fontSize: 24, fontWeight: 'bold'}}>
              Get Free 1000kr
            </Text>
            <Text
              style={{
                marginTop: 16,
                fontSize: 12,
                color: '#A3A3A3',
                textAlign: 'center',
                marginHorizontal: 64,
              }}>
              Invite your friends to use Lisana Mobile Apps and get free 1000kr
              which can be used in this apps
            </Text>
            <Text
              style={{
                marginTop: 73,
                fontSize: 12,
                color: '#A3A3A3',
                textAlign: 'center',
                marginHorizontal: 72,
              }}>
              You have{' '}
              {
                <Text
                  style={{
                    marginTop: 73,
                    fontSize: 12,
                    color: '#EC4464',
                    textAlign: 'center',
                    marginHorizontal: 72,
                    fontWeight: 'bold',
                  }}>
                  3000kr
                </Text>
              }{' '}
              from 3 friends that you invite and use this apps
            </Text>

            <View
              style={{
                height: 56,
                marginHorizontal: 24,
                borderColor: '#00000000',
                flexDirection: 'row',
                borderWidth: 1,
                width: '90%',
                borderRadius: 8,
                marginTop: 24,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{color: 'black', fontWeight: 'bold', marginLeft: 20}}>
                STEVEN01
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(txt);
                  this.fetchCopiedText();
                }}
                style={{
                  height: 36,
                  // marginHorizontal: 24,
                  // borderColor: '#00000000',
                  // flexDirection: 'row',
                  // borderWidth: 1,
                  width: 81,
                  borderRadius: 5,
                  backgroundColor:
                    this.state.copy_text == 'STEVEN01' ? '#FDE8EC' : '#EC4464',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color:
                      this.state.copy_text == 'STEVEN01' ? '#EC4464' : 'white',
                    fontSize: 13,
                  }}>
                  {this.state.copy_text === 'STEVEN01' ? 'Copied!' : 'Copy'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            // this.fetchCopiedText();
            console.log('coppyed text', this.state.copy_text);
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
              Invite Friends
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InviteFriends);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 25,
    alignItems: 'center',
  },
});
