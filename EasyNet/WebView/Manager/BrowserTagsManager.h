//
//  BrowserTagsManager.h
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/16.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "WebBrowserViewController.h"

@protocol BrowserTagsManagerProtocol <NSObject>
-(void)disPlay:(UIViewController *)vc;
@end

@interface BrowserTagsManager : NSObject
@property (weak,nonatomic) id<BrowserTagsManagerProtocol> delegate;
/// 标签数组
@property (strong,nonatomic) NSMutableArray<WebBrowserViewController*> *tabs;
+(BrowserTagsManager*)shareInstance;
+(void)addNewTag:(WebBrowserViewController *)tag display:(BOOL)display;
+(void)showTabAt:(NSInteger)idx;
@end
