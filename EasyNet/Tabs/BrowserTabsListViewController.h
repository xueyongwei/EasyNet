//
//  BrowserTabsListViewController.h
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/16.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "TagListCollectionViewController.h"
@interface BrowserTabsListViewController : UIViewController
@property (nonatomic,assign) NSInteger showFromIndex;
@end

@interface BrowserTabsListViewController(TagListProtocol)<TagListCollectionProtocol>

@end
