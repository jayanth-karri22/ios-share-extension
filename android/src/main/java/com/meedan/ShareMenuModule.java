package com.meedan;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import com.meedan.ShareMenuPackage;

import java.util.Map;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

public class ShareMenuModule extends ReactContextBaseJavaModule {

  public ShareMenuModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "ShareMenu";
  }

  @ReactMethod
  public void getSharedText(Callback successCallback) {
    Activity mActivity = getCurrentActivity();
    Intent intent = mActivity.getIntent();
    String action = intent.getAction();
    String type = intent.getType();

    if (Intent.ACTION_SEND.equals(action) && type != null) {
      if ("text/plain".equals(type)) {
        String input = intent.getStringExtra(Intent.EXTRA_TEXT);
        successCallback.invoke(input);
      }
      else if (type.startsWith("image/")) {
        Uri imageUri = (Uri) intent.getParcelableExtra(Intent.EXTRA_STREAM);
        successCallback.invoke(imageUri.toString());
      }
    }
  }

  @ReactMethod
  public void clearSharedText() {
    Activity mActivity = getCurrentActivity();
    Intent intent = mActivity.getIntent();
    String type = intent.getType();
    if ("text/plain".equals(type)) {
      intent.removeExtra(Intent.EXTRA_TEXT);
    } else if (type.startsWith("image/")) {
      intent.removeExtra(Intent.EXTRA_STREAM);
    }
  }
}
