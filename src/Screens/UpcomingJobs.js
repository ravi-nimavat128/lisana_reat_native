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
      status: 0,
    };
  }

  componentDidMount() {
    this._get_sent_inq();
  }

  _get_sent_inq = () => {
    this.setState({
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
            sent_inq: Response.data.result,
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
          this.props.navigation.navigate('JobListEvent');
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
          <Text style={{color: '#333333', fontSize: 18, fontWeight: 'bold'}}>
            Renovating Bathroom
          </Text>
          <Text style={{fontSize: 11, color: '#A3A3A3', marginTop: 16}}>
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
              }}>
              Tuesday, March 9th
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
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
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
              No Record Found
            </Text>
          </View>
        ) : (
          <FlatList
            data={this.state.sent_inq}
            keyExtractor={id => id.toString()}
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
