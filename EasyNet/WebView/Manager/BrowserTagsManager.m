//
//  BrowserTagsManager.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/16.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "BrowserTagsManager.h"

@interface BrowserTagsManager()

@end

@implementation BrowserTagsManager

+(BrowserTagsManager*)shareInstance{
    static BrowserTagsManager *manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        BrowserTagsManager * amanager = [[BrowserTagsManager alloc]init];
        amanager.tabs = [[NSMutableArray alloc]init];
        manager = amanager;
    });
    return manager;
}

+(void)addNewTag:(WebBrowserViewController *)tag display:(BOOL)display{
    [[self shareInstance].tabs addObject:tag];
    if (display){
        [self showTabAt:[self shareInstance].tabs.count -1];
    }
}

+(void)showTabAt:(NSInteger)idx{
    
    WebBrowserViewController *web = [self shareInstance].tabs[idx];
    if (web){
        [[self shareInstance].delegate disPlay:web];
    }
    
}

+(void)deleteAt:(NSInteger)idx{
    [[self shareInstance].tabs removeObjectAtIndex:idx];
}

@end
