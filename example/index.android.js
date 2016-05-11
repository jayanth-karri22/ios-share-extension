/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ShareMenu from 'react-native-share-menu';

class ExampleApp extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      sharedText: null
    };
  }

  componentWillMount() {
    var that = this;
    ShareMenu.getSharedText((text :string) => {
      if (text && text.length) {
        that.setState({ sharedText: text });
      }
    })
  }

  render() {
    var text = this.state.sharedText;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          React Native Share Menu
        </Text>
        <Text style={styles.instructions}>
          Shared text: {text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ExampleApp', () => ExampleApp);
