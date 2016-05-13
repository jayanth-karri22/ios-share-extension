/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  NativeModules,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class ExampleApp extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      sharedText: null
    };
  }
  componentWillMount() {
    var that = this;
    NativeModules.ShareMenuModule.getSharedText((text :string) => {
      if (text && text.length) {
        that.setState({ sharedText: text });

      }
    })
  }

  
  render() {
    
    var text = this.state.sharedText;
 	return <Text style={styles.text}>Shared text: {text}</Text>;

  }
}

const styles = StyleSheet.create({
    text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  }
});

AppRegistry.registerComponent('ExampleApp', () => ExampleApp);
