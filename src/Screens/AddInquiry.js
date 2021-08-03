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
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  ImageBackground,
  FlatList,
  Dimensions,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
// import DatePicker from 'react-native-datepicker';
import axios from 'axios';
import {connect} from 'react-redux';
// import RNFS from 'react-native-fs';
import {FlatGrid} from 'react-native-super-grid';
const itemsPerRow = 3;
// import {Dropdown} from 'react-native-material-dropdown';
// import {TouchableOpacity} from 'react-native-gesture-handler';

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
      is_check: false,
      modalVisible: false,
      open: false,
      value: '',
      value1: '',
      value2: '',
      checkbox_value: false,
      checkbox_value1: false,
      multipleFile: [],
      all_service: [],
      selected_checkbox_id: [],
      selected_date: 0,
    };
  }

  onDeleteByIndex = index => {
    const newFile = [...this.state.multipleFile];
    newFile.splice(index, 1);

    this.setState(state => ({
      multipleFile: newFile,
    }));
  };

  componentDidMount() {
    this._get_all_service();
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

    this.state.multipleFile.map(i =>
      formData.append('attachment[]', {
        uri: Platform.OS === 'android' ? i.uri : i.uri.replace('file://', ''),
        name: i.name,
        type: i.type,
      }),
    );

    console.log('form dataaaaa', JSON.stringify(formData, null, 2));

    // axios
    //   .post(
    //     'http://binarygeckos.com/lisana/api/add_inquiry',

    //     formData,
    //     {
    //       headers: headers,
    //     },
    //   )

    axios
      .post('http://binarygeckos.com/lisana/api/add_inquiry', formData, {
        headers: headers,
      })
      .then(responses => {
        if (responses.data.status == 1) {
          alert('Your Inquiry is added successful');
          this.props.navigation.navigate('BottomNavigator');
        } else {
          alert(responses.data.message);
        }
      });
  };

  _get_all_service = () => {
    const token = 'Bearer '.concat(this.props.login_token);

    var headers = {
      Authorization: token,
    };

    axios
      .get('http://binarygeckos.com/lisana/api/get_all_services', null, {
        headers: headers,
      })
      .then(Response => {
        if (Response.data.status == 1) {
          this.setState({
            all_service: Response.data.result.map((item, sindex) => {
              return {
                ...item,
                is_check: false,
              };
            }),
          });
        } else {
          alert(Response.data.message);
        }
      });
  };

  onCheckChanged(id) {
    const data = this.state.all_service;

    const index = data.findIndex(x => x.id === id);
    this.setState({selected_checkbox_id: index});
    data[index].is_check = !data[index].is_check;
    this.setState(data);
  }

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
          // width:
          //   this.state.multipleFile.length % 2 !== 0 &&
          //   this.state.multipleFile.length - 1 === index
          //     ? '100%'
          //     : '50%',
          flex: 1,

          // maxWidth: '50%',
          marginVertical: 8,
          marginHorizontal: 10,
          flexDirection: 'row',
        }}>
        <View style={{flexDirection: 'row', margin: 5}}>
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
          <TouchableOpacity
            onPress={() => {
              this.onDeleteByIndex(index);
              console.log(
                'delete array',
                JSON.stringify(this.state.multipleFile, null, 2),
              );
            }}>
            <Image
              style={{
                height: 25,
                width: 25,
                resizeMode: 'contain',
                marginLeft: -14,
                marginTop: -6,
                // position: 'absolute',
                // right: 0,
                // top: 0,
              }}
              source={require('../assets/pink_cross_circle.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    console.log('all service', this.state.all_service);

    console.log(
      'my doctument',
      JSON.stringify(this.state.multipleFile, null, 2),
    );
    console.log('my Userid', this.props.user_id);
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
              Ask Inquiry
            </Text>
          </View>
        </View>
        <ScrollView>
          {/* <View
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
           */}

          <Text
            style={{
              color: '#A3A3A3',
              fontSize: 12,
              marginHorizontal: 57,
              textAlign: 'center',
              marginTop: 47,
            }}>
            Asking an inquiry requires you to fill in this form. We will get
            back to you within 24 hours with confirmation
          </Text>

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
          <TouchableOpacity
            style={styles.edt_box}
            onPress={() => {
              this.props.navigation.navigate('SetDate');
            }}>
            {/* <DatePicker
              style={{}}
              date={this.state.selected_date} // Initial date from state
              mode="date" // The enum of date, datetime and time
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate="01-01-2020"
              maxDate="01-01-2025"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  //display: 'none',
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={date => {
                this.setState({selected_date: date});
              }}
            /> */}
            <Text style={{marginLeft: 20}}>
              Select time to book quote visit
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: '#3B3B3B',
              marginLeft: 24,
              marginTop: 24,
              fontSize: 16,
            }}>
            Select services you want
          </Text>

          {this.state.all_service.map((item, key) => {
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
                  containerStyle={{
                    backgroundColor: '#00000000',
                    borderColor: '#00000000',
                    marginVertical: -12,
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
                      source={require('../assets/unchecked_checkbox.png')}
                    />
                  }
                  iconType="font-awesome"
                  key={key}
                  checked={item.is_check}
                  onPress={() => {
                    this.onCheckChanged(item.id);
                    console.log('check change', this.state.all_service);
                    this.setState({
                      selected_checkbox_id: this.state.all_service.filter(
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
                {/* <CheckBox
                  // onCheckColor={'#EC4464'}
                  tintColors={{true: '#EC4464'}}
                  animationDuration={0.5}
                  style={{height: 16, width: 16, marginRight: 15}}
                  value={this.state.all_service}
                  onValueChange={newValue =>
                    this.setState({
                      ...newValue,
                      is_check: !this.state.is_check,
                    })
                  }></CheckBox>
                <Text
                  style={{
                    color: '#3B3B3B',
                    fontSize: 13,
                  }}>
                  {i.name}
                </Text> */}
              </View>
            );
          })}

          {/* <View
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
          </View> */}

          <TouchableOpacity onPress={() => this.selectMultipleFile()}>
            <ImageBackground
              style={{
                height: 40,
                marginTop: 15,
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              imageStyle={{resizeMode: 'stretch'}}
              source={require('../assets/pink_dot_boxx.png')}>
              <Text style={{color: '#F1748C', fontSize: 13}}>
                Upload photos or files
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <FlatGrid
            itemDimension={90}
            // numColumns={3}
            horizontal={false}
            spacing={10}
            data={this.state.multipleFile}
            renderItem={this.add_inq_item}
            keyExtractor={index => index.toString()}
          />
          {/* <FlatList
            // horizontal
            data={this.state.multipleFile}
            columnWrapperStyle={styles.row} // space them out evenly
            renderItem={this.add_inq_item}
            numColumns={3}
            style={{marginHorizontal: 24}}
            keyExtractor={index => index.toString()}></FlatList> */}

          <View
            style={{
              borderRadius: 10,
              marginHorizontal: 24,
              marginVertical: 24,
              borderColor: '#DFDFE2',
              borderWidth: 1,
              justifyContent: 'flex-start',
              height: 112,
            }}>
            <TextInput
              placeholder="Describe the work..."
              multiline={true}
              style={{
                margin: 12,

                alignSelf: 'flex-start',
              }}></TextInput>
          </View>

          <TouchableOpacity
            onPress={() => {
              this._add_inq();
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
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                Create Inquiry
              </Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
            <View
              style={{
                marginHorizontal: 24,
                borderColor: '#A3A3A3',
                borderWidth: 2,
                height: 60,
                borderRadius: 70,
                marginBottom: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{color: '#525252', fontSize: 16, fontWeight: 'bold'}}>
                Cancel Inquiry
              </Text>
            </View>
          </TouchableOpacity> */}
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          coverScreen
          hasBackdrop
          backdropOpacity={0.7}
          backdropColor="black"
          deviceWidth={Dimensions.get('screen').width}
          closeOnClick={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({
              modalVisible: !this.state.modalVisible,
            });
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({modalVisible: false});
            }}>
            <View style={{flex: 1}}>
              {/* {this.renderOptionList()} */}
              <SafeAreaView style={styles.modalView}>
                <Image
                  source={require('../assets/red_round_cross.png')}
                  style={{
                    height: 88,
                    width: 88,
                    alignSelf: 'center',
                    marginTop: 40,
                  }}></Image>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 24,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  Delete Inquiry
                </Text>
                <Text
                  style={{
                    color: 'gray',
                    opacity: 0.8,
                    fontSize: 12,
                    marginHorizontal: 72,
                    marginTop: 16,
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  By deleting your inquiry, we will cancel your whole plan and
                  information that you already input and it can’t be recovered
                </Text>
                <TouchableOpacity>
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
                      Confirm Delete
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({modalVisible: false})}>
                  <View
                    style={{
                      marginHorizontal: 24,
                      borderColor: '#A3A3A3',
                      borderWidth: 2,
                      height: 60,
                      width: '90%',
                      alignSelf: 'center',
                      borderRadius: 70,
                      marginBottom: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#525252',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      Cancel Delete
                    </Text>
                  </View>
                </TouchableOpacity>
              </SafeAreaView>
            </View>
          </TouchableWithoutFeedback>

          {/* <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>Hello World!</Text>
            <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={style.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View> */}
          {/* <MenuFunction modalVisible={this.state.modalVisible} /> */}
        </Modal>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  login_token: state.userDetails.login_token,
  user_id: state.userDetails.user_id,
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
    // justifyContent: 'space-around',
  },
  modalView: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: 350,
    height: 479,
    shadowColor: 'black',
    width: Dimensions.get('screen').width,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});
