import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

class HowLisanaWork extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.header}>
          <Image
            source={require('../assets/back_btn.png')}
            style={{height: 56, width: 56}}></Image>
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
              How Lisana Work
            </Text>
          </View>
        </View>
        <ScrollView style={{flex: 1, marginTop: 8}}></ScrollView>
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
  },
});

export default HowLisanaWork;
