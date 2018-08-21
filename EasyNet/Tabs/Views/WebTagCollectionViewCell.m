//
//  WebTagCollectionViewCell.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/20.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "WebTagCollectionViewCell.h"
#import <YYKit.h>
@implementation WebTagCollectionViewCell
-(void)awakeFromNib{
    [super awakeFromNib];
    self.cotntView.layer.cornerRadius = 5;
    self.cotntView.clipsToBounds = true;
    
//    self.contentView.layer.shadowColor = [UIColor grayColor].CGColor;
////    self.contentView.layer.shadowOffset = CGSizeMake(0, 3);
//    self.contentView.layer.shadowOpacity = 0.5;
//    self.contentView.layer.shadowRadius = 3;
    
    
    self.cotntView.layer.borderWidth = 1.0/YYScreenScale();
    self.cotntView.layer.borderColor = [UIColor lightGrayColor].CGColor;
    
    
}
@end
