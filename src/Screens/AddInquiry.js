import React, {Component} from 'react';

import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
  Touchable,
  Picker,
  TextInput,
} from 'react-native';

// import {Dropdown} from 'react-native-material-dropdown';

let DATA1 = [
  {
    Value: 'Kitchen Renovation',
    Id: 1,
  },
  {
    Value: 'Hall Renovation',
    Id: 2,
  },
  {
    Value: 'Bathroom Renovation',
    Id: 3,
  },
  {
    Value: 'Badroom Renovation',
    Id: 4,
  },
];

let DATA2 = [
  {
    Value: 'Within 1 month',
    Id: 1,
  },
  {
    Value: 'Within 2 month',
    Id: 2,
  },
  {
    Value: 'Within 3 month',
    Id: 3,
  },
  {
    Value: 'Within 4 month',
    Id: 4,
  },
];
let DATA3 = [
  {
    Value: '15 March 2021',
    Id: 1,
  },
  {
    Value: '16 March 2021',
    Id: 2,
  },
  {
    Value: '17 March 2021',
    Id: 3,
  },
  {
    Value: '18 March 2021',
    Id: 4,
  },
];

class AddInquiry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: '',
      value1: '',
      value2: '',
    };
  }

  render() {
    return (
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
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
              Inquiry
            </Text>
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 50,
              width: 113,
              marginLeft: 24,
              backgroundColor: '#FEEFF2',
              height: 35,
              borderRadius: 4,
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/edit_icon.png')}
              style={{
                height: 18,
                resizeMode: 'contain',
                width: 18,
                marginRight: 8,
              }}
            />
            <Text style={{color: '#EC4464', fontSize: 12}}>Edit Inquiry</Text>
          </View>
          <View style={styles.edt_box}>
            <Picker
              selectedValue={this.state.value}
              mode="dropdown"
              style={{marginLeft: 20}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({value: itemValue})
              }>
              {DATA1.map(i => (
                <Picker.Item label={i.Value} value={i.Id} />
              ))}
              {/* <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" /> */}
            </Picker>
          </View>
          <View style={styles.edt_box}>
            <TextInput
              placeholder="Royal Palm St. No. 18"
              style={{marginLeft: 20}}></TextInput>
          </View>
          <View style={styles.edt_box}>
            <Picker
              selectedValue={this.state.value1}
              mode="dropdown"
              style={{marginLeft: 20}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({value1: itemValue})
              }>
              {DATA2.map(i => (
                <Picker.Item label={i.Value} value={i.Id} />
              ))}
              {/* <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" /> */}
            </Picker>
          </View>
          <View style={styles.edt_box}>
            <Picker
              selectedValue={this.state.value2}
              mode="dropdown"
              style={{marginLeft: 20}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({value2: itemValue})
              }>
              {DATA3.map(i => (
                <Picker.Item label={i.Value} value={i.Id} />
              ))}
              {/* <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" /> */}
            </Picker>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default AddInquiry;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 25,
    alignItems: 'center',
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
