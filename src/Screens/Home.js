import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';

class Home extends Component {
  render() {
    return (
      <View>
        <Text> this is home screen </Text>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  user_idd: state.userDetails.user_id,
  login_token: state.userDetails.login_token,
  mo_number: state.userDetails.mo_number,
  user_name: state.userDetails.user_name,
  business_name: state.userDetails.business_name,
  email: state.userDetails.email,
  address: state.userDetails.address,
  vat_no: state.userDetails.vat_no,
  org_no: state.userDetails.org_no,
  referral_code: state.userDetails.referral_code,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
