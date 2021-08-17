import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableOpacityBase,
  PermissionsAndroid,
  Alert,
  Share,
} from 'react-native';
// import Pdf from 'react-native-pdf';
import {WebView} from 'react-native-webview';
import PDFView from 'react-native-view-pdf';
import RNFetchBlob from 'rn-fetch-blob';

class PreviewQuote extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  downloadFilee = () => {
    RNFetchBlob.config()
      .fetch('GET', this.pdf_url)
      .then(res => {
        Alert.alert('PDF Downloaded Successfully.');
      });
  };

  actualDownload = () => {
    const {dirs} = RNFetchBlob.fs;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `Lisana.pdf`,
        path: `${dirs.DownloadDir}/Lisana.pdf`,
      },
    })
      .fetch('GET', this.pdf_url, {})
      .then(res => {
        console.log('The file saved to ', res.path());
      })
      .catch(e => {
        console.log(e);
      });
  };

  requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        // {
        //   title: 'Storage Permission',
        //   message: 'Lisana App access to your Storage ',

        //   buttonNeutral: 'Ask Me Later',
        //   buttonNegative: 'Cancel',
        //   buttonPositive: 'OK',
        // },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.actualDownload();
        console.log('You can use the Storage');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  downloadFile = () => {
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.actualDownload();
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  resources = {
    file:
      Platform.OS === 'ios'
        ? 'downloadedDocument.pdf'
        : '/sdcard/Download/downloadedDocument.pdf',
    url: this.pdf_url,
    base64: 'JVBERi0xLjMKJcfs...',
  };
  pdf_url = [this.props.route.params.pdf].join()
    ? [this.props.route.params.pdf].join()
    : '';

  render() {
    const resourceType = 'url';
    // console.log(this.props.navigation.getParam('pdf', 'nothing sent'));
    const {pdf, otherParam} = this.props.route.params;
    console.log(this.pdf_url);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
              Preview Quote
            </Text>
          </View>
        </View>
        {this.pdf_url == '' ? (
          <View
            style={{
              flex: 1,
              marginHorizontal: 30,
              marginTop: -70,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/empty_gif.gif')}
              style={{height: 120, width: 120}}></Image>
            <Text style={{fontSize: 12, color: 'gray'}}>No PDF Found</Text>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <PDFView
              fadeInDuration={250.0}
              style={{flex: 1, marginHorizontal: 15}}
              resource={this.pdf_url}
              resourceType={resourceType}
              onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
              onError={error => console.log('Cannot render PDF', error)}
            />
          </View>
        )}

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: 50,
            width: Dimensions.get('screen').width,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginHorizontal: 80,
            }}>
            <TouchableOpacity
              //   onPress={() => this.sharePDFWithAndroid()}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../assets/share_red_icon.png')}
                style={{height: 20, width: 20}}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.requestPermission();
              }}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../assets/download_icon.png')}
                style={{height: 20, width: 20}}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default PreviewQuote;
