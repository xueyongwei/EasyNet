//
//  WebBrowserViewController.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/14.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "WebBrowserViewController.h"
#import "SearchViewController.h"
#import "TabWebviewDelegate.h"
#import <WebKit/WebKit.h>
#import <YYKit.h>
#import "LinkElement.h"
#import "MBProgressHUD+Utility.h"
#import <Photos/Photos.h>
#import "UIAlertController+Blocks.h"
#import "UIImage+SavingData.h"
#import "BrowserTagsManager.h"
#import "Preference.h"
#import "BrowserTabsListViewController.h"
#import "WKYWebView.h"

@interface WebBrowserViewController ()



@property (weak, nonatomic) IBOutlet NSLayoutConstraint *headerHeightConst;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *headertitleTopConst;
@property (weak, nonatomic) IBOutlet UIVisualEffectView *topView;
@property (weak, nonatomic) IBOutlet UIToolbar *toolBar;

@property (weak, nonatomic) IBOutlet UIProgressView *progressView;

@property (weak, nonatomic) IBOutlet UIBarButtonItem *backBtn;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *forwardBtn;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *tabsBtn;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *homeBtn;
@property (weak, nonatomic) IBOutlet UIButton *titleBtn;
@property (weak, nonatomic) IBOutlet UIView *searchHeaderView;
@property (strong,nonatomic) UILongPressGestureRecognizer *longPress;

@property (nonatomic,strong)LinkElement* element;

@end

@implementation WebBrowserViewController
{
    NSArray* allImagesUrl;
}

-(WKWebView *)webView{
    if (!_webView){
        WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc]init];
        config.processPool = [[WKProcessPool alloc]init];
        [config.preferences setJavaScriptCanOpenWindowsAutomatically:false];
        config.preferences.javaScriptEnabled = true;
        
        [config setWebsiteDataStore:WKWebsiteDataStore.nonPersistentDataStore];
        
        WKWebView *webview = [[WKYWebView alloc] initWithFrame:CGRectZero configuration:config];
        webview.allowsBackForwardNavigationGestures = true;
//        webview.alignmentRectInsets
        _webView = webview;
    }
    return _webView;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [self customWebView];
    
    NSString *loadUrlStr = @"http://baidu.com";
    if (self.needLoadUrlStr.length > 0){
        loadUrlStr = self.needLoadUrlStr;
    }
    NSURL *url = [[NSURL alloc]initWithString:loadUrlStr];
    NSURLRequest *request = [[NSURLRequest alloc] initWithURL:url];
    [self.webView loadRequest:request];
    
}

-(void)customWebView{
    [self.view insertSubview:self.webView atIndex:0];
//    self.webView.frame = CGRectMake(0, 0, YYScreenSize().width, YYScreenSize().height);
    self.automaticallyAdjustsScrollViewInsets = true;
    self.webView.translatesAutoresizingMaskIntoConstraints = false;
    
    [self.webView.topAnchor    constraintEqualToAnchor: self.topView.bottomAnchor    constant:0].active = true;
    [self.webView.bottomAnchor constraintEqualToAnchor: self.toolBar.topAnchor constant:0].active = true;;
    [self.webView.leftAnchor   constraintEqualToAnchor: self.view.leftAnchor   constant:0].active = true;;
    [self.webView.rightAnchor  constraintEqualToAnchor: self.view.rightAnchor  constant:0].active = true;;
    
    self.webView.UIDelegate = [TabWebviewDelegate shareInstance];
    self.webView.navigationDelegate = [TabWebviewDelegate shareInstance];
    
    [self addJS];
    
    
    if (@available(iOS 11.0, *)) {
        self.webView.scrollView.contentInsetAdjustmentBehavior = UIScrollViewContentInsetAdjustmentNever;
    } else {
        self.edgesForExtendedLayout = UIRectEdgeNone;
    }
//    self.webView.scrollView.contentInset = UIEdgeInsetsMake(0, 0, 40, 0);
    [self.webView addObserver:self forKeyPath:@"estimatedProgress" options:NSKeyValueObservingOptionNew context:nil];
    [self.webView addObserver:self forKeyPath:@"URL" options:NSKeyValueObservingOptionNew context:nil];
    [self.webView addObserver:self forKeyPath:@"title" options:NSKeyValueObservingOptionNew context:nil];
    [self.webView addObserver:self forKeyPath:@"loading" options:NSKeyValueObservingOptionNew context:nil];
    [self.webView addObserver:self forKeyPath:@"canGoBack" options:NSKeyValueObservingOptionNew context:nil];
    [self.webView addObserver:self forKeyPath:@"canGoForward" options:NSKeyValueObservingOptionNew context:nil];
    [self.webView addObserver:self forKeyPath:@"contentSize" options:NSKeyValueObservingOptionNew context:nil];
    
    // 添加长按手势
    
    UILongPressGestureRecognizer *longPress = [[UILongPressGestureRecognizer alloc]init];
    [self.webView addGestureRecognizer:longPress];
    self.longPress = longPress;
}

-(void)addJS{
    NSString* path = [[NSBundle mainBundle] pathForResource:@"ContextMenu" ofType:@"js"];
//    [NSString stringWithFormat:@"%@/BrowserBundle.bundle/Contents/Resources/ContextMenu.js",NSBundle.mainBundle.resourcePath];
    
    NSError *error;
    NSString * source = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:&error];
    if (error != nil) {
        NSLog(@"JS资源文件读取失败！");
    }
    source = [NSString stringWithFormat:@"%@;document.documentElement.style.webkitTouchCallout='none';",source];
    
    // 网页内容选择
    NSString *findInPagePath = [[NSBundle mainBundle] pathForResource:@"FindInPage" ofType:@"js"];
    NSString * findInPageSource = [NSString stringWithContentsOfFile:findInPagePath encoding:NSUTF8StringEncoding error:&error];
    source = [source stringByAppendingString:findInPageSource];
    // 屏蔽百度搜索结果广告
    NSString *baiduADBlockPath = [[NSBundle mainBundle] pathForResource:@"BaiduADBlock" ofType:@"js"];
    NSString * baiduSource = [NSString stringWithContentsOfFile:baiduADBlockPath encoding:NSUTF8StringEncoding error:&error];
    if (error != nil) {
        NSLog(@"baiduSource JS资源文件读取失败！");
    }
    source = [source stringByAppendingString:baiduSource];
    
    WKUserScript *userScript = [[WKUserScript alloc] initWithSource:source injectionTime:WKUserScriptInjectionTimeAtDocumentStart forMainFrameOnly:false];
    
    [self.webView.configuration.userContentController addUserScript:userScript];
//    // 2.去掉页面标题
//
//    NSString *removeHeaderBack = @"var header = document.getElementsByTagName(\"header\")[0];header.parentNode.removeChild(header);";
//    WKUserScript *removeHeaderBackScript = [[WKUserScript alloc] initWithSource:removeHeaderBack injectionTime:WKUserScriptInjectionTimeAtDocumentEnd forMainFrameOnly:false];
//    [self.webView.configuration.userContentController addUserScript:removeHeaderBackScript];
    
    [self.webView.configuration.userContentController addScriptMessageHandler:self name:@"OOFJS"];
    
}

-(void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context
{
    if (object == self.webView){
        NSString *newStr = change[NSKeyValueChangeNewKey];
        if ([keyPath isEqualToString:@"estimatedProgress"]){
            CGFloat progress = newStr.floatValue;
            
            NSLog(@"%f",progress);
            
//            if (progress < 0.11){
//                //处理goback导致的进度条动。
//                return;
//            }
            if(progress > self.progressView.progress){
                if (progress - self.progressView.progress > 0.7){
                    self.progressView.progress = progress;
                }else{
                    [self.progressView setProgress:progress animated:true];
                }
            }else{
                self.progressView.progress = progress;
            }
            
            self.progressView.hidden = (progress > 0.99);
        }else if ([keyPath isEqualToString:@"URL"]){
            
            if ([newStr isKindOfClass:[NSURL class]]){
                NSURL *url = (NSURL *)newStr;
                [self.titleBtn setTitle:url.host forState:UIControlStateNormal];
            }
            
//            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//                [self.webView evaluateJavaScript:@"document.title" completionHandler:^(id _Nullable jsstr, NSError * _Nullable error) {
//                    [self.titleBtn setTitle:jsstr forState:UIControlStateNormal];
//                }];
//            });

        }else if ([keyPath isEqualToString:@"title"]){
            NSString *t = [NSString stringWithFormat:@"%@-%@",newStr,self.webView.URL.host];
            [self.titleBtn setTitle:t forState:UIControlStateNormal];
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
//    self.webView.scrollView.contentInset = UIEdgeInsetsMake(self.view.safeAreaInsets.top + 44, 0, self.view.safeAreaInsets.bottom + 40, 0);
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
        
    }else if ([segue.identifier isEqualToString:@"BrowserTabsListViewController"]){
        NSInteger idx = [[BrowserTagsManager shareInstance].tabs indexOfObject:self];
        [self updateThumbImage];
        
        BrowserTabsListViewController *tag = (BrowserTabsListViewController*)segue.destinationViewController;
        tag.showFromIndex = idx;
        
    }
}


/// 更新缩略图
-(void)updateThumbImage{
    self.thumbImage = [self.webView snapshotImage];
}

-(void)viewDidLayoutSubviews{
    [super viewDidLayoutSubviews];
    [Preference shared].webViewFrame = self.webView.frame;
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
-(BOOL)canBecomeFirstResponder
{
    return YES;
}
-(void)copy:(id)sender{
    [self getWebViewSelectionWithCompletion:^(NSString *result) {
        UIPasteboard *psd = [UIPasteboard generalPasteboard];
        psd.string = result;
        [MBProgressHUD showSuccessImage:@"已复制"];
    }];
}
- (BOOL)canPerformAction:(SEL)action withSender:(id)sender{
    
    NSLog(@"%@",NSStringFromSelector(action));
    
    if (action == @selector(copy:)) {
        return YES;
    }
    
    if (action == @selector(menuHelperSearchInWeb:)) {
        return YES;
    }
    if (action == @selector(menuHelperFindInPage)) {
        return NO;
    }
    if (action == @selector(menuHelperNewTagVisit)){
        return NO;
    }
    return NO;
}
-(void)menuHelperFindInPage{
    
}
-(void)menuHelperSearchInWeb:(UIMenuController*)sender{
//    [self copy:sender];
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
    [self.webView evaluateJavaScript:@"window.getSelection().toString();" completionHandler:^(id result, NSError * _Nullable error) {
        NSLog(@"res:%@",result);
    }];
    
    [self.webView evaluateJavaScript:@"window.__zhongwu__.getSelection();" completionHandler:^(NSString *result, NSError *error){
        NSLog(@"res3:%@",result);
        if (result.length > 0 && completion) {
            completion(result);
        }
    }];
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

//MARK: - UIGestureRecognizerDelegate
@implementation WebBrowserViewController(UIGestureRecognizerDelegate)

-(BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer *)otherGestureRecognizer{
    return  true;
}
-(BOOL) gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldBeRequiredToFailByGestureRecognizer:(UIGestureRecognizer *)otherGestureRecognizer{
    
    return [otherGestureRecognizer isKindOfClass:[UILongPressGestureRecognizer class]] && [otherGestureRecognizer.delegate.description containsString:@"WKContentView"];
}
-(BOOL)gestureRecognizerShouldBegin:(UIGestureRecognizer *)gestureRecognizer
{
    return !UIAccessibilityIsVoiceOverRunning();
}

@end
//MARK: - WKScriptMessageHandler
@implementation WebBrowserViewController(WKScriptMessageHandler)
//MARK: - WKScriptMessageHandler
-(void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message
{
    [self handleLongPress:message.body];
    
    NSDictionary *dic = (NSDictionary* )message.body;
    NSString *fun = dic[@"fun"];
    NSObject *obj = dic[@"arg"];
    if([fun isEqualToString:@"getPicBrowserArray"]){
        NSArray *arg = (NSArray *)obj;
        [self getPicBrowserArray:arg[0]];
    }else if([fun isEqualToString:@"userSelection"]){
        NSLog(@"userSelection");
    }

}

-(void)handleLongPress:(NSDictionary *)data {
    
    NSURL* linkURL = nil;
    NSString *urlString = data[@"link"];
    if (urlString.length > 0){
        linkURL = [[NSURL alloc] initWithString:urlString];
    }
    
    NSURL *imageURL = nil;
    NSString *imageUrlString = data[@"image"];
    if (imageUrlString.length > 0){
        imageURL = [[NSURL alloc] initWithString:imageUrlString];
    }
    
    NSString *linkText = nil;
    NSString *linkTextTemp = data[@"linkText"];
    if (linkTextTemp.length > 0){
        linkText = linkTextTemp;
    }
    
    if (imageURL || linkURL) {
        LinkElement *element = [LinkElement elementWith:linkURL image:imageURL imageUrls:allImagesUrl linkText:linkText];
        self.element = element;
        [self actionSheetElement];
    }
    
    //    if let urlString = data["link"] as? String {
    //        //            print("urlString: \(urlString)")
    //        linkURL = URL(string: urlString.addingPercentEncoding(withAllowedCharacters: CharacterSet.URLAllowedCharacterSet())!)
    //    }
    //
    //    var imageURL: URL?
    //    if let urlString = data["image"] as? String {
    //        //            print("urlString: \(urlString)")
    //        imageURL = URL(string: urlString.addingPercentEncoding(withAllowedCharacters: CharacterSet.URLAllowedCharacterSet())!)
    //    }
    
    //    var linkText: String = ""
    //    if let linkTextTemp = data["linkText"] as? String{
    //        linkText = linkTextTemp
    //    }
    //
    //    var strCookie = ""
    //    if let strck = data["cookie"] as? String {
    //        strCookie = strck
    //    }
    
    //    if linkURL != nil || imageURL != nil {
    //        let elements =  YYWContextMenuHelp.Elements(link: linkURL, image: imageURL, imageUrls: self.allImagesUrl, linkText: linkText)
    //        self.contextMenuHelper.contextMenuHelper(elements, cookie:strCookie, gestureRecognizer: MainViewFacade.sharedInstance.currentPageView().tabWebView!.gestureRecognizer)
    //
    //    }
}

-(void)actionSheetElement{
    
//    CGPoint touchPoint = [self.longPress locationInView:self.view];
//     当网页无效时（比如跳转前长按链接），会返回（0，0）
//    if (CGPointEqualToPoint(touchPoint, CGPointZero)){
//        return;
//    }
    UIAlertController *actionSheetController = [UIAlertController alertControllerWithTitle:nil message:nil preferredStyle:UIAlertControllerStyleActionSheet];
    
    NSString *dialogTitle = nil;
    LinkElement *element = self.element;
    NSString* linkText = [element.linkText stringByReplacingOccurrencesOfString:@" " withString:@""];
    linkText = [linkText stringByReplacingOccurrencesOfString:@"\n" withString:@""];
    linkText = [linkText stringByReplacingOccurrencesOfString:@"\t" withString:@""];
    if (element.link && element.image){
        dialogTitle = element.link.absoluteString;
        if ([dialogTitle hasPrefix:@"javascript:"]){//执行js的不需要弹窗
            return;
        }
        [actionSheetController addAction:[self actionOpenInNewTag:element.link]];
        [actionSheetController addAction:[self actionBrowserImage]];
        [actionSheetController addAction:[self actionCopyLinkUrl:element.link.absoluteString]];
        if (linkText.length > 0){
            [actionSheetController addAction:[self actionCopyLinkText:element.linkText]];
        }
        [actionSheetController addAction:[self actionSaveImageToPhotos:element.image]];
        [actionSheetController addAction:[self actionSaveImageToEncryption]];
    }else if (self.element.link){
        dialogTitle = self.element.link.absoluteString;
        if ([dialogTitle hasPrefix:@"javascript:"]){//执行js的不需要弹窗
            return;
        }
        [actionSheetController addAction:[self actionOpenInNewTag:element.link]];
        [actionSheetController addAction:[self actionCopyLinkUrl:element.link.absoluteString]];
        if (linkText.length > 0){
            [actionSheetController addAction:[self actionCopyLinkText:element.linkText]];
        }
//        [actionSheetController addAction:[self actionShare]];
        dialogTitle = self.element.link.absoluteString;
    }else if(self.element.image){
        [actionSheetController addAction:[self actionBrowserImage]];
        [actionSheetController addAction:[self actionSaveImageToPhotos:element.image]];
        [actionSheetController addAction:[self actionSaveImageToEncryption]];
        
    }
    [actionSheetController addAction:[self actionCancle]];
    
    [self presentViewController:actionSheetController animated:true completion:nil];
}

-(UIAlertAction *)actionCancle{
    UIAlertAction *ac = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
        
    }];
    return ac;
}

-(UIAlertAction *)actionOpenInNewTag:(NSURL *)url{
    
    
    UIAlertAction *ac = [UIAlertAction actionWithTitle:@"在新标签打开" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        WebBrowserViewController *web = [self.storyboard instantiateViewControllerWithIdentifier:@"WebBrowserViewController"];
        web.needLoadUrlStr = url.absoluteString;
        [BrowserTagsManager addNewTag:web display:true];
    }];
    return ac;
}
-(UIAlertAction *)actionCopyLinkUrl:(NSString *)url{
    UIAlertAction *ac = [UIAlertAction actionWithTitle:@"复制链接地址" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        UIPasteboard* pasteBoard = [UIPasteboard generalPasteboard];
        pasteBoard.string = url;
        [MBProgressHUD showSuccessImage:@"已复制"];
    }];
    return ac;
}
-(UIAlertAction *)actionCopyLinkText:(NSString *)txt{
    UIAlertAction *ac = [UIAlertAction actionWithTitle:@"复制链接文字" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        UIPasteboard* pasteBoard = [UIPasteboard generalPasteboard];
        pasteBoard.string = txt;
        [MBProgressHUD showSuccessImage:@"已复制"];
    }];
    return ac;
}
-(UIAlertAction *)actionShare{
    UIAlertAction *ac = [UIAlertAction actionWithTitle:@"分享" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        [MBProgressHUD showFailImage:@"还没有实现"];
    }];
    return ac;
}
-(UIAlertAction *)actionSaveImageToPhotos:(NSURL *)imageUrl{
    UIAlertAction *ac = [UIAlertAction actionWithTitle:@"保存图片" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        [self saveImageToPhotosOfUrl:imageUrl];
    }];
    return ac;
}
-(UIAlertAction *)actionSaveImageToEncryption{
    UIAlertAction *ac = [UIAlertAction actionWithTitle:@"添加到加密相册" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        [MBProgressHUD showFailImage:@"还没有实现"];
    }];
    return ac;
}
-(UIAlertAction *)actionBrowserImage{
    UIAlertAction *ac = [UIAlertAction actionWithTitle:@"进入看图模式" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        [self performSegueWithIdentifier:@"BrowserPicture" sender:self];
    }];
    return ac;
}

//MARK: - 方法

/// 获取图片地址数组
-(void)getPicBrowserArray:(NSString *)obj{
    allImagesUrl = [obj componentsSeparatedByString:@"*|*"];
}
-(void)image:(UIImage *)image didFinishSavingWithError:(NSError *)error contextInfo:(void *)contextInfo;{
    if (error){
        [MBProgressHUD showFailImage:error.localizedDescription];
    }
}
-(void)saveImageToPhotosOfUrl:(NSURL *)imageUrl{
    [PHPhotoLibrary requestAuthorization:^(PHAuthorizationStatus status) {
        if(status == PHAuthorizationStatusNotDetermined || status == PHAuthorizationStatusAuthorized){
            NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
            [config setHTTPAdditionalHeaders:@{@"Accept": @"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                                               @"Content-Type": @"image/jpeg",
                                               @"User-Agent": @"Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_4 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13G35",
                                               @"Cookie": @"" }];
            NSURLSession * session = [NSURLSession sessionWithConfiguration:config];
            NSURLSessionDataTask* task = [session dataTaskWithURL:imageUrl completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
                if (data != nil ){
                    [UIImage savePhoto:data];
                }
            }];
            [task resume];
        }else{
            [UIAlertController showAlertInViewController:self withTitle:@"无法保存图片" message:@"‘简单上网’没有使用您相册的权限，您需要到设置中授予权限。" cancelButtonTitle:@"算了" destructiveButtonTitle:nil otherButtonTitles:@[@"去设置"] tapBlock:^(UIAlertController * _Nonnull controller, UIAlertAction * _Nonnull action, NSInteger buttonIndex) {
                if (buttonIndex == 1){
                    NSURL *url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
                    [[UIApplication sharedApplication] openURL:url];
                }
            }];
        }
    }];
    
}
-(void)saveImageToPhotos:(UIImage *)image{
    [PHPhotoLibrary requestAuthorization:^(PHAuthorizationStatus status) {
        if(status == PHAuthorizationStatusNotDetermined || status == PHAuthorizationStatusAuthorized){
            UIImageWriteToSavedPhotosAlbum(image, self, @selector(image:didFinishSavingWithError:contextInfo:), NULL);
        }else{
            [UIAlertController showAlertInViewController:self withTitle:@"无法保存图片" message:@"‘简单上网’没有使用您相册的权限，您需要到设置中授予权限。" cancelButtonTitle:@"算了" destructiveButtonTitle:nil otherButtonTitles:@[@"去设置"] tapBlock:^(UIAlertController * _Nonnull controller, UIAlertAction * _Nonnull action, NSInteger buttonIndex) {
                if (buttonIndex == 1){
                    NSURL *url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
                    [[UIApplication sharedApplication] openURL:url];
                }
            }];
        }
    }];
    
}
+ (void)savePhoto:(NSData*)data {
    if (data == nil) {
        return;
    }
    
    [[PHPhotoLibrary sharedPhotoLibrary] performChanges:^{
        if ([UIDevice currentDevice].systemVersion.floatValue < 9.0) {
            NSString *temporaryFileName = [NSProcessInfo processInfo].globallyUniqueString;
            NSString *temporaryFilePath = [NSTemporaryDirectory() stringByAppendingPathComponent:temporaryFileName];
            NSURL *temporaryFileURL = [NSURL fileURLWithPath:temporaryFilePath];
            NSError *error = nil;
            [data writeToURL:temporaryFileURL options:NSDataWritingAtomic error:&error];
            if (error == nil) {
                [PHAssetChangeRequest creationRequestForAssetFromImageAtFileURL:temporaryFileURL];
                [[NSFileManager defaultManager] removeItemAtURL:temporaryFileURL error:nil];
            }
        } else {
            PHAssetCreationRequest *request = [PHAssetCreationRequest creationRequestForAsset];
            [(PHAssetCreationRequest *)request addResourceWithType:PHAssetResourceTypePhoto
                                                              data:data
                                                           options:nil];
        }
    } completionHandler:^(BOOL success, NSError * _Nullable error) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if (error) {
                [MBProgressHUD showImage:kMBProgressHUDImageFail text:NSLocalizedString(@"保存失败", nil)];
            }else{
                [MBProgressHUD showImage:kMBProgressHUDImageSuccess text:NSLocalizedString(@"已保存到手机相册", nil)];
            }
            
        });
    }];
}
@end

