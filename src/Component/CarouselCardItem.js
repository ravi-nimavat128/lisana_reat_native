import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.85);

const CarouselCardItem = ({item, index}) => {
  return (
    <View style={styles.container} key={index}>
      <ImageBackground
        source={item.imgUrl}
        style={styles.image}
        imageStyle={{borderRadius: 20}}>
        <View style={{marginHorizontal: 20, marginTop: 15}}>
          <Text
            style={{
              fontSize: 15,
              color: 'white',
              marginRight: 80,
              fontFamily: 'Montserrat-Regular',
            }}>
            {item.body}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 12,
                color: 'white',
                opacity: 0.5,
                fontFamily: 'Montserrat-Regular',
              }}>
              {item.title}
            </Text>
            <View
              style={{
                height: 5,
                width: 5,
                borderRadius: 5 / 2,
                backgroundColor: 'white',
                alignSelf: 'center',
                opacity: 0.5,
                marginTop: 3,
                marginHorizontal: 5,
              }}></View>
            <Text
              style={{
                fontSize: 12,
                color: 'white',
                opacity: 0.5,
                fontFamily: 'Montserrat-Regular',
              }}>
              {item.time}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 40,
    width: ITEM_WIDTH,
    alignSelf: 'center',
    // paddingBottom: 40,
    // shadowColor: '#000',

    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,
    // elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    borderRadius: 0,
    height: 172,
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

export default CarouselCardItem;
