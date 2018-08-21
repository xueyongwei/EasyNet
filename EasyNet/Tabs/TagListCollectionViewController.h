//
//  TagListCollectionViewController.h
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/20.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "WebTagCollectionViewCell.h"

@protocol TagListCollectionProtocol<NSObject>
-(void)didScrollTo:(NSInteger)idx;
@end

@interface TagListCollectionViewController : UICollectionViewController
@property (weak,nonatomic) id<TagListCollectionProtocol> delegate;
/// 默认滚动到第几个
@property (assign,nonatomic) NSInteger defaultScrollToIndex;

@end

@interface TagListCollectionViewController(panToDelable)<PanGesCollectionViewCellProtocol>

@end
