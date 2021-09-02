import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  Touchable,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import HTMLView from 'react-native-htmlview';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';

export class HelpFAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      service: 0,
      job: 0,
      inq: 0,
      service_data: '',
      job_data: '',
      inq_data: '',
      FAQ_DATA: [],
    };
  }

  componentDidMount() {
    this._get_lisana_service();
  }

  _get_lisana_service = () => {
    this.setState({isLoading: true});
    const token = 'Bearer '.concat(this.props.login_token);

    var headers = {
      Authorization: token,
    };
    axios
      .post('http://binarygeckos.com/lisana/api/get_faq_details', null, {
        headers: headers,
      })
      .then(responses => {
        this.setState({isLoading: false});
        if (responses.data.status == 1) {
          this.setState({
            FAQ_DATA: responses.data.result.map(item => {
              return {...item, isVisible: false};
            }),
          });
        } else {
          alert(responses.data.message);
        }
      });
  };

  render() {
    console.log(JSON.stringify(this.state.FAQ_DATA, null, 2));
    console.log('login token', this.props.login_token);

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
          textStyle={{
            color: '#EC4464',
            fontSize: 20,
            marginLeft: 10,
            fontFamily: 'Montserrat-Regular',
          }}
        />
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
              Help and FAQ
            </Text>
          </View>
        </View>

        <ScrollView>
          <View>
            {this.state.FAQ_DATA.map((item, index) => {
              return (
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        FAQ_DATA: this.state.FAQ_DATA.map((item, sindex) => {
                          return {
                            ...item,
                            isVisible: (index == sindex) === !item.isVisible,
                            // ? !this.state.PastOrderData.isSelected
                            // : this.state.PastOrderData.isSelected,
                          };
                        }),
                      });
                    }}
                    style={{
                      flexDirection: 'row',
                      marginVertical: 25,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#3B3B3B',
                        marginHorizontal: 20,
                        fontFamily: 'Montserrat-Bold',
                      }}>
                      {item.title}
                    </Text>
                    <Image
                      source={require('../assets/down_arrow.png')}
                      style={{
                        width: 10,
                        height: 8,
                        marginRight: 22,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        transform:
                          item.isVisible == true
                            ? [{rotate: '180deg'}]
                            : [{rotate: '0deg'}],
                      }}></Image>
                  </TouchableOpacity>

                  {item.isVisible == true ? (
                    <View>
                      <View
                        style={{
                          marginTop: 5,
                          borderBottomColor: '#EC4464',
                          opacity: 0.4,
                          borderBottomWidth: 1,
                        }}
                      />
                      <HTMLView
                        style={{
                          fontSize: 18,
                          color: 'black',
                          marginTop: 10,
                          marginHorizontal: 22,
                        }}
                        value={item.description}></HTMLView>
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
        </ScrollView>

        {/* <View style={{marginHorizontal: 24}}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                service: !this.state.service,
              });
            }}
            style={{
              flexDirection: 'row',
              marginVertical: 25,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 14, color: '#3B3B3B', marginLeft: 20}}>
              How do I book Lisana's Service?
            </Text>
            <Image
              source={require('../assets/down_arrow.png')}
              style={{
                width: 10,
                height: 8,
                marginRight: 22,
                resizeMode: 'contain',
                transform:
                  this.state.service == 1
                    ? [{rotate: '180deg'}]
                    : [{rotate: '0deg'}],
              }}></Image>
          </TouchableOpacity>

          {this.state.service == 1 ? (
            <View>
              <View
                style={{
                  marginTop: 5,
                  borderBottomColor: '#EC4464',
                  opacity: 0.4,
                  borderBottomWidth: 1,
                }}
              />
              <HTMLView
                style={{
                  fontSize: 18,
                  color: 'black',
                  marginTop: 10,
                  marginHorizontal: 22,
                }}
                value={this.state.service_data}></HTMLView>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={() => {
              this.setState({
                job: !this.state.job,
              });
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 25,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 14, color: '#3B3B3B', marginLeft: 20}}>
              How do I monitored the job?
            </Text>
            <Image
              source={require('../assets/down_arrow.png')}
              style={{
                width: 10,
                height: 8,
                marginRight: 22,
                resizeMode: 'contain',
                transform:
                  this.state.job == 1
                    ? [{rotate: '180deg'}]
                    : [{rotate: '0deg'}],
              }}></Image>
          </TouchableOpacity>

          {this.state.job == 1 ? (
            <View>
              <View
                style={{
                  marginTop: 5,
                  borderBottomColor: '#EC4464',
                  opacity: 0.4,
                  borderBottomWidth: 1,
                }}
              />
              <HTMLView
                style={{
                  fontSize: 18,
                  color: 'black',
                  marginTop: 10,
                  marginHorizontal: 22,
                }}
                value={this.state.job_data}></HTMLView>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={() => {
              this.setState({
                inq: !this.state.inq,
              });
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 25,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 14, color: '#3B3B3B', marginLeft: 20}}>
              Can I consult my inquiry?
            </Text>
            <Image
              source={require('../assets/down_arrow.png')}
              style={{
                width: 10,
                height: 8,
                marginRight: 22,
                resizeMode: 'contain',
                transform:
                  this.state.inq == 1
                    ? [{rotate: '180deg'}]
                    : [{rotate: '0deg'}],
              }}></Image>
          </TouchableOpacity>

          {this.state.inq == 1 ? (
            <View>
              <View
                style={{
                  marginTop: 5,
                  borderBottomColor: '#EC4464',
                  opacity: 0.4,
                  borderBottomWidth: 1,
                }}
              />
              <HTMLView
                style={{
                  fontSize: 18,
                  color: 'black',
                  marginTop: 10,
                  marginHorizontal: 22,
                }}
                value={this.state.inq_data}></HTMLView>
            </View>
          ) : null}
        </View>
     */}
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
  },
});
const mapStateToProps = state => ({
  login_token: state.userDetails.login_token,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HelpFAQ);
