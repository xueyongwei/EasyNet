//
//  ENWebView.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/16.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "ENWebView.h"

@implementation ENWebView
-(ENWebView*)initWithCoder:(NSCoder *)coder
{
    WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc]init];
    config.processPool = [[WKProcessPool alloc]init];
    [config.preferences setJavaScriptCanOpenWindowsAutomatically:false];
    config.preferences.javaScriptEnabled = true;
    [config setWebsiteDataStore:WKWebsiteDataStore.nonPersistentDataStore];
    ENWebView* instance = [super initWithFrame:CGRectZero configuration:config];
    
    return  instance;
}

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

@end
