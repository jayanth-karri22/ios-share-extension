//
//  ShareMenuModule.m
//  AwesomeProject
//
//  Created by Ahmed Nasser on 5/9/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "ShareMenuModule.h"
#import "RCTRootView.h"
#import <MobileCoreServices/MobileCoreServices.h>
#import <RCTLog.h>
@implementation ShareMenuModule
static NSItemProvider* ShareMenuModule_itemProvider;
static NSExtensionContext* extContext;

RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(getSharedText:(RCTResponseSenderBlock)callback)
{
  if ([ShareMenuModule_itemProvider hasItemConformingToTypeIdentifier:(NSString *)kUTTypeURL]) {
    [ShareMenuModule_itemProvider loadItemForTypeIdentifier:(NSString *)kUTTypeURL options:nil completionHandler:^(NSURL *url, NSError *error) {
      callback(@[url.absoluteString]);
    }];
  }

  // callback(@[[NSNull null], [[NSUserDefaults standardUserDefaults] objectForKey:@"self.url"]]);
}

RCT_EXPORT_METHOD(invokeToTheHostApp)
{
  
  [ extContext completeRequestReturningItems: @[] completionHandler: nil ];
}

+(void) setShareMenuModule_itemProvider: (NSItemProvider*) itemProvider
{
  ShareMenuModule_itemProvider = itemProvider;
}

+(void) setContext: (NSExtensionContext*) context
{
  extContext = context;
}
@end
