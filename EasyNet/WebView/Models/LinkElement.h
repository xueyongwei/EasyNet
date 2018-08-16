//
//  DomElement.h
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/16.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface LinkElement : NSObject
/// 链接
@property (nonatomic,strong) NSURL* link;
/// 图片地址
@property (nonatomic,strong) NSURL* image;
/// 网页所有图片地址
@property (nonatomic,strong) NSArray<NSString *>* imageUrls;
/// 链接文字
@property (nonatomic,copy) NSString * linkText;

+(LinkElement*)elementWith:(NSURL *)link image:(NSURL *)image imageUrls:(NSArray*)imageUrls linkText:(NSString *)linkText;

@end
