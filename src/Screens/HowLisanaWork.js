import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import HTMLView from 'react-native-htmlview';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

export class HowLisanaWork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      hlw: '',
    };
  }
  componentDidMount() {
    this._get_HLW();
  }

  _get_HLW = () => {
    this.setState({
      isLoading: true,
    });

    const token = 'Bearer '.concat(this.props.login_token);

    var headers = {
      Authorization: token,
    };

    // let formData = new FormData();
    // formData.append('user_id', this.props.user_id);
    // formData.append('inquiry_id', this.props.route.params.id);
    // formData.append('rating_star', this.state.rating);
    // formData.append('comment', this.state.comment);

    axios
      .post('http://binarygeckos.com/lisana/api/get_about_us_details', null, {
        headers: headers,
      })
      .then(Response => {
        if (Response.data.status == 1) {
          this.setState({
            isLoading: false,
            hlw: Response.data.result,
          });
          //   this.toggleBottomSheet();
        } else {
          this.setState({isLoading: false});
          alert(Response.data.message);
        }
      });
  };

  render() {
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
          textStyle={{color: '#EC4464', fontSize: 20, marginLeft: 10}}
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
              How Lisana Work
            </Text>
          </View>
        </View>
        <ScrollView>
          <View style={{marginTop: 20}}>
            <HTMLView
              style={{
                // fontSize: 18,
                // color: 'black',
                marginTop: 20,
                marginHorizontal: 22,
              }}
              value={this.state.hlw}></HTMLView>
          </View>
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
    marginBottom: 20,
  },
});

const mapStateToProps = state => ({
  login_token: state.userDetails.login_token,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HowLisanaWork);
