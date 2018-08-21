//
//  PanGesCollectionViewCell.h
//  testCollectionViewSwapDelete
//
//  Created by 薛永伟 on 2018/8/20.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import <UIKit/UIKit.h>
@protocol PanGesCollectionViewCellProtocol<NSObject>
-(void)panCellDidDelete:(UICollectionViewCell*)cell;
@end

@interface PanGesCollectionViewCell : UICollectionViewCell
@property (nonatomic,weak) id<PanGesCollectionViewCellProtocol> delegate;
@end

@interface PanGesCollectionViewCell(Panable)<UIGestureRecognizerDelegate>

@end
