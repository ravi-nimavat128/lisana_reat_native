import React, {Component} from 'react';
import StepIndicator from 'react-native-step-indicator';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  Touchable,
} from 'react-native';
const labels = [
  'Cart',
  'Delivery Address',
  'Order Summary',
  'Payment Method',
  'Track',
];
const customStyles = {
  stepIndicatorSize: 15,
  currentStepIndicatorSize: 15,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 8,
  stepStrokeCurrentColor: '#EC4464',
  stepStrokeWidth: 8,
  stepStrokeFinishedColor: '#EC4464',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#EC4464',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#EC4464',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#EC4464',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#EC4464',
};

export class JobListEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 0,
      job_visible: 1,
      event_visible: 0,
    };
  }

  data = [
    {
      label: 'Design',
      date: 'March 11th',
      status: 1,
    },
    {
      label: 'Demolition',
      date: 'March 12th - March 13th',
      status: 0,
    },
    {
      label: 'Electricity Work',
      date: 'March 14th - March 16th',
      status: 0,
    },
    {
      label: 'Rebuild',
      date: 'March 17th - March 20th',
      status: 0,
    },
  ];

  onPageChange(position) {
    this.setState({currentPosition: position});
  }
  render() {
    return (
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <ScrollView>
          <ImageBackground
            source={require('../assets/job_mil_img.png')}
            style={{
              width: Dimensions.get('screen').width,
              height: 284,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={require('../assets/black_back_box.png')}
                style={{
                  width: 56,
                  height: 56,
                  margin: 24,
                }}></Image>
            </TouchableOpacity>
          </ImageBackground>
          <Text
            style={{
              color: '#1F1F1F',
              fontSize: 20,
              marginTop: 30,
              marginLeft: 24,
            }}>
            Bathroom Renovation
          </Text>
          <View
            style={{
              marginTop: 8,
              marginLeft: 24,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/calendar_icon.png')}
              style={{height: 12, width: 12, resizeMode: 'contain'}}></Image>
            <Text
              style={{
                color: '#A3A3A3',
                fontSize: 12,
                marginLeft: 6,
              }}>
              March 11th - March 21st
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.setState({job_visible: 1, event_visible: 0});
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 44,
              justifyContent: 'space-between',
              marginTop: 60,
            }}>
            <Text>Job Milestone</Text>
            <Image
              source={require('../assets/right_arrow.png')}
              style={{
                height: 12,
                width: 12,
                resizeMode: 'contain',
                tintColor: '#525252',
              }}></Image>
          </TouchableOpacity>
          {this.state.job_visible == 1 ? (
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 44,
                marginTop: 20,
                height: Dimensions.get('screen').height - 600,
              }}>
              <StepIndicator
                customStyles={customStyles}
                direction={'vertical'}
                stepCount={4}
                currentPosition={this.state.currentPosition}
                labels={this.data}
                renderLabel={({
                  position,
                  stepStaus,
                  label,
                  currentPosition,
                }) => {
                  return (
                    <View
                      style={{
                        marginTop: 17,
                        paddingLeft: 5,
                        width: Dimensions.get('screen').width - 120,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View>
                        <Text>{this.data[position].label}</Text>

                        <Text style={{color: '#A3A3A3'}}>
                          {this.data[position].date}
                        </Text>
                      </View>
                      {this.data[position].status == 1 ? (
                        <Image
                          source={require('../assets/tapper_status.png')}
                          style={{height: 23, width: 23}}></Image>
                      ) : null}
                    </View>
                  );
                }}
              />
            </View>
          ) : null}

          <TouchableOpacity
            onPress={() => {
              this.setState({job_visible: 0, event_visible: 1});
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: this.state.event_visible == 1 ? 15 : 150,

              marginHorizontal: 44,
              justifyContent: 'space-between',
              marginTop: 60,
            }}>
            <Text>Events</Text>
            <Image
              source={require('../assets/right_arrow.png')}
              style={{
                height: 12,
                width: 12,
                resizeMode: 'contain',
                tintColor: '#525252',
              }}></Image>
          </TouchableOpacity>

          {this.state.event_visible == 1 ? (
            <View
              style={{marginHorizontal: 44, marginBottom: 150, marginTop: 24}}>
              <Text style={{color: '#1F1F1F', fontSize: 14}}>15 Mar, 2021</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 16,
                }}>
                <Image
                  source={require('../assets/info_red_circle.png')}
                  style={{
                    height: 15,
                    width: 15,
                    resizeMode: 'contain',
                  }}></Image>
                <Text
                  style={{
                    color: '#EC4464',
                    fontWeight: 'bold',
                    fontSize: 12,
                    marginLeft: 10,
                  }}>
                  09:00 am
                </Text>
              </View>
              <Text style={{color: '#3B3B3B', fontSize: 14, marginTop: 8}}>
                You have one discussion session at 10AM about your bathroom
                renovation
              </Text>
            </View>
          ) : null}
        </ScrollView>
        <View style={{flexDirection: 'row', marginHorizontal: 24}}>
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              borderColor: '#A3A3A3',
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/icon_message.png')}
              style={{height: 20, width: 20, tintColor: '#525252'}}></Image>
          </View>
          <View
            style={{
              backgroundColor: '#EC4464',
              borderRadius: 70,
              marginLeft: 20,
              width: '77%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>View Quote</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default JobListEvent;
