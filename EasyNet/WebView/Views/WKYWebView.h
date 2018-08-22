//
//  WKYWebView.h
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/22.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import <WebKit/WebKit.h>
#import "MenuHelper.h"

@interface WKYWebView : WKWebView

@end

@interface WKYWebView(menu)<MenuHelperInterface>
-(void)menuHelperSearchInWeb;
@end
