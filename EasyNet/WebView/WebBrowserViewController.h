//
//  WebBrowserViewController.h
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/14.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "SearchViewController.h"

@interface WebBrowserViewController : UIViewController
/// 需要加载的url
@property (copy,nonatomic) NSString * needLoadUrlStr;
/// 缩略图
-(UIImage *)thumbImage;
@end

@interface WebBrowserViewController(SearchViewControllerProtocol) <SearchViewControllerProtocol>

@end

@interface WebBrowserViewController(UIGestureRecognizerDelegate) <UIGestureRecognizerDelegate>

@end

@interface WebBrowserViewController(WKScriptMessageHandler) <WKScriptMessageHandler>

@end
