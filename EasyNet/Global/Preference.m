//
//  Preference.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/15.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "Preference.h"

@implementation Preference
+(Preference*)shared{
    static Preference *p = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        p = [[Preference alloc]init];
    });
    return p;
}
@end

//MARK: - UA
@implementation Preference(UA)

//+ (void)setUA:(UserAgent) agent;{
//
//    switch (agent) {
//        case UserAgent_iOS:
//
//            break;
//        case UserAgent_Android:
//
//            break;
//        case UserAgent_MacSafari:
//
//            break;
//        case UserAgent_WindowsIE:
//
//            break;
//        default:
//            break;
//    }
//    [[NSUserDefaults standardUserDefaults] setInteger:agent forKey:@""];
//}
//+ (UserAgent) currentUA{
//
//}
//+(NSString *)
@end
