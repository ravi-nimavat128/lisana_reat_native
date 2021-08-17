import React, {Component} from 'react';
import axios from 'axios';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {BottomSheet} from 'react-native-btr';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addInqTab} from '../Reducer/DateReducer/date_actions';

export class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {is_visible: false, rating: 0, isLoading: false, comment: ''};
  }

  _add_review = () => {
    this.setState({
      isLoading: true,
    });

    const token = 'Bearer '.concat(this.props.login_token);

    var headers = {
      Authorization: token,
    };

    let formData = new FormData();
    formData.append('user_id', this.props.user_id);
    formData.append('inquiry_id', this.props.route.params.id);
    formData.append('rating_star', this.state.rating);
    formData.append('comment', this.state.comment);

    axios
      .post(
        'http://binarygeckos.com/lisana/api/add_update_job_review',
        formData,
        {
          headers: headers,
        },
      )
      .then(Response => {
        if (Response.data.status == 1) {
          this.setState({
            isLoading: false,
          });
          this.toggleBottomSheet();
        } else {
          this.setState({isLoading: false});
          alert(Response.data.message);
        }
      });
  };

  ratingCompleted = rating => {
    console.log('Ratingggggggggg', rating);
    this.setState({rating: rating});
  };

  toggleBottomSheet = () => {
    //Toggling the visibility state of the bottom sheet
    this.setState(state => ({
      is_visible: !state.is_visible,
    }));
  };

  render() {
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
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
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Add Review
            </Text>
          </View>
        </View>

        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{height: 100, width: 91, borderRadius: 14, marginTop: 30}}
              source={{uri: this.props.route.params.img}}></Image>
            <Text
              style={{
                color: '#1F1F1F',
                fontSize: 20,
                marginTop: 30,
                marginLeft: 24,
              }}>
              {/* {this.state.inq_title} */}
              {this.props.route.params.title}
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
                {/* {this.state.inq_date} */}
                {this.props.route.params.date}
              </Text>
            </View>

            <Rating
              style={{width: Dimensions.get('screen').width, marginTop: 50}}
              type="star"
              ratingCount={5}
              imageSize={50}
              showRating={false}
              startingValue={0}
              onFinishRating={rating => this.setState({rating: rating})}
            />

            <View
              style={{
                borderRadius: 10,
                marginHorizontal: 24,
                marginVertical: 24,
                borderColor: '#DFDFE2',
                borderWidth: 1,
                width: '90%',
                justifyContent: 'flex-start',
                height: 172,
              }}>
              <TextInput
                placeholder="Add your comment"
                multiline={true}
                onChangeText={txt => {
                  this.setState({descritation: txt});
                }}
                style={{
                  margin: 12,
                  height: '100%',
                  width: '100%',
                  textAlignVertical: 'top',
                  alignSelf: 'flex-start',
                }}></TextInput>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => this._add_review()}>
          <View
            style={{
              marginHorizontal: 24,
              backgroundColor: '#EC4464',
              height: 60,
              alignSelf: 'center',
              borderRadius: 70,
              marginTop: 40,
              width: '90%',
              marginBottom: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Submit
            </Text>
          </View>
        </TouchableOpacity>
        <BottomSheet
          visible={this.state.is_visible}
          //setting the visibility state of the bottom shee
          onBackButtonPress={this.toggleBottomSheet}
          onBackdropPress={this.toggleBottomSheet}

          //Toggling the visibility state on the click of the back botton
          // onBackdropPress={this.toggleBottomNavigationView}
          //Toggling the visibility state on the clicking out side of the sheet
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderTopLeftRadius: 36,
              borderTopRightRadius: 36,
              marginTop: 350,
              height: 433,
              shadowColor: 'black',
              width: Dimensions.get('screen').width,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.5,
              shadowRadius: 4,
              elevation: 5,
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/success_img.png')}
              style={{marginTop: 10, height: 151, width: 264}}></Image>
            <Text style={{color: 'black', fontSize: 24, marginTop: 15}}>
              Congratulations
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 12,
                marginTop: 16,
                opacity: 0.5,
                textAlign: 'center',
                marginHorizontal: 91,
              }}>
              Thank you! your feedback has been successfully sent. Your review
              and feedback will always make us growing better
            </Text>
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.addInqTab(0);
                  this.props.navigation.replace('BottomNavigator');
                }}
                style={{
                  marginHorizontal: 24,
                  backgroundColor: '#EC4464',
                  height: 60,
                  borderRadius: 70,
                  marginTop: 40,
                  width: Dimensions.get('screen').width / 1.6,
                  marginBottom: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Back to Home
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  login_token: state.userDetails.login_token,
  user_id: state.userDetails.user_id,
});

const mapDispatchToProps = {
  addInqTab,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
const styles = StyleSheet.create({
  headerr: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 25,
    alignItems: 'center',
    marginBottom: 35,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    alignItems: 'center',
  },
  small_img: {
    height: 18,
    width: 18,
  },
  txt: {
    fontSize: 14,
    color: '#3B3B3B',
    marginLeft: 14,
    fontWeight: 'bold',
  },
});
