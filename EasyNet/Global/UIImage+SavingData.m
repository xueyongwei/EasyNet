//
//  UIImage+SavingData.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/16.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "UIImage+SavingData.h"
#import <Photos/Photos.h>
#import "MBProgressHUD+Utility.h"

@implementation UIImage (SavingData)

+ (void)savePhoto:(NSData*)data {
    if (data == nil) {
        return;
    }
    
    [[PHPhotoLibrary sharedPhotoLibrary] performChanges:^{
        if ([UIDevice currentDevice].systemVersion.floatValue < 9.0) {
            NSString *temporaryFileName = [NSProcessInfo processInfo].globallyUniqueString;
            NSString *temporaryFilePath = [NSTemporaryDirectory() stringByAppendingPathComponent:temporaryFileName];
            NSURL *temporaryFileURL = [NSURL fileURLWithPath:temporaryFilePath];
            NSError *error = nil;
            [data writeToURL:temporaryFileURL options:NSDataWritingAtomic error:&error];
            if (error == nil) {
                [PHAssetChangeRequest creationRequestForAssetFromImageAtFileURL:temporaryFileURL];
                [[NSFileManager defaultManager] removeItemAtURL:temporaryFileURL error:nil];
            }
        } else {
            PHAssetCreationRequest *request = [PHAssetCreationRequest creationRequestForAsset];
            [(PHAssetCreationRequest *)request addResourceWithType:PHAssetResourceTypePhoto
                                                              data:data
                                                           options:nil];
        }
    } completionHandler:^(BOOL success, NSError * _Nullable error) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if (error) {
                [MBProgressHUD showFailImage:@"保存失败"];
            }else{
                [MBProgressHUD showSuccessImage:@"已保存"];
            }
        });
    }];
}
@end
