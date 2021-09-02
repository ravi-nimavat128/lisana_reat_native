import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

class UpcomingJobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sent_inq: [],
      isLoading: false,
      up_coming_job: [],
      status: 0,
    };
  }

  componentDidMount() {
    this._get_upComing_jobs();
    this.onFocusSubscribe = this.props.navigation.addListener('focus', () => {
      // Your code
      this._get_upComing_jobs();
    });
  }

  _get_upComing_jobs = () => {
    this.setState({
      up_coming_job: [],
      isLoading: true,
    });

    const token = 'Bearer '.concat(this.props.login_token);

    var headers = {
      Authorization: token,
    };

    let formData = new FormData();
    formData.append('user_id', this.props.user_id);
    formData.append('job_type', 1);

    axios
      .post('http://binarygeckos.com/lisana/api/get_jobs', formData, {
        headers: headers,
      })
      .then(Response => {
        if (Response.data.status == 1) {
          this.setState({
            isLoading: false,
            up_coming_job: Response.data.result,
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
          source={{uri: item.img}}
          style={{
            height: 83,
            width: 76,
            marginRight: 16,
            borderRadius: 10,
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
          <Text
            style={{
              fontSize: 11,
              color: '#A3A3A3',
              marginTop: 16,
              fontFamily: 'Montserrat-Regular',
            }}>
            Acceptance date
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/calendar_icon.png')}
              style={{
                width: 16,
                height: 16,
                tintColor: '#A3A3A3',
                marginRight: 8,
              }}></Image>

            <Text
              style={{
                color: '#000000',
                fontSize: 12,
                marginRight: 5,
                fontFamily: 'Montserrat-Regular',
              }}>
              {item.acceptance_date}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
            data={this.state.up_coming_job}
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

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingJobs);
