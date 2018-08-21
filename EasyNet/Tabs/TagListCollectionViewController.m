//
//  TagListCollectionViewController.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/20.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "TagListCollectionViewController.h"

#import "WebBrowserViewController.h"
#import "BrowserTagsManager.h"
#import "Preference.h"
#import <YYKit.h>

@interface TagListCollectionViewController ()

@end

@implementation TagListCollectionViewController

static NSString * const reuseIdentifier = @"WebTagCollectionViewCell";

- (void)viewDidLoad {
    [super viewDidLoad];
    UICollectionViewFlowLayout *layout =  (UICollectionViewFlowLayout*)self.collectionViewLayout;
    CGFloat radio = [Preference shared].webViewFrame.size.height / [Preference shared].webViewFrame.size.width ;
    CGFloat itmW = YYScreenSize().width - 150;
    layout.itemSize = CGSizeMake(itmW, itmW * radio );
    layout.minimumInteritemSpacing = 0.0f;
    layout.minimumLineSpacing = 0.0f;
    layout.sectionInset = UIEdgeInsetsMake(0.0, 0.f, 0.f, 0.f);
    layout.scrollDirection = UICollectionViewScrollDirectionVertical;
    CGFloat edgeTop =  [Preference shared].webViewFrame.size.height*0.5 - layout.itemSize.height*0.5;
    self.collectionView.contentInset = UIEdgeInsetsMake(edgeTop, 0.f, edgeTop, 0.f);
    // Uncomment the following line to preserve selection between presentations
    // self.clearsSelectionOnViewWillAppear = NO;
    
    
    // Do any additional setup after loading the view.
}
-(void)viewDidAppear:(BOOL)animated{
    [super viewDidAppear:animated];
    if (self.defaultScrollToIndex > 0 && self.defaultScrollToIndex != NSNotFound){
        [self.collectionView scrollToItemAtIndexPath:[NSIndexPath indexPathForItem:self.defaultScrollToIndex inSection:0] atScrollPosition:UICollectionViewScrollPositionCenteredHorizontally animated:false];
    }
    
}

-(void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:animated];
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

#pragma mark <UICollectionViewDataSource>

- (NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView {
    return 1;
}


- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section {

    return [BrowserTagsManager shareInstance].tabs.count;
}

- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath {
    WebTagCollectionViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:reuseIdentifier forIndexPath:indexPath];
    WebBrowserViewController* web = [BrowserTagsManager shareInstance].tabs[indexPath.item];
    cell.titleLabel.text = web.webView.title;
    cell.delegate = self;
    cell.imageVIew.image = [web thumbImage];
    
    return cell;
}
-(void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath{
    WebTagCollectionViewCell *cell  = (WebTagCollectionViewCell*)[collectionView cellForItemAtIndexPath:indexPath];
    CGRect rect = [collectionView convertRect:cell.frame toView:self.view];
    UIImageView *imgv = [[UIImageView alloc]initWithImage:cell.imageVIew.image];
    imgv.frame = rect;
    [self.view addSubview:imgv];
   
    [BrowserTagsManager showTabAt:indexPath.item];
    [UIView animateWithDuration:0.2 animations:^{
        imgv.frame = [Preference shared].webViewFrame;
        
    } completion:^(BOOL finished) {
        [self dismissViewControllerAnimated:false completion:^{
            [imgv removeFromSuperview];
        }];
    }];
    
    
}
#pragma mark <UIScrollViewDelegate>
-(void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    CGFloat centerY = scrollView.contentOffset.y + scrollView.bounds.size.height/2 + scrollView.contentInset.top;
    CGPoint center = CGPointMake(scrollView.bounds.size.width/2, centerY);
    NSIndexPath *idxPath = [self.collectionView indexPathForItemAtPoint:center];
    NSInteger idx = idxPath.item;
    [self.delegate didScrollTo:idx];
}

#pragma mark <UICollectionViewDelegate>

/*
// Uncomment this method to specify if the specified item should be highlighted during tracking
- (BOOL)collectionView:(UICollectionView *)collectionView shouldHighlightItemAtIndexPath:(NSIndexPath *)indexPath {
	return YES;
}
*/

/*
// Uncomment this method to specify if the specified item should be selected
- (BOOL)collectionView:(UICollectionView *)collectionView shouldSelectItemAtIndexPath:(NSIndexPath *)indexPath {
    return YES;
}
*/

/*
// Uncomment these methods to specify if an action menu should be displayed for the specified item, and react to actions performed on the item
- (BOOL)collectionView:(UICollectionView *)collectionView shouldShowMenuForItemAtIndexPath:(NSIndexPath *)indexPath {
	return NO;
}

- (BOOL)collectionView:(UICollectionView *)collectionView canPerformAction:(SEL)action forItemAtIndexPath:(NSIndexPath *)indexPath withSender:(id)sender {
	return NO;
}

- (void)collectionView:(UICollectionView *)collectionView performAction:(SEL)action forItemAtIndexPath:(NSIndexPath *)indexPath withSender:(id)sender {
	
}
*/

@end

@implementation TagListCollectionViewController(panToDelable)
-(void)panCellDidDelete:(UICollectionViewCell *)cell{
    NSIndexPath *indexPath = [self.collectionView indexPathForCell:cell];
    [BrowserTagsManager deleteAt:indexPath.item];
    [self.collectionView deleteItemsAtIndexPaths:@[indexPath]];
    if ([BrowserTagsManager shareInstance].tabs.count == 0) {
        [self dismissViewControllerAnimated:false completion:^{
            WebBrowserViewController *new = [BrowserTagsManager createNewBrowser];
            [BrowserTagsManager addNewTag:new display:true];
        }];
    }else{
        if (indexPath.item == 0){
            [BrowserTagsManager showTabAt:0];
        }else{
            [BrowserTagsManager showTabAt:indexPath.item-1];
        }
    }

}
@end
