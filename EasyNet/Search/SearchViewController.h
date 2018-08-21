//
//  SearchViewController.h
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/15.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>
#import "SearchTableViewController.h"

@protocol SearchViewControllerProtocol <NSObject>
-(void)shouldVisit:(NSURL *)url;
@end

@interface SearchViewController : UIViewController
// 源view
@property (nonatomic,weak) UIView *searchBarSourceView;

@property (nonatomic,copy) NSString *currentKeyword;

@property (nonatomic,weak) id <SearchViewControllerProtocol> delegate;

@end

@interface SearchViewController(tableView)<SearchTableViewControllerProtocol>
@end
