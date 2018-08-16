//
//  ENUserAgent.h
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/15.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef NS_ENUM(NSInteger, UserAgent) {
    UserAgent_iOS,//默认从0开始
    UserAgent_Android,
    UserAgent_MacSafari,
    UserAgent_WindowsIE,
};

@interface ENUserAgent : NSObject

@property (nonatomic,assign) UserAgent agent;

-(NSString *)agentShowTitle;
-(NSString *)agentString;

@end
