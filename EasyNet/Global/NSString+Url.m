//
//  NSString+Url.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/21.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "NSString+Url.h"

@implementation NSString (Url)
-(BOOL)isURL{
    BOOL isAvailableUrl = false;
    
    NSString *finalUrl = self;
    if (![self containsString:@"://"]) {
        finalUrl = [NSString stringWithFormat:@"http://%@",self];
    }
    NSURL *url = [NSURL URLWithString:finalUrl];
    NSString *testStr = url.host;
    NSString *urlpredicateStr = @"^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$";
    
    NSPredicate *urlPredicate = [NSPredicate predicateWithFormat:@"SELF MATCHES %@",urlpredicateStr];
    
    if ([urlPredicate evaluateWithObject:testStr]){
        isAvailableUrl = true;
    }else{
        isAvailableUrl = false;
        //再去验证是否是输入的IP
        NSString* ipstr = @"^(https?:\\/\\/)?(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";
        NSPredicate *ipPredicate = [NSPredicate predicateWithFormat:@"SELF MATCHES %@",ipstr];
        if ([ipPredicate evaluateWithObject:testStr]){//是IP
            isAvailableUrl = true;
        }
    }
    
    return isAvailableUrl;
}
@end
