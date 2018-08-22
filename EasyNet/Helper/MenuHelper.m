//
//  MenuHelper.m
//  WebBrowser
//
//  Created by 钟武 on 16/7/29.
//  Copyright © 2016年 钟武. All rights reserved.
//

#import "MenuHelper.h"
#import <UIKit/UIKit.h>

@implementation MenuHelper

+(instancetype)shareInstance{
    static MenuHelper* helper;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        MenuHelper *obj = [[MenuHelper alloc]init];
        helper = obj;
    });
    return helper;
}

- (void)setItems{
    NSString *findInPageTitle = @"查找";
    UIMenuItem *findInPageItem = [[UIMenuItem alloc] initWithTitle:findInPageTitle action:@selector(menuHelperFindInPage)];
    
    NSString *findInBaidu = @"搜索";
    UIMenuItem *findInBaiduItem = [[UIMenuItem alloc] initWithTitle:findInBaidu action:@selector(menuHelperSearchInWeb:)];
    
    NSString *newTagVisit = @"前往";
    UIMenuItem *newTagVisitItem = [[UIMenuItem alloc] initWithTitle:newTagVisit action:@selector(menuHelperNewTagVisit)];

    [UIMenuController sharedMenuController].menuItems = @[findInPageItem,findInBaiduItem,newTagVisitItem];

}

@end
