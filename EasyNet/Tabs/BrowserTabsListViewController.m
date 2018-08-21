//
//  BrowserTabsListViewController.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/16.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "BrowserTabsListViewController.h"

#import "BrowserTagsManager.h"
#import "TagListCollectionViewController.h"

#define RGBAColor(r,g,b,a)  [UIColor colorWithRed:r/255.0 green:g/255.0 blue:b/255.0 alpha:a]
#define RGBColor(r,g,b)     RGBAColor(r,g,b,1.0)
#define RGBColorC(c)        RGBColor((((int)c) >> 16),((((int)c) >> 8) & 0xff),(((int)c) & 0xff))


@interface BrowserTabsListViewController ()
@property (weak, nonatomic) IBOutlet UILabel *countLabel;

@property (weak, nonatomic) IBOutlet UIView *effectBgView;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *bottomEffectBarHeightConst;


@property(nonatomic, strong)UICollectionView* cardCollectionView;

@end

@implementation BrowserTabsListViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.alpha = 0;
    // Do any additional setup after loading the view.
    
    
    self.cardCollectionView.translatesAutoresizingMaskIntoConstraints = false;
    [self.cardCollectionView.topAnchor constraintEqualToAnchor:self.effectBgView.topAnchor constant:0].active = true;
    [self.cardCollectionView.leftAnchor constraintEqualToAnchor:self.effectBgView.leftAnchor constant:0].active = true;
    [self.cardCollectionView.bottomAnchor constraintEqualToAnchor:self.effectBgView.bottomAnchor constant:0].active = true;
    [self.cardCollectionView.rightAnchor constraintEqualToAnchor:self.effectBgView.rightAnchor constant:0].active = true;
}

-(void)viewDidAppear:(BOOL)animated{
    [super viewDidAppear:animated];
    [UIView animateWithDuration:0.2 animations:^{
        self.view.alpha = 1;
    }];
}
-(void)viewSafeAreaInsetsDidChange
{
    [super viewSafeAreaInsetsDidChange];
    self.bottomEffectBarHeightConst.constant = 50 + self.view.safeAreaInsets.bottom;
}
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)onBackClick:(UIButton *)sender {
    [UIView animateWithDuration:0.3 animations:^{
        self.view.alpha = 0;
    } completion:^(BOOL finished) {
        [self dismissViewControllerAnimated:false completion:nil];
    }];
}

- (IBAction)onNewTagClick:(UIButton *)sender {
    WebBrowserViewController *web = [self.storyboard instantiateViewControllerWithIdentifier:@"WebBrowserViewController"];
    web.needLoadUrlStr = @"";
    
    [BrowserTagsManager addNewTag:web display:true];
    
    [self onBackClick:nil];
}

- (IBAction)onClearClick:(UIButton *)sender {
}


#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    if ([segue.identifier isEqualToString:@"TagListCollectionViewController"]) {
        TagListCollectionViewController *tag = segue.destinationViewController;
        tag.defaultScrollToIndex = self.showFromIndex;
//        tag.collectionView.contentInset = UIEdgeInsetsMake(100, 0, 0, 100);
        tag.delegate = self;
    }
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}




@end

@implementation BrowserTabsListViewController(TagListProtocol)
-(void)didScrollTo:(NSInteger)idx{
    
    self.countLabel.text = [NSString stringWithFormat:@"%ld/%lu",(long)idx+1,(unsigned long)[BrowserTagsManager shareInstance].tabs.count];
}
@end
