import React, {Component} from 'react';
import {FlatGrid} from 'react-native-super-grid';

import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const time_data = [
  {
    name: '09:00AM',
    id: 1,
  },
  {
    name: '10:00AM',
    id: 2,
  },
  {
    name: '11:00AM',
    id: 3,
  },
  {
    name: '01:00PM',
    id: 4,
  },
  {
    name: '02:00AM',
    id: 5,
  },
  {
    name: '03:00AM',
    id: 6,
  },
  {
    name: '04:00AM',
    id: 7,
  },
];

const method_data = [
  {
    name: 'Remote',
    id: 1,
  },
  {
    name: 'Onsite',
    id: 2,
  },
];

export class SetDate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStartDate: null,
      selected_time_id: 1,
      selected_method_id: 1,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  // componentDidMount() {
  //   this.setState({selected_time_id: 1, selected_method_id: 1});
  // }

  render() {
    console.log('time id', this.state.selected_time_id);
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
        <ScrollView>
          <CalendarPicker
            scrollable
            previousTitleStyle={{color: '#EC4464'}}
            nextTitleStyle={{color: '#EC4464'}}
            selectedDayColor="#EC4464"
            selectedDayTextColor="white"
            selectedDayTextStyle={{fontWeight: 'bold'}}
            todayBackgroundColor="#fff"
            todayTextStyle={{color: 'black'}}
            onDateChange={this.onDateChange}
          />
          {/* <View>
          <Text>SELECTED DATE:{startDate}</Text>
        </View> */}

          <Text
            style={{
              fontSize: 16,
              margin: 24,
              color: '#1F1F1F',
              fontWeight: 'bold',
            }}>
            Select time
          </Text>

          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              // width: '1%',
              marginHorizontal: 24,
              alignItems: 'center',
            }}>
            {time_data.map(t => {
              return (
                <View>
                  {/* {this.setState({selected_time_id: 1})} */}
                  <TouchableOpacity
                    onPress={() => this.setState({selected_time_id: t.id})}
                    style={{
                      borderRadius: 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      marginVertical: 5,

                      backgroundColor:
                        this.state.selected_time_id === t.id
                          ? '#EC4464'
                          : '#00000000',
                      marginHorizontal: 5,
                      borderColor:
                        this.state.selected_time_id == t.id
                          ? '#EC4464'
                          : 'gray',
                    }}>
                    <Text
                      style={{
                        paddingVertical: 7,
                        fontSize: 12,
                        paddingHorizontal: 10,
                        color:
                          this.state.selected_time_id == t.id
                            ? '#fff'
                            : '#717171',
                      }}>
                      {t.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <Text
            style={{
              fontSize: 16,
              margin: 24,
              color: '#1F1F1F',
              fontWeight: 'bold',
            }}>
            Select method
          </Text>

          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              // width: '1%',
              marginHorizontal: 24,
              alignItems: 'center',
            }}>
            {method_data.map(t => {
              return (
                <View>
                  {/* {this.setState({selected_time_id: 1})} */}
                  <TouchableOpacity
                    onPress={() => this.setState({selected_method_id: t.id})}
                    style={{
                      borderRadius: 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      marginVertical: 5,

                      backgroundColor:
                        this.state.selected_method_id === t.id
                          ? '#EC4464'
                          : '#00000000',
                      marginHorizontal: 5,
                      borderColor:
                        this.state.selected_method_id == t.id
                          ? '#EC4464'
                          : 'gray',
                    }}>
                    <Text
                      style={{
                        paddingVertical: 7,
                        fontSize: 12,
                        paddingHorizontal: 10,
                        color:
                          this.state.selected_method_id == t.id
                            ? '#fff'
                            : '#717171',
                      }}>
                      {t.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          <View
            style={{
              height: 56,
              marginHorizontal: 24,
              borderColor: '#DFDFE2',
              borderWidth: 1,
              borderRadius: 8,
              marginTop: 24,
              justifyContent: 'center',
            }}>
            <TextInput
              placeholder="Add location"
              style={{marginLeft: 20}}></TextInput>
          </View>

          <TouchableOpacity>
            <View
              style={{
                marginHorizontal: 56,
                backgroundColor: '#EC4464',
                height: 60,
                borderRadius: 70,
                marginTop: 40,
                marginBottom: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                Submit
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
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
