//
//  WKYWebView.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/22.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "WKYWebView.h"
#import <YYKit.h>
#import "BrowserTagsManager.h"

@implementation WKYWebView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/
- (BOOL)canPerformAction:(SEL)action withSender:(id)sender{
//
//    NSLog(@"%@",NSStringFromSelector(action));
//    
//    if (action == @selector(copy:)) {
//        return YES;
//    }
//    
//    if (action == @selector(menuHelperSearchInWeb)) {
//        return YES;
//    }
//    if (action == @selector(menuHelperFindInPage)) {
//        return NO;
//    }
//    if (action == @selector(menuHelperNewTagVisit)){
//        return YES;
//    }
    return NO;
}

-(BOOL)canBecomeFirstResponder{
    return  NO;
}

@end

@implementation WKYWebView(menu)
-(void)menuHelperFindInPage{
    
}
-(void)menuHelperSearchInWeb{
    [self getWebViewSelectionWithCompletion:^(NSString *result) {
        NSString *urlstr = [NSString stringWithFormat:@"https://m.baidu.com/s?word=%@",[result stringByURLEncode]];
        WebBrowserViewController *web = [BrowserTagsManager createNewBrowser];
        web.needLoadUrlStr = urlstr;
        [[BrowserTagsManager shareInstance].delegate disPlay:web];
    }];
}
-(void)menuHelperNewTagVisit{
    
}
- (void)getWebViewSelectionWithCompletion:(void(^)(NSString *result))completion{
    [self evaluateJavaScript:@"window.__zhongwu__.getSelection()" completionHandler:^(NSString *result, NSError *error){
        if (result.length > 0 && completion) {
            completion(result);
        }
    }];
}
@end
