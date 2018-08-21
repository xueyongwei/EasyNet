//
//  PanGesCollectionViewCell.m
//  testCollectionViewSwapDelete
//
//  Created by 薛永伟 on 2018/8/20.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "PanGesCollectionViewCell.h"

@implementation PanGesCollectionViewCell
{
    CGPoint origin;
    CGPoint originCenter;
    CGFloat distance;
    CGFloat rate;
    
}
-(id)initWithCoder:(NSCoder *)aDecoder{
    self = [super initWithCoder:aDecoder];
    [self addGes];
    return self;
}
-(id)initWithFrame:(CGRect)frame{
    self = [super initWithFrame:frame];
    [self addGes];
    return  self;
}

- (void)panGesterDidPan:(UIPanGestureRecognizer *)panGesture {
    
    switch (panGesture.state) {
        case UIGestureRecognizerStateBegan:
        {
            origin = [panGesture translationInView:self];
            originCenter = self.contentView.center;
        }
            break;
        case UIGestureRecognizerStateChanged:
        {
            CGPoint translation = [panGesture translationInView:self];
            
            distance =  origin.x - translation.x ;
            if (fabs(origin.y - translation.y) > distance){
                return;
            }
            CGFloat alpha = (rate - fabs(distance)) / rate;
            
            
            [UIView animateWithDuration:0.1 animations:^{
                self.contentView.center = CGPointMake(originCenter.x - distance, originCenter.y);
                self.contentView.alpha = alpha;
            }];
        }
            break;
        case UIGestureRecognizerStateEnded:
            
        {
            if (self.contentView.alpha < 0.5){
                
                [UIView animateWithDuration:0.1 animations:^{
                    self.contentView.alpha = 0;
                } completion:^(BOOL finished) {
                    if (finished){
                        [self.delegate panCellDidDelete:self];
                        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.4 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                            self.contentView.center = originCenter;
                            self.contentView.alpha = 1;
                        });
                    }
                }];
            }else{
                [UIView animateWithDuration:0.3 animations:^{
                    self.contentView.center = originCenter;
                    self.contentView.alpha = 1;
                }];
            }
            
           
        }
            break;
        default:
            break;
            
    }
}
-(void)swapHandle:(UISwipeGestureRecognizer *)swap{
    [self.delegate panCellDidDelete:self];
}
-(void)layoutSubviews{
    [super layoutSubviews];
    
}
-(void)addGes{
    rate = self.contentView.bounds.size.width;
    UIPanGestureRecognizer *pan = [[UIPanGestureRecognizer alloc]initWithTarget:self action:@selector(panGesterDidPan:)];
    pan.delegate = self;
    [self addGestureRecognizer:pan];
    
}
@end

@implementation PanGesCollectionViewCell (Panable)
-(BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer *)otherGestureRecognizer{
    return  YES;
}
//-(BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldRequireFailureOfGestureRecognizer:(UIGestureRecognizer *)otherGestureRecognizer{
//
//}
@end
