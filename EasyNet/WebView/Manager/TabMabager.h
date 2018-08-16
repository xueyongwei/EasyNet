//
//  TabMabager.h
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/15.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <WebKit/WebKit.h>

/// 处理webView的各种代理方法
@interface TabMabager : NSObject <WKNavigationDelegate, WKUIDelegate,WKScriptMessageHandler>
/// 一个实例
+ (TabMabager*)shareInstance;

@end
