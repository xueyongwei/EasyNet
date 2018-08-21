//
//  SearchListTableViewCell.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/21.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "SearchListTableViewCell.h"

@implementation SearchListTableViewCell

- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
}

- (IBAction)onFillBtnCLick:(UIButton *)sender {
    [self.delegate SearchListTableViewCellFillBtnClick:self];
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

@end
