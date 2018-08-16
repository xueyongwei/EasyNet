//
//  DomElement.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/16.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "LinkElement.h"

@implementation LinkElement

+(LinkElement* )elementWith:(NSURL *)link image:(NSURL *)image imageUrls:(NSArray*)imageUrls linkText:(NSString *)linkText{
    LinkElement *element = [[LinkElement alloc]init];
    element.link = link;
    element.image = image;
    element.imageUrls = imageUrls;
    element.linkText = linkText;
    return element;
}
@end
