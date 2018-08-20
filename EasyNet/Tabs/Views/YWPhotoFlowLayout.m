//
//  YWPhotoFlowLayout.m
//  testCollectionViewSwapDelete
//
//  Created by 薛永伟 on 2018/8/20.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "YWPhotoFlowLayout.h"
#import <YYKit.h>
#import "Preference.h"
#define MinValue 100.f
@implementation YWPhotoFlowLayout

-(void)prepareLayout{
    [super prepareLayout];

    CGFloat radio = [Preference shared].webViewSize.height / [Preference shared].webViewSize.width ;
    self.itemSize = CGSizeMake(300, 300 * radio);
    self.minimumInteritemSpacing = 5.0f;
    self.minimumLineSpacing = 5.0f;
    self.sectionInset = UIEdgeInsetsMake(-50.f, 50.f, 5.f, 50.f);
    self.scrollDirection = UICollectionViewScrollDirectionHorizontal;
    
}

-(BOOL)shouldInvalidateLayoutForBoundsChange:(CGRect)newBounds{
    return  YES;
}
// 对layoutAttrute根据需要做调整，也许是frame,alpha,transform等
- (NSArray *)layoutAttributesForElementsInRect:(CGRect)rect{
    NSArray *atts = [super layoutAttributesForElementsInRect:rect];
    CGFloat centerX =  self.collectionView.frame.size.width * 0.5 + self.collectionView.contentOffset.x;
    for (UICollectionViewLayoutAttributes *att in atts) {
        
        CGFloat length = fabs(att.center.x - centerX);
        CGFloat scale = 1 - length/self.collectionView.frame.size.width;
        att.transform = CGAffineTransformMakeScale(scale, scale);
    }
    return atts;
}
-(CGPoint)targetContentOffsetForProposedContentOffset:(CGPoint)proposedContentOffset withScrollingVelocity:(CGPoint)velocity{
    
    // 某cell滑动停止时的最终rect
    CGRect rect;
    rect.origin.x = proposedContentOffset.x;
    rect.origin.y = 0.f;
    rect.size = self.collectionView.frame.size;
    
    // 计算collectionView最中心点的x值
    CGFloat centerX = proposedContentOffset.x + self.collectionView.frame.size.width * 0.5;
    
    // 获得super已经计算好的布局属性
    CGFloat offset = 0.0f;
    NSArray *attrsArray = [super layoutAttributesForElementsInRect:rect];
    UICollectionViewLayoutAttributes *nearAtt = nil;
    CGFloat minDistance = 1000.0f;
    for(UICollectionViewLayoutAttributes *attr in attrsArray)
    {
        if (fabs(attr.center.x - centerX) < minDistance){
            minDistance = fabs(attr.center.x - centerX);
            nearAtt = attr;
        }

    }
    offset = nearAtt.center.x - centerX;
    proposedContentOffset.x += offset;
    
    return proposedContentOffset;
    
}
@end
