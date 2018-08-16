//
//  TabMabager.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/15.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "TabMabager.h"
#import "UIAlertController+Blocks.h"

@implementation TabMabager
{
    NSArray * allImagesUrl;
}

+ (TabMabager*)shareInstance{
    static dispatch_once_t onceToken;
    static TabMabager *manager = nil;
    dispatch_once(&onceToken, ^{
        manager = [[TabMabager alloc] init];
    });
    return manager;
}

//MARK: - WKNavigationDelegate
// 这里设置为不支持网页主动打开多标签
-(WKWebView *)webView:(WKWebView *)webView createWebViewWithConfiguration:(WKWebViewConfiguration *)configuration forNavigationAction:(WKNavigationAction *)navigationAction windowFeatures:(WKWindowFeatures *)windowFeatures
{
    [webView loadRequest:navigationAction.request];
    return  nil;
}

-(void)webView:(WKWebView *)webView didCommitNavigation:(WKNavigation *)navigation{
    NSLog(@"didCommitNavigation");
}

-(void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler{
    NSString *urlStr = webView.URL.absoluteString;
    
    if ([urlStr hasPrefix:@"https://itunes.apple.com/"] && [urlStr containsString:@"app"]){
        [UIAlertController showAlertInViewController:UIApplication.sharedApplication.keyWindow.rootViewController withTitle:@"是否允许打开AppStore？" message:@"简单上网提醒您：如果不是您主动点击，请勿前往。" cancelButtonTitle:@"取消" destructiveButtonTitle:@"前往AppStore" otherButtonTitles:nil tapBlock:^(UIAlertController * _Nonnull controller, UIAlertAction * _Nonnull action, NSInteger buttonIndex) {
            if (buttonIndex == 0) {
                decisionHandler(WKNavigationActionPolicyCancel);
            }else{
                decisionHandler(WKNavigationActionPolicyAllow);
            }
        }];
    }else{
        decisionHandler(WKNavigationActionPolicyAllow);
    }
    
}

-(void)webView:(WKWebView *)webView runJavaScriptAlertPanelWithMessage:(NSString *)message initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(void))completionHandler{
    NSString* msg = [NSString stringWithFormat:@"简单上网提示您：弹窗来自网页%@",webView.URL.host];
    [UIAlertController showAlertInViewController:[UIApplication sharedApplication].keyWindow.rootViewController withTitle:message message:msg cancelButtonTitle:@"知道了" destructiveButtonTitle:nil otherButtonTitles:nil tapBlock:^(UIAlertController * _Nonnull controller, UIAlertAction * _Nonnull action, NSInteger buttonIndex) {
        completionHandler();
    }];
    
    
}
-(void)webView:(WKWebView *)webView runJavaScriptConfirmPanelWithMessage:(NSString *)message initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(BOOL))completionHandler{
    NSString* msg = [NSString stringWithFormat:@"简单上网提示您：询问来自网页%@",webView.URL.host];
    [UIAlertController showAlertInViewController:[UIApplication sharedApplication].keyWindow.rootViewController withTitle:message message:msg cancelButtonTitle:@"取消" destructiveButtonTitle:nil otherButtonTitles:@[@"确定"] tapBlock:^(UIAlertController * _Nonnull controller, UIAlertAction * _Nonnull action, NSInteger buttonIndex) {
        completionHandler(buttonIndex == 1);
    }];
}
-(void)webView:(WKWebView *)webView runJavaScriptTextInputPanelWithPrompt:(NSString *)prompt defaultText:(NSString *)defaultText initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(NSString * _Nullable))completionHandler{
    
    NSString* msg = [NSString stringWithFormat:@"简单上网提示您：请求来自网页%@",webView.URL.host];
    UIAlertController *alv = [UIAlertController alertControllerWithTitle:prompt message:msg preferredStyle:UIAlertControllerStyleAlert];
    __block UITextField *input ;
    [alv addTextFieldWithConfigurationHandler:^(UITextField * _Nonnull textField) {
        textField.text = defaultText;
        input = textField;
    }];
    
    UIAlertAction *ok = [UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        completionHandler(input.text);
    }];
    [alv addAction:ok];
    
    UIAlertAction *cancale = [UIAlertAction actionWithTitle:@"" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
        completionHandler(nil);
    }];
    [alv addAction:cancale];
    
    [UIApplication.sharedApplication.keyWindow.rootViewController presentViewController:alv animated:true completion:nil];
}





@end
