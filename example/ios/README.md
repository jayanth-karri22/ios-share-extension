## How to use the module 

1- Create new react native project 
Open terminal and write `react-native init ExampleApp`

2- Init the share extension target
a) From Project Settings, add new share extension target
<img src="https://raw.githubusercontent.com/meedan/react-native-share-menu/master/example/ios/screenshots/step2_1.png" width="90%">
<img src="https://raw.githubusercontent.com/meedan/react-native-share-menu/master/example/ios/screenshots/step2_2.png" width="90%">
<img src="https://raw.githubusercontent.com/meedan/react-native-share-menu/master/example/ios/screenshots/step2_3.png" width="90%">
b) From `ShareViewController.h`: Remove  `: SLComposeServiceViewController` and replace it with `: UIViewController`

c) Remove the content of `ShareViewController.m` and add the implementation of `loadView` method 
You can get the content of the loadView from the `AppDelegate`
```objc
#import "RCTRootView.h"
```
```objc
- (void) loadView
{
NSURL *jsCodeLocation;

jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];

RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
moduleName:@"ExampleApp"
initialProperties:nil
launchOptions:nil];
self.view = rootView;
}
```

d) Run!
Choose the share extension target, then open with Safari
<img src="https://raw.githubusercontent.com/meedan/react-native-share-menu/master/example/ios/screenshots/step_run.png" width="90%">

You may get the following error
```
Undefined symbols for architecture x86_64:
"_OBJC_CLASS_$_RCTRootView", referenced from:
objc-class-ref in ShareViewController.o
ld: symbol(s) not found for architecture x86_64
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```
Open ShareExtension target and add the missed linked frameworks and libraries 
<img src="https://raw.githubusercontent.com/meedan/react-native-share-menu/master/example/ios/screenshots/step_linker.png" width="90%">


You may get the following error 
```App Transport Security has blocked a cleartext HTTP (http://) resource load since it is insecure. Temporary exceptions can be configured via your app's Info.plist file.```

You may get the following error
```-[RCTRootView reactTag]: unrecognized selector sent to instance 0x7f8900d35510```
Open ShareExtension target settings >> Build Settings: Add `-ObjC` to `Other linker flags`

3- Using ShareMenuModule
Download and add `ShareMenuModule.h` and `ShareMenuModule.m`
In the share extension `loadView` method, add:
```  NSExtensionItem *item = self.extensionContext.inputItems.firstObject;
NSItemProvider *itemProvider = item.attachments.firstObject;
[ShareMenuModule setShareMenuModule_itemProvider:itemProvider];```
c) From `index.js.ios`
You can get the shared url using 
```
NativeModules.ShareMenuModule.getSharedText((text :string) => {
if (text && text.length) {
that.setState({ sharedText: text });

}
})
```
An Example of `index.js.ios` would be

```
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
```
## How it looks

<img src="https://raw.githubusercontent.com/caiosba/react-native-share-menu/master/screenshots/iOS_menu.png" width="47%"> <img src="https://raw.githubusercontent.com/caiosba/react-native-share-menu/master/screenshots/iOS_view.png" width="47%">
