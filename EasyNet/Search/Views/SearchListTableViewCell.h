//
//  SearchListTableViewCell.h
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/21.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import <UIKit/UIKit.h>
@protocol SearchListTableViewCellProtocol<NSObject>
-(void)SearchListTableViewCellFillBtnClick:(UITableViewCell*)cell;
@end

@interface SearchListTableViewCell : UITableViewCell
@property (weak,nonatomic) id<SearchListTableViewCellProtocol>delegate;
@property (weak, nonatomic) IBOutlet UILabel *urlLabel;
@property (weak, nonatomic) IBOutlet UILabel *descLabel;

@end
