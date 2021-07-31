import React, {Component} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
  Touchable,
  Picker,
  TextInput,
  ImageBackground,
  FlatList,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import {connect} from 'react-redux';
import RNFS from 'react-native-fs';

// import {Dropdown} from 'react-native-material-dropdown';

let DATA1 = [
  {
    Value: 'Kitchen Renovation',
    Id: 1,
  },
  {
    Value: 'Hall Renovation',
    Id: 2,
  },
  {
    Value: 'Bathroom Renovation',
    Id: 3,
  },
  {
    Value: 'Badroom Renovation',
    Id: 4,
  },
];

let DATA2 = [
  {
    Value: 'Within 1 month',
    Id: 1,
  },
  {
    Value: 'Within 2 month',
    Id: 2,
  },
  {
    Value: 'Within 3 month',
    Id: 3,
  },
  {
    Value: 'Within 4 month',
    Id: 4,
  },
];
let DATA3 = [
  {
    Value: '15 March 2021',
    Id: 1,
  },
  {
    Value: '16 March 2021',
    Id: 2,
  },
  {
    Value: '17 March 2021',
    Id: 3,
  },
  {
    Value: '18 March 2021',
    Id: 4,
  },
];

class AddInquiry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: '',
      value1: '',
      value2: '',
      checkbox_value: false,
      checkbox_value1: false,
      multipleFile: [],
    };
  }

  _add_inq = () => {
    const token = 'Bearer '.concat(this.props.login_token);

    var headers = {
      Authorization: token,
    };

    const file = this.state.multipleFile.map(i => ({
      uri: Platform.OS === 'android' ? i.uri : i.uri.replace('file://', ''),
      // name: i.name,
      // type: i.type,
    }));

    let formData = new FormData();
    formData.append('inquirie_title', 'Painting Music Studio');
    formData.append('user_id', this.props.user_id);
    formData.append('cat_id', 1);
    formData.append('location', 'Royal Plam St. 18');
    formData.append('start_work_id', 2);
    formData.append('date', '16 - 07 - 2021');
    formData.append('method', 'Remote');
    formData.append('services_id', 2);
    formData.append(
      'descritation',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus blanditiis atque',
    );
    // RNFS.readFile(file, 'base64').then(res => {
    //   console.log(res);
    // });
    // formData.append('attachment[]', {
    // name: 'IMG_20210728_105856.jpg',
    // type: 'image/jpeg',
    // uri: 'content://com.android.providers.media.documents/document/image%3A393356',
    // });

    // this.state.multipleFile.map(i =>
    //   formData.append('attachment[]', {
    //     uri: 'file://' + i.uri,
    //     name: i.name,
    //     type: i.type,
    //   }),
    // );

    console.log('form dataaaaa', JSON.stringify(formData, null, 2));

    axios
      .post(
        'http://binarygeckos.com/lisana/api/add_inquiry',

        {
          headers: headers,
        },
        formData,
      )

      .then(responses => {
        if (responses.data.status == 1) {
          alert('done');
        } else {
          alert(responses.data.message);
        }
      });
  };

  convert = () => {
    RNFS.readFile(
      'content://com.android.providers.media.documents/document/image%3A393356',
      'base64',
    ).then(res => {
      console.log(res);
    });
  };

  selectMultipleFile = async () => {
    //Opening Document Picker for selection of multiple file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],

        //There can me more options as well find above
      });
      for (const res of results) {
        //Printing the log realted to the file
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
      }
      //Setting the state to show multiple file attributes
      this.setState({
        multipleFile: results,
      });

      // setMultipleFile(results);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from multiple doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  add_inq_item = ({item, index}) => {
    return (
      <View
        style={{
          width:
            this.state.multipleFile.length % 2 !== 0 &&
            this.state.multipleFile.length - 1 === index
              ? '100%'
              : '50%',
          flexDirection: 'row',
        }}>
        <ImageBackground
          imageStyle={{borderRadius: 12}}
          style={{
            height: 100,
            width: 96,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          source={
            item.type == 'application/pdf'
              ? require('../assets/pdg_bg.png')
              : {uri: item.uri}
          }>
          {item.type == 'application/pdf' ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={{height: 23, width: 26, resizeMode: 'contain'}}
                source={require('../assets/paper_icon.png')}></Image>
              <Text
                style={{
                  marginTop: 10,
                  color: '#3B3B3B',
                  fontSize: 9,
                  marginHorizontal: 5,
                }}>
                {item.name}
              </Text>
            </View>
          ) : null}
        </ImageBackground>
        <TouchableOpacity>
          <Image
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
              position: 'absolute',
              right: 0,
              top: 0,
            }}
            source={require('../assets/pink_cross_circle.png')}></Image>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    console.log(
      'my doctument',
      JSON.stringify(this.state.multipleFile, null, 2),
    );
    return (
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
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
              Inquiry
            </Text>
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 50,
              width: 113,
              marginLeft: 24,
              backgroundColor: '#FEEFF2',
              height: 35,
              borderRadius: 4,
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/edit_icon.png')}
              style={{
                height: 18,
                resizeMode: 'contain',
                width: 18,
                marginRight: 8,
              }}
            />
            <Text style={{color: '#EC4464', fontSize: 12}}>Edit Inquiry</Text>
          </View>
          <View style={styles.edt_box}>
            <Picker
              selectedValue={this.state.value}
              mode="dropdown"
              style={{marginLeft: 20}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({value: itemValue})
              }>
              {DATA1.map(i => (
                <Picker.Item label={i.Value} value={i.Id} />
              ))}
              {/* <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" /> */}
            </Picker>
          </View>
          <View style={styles.edt_box}>
            <TextInput
              placeholder="Royal Palm St. No. 18"
              style={{marginLeft: 20}}></TextInput>
          </View>
          <View style={styles.edt_box}>
            <Picker
              selectedValue={this.state.value1}
              mode="dropdown"
              style={{marginLeft: 20}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({value1: itemValue})
              }>
              {DATA2.map(i => (
                <Picker.Item label={i.Value} value={i.Id} />
              ))}
              {/* <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" /> */}
            </Picker>
          </View>
          <View style={styles.edt_box}>
            <Picker
              selectedValue={this.state.value2}
              mode="dropdown"
              style={{marginLeft: 20}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({value2: itemValue})
              }>
              {DATA3.map(i => (
                <Picker.Item label={i.Value} value={i.Id} />
              ))}
              {/* <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" /> */}
            </Picker>
          </View>
          <Text
            style={{
              color: '#3B3B3B',
              marginLeft: 24,
              marginTop: 24,
              fontSize: 16,
            }}>
            Select services you want
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginLeft: 24,
              alignItems: 'center',
            }}>
            <CheckBox
              // onCheckColor={'#EC4464'}
              tintColors={{true: '#EC4464'}}
              animationDuration={0.5}
              style={{height: 16, width: 16, marginRight: 15}}
              value={this.state.checkbox_value}
              onValueChange={newValue =>
                this.setState({
                  checkbox_value: newValue,
                })
              }></CheckBox>
            <Text
              style={{
                color: '#3B3B3B',
                fontSize: 13,
              }}>
              Renovation
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginLeft: 24,
              alignItems: 'center',
            }}>
            <CheckBox
              // onCheckColor={'#EC4464'}
              tintColors={{true: '#EC4464'}}
              animationDuration={0.5}
              style={{height: 16, width: 16, marginRight: 15}}
              value={this.state.checkbox_value1}
              onValueChange={newValue =>
                this.setState({
                  checkbox_value1: newValue,
                })
              }></CheckBox>
            <Text
              style={{
                color: '#3B3B3B',
                fontSize: 13,
              }}>
              Design and visualization
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginLeft: 24,
              alignItems: 'center',
            }}>
            {/* <CheckBox
              // onCheckColor={'#EC4464'}
              tintColors={{true: '#EC4464'}}
              animationDuration={0.5}
              style={{height: 16, width: 16, marginRight: 15}}
              value={this.state.checkbox_value1}
              onValueChange={newValue =>
                this.setState({
                  checkbox_value1: newValue,
                })
              }></CheckBox> */}
            <Text
              style={{
                color: '#3B3B3B',
                fontSize: 13,
                marginLeft: 30,
              }}>
              Purchasing materials
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', marginHorizontal: 24, marginTop: 25}}>
            <TouchableOpacity onPress={() => this.selectMultipleFile()}>
              <ImageBackground
                style={{
                  height: 100,
                  width: 96,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                source={require('../assets/pink_bg_add.png')}>
                <Image
                  style={{height: 26, width: 26}}
                  source={require('../assets/pink_plus_icon.png')}></Image>
              </ImageBackground>
            </TouchableOpacity>
            <FlatList
              data={this.state.multipleFile}
              columnWrapperStyle={styles.row} // space them out evenly
              renderItem={this.add_inq_item}
              numColumns={3}
              keyExtractor={index => index.toString()}></FlatList>
          </View>
          <View style={{marginVertical: 100}}>
            <Button
              title="add inquiry"
              onPress={() => {
                this._add_inq();
              }}></Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  login_token: state.userDetails.login_token,
  User_id: state.userDetails.user_id,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddInquiry);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 25,
    alignItems: 'center',
  },
  edt_box: {
    height: 56,
    marginHorizontal: 24,
    borderColor: '#DFDFE2',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 24,
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
