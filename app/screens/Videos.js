'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
// import { RNCamera } from 'react-native-camera';

export default class BadInstagramCloneApp extends Component {


  state = {
    recording: false,
    processing: false
  }

  render() {
      const { recording, processing } = this.state;

      let button = (
        <TouchableOpacity
          onPress={this.startRecording.bind(this)}
          style={styles.capture}
        >
          <Text style={{ fontSize: 14 }}> RECORD </Text>
        </TouchableOpacity>
      );

      if (recording) {
        button = (
          <TouchableOpacity
            onPress={this.stopRecording.bind(this)}
            style={styles.capture}
          >
            <Text style={{ fontSize: 14 }}> STOP </Text>
          </TouchableOpacity>
        );
      }

      if (processing) {
        button = (
          <View style={styles.capture}>
            <ActivityIndicator animating size={18} />
          </View>
        );
      }

      return (
        <View style={styles.container}>

          <View
            style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
          >
            {button}
          </View>
        </View>
      );
  }

  async startRecording() {
      this.setState({ recording: true });
      // default to mp4 for android as codec is not set
      const { uri, codec = "mp4" } = await this.camera.recordAsync();
  }

  stopRecording() {
      this.camera.stopRecording();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});
