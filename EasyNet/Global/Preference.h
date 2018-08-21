//
//  Preference.h
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/15.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface Preference : NSObject

@property (nonatomic,assign) CGRect webViewFrame;

+(Preference*)shared;


@end

@interface Preference(UA)

//
//
//+ (void)setUA:(UserAgent) agent;
//+ (NSString *) currentUA;
@end
