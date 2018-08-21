//
//  BrowserTabsListViewController.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/16.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "BrowserTabsListViewController.h"
#import "CardLayout.h"
#import "CardSelectedLayout.h"
#import "CardCellCollectionViewCell.h"
#import "BrowserTagsManager.h"
#import "TagListCollectionViewController.h"

#define RGBAColor(r,g,b,a)  [UIColor colorWithRed:r/255.0 green:g/255.0 blue:b/255.0 alpha:a]
#define RGBColor(r,g,b)     RGBAColor(r,g,b,1.0)
#define RGBColorC(c)        RGBColor((((int)c) >> 16),((((int)c) >> 8) & 0xff),(((int)c) & 0xff))


@interface BrowserTabsListViewController ()<UICollectionViewDelegate,UICollectionViewDataSource,CardLayoutDelegate>
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
        tag.delegate = self;
    }
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}





#pragma mark - UICollectionViewDataSource

- (NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView
{
    return 1;
}

- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section
{
    return [BrowserTagsManager shareInstance].tabs.count;
}

- (__kindof UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath
{
    WebBrowserViewController* web = [BrowserTagsManager shareInstance].tabs[indexPath.item];
    CardCellCollectionViewCell* cell = [collectionView dequeueReusableCellWithReuseIdentifier:@"cardCell" forIndexPath:indexPath];
    cell.bgColor = [self getGameColor:indexPath.row];
    cell.title = [NSString stringWithFormat:@"Item %d",(int)indexPath.row];
    cell.image = [web thumbImage];
    return cell;
}

-(UIColor*)getGameColor:(NSInteger)index
{
    NSArray* colorList = @[RGBColorC(0xfb742a),RGBColorC(0xfcc42d),RGBColorC(0x29c26d),RGBColorC(0xfaa20a),RGBColorC(0x5e64d9),RGBColorC(0x6d7482),RGBColorC(0x54b1ff),RGBColorC(0xe2c179),RGBColorC(0x9973e5),RGBColorC(0x61d4ff)];
    UIColor* color = [colorList objectAtIndex:(index%10)];
    return color;
}

- (void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath
{
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [BrowserTagsManager showTabAt:indexPath.item];
        [self onBackClick:nil];
    });
}


@end

@implementation BrowserTabsListViewController(TagListProtocol)
-(void)didScrollTo:(NSInteger)idx{
    
    self.countLabel.text = [NSString stringWithFormat:@"%ld/%lu",(long)idx+1,(unsigned long)[BrowserTagsManager shareInstance].tabs.count];
}
@end
