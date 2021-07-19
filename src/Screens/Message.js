import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

var img = require('../assets/logo_smoll.png');

const DATA =[{
  img:img,
  title:'Bathroom Renovat...',
  type:'Inquiry',
  time:'12:31 PM'
}]

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={require('../assets/back_btn.png')}
              style={{height: 56, width: 56}}></Image>
          </TouchableOpacity>
          <Text
            style={{
              color: '#1F1F1F',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Messages
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Notification');
            }}
            style={{
              height: 56,
              width: 56,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#E6E6E8',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/notification_icon.png')}
              style={{height: 22, width: 22, resizeMode: 'center'}}></Image>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginLeft: 24, marginTop: 40}}>
          <Text style={{fontSize: 12, marginRight: 3}}>All messages</Text>
          <Text style={{fontSize: 12}}>(2) </Text>
        </View>
        <View>
          <FlatList>

          </FlatList>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
