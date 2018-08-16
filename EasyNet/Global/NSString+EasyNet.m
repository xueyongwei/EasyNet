//
//  NSString+EasyNet.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/15.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "NSString+EasyNet.h"

@implementation NSString (EasyNet)

+(NSString *)UA_iphone{
    return @"Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H143 EasyNet micromessenger/5.0 ";
}

+(NSString *)UA_Android{
    return @"User-Agent: Mozilla/5.0 (Linux; U; android 2.3.7; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1";
}

+(NSString *)UA_MacSafari{
    return @"User-Agent:Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50";
}

+(NSString *)UA_WindowsIE{
    return @"User-Agent:Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0";
}
@end
