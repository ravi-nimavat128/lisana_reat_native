import React, {Component} from 'react';
import StepIndicator from 'react-native-step-indicator';
import axios from 'axios';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
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
  FlatList,
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

class JobListEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 0,
      job_visible: 1,
      event_visible: 0,
      job_milston: [],
      job_event: [],
      stap_count: 1,
      inq_date: '',
      inq_title: '',
      img: '',
      last_obj: [{type: 0}],
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

  current_position = () => {
    var a = this.state.stap_count;
    var b = parseInt(a) - 1;
    return b;
  };

  RenderItem = ({item}) => {
    return (
      <View>
        <Text
          style={{
            color: item.type == 0 ? '#1F1F1F' : '#A3A3A3',
            fontSize: 14,
            marginTop: 15,
            fontFamily: 'Montserrat-Regular',
          }}>
          {item.start_date}
        </Text>
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
              tintColor: item.type == 0 ? '#EC4464' : '#A3A3A3',
              resizeMode: 'contain',
            }}></Image>
          <Text
            style={{
              color: item.type == 0 ? '#EC4464' : '#A3A3A3',
              // fontWeight: 'bold',
              fontSize: 12,
              marginLeft: 10,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            {item.start_time}
          </Text>
        </View>
        <Text
          style={{
            color: item.type == 0 ? '#3B3B3B' : '#A3A3A3',
            fontSize: 14,
            marginTop: 8,
            fontFamily: 'Montserrat-Regular',
          }}>
          {item.description}
        </Text>
      </View>
    );
  };

  componentDidMount() {
    this._get_mileston();
    this.onFocusSubscribe = this.props.navigation.addListener('focus', () => {
      // Your code
      this._get_mileston();
    });
  }

  _get_mileston = () => {
    this.setState({
      isLoading: true,
    });

    const token = 'Bearer '.concat(this.props.login_token);

    var headers = {
      Authorization: token,
    };

    let formData = new FormData();
    formData.append('inquiry_id', this.props.route.params.id);

    axios
      .post(
        'http://binarygeckos.com/lisana/api/quotation_milestons',
        formData,
        {
          headers: headers,
        },
      )
      .then(Response => {
        if (Response.data.status == 1) {
          this.setState({
            isLoading: false,
            job_milston: Response.data.result ? Response.data.result : [],
            stap_count: Response.data.result.length
              ? Response.data.result.length
              : 1,
            currentPosition: Response.data.is_position,
            job_event: Response.data.result22,
            inq_title: Response.data.inquirie_title,
            inq_date: Response.data.date,
            img: Response.data.img,
            last_obj:
              Response.data.result < 1
                ? [{type: 0}]
                : [Response.data.result[Response.data.result.length - 1]]
                ? [Response.data.result[Response.data.result.length - 1]]
                : [{type: 0}],
            // status: Response.data.status,
          });
        } else {
          this.setState({isLoading: false});

          // alert(Response.data.message);
        }
      });
  };

  onPageChange(position) {
    this.setState({currentPosition: position});
  }
  render() {
    var abc = this.state.job_milston.map(i => i.type);

    var v = this.state.job_milston
      .filter(i => i.type == 1)
      .map(j => j.is_position);

    // .map(i => i.is_position);
    console.log('abc', abc);
    console.log('v', JSON.stringify(v, null, 2));

    var c = v.length - 1;
    console.log('c', JSON.stringify(c, null, 2));
    console.log(
      'last obj',
      JSON.stringify(
        this.state.last_obj ? this.state.last_obj : [{type: 0}],
        null,
        2,
      ),
    );

    const last = this.state.last_obj.map(i => i.type).join('')
      ? this.state.last_obj.map(i => i.type).join('')
      : '0';

    // console.log(
    //   'job milston array',
    //   JSON.stringify(this.state.job_milston, null, 2),
    // );

    return (
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <ScrollView>
          <ImageBackground
            imageStyle={{resizeMode: 'stretch'}}
            source={
              this.state.img == ''
                ? require('../assets/job_mil_img.png')
                : {uri: this.state.img}
            }
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
              fontFamily: 'Montserrat-Regular',
            }}>
            {this.state.inq_title}
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
                fontFamily: 'Montserrat-Regular',
              }}>
              {this.state.inq_date}
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
            <Text style={{fontFamily: 'Montserrat-Regular'}}>
              Job Milestone
            </Text>
            <Image
              source={require('../assets/right_arrow.png')}
              style={{
                height: 12,
                width: 12,
                width: 12,
                transform:
                  this.state.job_visible == 1
                    ? [{rotate: '90deg'}]
                    : [{rotate: '0deg'}],
                resizeMode: 'contain',
                tintColor: '#525252',
              }}></Image>
          </TouchableOpacity>

          {this.state.job_visible == 1 ? (
            <View>
              {this.state.job_milston.length < 1 ? (
                <View
                  style={{
                    marginHorizontal: 30,
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/empty_gif.gif')}
                    style={{height: 90, width: 90}}></Image>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'gray',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    No milestone found
                  </Text>
                </View>
              ) : (
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
                    stepCount={this.state.stap_count}
                    currentPosition={c}
                    labels={this.state.job_milston}
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
                            <Text style={{fontFamily: 'Montserrat-Regular'}}>
                              {this.state.job_milston[position].mileston_name}
                            </Text>

                            <Text
                              style={{
                                color: '#A3A3A3',
                                fontFamily: 'Montserrat-Regular',
                              }}>
                              {this.state.job_milston[position].start_date}
                              {' - '}
                              {this.state.job_milston[position].end_date}
                            </Text>
                          </View>
                          {this.state.job_milston[position].type == 1 ? (
                            <Image
                              source={require('../assets/tapper_status.png')}
                              style={{height: 23, width: 23}}></Image>
                          ) : null}
                        </View>
                      );
                    }}
                  />
                </View>
              )}
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
            <Text style={{fontFamily: 'Montserrat-Regular'}}>Events</Text>
            <Image
              source={require('../assets/right_arrow.png')}
              style={{
                height: 12,
                width: 12,
                transform:
                  this.state.event_visible == 1
                    ? [{rotate: '90deg'}]
                    : [{rotate: '0deg'}],
                resizeMode: 'contain',
                tintColor: '#525252',
              }}></Image>
          </TouchableOpacity>

          {this.state.event_visible == 1 ? (
            <View>
              {this.state.job_event.length < 1 ? (
                <View
                  style={{
                    marginHorizontal: 30,
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/empty_gif.gif')}
                    style={{height: 90, width: 90}}></Image>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'gray',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    No Event found
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    marginHorizontal: 44,
                    marginBottom: 150,
                    marginTop: 24,
                  }}>
                  <FlatList
                    data={this.state.job_event}
                    keyExtractor={item => item.id}
                    renderItem={this.RenderItem}></FlatList>
                </View>
              )}
            </View>
          ) : null}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 24,
            marginBottom: 20,
          }}>
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
          {last !== '1' ? (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ViewQuote', {
                  id: this.props.route.params.id,
                });
              }}
              style={{
                backgroundColor: '#EC4464',
                borderRadius: 70,
                marginLeft: 20,
                width: '77%',
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                  fontFamily: 'Montserrat-Regular',
                }}>
                View Quote
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('AddReview', {
                  id: this.props.route.params.id,
                  img: this.state.img,
                  date: this.state.inq_date,
                  title: this.state.inq_title,
                })
              }
              style={{
                backgroundColor: '#EC4464',
                borderRadius: 70,
                marginLeft: 20,
                width: '77%',
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                  fontFamily: 'Montserrat-Regular',
                }}>
                Add Review
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  login_token: state.userDetails.login_token,
  user_id: state.userDetails.user_id,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(JobListEvent);
