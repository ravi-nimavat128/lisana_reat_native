import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

class FinishedJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      finished_job: [],
      status: 0,
    };
  }

  componentDidMount() {
    this.finished_job();

    this.onFocusSubscribe = this.props.navigation.addListener('focus', () => {
      // Your code
      this.finished_job();
    });
  }

  finished_job = () => {
    this.setState({
      finished_job: [],
      isLoading: true,
    });

    const token = 'Bearer '.concat(this.props.login_token);

    var headers = {
      Authorization: token,
    };

    let formData = new FormData();
    formData.append('user_id', this.props.user_id);
    formData.append('job_type', 3);

    axios
      .post('http://binarygeckos.com/lisana/api/get_jobs', formData, {
        headers: headers,
      })
      .then(Response => {
        if (Response.data.status == 1) {
          this.setState({
            isLoading: false,
            finished_job: Response.data.result,
            status: Response.data.status,
          });
        } else {
          this.setState({isLoading: false});

          // alert(Response.data.message);
        }
      });
  };

  ItemView = ({item, index}) => {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate(
              item.is_review !== 0 ? 'ShowReview' : 'JobListEvent',
              {
                id: item.inquirie_id,
              },
            );
          }}
          style={{marginHorizontal: 24, marginTop: 24, flexDirection: 'row'}}>
          <Image
            source={require('../assets/inq_img.png')}
            style={{
              height: 83,
              width: 76,
              marginRight: 16,
              resizeMode: 'contain',
            }}></Image>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: '#333333',
                fontSize: 18,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              {item.inquirie_name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 8,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../assets/tick_icon.png')}
                  style={{
                    width: 16,
                    height: 16,
                    tintColor: '#A3A3A3',
                    marginRight: 8,
                  }}></Image>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'black',
                    fontFamily: 'Montserrat-Regular',
                  }}>
                  Job already finish
                </Text>
              </View>
              <Image
                source={require('../assets/rate_icon_red.png')}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 8,
                }}></Image>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#A3A3A3',
                  fontSize: 12,
                  marginRight: 6,
                  fontFamily: 'Montserrat-Regular',
                }}>
                Total cost
              </Text>
              <Text
                style={{
                  color: '#EC4464',
                  fontSize: 16,
                  // fontWeight: 'bold',
                  marginRight: 5,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                ${item.grand_total}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white', marginBottom: 80}}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={this.state.isLoading}
          //Text with the Spinner
          textContent={'Loading...'}
          size={'large'}
          animation={'fade'}
          cancelable={false}
          color="#EC4464"
          //Text style of the Spinner Text
          textStyle={{color: '#EC4464', fontSize: 20, marginLeft: 10}}
        />
        {this.state.status == 0 ? (
          <View
            style={{
              flex: 1,
              marginHorizontal: 30,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/empty_gif.gif')}
              style={{height: 120, width: 120}}></Image>
            <Text
              style={{
                fontSize: 12,
                color: 'gray',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              No Record Found
            </Text>
          </View>
        ) : (
          <FlatList
            data={this.state.finished_job}
            keyExtractor={id => id.toString()}
            style={{marginBottom: 35}}
            renderItem={this.ItemView}></FlatList>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  login_token: state.userDetails.login_token,
  user_id: state.userDetails.user_id,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FinishedJobs);
