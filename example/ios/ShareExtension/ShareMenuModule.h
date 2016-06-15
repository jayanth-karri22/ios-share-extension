//
////  ShareMenuModule.h
////  AwesomeProject
////
////  Created by Ahmed Nasser on 5/9/16.
////  Copyright © 2016 Facebook. All rights reserved.
////

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"
@interface ShareMenuModule : NSObject<RCTBridgeModule>
+(void) setShareMenuModule_itemProvider: (NSItemProvider*) itemProvider;
+(void) setContext: (NSExtensionContext*) context;
@end
