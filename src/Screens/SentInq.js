import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

class SentInq extends Component {
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

    this.onFocusSubscribe = this.props.navigation.addListener('focus', () => {
      // Your code
      this._get_sent_inq();
    });
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
    formData.append('type', 1);

    axios
      .post('http://binarygeckos.com/lisana/api/my_inquirys', formData, {
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
      <View>
        <View
          style={{marginHorizontal: 24, marginTop: 24, flexDirection: 'row'}}>
          <Image
            source={{uri: item.img}}
            style={{
              height: 83,
              width: 76,
              marginRight: 16,
              borderRadius: 12,
              // resizeMode: 'contain',
            }}></Image>

          <View style={{flex: 1}}>
            <Text style={{color: '#333333', fontSize: 18, fontWeight: 'bold'}}>
              {item.inquirie_title}
            </Text>
            {/* <View style={{flexDirection: 'row', marginTop: 8}}>
              <Text
                style={{
                  color: '#A3A3A3',
                  fontSize: 12,
                  marginRight: 3,
                  opacity: 0.5,
                }}>
                Expired on:
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  marginRight: 16,
                  opacity: 0.5,
                }}>
                15 March 2021
              </Text>
            </View>
          */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#A3A3A3',
                  fontSize: 11,
                  marginRight: 5,
                  opacity: 0.5,
                }}>
                Total cost
              </Text>
              <Text
                style={{
                  color: '#EC4464',
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginRight: 16,
                }}>
                ${item.total_cost}
              </Text>
            </View>
          </View>
        </View>
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
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
              No Record Found
            </Text>
          </View>
        ) : (
          <FlatList
            data={this.state.sent_inq}
            style={{marginBottom: 35}}
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

export default connect(mapStateToProps, mapDispatchToProps)(SentInq);
