//
//  ShareViewController.m
//  ShareExtension
//
//  Created by Ahmed Nasser on 5/13/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "ShareViewController.h"
#import "RCTRootView.h"
#import "ShareMenuModule.h"
@interface ShareViewController ()

@end

@implementation ShareViewController

- (void) loadView
{
  NSURL *jsCodeLocation;

  NSExtensionItem *item = self.extensionContext.inputItems.firstObject;
  NSItemProvider *itemProvider = item.attachments.firstObject;
  [ShareMenuModule setShareMenuModule_itemProvider:itemProvider];

  jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"ExampleApp"
                                               initialProperties:nil
                                                   launchOptions:nil];
  self.view = rootView;
}

// animate (IN)
- (void)viewWillAppear:(BOOL)animated
{
  [super viewWillAppear:animated];

  self.view.transform = CGAffineTransformMakeTranslation(0, self.view.frame.size.height);
  [UIView animateWithDuration:0.25 animations:^
   {
     self.view.transform = CGAffineTransformIdentity;
   }];
}


@end
