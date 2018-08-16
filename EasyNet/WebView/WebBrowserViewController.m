//
//  WebBrowserViewController.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/14.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "WebBrowserViewController.h"
#import "SearchViewController.h"
#import "TabMabager.h"
#import <WebKit/WebKit.h>
#import <YYKit.h>
@interface WebBrowserViewController ()
@property (weak, nonatomic) IBOutlet WKWebView *webView;

@property (weak, nonatomic) IBOutlet NSLayoutConstraint *headerHeightConst;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *headertitleTopConst;

@property (weak, nonatomic) IBOutlet UIProgressView *progressView;

@property (weak, nonatomic) IBOutlet UIBarButtonItem *backBtn;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *forwardBtn;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *tabsBtn;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *homeBtn;
@property (weak, nonatomic) IBOutlet UIButton *titleBtn;
@property (weak, nonatomic) IBOutlet UIView *searchHeaderView;




@end

@implementation WebBrowserViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [self customWebView];
    NSURL *url = [[NSURL alloc]initWithString:@"http://baidu.com"];
    NSURLRequest *request = [[NSURLRequest alloc] initWithURL:url];
    [self.webView loadRequest:request];
    
}

-(void)customWebView{
    
    self.webView.UIDelegate = [TabMabager shareInstance];
    self.webView.navigationDelegate = [TabMabager shareInstance];
    [self.webView.configuration setWebsiteDataStore:WKWebsiteDataStore.nonPersistentDataStore];
    
    [self addJS];
    
    self.edgesForExtendedLayout = UIRectEdgeNone;
    self.webView.scrollView.contentInset = UIEdgeInsetsMake(40, 0, 0, 0);
    [self.webView addObserver:self forKeyPath:@"estimatedProgress" options:NSKeyValueObservingOptionNew context:nil];
    [self.webView addObserver:self forKeyPath:@"URL" options:NSKeyValueObservingOptionNew context:nil];
    [self.webView addObserver:self forKeyPath:@"title" options:NSKeyValueObservingOptionNew context:nil];
    [self.webView addObserver:self forKeyPath:@"loading" options:NSKeyValueObservingOptionNew context:nil];
    [self.webView addObserver:self forKeyPath:@"canGoBack" options:NSKeyValueObservingOptionNew context:nil];
    [self.webView addObserver:self forKeyPath:@"canGoForward" options:NSKeyValueObservingOptionNew context:nil];
    [self.webView addObserver:self forKeyPath:@"contentSize" options:NSKeyValueObservingOptionNew context:nil];
    
}

-(void)addJS{
    NSString* path = [NSString stringWithFormat:@"%@/BrowserBundle.bundle/Contents/Resources/ContextMenu.js",NSBundle.mainBundle.resourcePath];
    NSError *error;
    NSString * source = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:&error];
    if (error != nil) {
        NSLog(@"JS资源文件读取失败！");
    }
   
    WKUserScript *userScript = [[WKUserScript alloc] initWithSource:source injectionTime:WKUserScriptInjectionTimeAtDocumentStart forMainFrameOnly:false];
    
    [self.webView.configuration.userContentController addUserScript:userScript];
    
    [self.webView.configuration.userContentController addScriptMessageHandler:TabMabager.shareInstance name:@"EN"];
    
}

-(void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context
{
    if (object == self.webView){
        NSString *newStr = change[NSKeyValueChangeNewKey];
        if ([keyPath isEqualToString:@"estimatedProgress"]){
            CGFloat progress = newStr.floatValue;
            
            NSLog(@"%f",progress);
            if (progress < 0.11){
                //处理goback导致的进度条动。
                return;
            }
            if(progress > self.progressView.progress){
                if (progress - self.progressView.progress > 0.7){
                    self.progressView.progress = progress;
                }else{
                    [self.progressView setProgress:progress animated:true];
                }
            }else{
                self.progressView.progress = progress;
            }
        }else if ([keyPath isEqualToString:@"URL"]){
            
        }else if ([keyPath isEqualToString:@"title"]){
            [self.titleBtn setTitle:newStr forState:UIControlStateNormal];
        }else if ([keyPath isEqualToString:@"loading"]){
            
            [self.forwardBtn setTitle:newStr.integerValue == 1? @"X" : @">"];
        }else if ([keyPath isEqualToString:@"canGoBack"]){
            [self.backBtn setEnabled:newStr.integerValue == 1];
        }else if ([keyPath isEqualToString:@"canGoForward"]){
            [self.forwardBtn setEnabled:newStr.integerValue == 1];
        }else if ([keyPath isEqualToString:@"contentSize"]){
            
        }
        
    }
}

-(void)viewSafeAreaInsetsDidChange
{
    [super viewSafeAreaInsetsDidChange];
    self.headerHeightConst.constant = self.view.safeAreaInsets.top + 44;
    self.headertitleTopConst.constant = self.view.safeAreaInsets.top -1;
}

-(void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:animated];
    [self.navigationController setNavigationBarHidden:true animated:animated];
}

-(void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    if ([segue.identifier isEqualToString:@"searchVC"]){
        SearchViewController *svc = (SearchViewController*)segue.destinationViewController;
        svc.searchBarSourceView = self.searchHeaderView;
        svc.delegate = self;
        svc.currentKeyword = self.webView.URL.absoluteString;
    }
}




- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - 按钮点击事件

- (IBAction)onBackClick:(UIBarButtonItem *)sender {
    [self.webView goBack];
}
- (IBAction)onFrowardClick:(UIBarButtonItem *)sender {
    [self.webView goForward];
}
- (IBAction)onHomeClick:(UIBarButtonItem *)sender {
    NSURL *url = [[NSURL alloc]initWithString:@"http://baidu.com"];
    NSURLRequest *request = [[NSURLRequest alloc] initWithURL:url];
    [self.webView loadRequest:request];
}


@end


//MARK: - SearchViewControllerProtocol
@implementation WebBrowserViewController(SearchViewControllerProtocol)

- (void)shouldVisit:(NSURL *)url {
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [self.webView loadRequest:request];

//    url = [[NSURL alloc]initWithString:@"http://baidu.com"];
//    NSURLRequest *request = [[NSURLRequest alloc] initWithURL:url];
//    [self.webView loadRequest:request];
}

@end
