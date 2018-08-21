//
//  WebTagCollectionViewCell.h
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/20.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "PanGesCollectionViewCell.h"
@interface WebTagCollectionViewCell : PanGesCollectionViewCell
@property (weak, nonatomic) IBOutlet UILabel *titleLabel;
@property (weak, nonatomic) IBOutlet UIImageView *imageVIew;
@property (weak, nonatomic) IBOutlet UIView *cotntView;

@end
