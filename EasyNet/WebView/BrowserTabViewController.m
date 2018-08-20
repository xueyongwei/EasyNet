//
//  BrowserTabViewController.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/15.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "BrowserTabViewController.h"
#import <WebKit/WebKit.h>
#import "TabWebviewDelegate.h"
@interface BrowserTabViewController ()

/// 无痕配置
@property (nonatomic,strong)WKWebViewConfiguration *privateConfiguration;

@property (nonatomic,strong)WKWebView *webview;

@end

@implementation BrowserTabViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self customWebView];
    // Do any additional setup after loading the view.
}

-(void)customWebView{
    [self.view addSubview:self.webview];
    [[self.webview.topAnchor constraintEqualToAnchor:self.view.topAnchor constant:0] setActive:true];
    [[self.webview.bottomAnchor constraintEqualToAnchor:self.view.bottomAnchor constant:0] setActive:true];
    [[self.webview.leftAnchor constraintEqualToAnchor:self.view.leftAnchor constant:0] setActive:true];
    [[self.webview.rightAnchor constraintEqualToAnchor:self.view.rightAnchor constant:0] setActive:true];
    
    
}
-(WKWebViewConfiguration *)privateConfiguration{
    if(_privateConfiguration == nil){
        WKWebViewConfiguration *configuration = [[WKWebViewConfiguration alloc] init];
        configuration.processPool = [[WKProcessPool alloc] init];
        configuration.preferences.javaScriptCanOpenWindowsAutomatically = false;
        configuration.websiteDataStore = WKWebsiteDataStore.nonPersistentDataStore;
        configuration.userContentController = [[WKUserContentController alloc] init];
        _privateConfiguration = configuration;
    }
    return _privateConfiguration;
}

-(WKWebView *)webview{
    if (_webview == nil){
        
        NSString* path = [NSString stringWithFormat:@"%@/BrowserBundle.bundle/Contents/Resources/ContextMenu.js",NSBundle.mainBundle.resourcePath];
        NSError *error;
        NSString * source = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:&error];
        if (error != nil) {
            NSLog(@"JS资源文件读取失败！");
        }
        
        WKUserScript *userScript = [[WKUserScript alloc] initWithSource:source injectionTime:WKUserScriptInjectionTimeAtDocumentStart forMainFrameOnly:false];
        [self.privateConfiguration.userContentController addUserScript:userScript];
        
        [self.privateConfiguration.userContentController addScriptMessageHandler:TabWebviewDelegate.shareInstance name:@"EN"];
        
        WKWebView *webview = [[WKWebView alloc] initWithFrame:CGRectZero configuration:self.privateConfiguration];
        webview.accessibilityLabel = NSLocalizedString(@"Web content", comment: @"Accessibility label for the main web content view");
        webview.allowsBackForwardNavigationGestures = true;
        webview.scrollView.layer.masksToBounds = true;
        webview.navigationDelegate = TabWebviewDelegate.shareInstance;
        webview.UIDelegate = TabWebviewDelegate.shareInstance;
        webview.scrollView.backgroundColor = [UIColor clearColor];
        webview.scrollView.delegate = self;
        webview.backgroundColor = [UIColor whiteColor];
        //    要区分打开H5是在本地APP还是在手机浏览器，前端伙伴说需要配合修改默认的 UserAgent,以便区分。
        //    修改全局UserAgent值（这里是在原有基础上拼接自定义的字符串）
        [webview evaluateJavaScript:@"navigator.userAgent" completionHandler:^(id result, NSError *error) {
            NSString *userAgent = result;
            NSString *newUserAgent = [userAgent stringByAppendingString:@" ios/easynet/1.2.3"];
      
            NSDictionary *dictionary = [NSDictionary dictionaryWithObjectsAndKeys:newUserAgent, @"UserAgent", nil];
            [[NSUserDefaults standardUserDefaults] registerDefaults:dictionary];
            [[NSUserDefaults standardUserDefaults] synchronize];
            
            [webview setCustomUserAgent:newUserAgent];
        }];
        
    }
    return  _webview;
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
