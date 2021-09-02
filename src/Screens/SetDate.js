import React, {Component} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import moment from 'moment';
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
import {connect} from 'react-redux';
import {
  addDate,
  addTime,
  addMethodName,
} from '../Reducer/DateReducer/date_actions';

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
      selectedStartDate: '',
      markedDate: moment(new Date()).format('DD-MM-YYYY'),
      datee: '',
      selected_time_id: 1,
      selected_time_name: '09:00AM',
      selected_method_id: 1,
      selected_method_name: 'Remote',
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  date_change = date => {
    // return <Moment format="DD/MM/YYYY">{date}</Moment>;
  };

  onDateChange(date) {
    this.setState({
      selectedStartDate: moment(date).format('DD-MM-YYYY'),
    });
    this.date_change(date);
  }

  // componentDidMount() {
  //   this.setState({selected_time_id: 1, selected_method_id: 1});
  // }

  render() {
    console.log('time id', this.state.selected_time_id);
    console.log('time name', this.state.selected_time_name);
    console.log('method id', this.state.selected_method_id);
    console.log('method name', this.state.selected_method_name);

    console.log(
      'main time and date',
      this.state.selectedStartDate + ' ' + this.state.selected_time_name,
    );

    // console.log('dateeeeeeeeee', this.state.datee);
    // const {selectedStartDate} = this.state;
    // const startDate = selectedStartDate ? selectedStartDate.toString() : '';
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
                // fontWeight: 'bold',
                fontSize: 16,
                fontFamily: 'Montserrat-Bold',
              }}>
              Set Date
            </Text>
          </View>
        </View>
        <ScrollView>
          <CalendarPicker
            scrollable
            showDayStragglers
            minDate={new Date()}
            previousTitleStyle={{color: '#EC4464'}}
            nextTitleStyle={{color: '#EC4464'}}
            selectedDayColor="#EC4464"
            weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
            selectedDayTextColor="white"
            selectedDayTextStyle={{fontWeight: 'bold'}}
            todayBackgroundColor="#fff"
            todayTextStyle={{color: 'black'}}
            onDateChange={this.onDateChange}
          />
          <View>
            {/* <Text>
              SELECTED DATE:
              {this.state.selectedStartDate
                ? this.state.selectedStartDate.toString()
                : ''}
            </Text> */}
          </View>

          <Text
            style={{
              fontSize: 16,
              margin: 24,
              color: '#1F1F1F',
              // fontWeight: 'bold',
              fontFamily: 'Montserrat-Bold',
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
                    onPress={() =>
                      this.setState({
                        selected_time_id: t.id,
                        selected_time_name: t.name,
                      })
                    }
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
                        fontFamily: 'Montserrat-Regular',
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
              // fontWeight: 'bold',
              fontFamily: 'Montserrat-Bold',
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
                    onPress={() =>
                      this.setState({
                        selected_method_id: t.id,
                        selected_method_name: t.name,
                      })
                    }
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
                        fontFamily: 'Montserrat-Regular',
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
              style={{
                marginLeft: 20,
                fontFamily: 'Montserrat-Regular',
              }}></TextInput>
          </View>

          <TouchableOpacity
            onPress={() => {
              if (this.state.selectedStartDate == '') {
                alert('Please select Date');
              } else {
                this.props.addDate(this.state.selectedStartDate);
                this.props.addTime(this.state.selected_time_name);
                this.props.addMethodName(this.state.selected_method_name);
                this.props.navigation.goBack({});
              }
            }}>
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
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: 'Montserrat-Bold',
                }}>
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  addTime,
  addDate,
  addMethodName,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetDate);
