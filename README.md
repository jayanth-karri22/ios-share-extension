# react-native-share-menu

Adds the application to the share menu of the device, so it can be launched from other apps and receive data from them.

## Installation

* Install the module

```bash
npm i --save react-native-share-menu
```

## Usage in Android

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

* In `android/app/src/main/AndroidManifest.xml`

```xml
<intent-filter>
   <action android:name="android.intent.action.SEND" />
   <category android:name="android.intent.category.DEFAULT" />
   <data android:mimeType="text/plain" />
</intent-filter>
```

* Register module (in MainActivity.java)

```java
import com.meedan.ShareMenuPackage;  // <--- import

public class MainActivity extends ReactActivity {
  ......
  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new ShareMenuPackage(this)  // <------ add here
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

## Credits

Sponsored and developed by [Meedan](http://meedan.com).
