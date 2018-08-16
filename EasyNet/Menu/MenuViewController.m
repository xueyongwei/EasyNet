//
//  MenuViewController.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/14.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "MenuViewController.h"

@interface MenuViewController ()
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *bottomConst;
@property (weak, nonatomic) IBOutlet UIVisualEffectView *effectView;


@end

@implementation MenuViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.alpha = 0.0;
    self.bottomConst.constant = -300;
    
    // Do any additional setup after loading the view.
}

-(void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:animated];
    [self.navigationController setNavigationBarHidden:true animated:animated];
}
-(void)viewDidAppear:(BOOL)animated{
    [super viewDidAppear:animated];
    [self animateShow];
}



- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)onBgViewTap:(UITapGestureRecognizer *)sender {
    
    [self animateDismiss];
    
}


/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end


@implementation MenuViewController(Animate)
-(void)animateShow{
    
    self.bottomConst.constant = 0;
//    [UIView animateWithDuration:0.2 animations:^{
//        [self.view layoutIfNeeded];
//        self.view.alpha = 1.0;
//    } completion:^(BOOL finished) {
//        if (finished){
//            [self dismissViewControllerAnimated:false completion:nil];
//        }
//    }];
    
    [UIView animateWithDuration:0.2 animations:^{
//        [self.view layoutIfNeeded];
        self.view.alpha = 1.0;
    }];
    
//    self.bottomConst.constant = 0;
    [UIView animateWithDuration:0.3 delay:0.0 usingSpringWithDamping:0.7 initialSpringVelocity:4 options:UIViewAnimationOptionCurveEaseIn animations:^{
        [self.view layoutIfNeeded];
        
    } completion:^(BOOL finished) {

    }];
}
-(void)animateDismiss{
    self.bottomConst.constant = -300;
    [UIView animateWithDuration:0.2 animations:^{
        [self.view layoutIfNeeded];
        self.view.alpha = 0.0;
    } completion:^(BOOL finished) {
        if (finished){
            [self dismissViewControllerAnimated:false completion:nil];
        }
    }];
//
//    [UIView animateWithDuration:0.3 animations:^{
//
//    }];
//
//    [UIView animateWithDuration:0.3 delay:0.2 usingSpringWithDamping:0.8 initialSpringVelocity:0.5 options:UIViewAnimationOptionCurveEaseIn animations:^{
//        [self.view layoutIfNeeded];
//    } completion:^(BOOL finished) {
//        [UIView animateWithDuration:0.2 animations:^{
//            self.effectView.alpha = 0.0;
//        } completion:^(BOOL finished) {
//            if (finished){
//                [self dismissViewControllerAnimated:false completion:nil];
//            }
//        }];
//
//    }];
}
@end
