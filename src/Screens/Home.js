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
  StyleSheet,
  Dimensions,
  Touchable,
} from 'react-native';
import {connect} from 'react-redux';
import {LogOut} from '../Reducer/UserReducer/user_actions';
import CarouselCardItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from '../Component/CarouselCardItem';

import Carousel, {Pagination} from 'react-native-snap-carousel';

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
var banner_img = require('../assets/banner_img.png');
const slider_data = [
  {
    title: 'Alec Benjamin',
    body: 'Easy Tips for Lighting Placement in Bathroom',
    imgUrl: banner_img,
    time: '15mins reading',
  },
  {
    title: 'Alec Benjamin',
    body: 'Easy Tips for Lighting Placement in Bathroom',
    imgUrl: banner_img,
    time: '15mins reading',
  },
  {
    title: 'Alec Benjamin',
    body: 'Easy Tips for Lighting Placement in Bathroom',
    imgUrl: banner_img,
    time: '15mins reading',
  },
  {
    title: 'Alec Benjamin',
    body: 'Easy Tips for Lighting Placement in Bathroom',
    imgUrl: banner_img,
    time: '15mins reading',
  },
  {
    title: 'Alec Benjamin',
    body: 'Easy Tips for Lighting Placement in Bathroom',
    imgUrl: banner_img,
    time: '15mins reading',
  },
  {
    title: 'Alec Benjamin',
    body: 'Easy Tips for Lighting Placement in Bathroom',
    imgUrl: banner_img,
    time: '15mins reading',
  },
  {
    title: 'Alec Benjamin',
    body: 'Easy Tips for Lighting Placement in Bathroom',
    imgUrl: banner_img,
    time: '15mins reading',
  },
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_id: 1,
      slider_dot: 0,
    };
  }

  _renderItemImageSlider = ({item, index}) => {
    return (
      <View style={styles.container} key={index}>
        <Image source={{uri: item.imgUrl}} style={styles.image} />
        <Text style={styles.header}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    );
  };

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
      <SafeAreaView
        style={{backgroundColor: 'white', flex: 1, marginBottom: 85}}>
        <ScrollView>
          <View
            style={{flexDirection: 'row', marginHorizontal: 24, marginTop: 28}}>
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
              <Text
                style={{color: '#040415', fontSize: 24, fontWeight: 'bold'}}>
                Stevenson
              </Text>
            </View>
            <View style={{flex: 1}}></View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Notification');
              }}
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
            </TouchableOpacity>
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
          <View style={{marginTop: 20}}>
            <Carousel
              layout="default"
              layoutCardOffset={9}
              // ref={isCarousel}
              data={slider_data}
              renderItem={CarouselCardItem}
              sliderWidth={SLIDER_WIDTH}
              autoplay={true}
              autoplayInterval={2000}
              itemWidth={ITEM_WIDTH}
              inactiveSlideShift={0}
              onSnapToItem={index => this.setState({slider_dot: index})}
              useScrollView={true}
            />
            <Pagination
              dotsLength={slider_data.length}
              activeDotIndex={this.state.slider_dot}
              // carouselRef={isCarousel}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                backgroundColor: '#EC4464',
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              // tappableDots={true}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              height: 98,
              marginHorizontal: 24,
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/red_reminder.png')}
              style={{
                height: 34,
                width: 34,
                resizeMode: 'contain',
                marginHorizontal: 20,
              }}></Image>

            <View style={{flex: 1}}>
              <Text
                style={{color: '#333333', fontSize: 18, fontWeight: 'bold'}}>
                Reminder
              </Text>
              <Text
                style={{
                  color: '#333333',
                  fontSize: 11,
                  marginRight: 16,
                  opacity: 0.5,
                }}>
                You have one discussion session at 10AM about your bathroom
                renovation
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 24,
              marginTop: 28,
            }}>
            <Text style={{color: '#1F1F1F', fontSize: 16, fontWeight: 'bold'}}>
              Your Inquiries
            </Text>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Inquiries')}>
              <Text
                style={{color: '#EC4464', fontSize: 12, fontWeight: 'bold'}}>
                Show all
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{marginHorizontal: 24, marginTop: 24, flexDirection: 'row'}}>
            <Image
              source={require('../assets/inq_img.png')}
              style={{
                height: 83,
                width: 76,
                marginRight: 16,
                resizeMode: 'contain',
              }}></Image>
            <View style={{flex: 1}}>
              <Text
                style={{color: '#333333', fontSize: 18, fontWeight: 'bold'}}>
                Renovating Bathroom
              </Text>
              <Text
                style={{
                  color: '#A3A3A3',
                  fontSize: 12,
                  marginRight: 16,
                  opacity: 0.5,
                  marginTop: 8,
                }}>
                Sent: Sunday, 12 March 2021
              </Text>
              <Text
                style={{
                  color: '#1F1F1F',
                  fontSize: 12,
                  marginRight: 16,
                  fontWeight: 'bold',
                  marginTop: 16,
                }}>
                Processing
              </Text>
            </View>
          </View>

          {/* <View style={{marginTop: 50, marginBottom: 80}}>
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
          </View> */}
        </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: Dimensions.get('screen').width,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: Dimensions.get('screen').width,
    height: 300,
  },
  header: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
