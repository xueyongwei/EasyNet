//
//  SearchInputView.h
//  WebBrowser
//
//  Created by 钟武 on 2016/12/29.
//  Copyright © 2016年 钟武. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CharacterSelectView.h"

@interface SearchInputView : UIView

@property (weak, nonatomic) IBOutlet CharacterSelectView *slider;
@property (weak, nonatomic) UITextField *textField;

- (void)switchQuickInputStateToFirst:(BOOL)first;
@end
