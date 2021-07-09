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

export class HelpFAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: 0,
      job: 0,
      inq: 0,
      service_data: '',
      job_data: '',
      inq_data: '',
    };
  }

  componentDidMount() {
    this._get_lisana_service();
    this._get_lisana_job();
    this._get_lisana_inq();
  }

  _get_lisana_service = () => {
    const token = 'Bearer '.concat(this.props.login_token);

    var headers = {
      Authorization: token,
    };
    axios
      .post('http://binarygeckos.com/lisana/api/get_about_us_details', null, {
        headers: headers,
      })
      .then(responses => {
        if (responses.data.status == 1) {
          this.setState({
            service_data: responses.data.result,
          });
        } else {
          alert(responses.data.message);
        }
      });
  };
  _get_lisana_job = () => {
    const token = 'Bearer '.concat(this.props.login_token);

    var headers = {
      Authorization: token,
    };
    axios
      .post('http://binarygeckos.com/lisana/api/get_monitored_job', null, {
        headers: headers,
      })
      .then(responses => {
        if (responses.data.status == 1) {
          this.setState({
            job_data: responses.data.result,
          });
        } else {
          alert(responses.data.message);
        }
      });
  };
  _get_lisana_inq = () => {
    const token = 'Bearer '.concat(this.props.login_token);

    var headers = {
      Authorization: token,
    };
    axios
      .post('http://binarygeckos.com/lisana/api/get_consult_my_inquiry', null, {
        headers: headers,
      })
      .then(responses => {
        if (responses.data.status == 1) {
          this.setState({
            inq_data: responses.data.result,
          });
        } else {
          alert(responses.data.message);
        }
      });
  };

  render() {
    console.log(this.state.service_data);
    console.log('login token', this.props.login_token);

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
              Help and FAQ
            </Text>
          </View>
        </View>

        <View style={{marginHorizontal: 24}}>
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
