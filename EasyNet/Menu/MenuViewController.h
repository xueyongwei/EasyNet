//
//  MenuViewController.h
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/14.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface MenuViewController : UIViewController

@end


@interface MenuViewController(CollectionView)

@end

/// 显隐动画
@interface MenuViewController(Animate)
-(void)animateShow;
-(void)animateDismiss;
@end
