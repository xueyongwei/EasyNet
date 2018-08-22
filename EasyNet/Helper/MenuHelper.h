//
//  MenuHelper.h
//  WebBrowser
//
//  Created by 钟武 on 16/7/29.
//  Copyright © 2016年 钟武. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
@protocol MenuHelperInterface <NSObject>

@optional

- (void)menuHelperFindInPage;
- (void)menuHelperNewTagVisit;
- (void)menuHelperSearchInWeb:(UIMenuController*)sender;

@end

@interface MenuHelper : NSObject

+(instancetype)shareInstance;
- (void)setItems;

@end
