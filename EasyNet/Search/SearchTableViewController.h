//
//  SearchTableViewController.h
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/21.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "SearchListTableViewCell.h"

@protocol SearchTableViewControllerProtocol<NSObject>
-(void)SearchTableViewControllerClickUrl:(NSString *)str;
-(void)SearchTableViewControllerFillUrl:(NSString *)str;
@end

@interface SearchTableViewController : UITableViewController
@property (weak,nonatomic) id<SearchTableViewControllerProtocol> delegate;
@property (nonatomic,strong) NSMutableArray *dataSource;
@property (nonatomic,copy)NSString *currentUrlStr;
@end

@interface SearchTableViewController (ListCell)<SearchListTableViewCellProtocol>

@end
