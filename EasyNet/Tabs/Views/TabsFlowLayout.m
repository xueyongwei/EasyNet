//
//  TabsFlowLayout.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/21.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "TabsFlowLayout.h"
#import <YYKit.h>
#import "Preference.h"
@implementation TabsFlowLayout

-(void)prepareLayout{
    [super prepareLayout];
    
    
    
}

-(BOOL)shouldInvalidateLayoutForBoundsChange:(CGRect)newBounds{
    return  YES;
}
// 对layoutAttrute根据需要做调整，也许是frame,alpha,transform等
- (NSArray *)layoutAttributesForElementsInRect:(CGRect)rect{
    NSArray *atts = [super layoutAttributesForElementsInRect:rect];
    CGFloat centerY =  self.collectionView.frame.size.height * 0.5 + self.collectionView.contentOffset.y;
    for (UICollectionViewLayoutAttributes *att in atts) {
        
        CGFloat length = fabs(att.center.y - centerY);
        CGFloat scale = 1 - length/self.collectionView.frame.size.height;
        att.transform = CGAffineTransformMakeScale(scale, scale);
    }
    return atts;
}
-(CGPoint)targetContentOffsetForProposedContentOffset:(CGPoint)proposedContentOffset withScrollingVelocity:(CGPoint)velocity{
    
    // 某cell滑动停止时的最终rect
    CGRect rect;
    rect.origin.x = 0.f;
    rect.origin.y = proposedContentOffset.y;
    rect.size = self.collectionView.frame.size;
    
    // 计算collectionView最中心点的x值
    CGFloat centerY = proposedContentOffset.y + self.collectionView.frame.size.height * 0.5;
    
    // 获得super已经计算好的布局属性
    CGFloat offset = 0.0f;
    NSArray *attrsArray = [super layoutAttributesForElementsInRect:rect];
    UICollectionViewLayoutAttributes *nearAtt = nil;
    CGFloat minDistance = 1000.0f;
    for(UICollectionViewLayoutAttributes *attr in attrsArray)
    {
        if (fabs(attr.center.y - centerY) < minDistance){
            minDistance = fabs(attr.center.y - centerY);
            nearAtt = attr;
        }
        
    }
    offset = nearAtt.center.y - centerY;
    proposedContentOffset.y += offset;
    
    return proposedContentOffset;
    
}
@end
