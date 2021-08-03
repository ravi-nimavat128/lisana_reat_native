import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export class SetDate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  render() {
    const {selectedStartDate} = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
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
              Set Date
            </Text>
          </View>
        </View>

        <CalendarPicker
          scrollable
          previousTitleStyle={{color: '#EC4464'}}
          nextTitleStyle={{color: '#EC4464'}}
          selectedDayColor="#EC4464"
          selectedDayTextColor="white"
          selectedDayTextStyle={{fontWeight: 'bold'}}
          todayBackgroundColor="pink"
          onDateChange={this.onDateChange}
        />
        <View>
          <Text>SELECTED DATE:{startDate}</Text>
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
    marginBottom: 35,
  },
});
export default SetDate;
