import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {LogOut} from '../Reducer/UserReducer/user_actions';

const Data = [
  {id: 1, titel: 'All'},
  {id: 2, titel: 'Bathroom'},
  {id: 3, titel: 'Kitchen'},
  {id: 4, titel: 'Complete'},
  {id: 5, titel: 'New production'},
];

const Itemm = ({
  item,
  onPress,
  backgroundColor,
  textColor,
  borderColor,
  borderWidth,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      {
        borderRadius: 36,
        height: 30,
        paddingHorizontal: 12,
        paddingVertical: 7,
        marginHorizontal: 8,
      },
      backgroundColor,
      borderColor,
      borderWidth,
    ]}>
    <Text style={[{fontSize: 11}, textColor]}>{item.titel}</Text>
  </TouchableOpacity>
);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_id: 1,
    };
  }

  renderItem = ({item}) => {
    const backgroundColor =
      item.id === this.state.selected_id ? '#EC4464' : '#FDE8EC';
    const color = item.id === this.state.selected_id ? 'white' : '#EC4464';

    return (
      <Itemm
        item={item}
        onPress={() => {
          this.setState({selected_id: item.id});
        }}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  render() {
    return (
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View
          style={{flexDirection: 'row', marginHorizontal: 24, marginTop: 10}}>
          <Image
            source={require('../assets/logo_smoll.png')}
            style={{
              height: 56,
              width: 56,
              borderRadius: 56 / 2,
              resizeMode: 'contain',
            }}></Image>
          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              marginLeft: 16,
            }}>
            <Text style={{color: '#7F7F7F', fontSize: 14}}>Morning</Text>
            <Text style={{color: '#040415', fontSize: 24, fontWeight: 'bold'}}>
              Stevenson
            </Text>
          </View>
          <View style={{flex: 1}}></View>
          <View
            style={{
              height: 56,
              width: 56,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#E6E6E8',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/notification_icon.png')}
              style={{height: 22, width: 22, resizeMode: 'center'}}></Image>
          </View>
        </View>
        <View>
          <FlatList
            data={Data}
            style={{marginTop: 40}}
            renderItem={this.renderItem}
            horizontal
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={{marginTop: 50}}>
          <Button
            title="logout"
            onPress={() => {
              this.props.LogOut();
              this.props.navigation.navigate('Splash');
            }}></Button>
          <Button
            title="How Lisana Work"
            onPress={() => {
              this.props.navigation.navigate('HowLisanaWork');
            }}></Button>
          <Button
            title="help faq"
            onPress={() => {
              this.props.navigation.navigate('HelpFAQ');
            }}></Button>
        </View>
      </SafeAreaView>
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

const mapDispatchToProps = {LogOut};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
