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
      sent_inq: [],
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
            status: Response.data.status ? Response.data.status : 0,
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
          this.props.navigation.navigate('SeeInquiry', {
            id: item.id,
            type: item.inquirie_type,
          });
        }}>
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
            <Text
              style={{
                color: '#333333',
                fontSize: 18,
                fontFamily: 'Montserrat-SemiBold',
              }}>
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
            <Text
              style={{
                color: '#A3A3A3',
                fontSize: 12,
                marginTop: 8,
                fontFamily: 'Montserrat-Regular',
              }}>
              {item.created_at}
            </Text>
            {item.inquirie_type == 1 ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 13,
                    marginRight: 5,
                    // fontWeight: 'bold',
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  Processing
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                  }}></View>
                <Text
                  style={{
                    color: '#EC4464',
                    fontSize: 14,
                    // fontWeight: 'bold',
                    marginRight: 4,
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  Edit
                </Text>
                <Image
                  source={require('../assets/right_arrow.png')}
                  style={{
                    height: 12,
                    width: 12,
                    resizeMode: 'contain',
                    tintColor: '#EC4464',
                  }}></Image>
              </View>
            ) : null}
            {/* <View
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
            </View> */}
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
