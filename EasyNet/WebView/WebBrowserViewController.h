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

@end

@interface WebBrowserViewController(SearchViewControllerProtocol) <SearchViewControllerProtocol>

@end
