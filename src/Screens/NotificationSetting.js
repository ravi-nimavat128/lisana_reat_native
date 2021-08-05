import React, {Component} from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from 'react-native';

export class NotificationSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_message: false,
      new_quote: false,
      new_invitation: false,
      reminder: false,
      job_update: false,
      job_finished: false,
    };
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
              Notification Settings
            </Text>
          </View>
        </View>

        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 40,
              marginHorizontal: 24,
              alignItems: 'center',
            }}>
            <Text style={styles.txt}>New Message</Text>
            <ToggleSwitch
              isOn={this.state.new_message}
              onColor="#EC4464"
              offColor="#A3A3A3"
              //   label="Example label"
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="large"
              onToggle={isOn =>
                this.setState({new_message: !this.state.new_message})
              }
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 48,
              justifyContent: 'space-between',
              marginHorizontal: 24,
              alignItems: 'center',
            }}>
            <Text style={styles.txt}>New Quote</Text>
            <ToggleSwitch
              isOn={this.state.new_quote}
              onColor="#EC4464"
              offColor="#A3A3A3"
              //   label="Example label"
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="miduam"
              onToggle={isOn =>
                this.setState({new_quote: !this.state.new_quote})
              }
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 48,
              justifyContent: 'space-between',
              marginHorizontal: 24,
              alignItems: 'center',
            }}>
            <Text style={styles.txt}>New Invitation</Text>
            <ToggleSwitch
              isOn={this.state.new_invitation}
              onColor="#EC4464"
              offColor="#A3A3A3"
              //   label="Example label"
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="small"
              onToggle={isOn =>
                this.setState({new_invitation: !this.state.new_invitation})
              }
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 48,
              justifyContent: 'space-between',
              marginHorizontal: 24,
              alignItems: 'center',
            }}>
            <Text style={styles.txt}>Reminder</Text>
            <ToggleSwitch
              isOn={this.state.reminder}
              onColor="#EC4464"
              offColor="#A3A3A3"
              //   label="Example label"
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="large"
              onToggle={isOn => this.setState({reminder: !this.state.reminder})}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 48,
              justifyContent: 'space-between',
              marginHorizontal: 24,
              alignItems: 'center',
            }}>
            <Text style={styles.txt}>Job Update</Text>
            <ToggleSwitch
              isOn={this.state.job_update}
              onColor="#EC4464"
              offColor="#A3A3A3"
              //   label="Example label"
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="large"
              onToggle={isOn =>
                this.setState({job_update: !this.state.job_update})
              }
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 48,
              justifyContent: 'space-between',
              marginHorizontal: 24,
              alignItems: 'center',
            }}>
            <Text style={styles.txt}>Job Finished</Text>
            <ToggleSwitch
              isOn={this.state.job_finished}
              onColor="#EC4464"
              offColor="#A3A3A3"
              //   label="Example label"
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="large"
              onToggle={isOn =>
                this.setState({job_finished: !this.state.job_finished})
              }
            />
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
                Save Changes
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
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
                Discard Changes
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default NotificationSetting;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 25,
    alignItems: 'center',
    marginBottom: 35,
  },
  txt: {
    fontSize: 14,
    color: '#1F1F1F',
  },
});
