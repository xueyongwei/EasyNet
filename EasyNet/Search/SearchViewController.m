//
//  SearchViewController.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/15.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "SearchViewController.h"
#import <YYKit.h>



@interface SearchViewController ()<UISearchBarDelegate>

@property (weak, nonatomic) IBOutlet UISearchBar *searchBar;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *headerHeightConst;

@end

@implementation SearchViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    self.searchBar.delegate = self;
    
//    UITextField *searchField = [self.searchBar valueForKey:@"searchField"];
//    UIImage * img = [UIImage imageWithColor:[UIColor redColor] size:CGSizeMake(YYScreenSize().width, 36)];
//    [self.searchBar setSearchFieldBackgroundImage:img forState:UIControlStateNormal];
    
//    if (searchField) {
    
//        searchField.backgroundColor = [UIColor redColor];
//        [searchField setBackgroundColor:[UIColor colorWithWhite:0 alpha:0.2]];
//    }
    
}

-(void)viewSafeAreaInsetsDidChange{
    [super viewSafeAreaInsetsDidChange];
    self.headerHeightConst.constant = self.view.safeAreaInsets.top + 44;
}

-(void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:animated];
    
    [UIView animateWithDuration:0.1 animations:^{
        self.searchBarSourceView.alpha = 0;
    }];
}

-(void)viewDidAppear:(BOOL)animated{
    [super viewDidAppear:animated];
    [self.searchBar becomeFirstResponder];
    self.searchBar.text = self.currentKeyword;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


-(void)searchBarTextDidBeginEditing:(UISearchBar *)searchBar
{
    [searchBar setShowsCancelButton:true animated:true];
}

-(void)searchBarCancelButtonClicked:(UISearchBar *)searchBar
{
    [searchBar resignFirstResponder];
    
    [searchBar setShowsCancelButton:false animated:true];
 
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [self dismissViewControllerAnimated:false completion:nil];
        self.searchBarSourceView.alpha = 1;
    });
    
}

-(void)searchBarSearchButtonClicked:(UISearchBar *)searchBar{
    
    NSURL *url = [self urlWith:searchBar.text];
    
    [self.delegate shouldVisit:url];
//    NSURLRequest *request = [[NSURLRequest alloc]initWithURL:url];
//    
//    [self.sourceWebview loadRequest:request];
    
    [self searchBarCancelButtonClicked:searchBar];
    
}

-(BOOL)canVisitDirect:(NSString *) urlStr {
    
    BOOL isAvailableUrl = false;
    
    NSString *finalUrl = urlStr;
    
    if (![urlStr containsString:@"://"]){//如果没有scheme，添加为http协议
        finalUrl = [NSString stringWithFormat:@"http://%@",urlStr];
    }
    
    NSString *urlpredicateStr = @"^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$";
    
    NSPredicate *urlPredicate = [NSPredicate predicateWithFormat:@"SELF MATCHES %@",urlpredicateStr];
    
    if ([urlPredicate evaluateWithObject:finalUrl]){
        isAvailableUrl = true;
    }else{
        isAvailableUrl = false;
        //再去验证是否是输入的IP
        NSString* ipstr = @"^(https?:\\/\\/)?(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";
        NSPredicate *ipPredicate = [NSPredicate predicateWithFormat:@"SELF MATCHES %@",ipstr];
        if ([ipPredicate evaluateWithObject:finalUrl]){//是IP
            isAvailableUrl = true;
        }
    }
    
    return isAvailableUrl;
    
}

-(NSURL *)urlWith:(NSString *)keyword{
    
    if ([self canVisitDirect:keyword] == false){//不能直接访问，拼接搜索引擎地址
        
        keyword = [NSString stringWithFormat:@"https://m.baidu.com/s?word=%@",[keyword stringByURLEncode]];
    }
//    keyword = [keyword stringByURLEncode];
    return  [NSURL URLWithString:keyword];
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
