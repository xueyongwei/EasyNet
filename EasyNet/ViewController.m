//
//  ViewController.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/7/17.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "ViewController.h"
#import "BrowserTagsManager.h"
#import "WebBrowserViewController.h"

@interface ViewController ()<BrowserTagsManagerProtocol>
//@property (weak, nonatomic) IBOutlet UIView *containerView;


@end

@implementation ViewController

-(void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:animated];
    [self.navigationController setNavigationBarHidden:true animated:animated];
} 

- (void)viewDidLoad {
    [super viewDidLoad];
    [BrowserTagsManager shareInstance].delegate = self;
    
    WebBrowserViewController *web = [BrowserTagsManager createNewBrowser];
    
    [BrowserTagsManager addNewTag:web display:true];
}

-(void)disPlay:(UIViewController *)vc{
    if (self.currentVC){
        [self.currentVC updateThumbImage];
        [self.currentVC.view removeFromSuperview];
        [self.currentVC removeFromParentViewController];
    }
    
    [self addChildViewController:vc];
    [vc didMoveToParentViewController:self];
    [self.view addSubview:vc.view];
    vc.view.translatesAutoresizingMaskIntoConstraints = false;
    [vc.view.topAnchor constraintEqualToAnchor:self.view.topAnchor constant:0].active = true;
    [vc.view.leftAnchor constraintEqualToAnchor:self.view.leftAnchor constant:0].active = true;
    [vc.view.bottomAnchor constraintEqualToAnchor:self.view.bottomAnchor constant:0].active = true;
    [vc.view.rightAnchor constraintEqualToAnchor:self.view.rightAnchor constant:0].active = true;
    
    self.currentVC = vc;
}
//-(void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
//{
//    if ([segue.identifier isEqualToString:@"WebBrowserViewController"]){
//        WebBrowserViewController* vc = (WebBrowserViewController* ) segue.destinationViewController;
//        [BrowserTagsManager addNewTag:vc display:false];
//        self.currentVC = (UIViewController*)vc;
//    }
//
//}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
