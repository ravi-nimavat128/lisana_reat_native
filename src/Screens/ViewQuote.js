import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

export class ViewQuote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Quote_data: [],
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
    };
  }

  componentDidMount() {
    this._get_qut();
  }
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
    // alert(this.props.route.params.id);
    console.log('descritation.........', this.state.descritation);
    console.log('Quote_data', JSON.stringify(this.state.Quote_data, null, 2));
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
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Quote View
            </Text>
          </View>
        </View>

        <ScrollView>
          <Text style={{marginLeft: 44, marginTop: 62, fontSize: 16}}>
            {this.state.inquirie_name}
          </Text>
          <View style={{marginLeft: 44, flexDirection: 'row', marginTop: 4}}>
            <Text style={{fontSize: 10, color: 'gray', opacity: 0.7}}>
              Accept the quote before{' '}
            </Text>
            <Text style={{fontSize: 10, color: 'black'}}>
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
              <Text style={[styles.tab_txt, {color: '#FFFFFF'}]}>
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
              <Text style={[styles.tab_txt, {color: '#A3A3A3'}]}>
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
                fontWeight: 'bold',
              }}>
              $2.450,00
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
                }}>
                Work Cost
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#3B3B3B',
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
                }}>
                Material
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#3B3B3B',
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
              }}>
              Summary
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
                }}>
                Total Before ROT{' '}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#3B3B3B',
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
                }}>
                ROT Deduction
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#3B3B3B',
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
                }}>
                Total after ROT{' '}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#3B3B3B',
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
            <Text style={{fontSize: 18, color: '#3B3B3B', fontWeight: 'bold'}}>
              {this.state.quotation_accept_date}
            </Text>
          </View>

          <TouchableOpacity>
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
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
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
                style={{color: '#525252', fontSize: 16, fontWeight: 'bold'}}>
                Ask Us a Question{' '}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
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
                style={{color: '#EC4464', fontSize: 16, fontWeight: 'bold'}}>
                Decline The Quote{' '}
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  login_token: state.userDetails.login_token,
  user_id: state.userDetails.user_id,
});

const mapDispatchToProps = {};

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
    fontWeight: 'bold',
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
