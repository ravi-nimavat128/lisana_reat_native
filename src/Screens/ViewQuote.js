import React, {Component} from 'react';
import {CheckBox} from 'react-native-elements';

import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Touchable,
} from 'react-native';
import {BottomSheet} from 'react-native-btr';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import {addInqTab} from '../Reducer/DateReducer/date_actions';

var Data = [
  {id: 1, name: 'My budget is not enough', is_check: false},
  {id: 2, name: 'The estimation is too expensive', is_check: false},
  {id: 3, name: 'I have change my plan', is_check: false},
  {id: 4, name: 'Others', is_check: false},
];

export class ViewQuote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Quote_data: [],
      quote_id: 0,
      inquirie_type: 0,
      inquirie_name: '',
      descritation: '',
      acceptance_date: '',
      message: '',
      work_cost: '',
      meterial: '',
      total_before_rot: '',
      total_after_rot: '',
      rot_deduction: '',
      preview_quote: '',
      quotation_accept_date: '',
      grand_total: '',
      sheet_visible: false,
      Decline_sheet_visible: false,
      selected_checkbox_id: [],
      tell_us_more: '',
    };
  }
  onCheckChanged(id) {
    const data = Data;

    const index = data.findIndex(x => x.id === id);
    this.setState({selected_checkbox_id: index});
    data[index].is_check = !data[index].is_check;
    this.setState(data);
  }
  toggleBottomSheet = () => {
    //Toggling the visibility state of the bottom sheet
    this.setState(state => ({
      sheet_visible: !state.sheet_visible,
    }));
  };

  toggleDeclineBottomSheet = () => {
    //Toggling the visibility state of the bottom sheet
    this.setState(state => ({
      Decline_sheet_visible: !state.Decline_sheet_visible,
    }));
  };

  componentDidMount() {
    this._get_qut();
    this.onFocusSubscribe = this.props.navigation.addListener('focus', () => {
      // Your code
      this._get_qut();
    });
  }

  change_quote_status_accept = () => {
    this.setState({
      isLoading: true,
    });

    const token = 'Bearer '.concat(this.props.login_token);

    var headers = {
      Authorization: token,
    };

    let formData = new FormData();
    formData.append('quotation_id', this.state.quote_id);
    formData.append('quotation_type', 2);

    axios
      .post(
        'http://binarygeckos.com/lisana/api/quotation_status_change',
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

  change_quote_status_decline = () => {
    this.setState({
      isLoading: true,
    });
    const token = 'Bearer '.concat(this.props.login_token);

    var headers = {
      Authorization: token,
    };

    let formData = new FormData();
    formData.append('user_id', this.props.user_id);
    formData.append('quotation_id', this.state.quote_id);
    formData.append(
      'question_id',
      this.state.selected_checkbox_id.map(i => i.id).join(','),
    );
    formData.append('messages', this.state.tell_us_more);

    axios
      .post(
        'http://binarygeckos.com/lisana/api/decline_quotation_question_add',
        formData,
        {
          headers: headers,
        },
      )
      .then(Response => {
        if (Response.data.status == 1) {
          this.setState({
            isLoading: false,
            selected_checkbox_id: [],
            tell_us_more: '',
          });
          this.toggleDeclineBottomSheet();
          // alert(Response.data.message);
          // this.toggleDeclineBottomSheet();
          this.props.addInqTab(0);
          this.props.navigation.replace('BottomNavigator');
        } else {
          this.setState({isLoading: false});
          alert(Response.data.message);
        }
      });
  };

  _get_qut = () => {
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
      .post('http://binarygeckos.com/lisana/api/get_quote', formData, {
        headers: headers,
      })
      .then(Response => {
        if (Response.data.status == 1) {
          this.setState({
            isLoading: false,
            Quote_data: Response.data.result,
            inquirie_type: Response.data.result
              .map(i => i.inquirie_type)
              .join(' '),
            quote_id: Response.data.result.map(i => i.id).join(' '),
            inquirie_name: Response.data.result.map(i => i.inquirie_name),
            descritation: Response.data.result.map(i => i.descritation),
            acceptance_date: Response.data.result.map(i => i.acceptance_date),
            message: Response.data.result.map(i => i.message),
            work_cost: Response.data.result.map(i => i.work_cost),
            meterial: Response.data.result.map(i => i.meterial),
            total_before_rot: Response.data.result.map(i => i.total_before_rot),
            total_after_rot: Response.data.result.map(i => i.total_after_rot),
            rot_deduction: Response.data.result.map(i => i.rot_deduction),
            preview_quote: Response.data.result.map(i => i.preview_quote),
            quotation_accept_date: Response.data.result.map(
              i => i.quotation_accept_date,
            ),
            grand_total: Response.data.result.map(i => i.grand_total),
          });
        } else {
          this.setState({isLoading: false});

          // alert(Response.data.message);
        }
      });
  };
  render() {
    console.log('inquirie_type.........', this.state.inquirie_type);
    console.log('quote id.........', this.state.quote_id);
    console.log('descritation.........', this.state.descritation);
    // alert(this.props.route.params.id);
    console.log('Quote_data', JSON.stringify(this.state.Quote_data, null, 2));
    console.log(
      'Selected checkbox id',
      JSON.stringify(this.state.selected_checkbox_id, null, 2),
    );
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
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 24,
            marginTop: 25,
            alignItems: 'center',
            marginBottom: 35,
          }}>
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
                // fontFamily:'Montserrat-SemiBold',
                fontSize: 16,
                fontFamily: 'Montserrat-Bold',
              }}>
              Quote View
            </Text>
          </View>
        </View>

        <ScrollView>
          <Text
            style={{
              marginLeft: 44,
              marginTop: 62,
              fontSize: 16,
              fontFamily: 'Montserrat-Regular',
            }}>
            {this.state.inquirie_name}
          </Text>
          <View style={{marginLeft: 44, flexDirection: 'row', marginTop: 4}}>
            <Text
              style={{
                fontSize: 10,
                color: 'gray',
                opacity: 0.7,
                fontFamily: 'Montserrat-Regular',
              }}>
              Accept the quote before{' '}
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: 'black',
                fontFamily: 'Montserrat-Regular',
              }}>
              {this.state.acceptance_date}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              height: 58,
              marginHorizontal: 24,
              marginTop: 50,
            }}>
            <TouchableOpacity
              // onPress={() =>
              //   this.setState({
              //     select_tab: 1,
              //   })
              // }
              style={[
                styles.tab_bg,
                {
                  backgroundColor: '#EC4464',
                },
              ]}>
              <Text
                style={[
                  styles.tab_txt,
                  {color: '#FFFFFF', fontFamily: 'Montserrat-Regular'},
                ]}>
                Total Cost
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('PreviewQuote', {
                  pdf: this.state.preview_quote,
                })
              }
              style={[
                styles.tab_bg,
                {
                  backgroundColor: 'white',
                  borderColor: '#DFDFE2',
                  borderWidth: 1,
                },
              ]}>
              <Text
                style={[
                  styles.tab_txt,
                  {color: '#A3A3A3', fontFamily: 'Montserrat-Regular'},
                ]}>
                Preview Quote
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 24,
              marginTop: 36,
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                fontSize: 32,
                color: '#3B3B3B',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              ${this.state.grand_total}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#A3A3A3',
                marginBottom: 7,
              }}>
              {'  '}
              Inc. VAT
            </Text>
          </View>
          <View style={{marginTop: 36, marginHorizontal: 24}}>
            <Text
              style={{
                marginTop: 20,
                marginLeft: 20,
                fontSize: 16,
                color: '#3B3B3B',
                fontFamily: 'Montserrat-Regular',
              }}>
              Items
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                marginTop: 24,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#A3A3A3',
                  fontFamily: 'Montserrat-Regular',
                }}>
                Work Cost
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#3B3B3B',
                  fontFamily: 'Montserrat-Regular',
                }}>
                ${this.state.work_cost}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                marginTop: 24,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#A3A3A3',
                  fontFamily: 'Montserrat-Regular',
                }}>
                Material
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#3B3B3B',
                  fontFamily: 'Montserrat-Regular',
                }}>
                ${this.state.meterial}
              </Text>
            </View>
          </View>

          <View style={{marginTop: 36, marginHorizontal: 24}}>
            <Text
              style={{
                marginTop: 20,
                marginLeft: 20,
                fontSize: 16,
                color: '#3B3B3B',
                fontFamily: 'Montserrat-Regular',
              }}>
              Summary
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                marginTop: 24,
                justifyContent: 'space-between',
                fontFamily: 'Montserrat-Regular',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#A3A3A3',
                  fontFamily: 'Montserrat-Regular',
                }}>
                Total Before ROT{' '}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#3B3B3B',
                  fontFamily: 'Montserrat-Regular',
                }}>
                ${this.state.total_before_rot}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                marginTop: 24,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#A3A3A3',
                  fontFamily: 'Montserrat-Regular',
                }}>
                ROT Deduction
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#3B3B3B',
                  fontFamily: 'Montserrat-Regular',
                }}>
                ${this.state.rot_deduction}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                marginTop: 24,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#A3A3A3',
                  fontFamily: 'Montserrat-Regular',
                }}>
                Total after ROT{' '}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#3B3B3B',
                  fontFamily: 'Montserrat-Regular',
                }}>
                ${this.state.total_after_rot}
              </Text>
            </View>
          </View>

          <Text
            style={{
              marginLeft: 44,
              marginTop: 44,
              fontSize: 12,
              color: '#3B3B3B80',
              fontFamily: 'Montserrat-Regular',
            }}>
            Acceptance date
          </Text>
          <View
            style={{
              marginLeft: 44,
              flexDirection: 'row',
              marginTop: 4,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#3B3B3B',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              {this.state.quotation_accept_date}
            </Text>
          </View>

          <TouchableOpacity
            disabled={this.state.inquirie_type == 2 ? true : false}
            onPress={() => {
              this.change_quote_status_accept();
            }}>
            <View
              style={{
                marginHorizontal: 24,
                backgroundColor: '#EC4464',
                height: 60,
                borderRadius: 70,
                marginTop: 40,
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: 'Montserrat-Regular',
                }}>
                Accept With Bank ID{' '}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                marginHorizontal: 24,
                borderColor: '#A3A3A3',
                borderWidth: 2,
                height: 60,
                borderRadius: 70,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#525252',
                  fontSize: 16,
                  fontFamily: 'Montserrat-Regular',
                }}>
                Ask Us a Question{' '}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={this.state.inquirie_type == 2 ? true : false}
            onPress={() => {
              this.toggleDeclineBottomSheet();
            }}>
            <View
              style={{
                marginHorizontal: 24,
                borderColor: '#00000000',
                borderWidth: 2,
                height: 60,
                marginTop: 20,
                borderRadius: 70,
                marginBottom: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#EC4464',
                  fontSize: 16,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Decline The Quote{' '}
              </Text>
            </View>
          </TouchableOpacity>

          <BottomSheet
            visible={this.state.sheet_visible}
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
              <Text
                style={{
                  color: 'black',
                  fontSize: 24,
                  marginTop: 15,
                  fontFamily: 'Montserrat-Regular',
                }}>
                Congratulations
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 12,
                  marginTop: 16,
                  opacity: 0.5,
                  textAlign: 'center',
                  marginHorizontal: 57,
                  fontFamily: 'Montserrat-Regular',
                }}>
                You have successfully ordered our services. For further
                information, We will get in touch with you to discuss further
                details.
              </Text>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.addInqTab(2);
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
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    See My Job List
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheet>

          <BottomSheet
            snapPoints={['80%']}
            // renderHeader={renderHeader}
            initialSnap={0}
            visible={this.state.Decline_sheet_visible}
            //setting the visibility state of the bottom shee
            onBackButtonPress={this.toggleDeclineBottomSheet}
            onBackdropPress={this.toggleDeclineBottomSheet}
            //Toggling the visibility state on the click of the back botton
            // onBackdropPress={this.toggleBottomNavigationView}
            //Toggling the visibility state on the clicking out side of the sheet
          >
            <View
              style={{
                // flex: 1,
                backgroundColor: 'white',
                borderTopLeftRadius: 36,
                borderTopRightRadius: 36,
                marginTop: 330,
                height: 484,
                shadowColor: 'black',
                width: Dimensions.get('screen').width,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 4,
                elevation: 5,
                // alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    alignSelf: 'baseline',
                    marginLeft: 24,
                    marginTop: 30,
                    color: '#A3A3A3',
                    fontSize: 12,
                    fontFamily: 'Montserrat-Regular',
                  }}>
                  Tell us what makes you {'\n'}decline your inquiries
                </Text>
                {Data.map((item, key) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 20,
                        marginLeft: 24,
                        alignItems: 'center',
                      }}>
                      {/* <CheckBox
                  checkedIcon={
                    <Image source={require('../assets/checked_checkbox.png')} />
                  }
                  // uncheckedIcon={<Image source={require('../unchecked.png')} />}
                  checked={this.state.checked}
                  onPress={() => this.setState({checked: !this.state.checked})}
                /> */}
                      <CheckBox
                        title={item.name}
                        size={25}
                        fontFamily="Montserrat-Regular"
                        style={{alignSelf: 'flex-start'}}
                        containerStyle={{
                          backgroundColor: '#00000000',
                          borderColor: '#00000000',
                          marginVertical: -12,
                          marginLeft: -10,
                          // marginLeft: 24,
                          // alignSelf: 'baseline',
                        }}
                        backdropColor={'#00000000'}
                        checkedIcon={
                          <Image
                            style={{height: 15, width: 15}}
                            source={require('../assets/checked_checkbox.png')}
                          />
                        }
                        uncheckedIcon={
                          <Image
                            style={{height: 15, width: 15}}
                            source={require('../assets/white_check_box.png')}
                          />
                        }
                        iconType="font-awesome"
                        key={key}
                        checked={item.is_check}
                        onPress={() => {
                          this.onCheckChanged(item.id);
                          console.log('check change', Data);
                          this.setState({
                            selected_checkbox_id: Data.filter(
                              i => i.is_check == true,
                            ),
                          });
                          // this.state.all_service.filter(i =>
                          //   i.is_check == true
                          //     ? this.setState({selected_checkbox_id: i.id})
                          //     : null,
                          // );
                          console.log(
                            'new checkbox array',
                            this.state.selected_checkbox_id,
                          );
                        }}
                      />
                    </View>
                  );
                })}
                <View
                  style={{
                    margin: 24,
                    borderRadius: 10,
                    borderColor: '#DFDFE2',
                    borderWidth: 1,
                    height: 112,
                  }}>
                  <TextInput
                    multiline
                    placeholder="Tell us more"
                    require={true}
                    style={{
                      marginLeft: 12,
                      width: '100%',
                      height: '100%',
                      textAlignVertical: 'top',
                      fontFamily: 'Montserrat-Regular',
                    }}
                    onChangeText={txt => {
                      this.setState({tell_us_more: txt});
                    }}></TextInput>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    if (
                      this.state.selected_checkbox_id.length < 1 ||
                      this.state.selected_checkbox_id.length == 'undefined'
                    ) {
                      alert('Please Select any resion');
                    } else if (
                      this.state.selected_checkbox_id.find(i => i.id == 4) &&
                      this.state.tell_us_more == ''
                    ) {
                      alert('Please Enter Tell us more');
                    } else {
                      this.change_quote_status_decline();
                    }

                    // this.props.addInqTab(1);
                    // this.props.navigation.replace('BottomNavigator');
                  }}
                  style={{
                    alignSelf: 'center',
                    marginHorizontal: 24,
                    backgroundColor: '#EC4464',
                    height: 60,
                    borderRadius: 70,
                    width: Dimensions.get('screen').width / 1.6,
                    marginBottom: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      // fontFamily:'Montserrat-SemiBold',
                      fontFamily: 'Montserrat-Bold',
                    }}>
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheet>
        </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewQuote);

const styles = StyleSheet.create({
  img_smoll: {
    width: 39,
    height: 33,
    marginTop: 80,
    alignSelf: 'center',
  },
  text_create_acc: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 43,
    alignSelf: 'center',
  },
  tab_bg: {
    flex: 1,
    borderRadius: 70,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab_txt: {
    fontSize: 16,
  },
  tab_container: {
    marginTop: 36,
    marginHorizontal: 24,
  },
  edt_box: {
    height: 57,
    borderColor: '#DFDFE2',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 24,
  },
  edt_txt: {
    color: 'black',
    fontSize: 13,
    marginLeft: 20,
  },
  btn_create: {
    height: 60,
    backgroundColor: '#EC4464',
    borderRadius: 70,
    marginHorizontal: 32,
    marginTop: 41,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
