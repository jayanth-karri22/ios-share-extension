*LOOKING FOR A VOLUNTEER TO MAINTAIN THE IOS VERSION, CURRENTLY UNMAINTAINED*

# react-native-share-menu

Adds the application to the share menu of the device, so it can be launched from other apps and receive data from them.

## Installation

* Install the module

```bash
npm i --save react-native-share-menu
```

## Usage in Android

### Automatic Installation (React Native 0.36+)

At the command line, in the project directory:

```bash
react-native link
```

### Manual Installation

* In `android/settings.gradle`

```gradle
...
include ':react-native-share-menu', ':app'
project(':react-native-share-menu').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-share-menu/android')
```

* In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':react-native-share-menu')
}
```

* In `android/app/src/main/AndroidManifest.xml` in the `<activity>` tag:

```xml
<intent-filter>
   <action android:name="android.intent.action.SEND" />
   <category android:name="android.intent.category.DEFAULT" />
   <data android:mimeType="text/plain" />
</intent-filter>
```

* Register module (in MainApplication.java)

```java
import com.meedan.ShareMenuPackage;  // <--- import

public class MainApplication extends Application implements ReactApplication {
  ......
  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new ShareMenuPackage()  // <------ add here
    );
  }
  ......

}
```

## Usage in iOS

In the share extension `loadView()` method, add:

```Objective-c
NSExtensionItem *item = self.extensionContext.inputItems.firstObject;
NSItemProvider *itemProvider = item.attachments.firstObject;
[ShareMenuModule setShareMenuModule_itemProvider:itemProvider];
[ShareMenuModule setContext: self.extensionContext];
```

## Example

```javascript
import React, {
  AppRegistry,
  Component,
  Text,
  View
} from 'react-native';
import ShareMenu from 'react-native-share-menu';

class Test extends Component {
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
      <View>
        <Text>Shared text: {text}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('Test', () => Test);
```

Or check the "example" directory for an example application.

## How it looks

<img src="https://raw.githubusercontent.com/caiosba/react-native-share-menu/master/screenshots/android-menu.png" width="47%"> <img src="https://raw.githubusercontent.com/caiosba/react-native-share-menu/master/screenshots/android-app.png" width="47%">

## Releasing a new version

`$ npm version <minor|major|patch> && npm publish`

## Credits

Sponsored and developed by [Meedan](http://meedan.com).
