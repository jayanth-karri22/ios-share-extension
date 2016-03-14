package ca.ios.ba;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import ca.ios.ba.ShareMenuPackage;

import java.util.Map;

public class ShareMenuModule extends ReactContextBaseJavaModule {
  private String inputText;

  public ShareMenuModule(ReactApplicationContext reactContext, String _inputText) {
    super(reactContext);
    this.inputText = _inputText;
  }

  @Override
  public String getName() {
    return "ShareMenu";
  }

  public String getInputText() {
    return inputText;
  }

  @ReactMethod
  public void getSharedText(Callback successCallback) {
    successCallback.invoke(getInputText());
    this.inputText = null;
  }
}
