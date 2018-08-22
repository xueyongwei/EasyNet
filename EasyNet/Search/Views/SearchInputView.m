//
//  SearchInputView.m
//  WebBrowser
//
//  Created by 钟武 on 2016/12/29.
//  Copyright © 2016年 钟武. All rights reserved.
//

#import "SearchInputView.h"
#import <YYKit.h>

typedef enum : NSUInteger {
    QuickInputButtonStateFirst = 0,
    QuickInputButtonStateSecond,
} QuickInputButtonState;


@interface SearchInputView ()

@property (weak, nonatomic) IBOutlet NSLayoutConstraint *leadingLayoutConstraint;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *trailingLayoutContraint;
@property (assign, nonatomic) NSInteger lastThreshold;
@property (assign, nonatomic) QuickInputButtonState quickState;
@property (strong, nonatomic) IBOutletCollection(UIButton) NSArray *bottomButtonCollection;

@end

@implementation SearchInputView

- (void)awakeFromNib{
    [super awakeFromNib];
    
    [self commonUIInit];
    
    self.quickState = QuickInputButtonStateFirst;

}
-(void)setQuickState:(QuickInputButtonState)quickState{
    _quickState = quickState;
    NSArray *titleArray = quickState == QuickInputButtonStateSecond ? @[@".",@"/",@".com",@".cn"] : @[@"www.",@"m.",@"http://",@"https://"];
    [self.bottomButtonCollection enumerateObjectsUsingBlock:^(UIButton *button, NSUInteger idx, BOOL *stop){
        [button setTitle:titleArray[idx] forState:UIControlStateNormal];
    }];
}
- (void)commonUIInit{
    
    [self.slider addTarget:self action:@selector(sliderValueChangedAction:) forControlEvents:UIControlEventValueChanged];
    [self.slider addTarget:self action:@selector(sliderFirstTouch:) forControlEvents:UIControlEventTouchDown];
    [self.slider addTarget:self action:@selector(sliderStop:) forControlEvents:UIControlEventTouchCancel | UIControlEventTouchUpInside | UIControlEventTouchUpOutside];
}

- (void)sliderFirstTouch:(CharacterSelectView *)slider{
    self.leadingLayoutConstraint.constant = -(self.width - slider.width)/2.0f + 10;
    self.trailingLayoutContraint.constant = -(self.width - slider.width)/2.0f + 10;
    [UIView animateWithDuration:.3f animations:^{
        [self layoutIfNeeded];
    } completion:^(BOOL finished){
        
    }];
}

- (void)sliderStop:(CharacterSelectView *)slider{
    [self.slider setValue:0.5f animated:NO];
    self.lastThreshold = 0;
    self.leadingLayoutConstraint.constant = 0;
    self.trailingLayoutContraint.constant = 0;
    [UIView animateWithDuration:.3f animations:^{
        [self layoutIfNeeded];
    } completion:^(BOOL finished){
        
    }];
}

- (void)sliderValueChangedAction:(CharacterSelectView *)slider{
    
    if (self.textField.selectedTextRange.empty) {
        NSInteger offset = (slider.value - 0.5f) * self.textField.text.length * 2;
        NSInteger labsOffset = labs(offset);
        if ((labsOffset > self.lastThreshold && offset < 0) || (labsOffset < self.lastThreshold && offset > 0)) {
            self.lastThreshold = labsOffset;
            UITextPosition *newPosition = [self.textField positionFromPosition:self.textField.selectedTextRange.end inDirection:UITextLayoutDirectionLeft offset:1];
            UITextRange *newSelectedRange = [self.textField textRangeFromPosition:newPosition toPosition:newPosition];
            [self.textField setSelectedTextRange:newSelectedRange];
        }
        else if ((labsOffset < self.lastThreshold && offset < 0) || (labsOffset > self.lastThreshold && offset > 0))
        {
            self.lastThreshold = labsOffset;
            UITextPosition *newPosition = [self.textField positionFromPosition:self.textField.selectedTextRange.end inDirection:UITextLayoutDirectionRight offset:1];
            UITextRange *newSelectedRange = [self.textField textRangeFromPosition:newPosition toPosition:newPosition];
            [self.textField setSelectedTextRange:newSelectedRange];
        }
    }
}

- (IBAction)handleButtonClicked:(UIButton *)sender {
    [self.textField insertText:sender.titleLabel.text];
    self.quickState = QuickInputButtonStateSecond;
    
//    if (self.quickState == QuickInputButtonStateFirst && ![@[@"http://",@"https://"] containsObject:sender.titleLabel.text]) {
//        [self switchInputViewButtonState];
//    }
}
- (void)switchQuickInputStateToFirst:(BOOL)first{
    self.quickState = first ? QuickInputButtonStateFirst:QuickInputButtonStateSecond;
}
//- (void)switchInputViewButtonState{
//    self.quickState = !self.quickState;
//    NSArray *titleArray = self.quickState ? @[@".",@"/",@".com",@".cn"] : @[@"www.",@"m.",@"http://",@"https://"];
//    [self.bottomButtonCollection enumerateObjectsUsingBlock:^(UIButton *button, NSUInteger idx, BOOL *stop){
//        [button setTitle:titleArray[idx] forState:UIControlStateNormal];
//    }];
//}

@end
