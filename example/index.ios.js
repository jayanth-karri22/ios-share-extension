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
  View,
  TouchableHighlight
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
    this.ShareExtension = NativeModules.ShareMenuModule;
    NativeModules.ShareMenuModule.getSharedText((text :string) => {
      if (text && text.length) {
        that.setState({ sharedText: text });
      }
    });
  }

  _invoke() {
    this.ShareExtension.invokeToTheHostApp();
  }

  render() {

    var text = this.state.sharedText;
 	  return (<View style={styles.container}>
      <Text style={styles.text}>Shared text: {text}</Text>
      <TouchableHighlight style={styles.button} onPress={this._invoke.bind(this)}>
        <Text>Close Extension</Text>
      </TouchableHighlight>
 	  </View>);

  }
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    justifyContent: 'center',
  }
});

AppRegistry.registerComponent('ExampleApp', () => ExampleApp);
