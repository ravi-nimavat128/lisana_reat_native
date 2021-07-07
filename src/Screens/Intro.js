import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {connect} from 'react-redux';
import {addIntroStatus} from '../Reducer/UserReducer/user_actions';

import Register from './Register';

const slides = [
  {
    key: 1,
    title: 'All You Need for Your Renovation in One APP',
    text: 'Easily access your inquires, quotes and jobs in our app and discuss with us at any time. ',
    image: require('../assets/intro1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Send Us an Inquiry and Book Free Consultation',
    text: 'Before starting your project inquiries, we provide a free service consultation',
    image: require('../assets/intro2.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Start Your Renovation Journey Freely With Lisana APP',
    text: 'Easily access our services everytime and everywhere by our new mobile version',
    image: require('../assets/intro3.png'),
    backgroundColor: '#22bcb5',
  },
];

class Intro extends Component {
  constructor(porps) {
    super(porps);

    this.state = {
      showRealApp: false,
      slide_key: 0,
    };
  }
  _render_next = () => {
    return (
      <View style={{alignItems: 'center'}}>
        {this.state.slide_key == 0 ? (
          <Image
            style={{height: 99, width: 99}}
            source={require('../assets/nxt_btn_intro.png')}></Image>
        ) : (
          <Image
            style={{height: 99, width: 99}}
            source={require('../assets/next_btn_intrto.png')}></Image>
        )}
      </View>
    );
  };
  _render_done = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 198,
            height: 65,
            borderRadius: 70,
            backgroundColor: '#EC4464',
          }}>
          <Text style={{color: 'white', fontSize: 16}}>Get Started</Text>
        </View>
      </View>
    );
  };
  _renderItem = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          <View></View>
          <TouchableOpacity
            onPress={() => {
              this._onDone();
            }}>
            <Text style={{fontSize: 20, color: '#EC4464', marginRight: 15}}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={item.image}
            style={{alignSelf: 'center', marginTop: -250}}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              textAlign: 'center',
              marginHorizontal: 60,
              marginTop: 50,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              marginHorizontal: 60,
              marginTop: 15,
              color: '#8F8F8F',
            }}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({showRealApp: true});
    this.props.addIntroStatus(true);
  };
  render() {
    console.log(this.state.slide_key);
    if (this.state.showRealApp) {
      return <Register navigation={this.props.navigation} />;
    } else {
      return (
        <SafeAreaView style={{flex: 1}}>
          <AppIntroSlider
            activeDotStyle={{
              height: 10,
              marginBottom: 25,
              width: 24,
              backgroundColor: '#EC4464',
            }}
            dotStyle={{
              height: 10,
              marginBottom: 25,
              width: 10,
              backgroundColor: '#EDEDED',
            }}
            renderItem={this._renderItem}
            renderNextButton={this._render_next}
            renderDoneButton={this._render_done}
            data={slides}
            showNextButton={true}
            onSlideChange={key =>
              this.setState({
                slide_key: key,
              })
            }
            onDone={this._onDone}
            bottomButton
          />
        </SafeAreaView>
      );
    }
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = {
  addIntroStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Intro);
