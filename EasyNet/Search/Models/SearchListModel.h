//
//  SearchListModel.h
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/21.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef NS_ENUM(NSInteger,SearchListModelType){
    SearchListModelTypePastBoard,//来自剪切板
    SearchListModelTypeCurrentUrl,//当前网页的地址
    SearchListModelTypeHistory,//当前网页的地址
};

@interface SearchListModel : NSObject
@property (nonatomic,copy)NSString *urlStr;
@property (nonatomic,copy)NSString *descTitle;
@property (nonatomic,assign)SearchListModelType type;
@end
