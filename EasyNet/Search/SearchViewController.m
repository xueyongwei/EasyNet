//
//  SearchViewController.m
//  EasyNet
//
//  Created by 薛永伟 on 2018/8/15.
//  Copyright © 2018年 薛永伟. All rights reserved.
//

#import "SearchViewController.h"
#import <YYKit.h>
#import "NSString+Url.h"
#import "SearchInputView.h"


@interface SearchViewController ()<UISearchBarDelegate>

@property (weak, nonatomic) IBOutlet UISearchBar *searchBar;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *headerHeightConst;
@property (weak, nonatomic) IBOutlet UITableView *tableView;
@property (weak, nonatomic) IBOutlet UIStackView *stackView;

@property (nonatomic,strong) NSMutableArray *searchSource;
@property (nonatomic,assign) NSInteger currentSearchType;
@property (nonatomic,weak) UIButton *currentEngineBtn;
@property (nonatomic,strong) SearchInputView *inputView;
@end

@implementation SearchViewController

- (void)viewDidLoad {
    
    [super viewDidLoad];
    self.searchSource = [NSMutableArray new];
    self.searchBar.delegate = self;
    NSArray *web = @[@{@"百度":@"https://m.baidu.com/s?word="},
                     @{@"搜狗":@"https://m.sogou.com/web/searchList.jsp?keyword="},
                     @{@"必应":@"https://cn.bing.com/search?q="}
                     ];
    NSArray *pic = @[@{@"百度":@"https://m.baidu.com/sf/vsearch?pd=image_content&word="},
                     @{@"搜狗":@"https://m.sogou.com/web/searchList.jsp?keyword="},
                     @{@"必应":@"https://cn.bing.com/images/search?q="},
                     @{@"花瓣":@"http://huaban.com/search/?q=yuri"},
                     ];
    NSArray *articl = @[@{@"微信文章":@"http://weixin.sogou.com/weixinwap?ie=utf8&type=2&query="},
                        @{@"百度文库":@"https://m.baidu.com/sf/vsearch?pd=wenku&word="},
                        @{@"今日头条":@"https://www.toutiao.com/search/?keyword="},
                        ];
    NSArray *ask = @[@{@"知乎":@"http://zhihu.sogou.com/zhihuwap?query="},
                     @{@"百度知道":@"https://m.baidu.com/sf/vsearch?pd=wenda_tab&word=yuri"},
                     @{@"悟空问答":@"https://www.wukong.com/search/?keyword="},
                     ];
    NSArray *video = @[@{@"优酷":@"http://www.soku.com/m/y/video?q="},
                     @{@"爱奇艺":@"http://m.iqiyi.com/search.html?source=hot&key="},
                     @{@"腾讯视频":@"http://m.v.qq.com/search.html?act=0&keyWord="},
                     ];
    self.searchSource = [NSMutableArray arrayWithObjects:web,pic,articl,ask,video, nil];
    
    [self customStackView:self.searchSource.firstObject];
    
    
    
    SearchInputView *siv = [[NSBundle mainBundle]loadNibNamed:@"SearchInputView" owner:self options:nil].lastObject;
    UITextField *searchField = [_searchBar valueForKey:@"_searchField"];
    siv.textField = searchField;
    self.inputView = siv;
    self.searchBar.inputAccessoryView = siv;
    
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
//    self.searchBar.text = self.currentKeyword;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)searchSegmentChanged:(UISegmentedControl *)sender {
    
    self.currentSearchType = sender.selectedSegmentIndex;
    NSArray *engines = self.searchSource[sender.selectedSegmentIndex];
    
    [self customStackView:engines];
    
}

-(void)customStackView:(NSArray *)engines{
    [self.stackView removeAllSubviews];
    NSInteger i = 0;
    for (NSDictionary *dic  in engines) {
        
        UIButton *btn = [UIButton buttonWithType:UIButtonTypeCustom];
        btn.tag = 100+i;
        [btn setTitle:dic.allKeys.firstObject forState:UIControlStateNormal];
        [btn setTitleColor:[UIColor lightGrayColor] forState:UIControlStateNormal];
        [btn setTitleColor:[UIColor darkGrayColor] forState:UIControlStateSelected];
        [self.stackView addArrangedSubview:btn];
        [btn addTarget:self action:@selector(onEngineClick:) forControlEvents:UIControlEventTouchUpInside];
        btn.titleLabel.font = [UIFont systemFontOfSize:12];
        i++;
    }
    UIButton *first = [self.stackView viewWithTag:100];
    self.currentEngineBtn = first;
    first.selected = YES;
    
}
-(void)onEngineClick:(UIButton*)sender{
    sender.selected = YES;
    self.currentEngineBtn.selected = false;
    self.currentEngineBtn = sender;
}
-(void)searchBarTextDidBeginEditing:(UISearchBar *)searchBar
{
    [searchBar setShowsCancelButton:true animated:true];
}
-(void)searchBar:(UISearchBar *)searchBar textDidChange:(NSString *)searchText{
    self.inputView.slider.enabled = searchText.length > 0;
    [self.inputView switchQuickInputStateToFirst:searchText.length < 1];
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
    NSString *searchKey = searchBar.text;
    if ([searchKey isURL]) {
        if (![searchBar.text containsString:@"://"]) {
            searchKey = [NSString stringWithFormat:@"http://%@",searchKey];
        }
        NSURL *url = [[NSURL alloc]initWithString:searchKey];
        [self.delegate shouldVisit:url];
    }else{
        NSURL *url = [self searchEngineUrlWith:searchKey];
        [self.delegate shouldVisit:url];
    }
    
//    NSURLRequest *request = [[NSURLRequest alloc]initWithURL:url];
//    
//    [self.sourceWebview loadRequest:request];
    
    [self searchBarCancelButtonClicked:searchBar];
    
}


-(NSURL *)searchEngineUrlWith:(NSString *)keyword{
    NSDictionary *engine = self.searchSource[self.currentSearchType][self.currentEngineBtn.tag -100];
    
    NSString *enggineUrl = engine[engine.allKeys.firstObject];
    keyword = [NSString stringWithFormat:@"%@%@",enggineUrl,[keyword stringByURLEncode]];
    return  [NSURL URLWithString:keyword];
}

#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    if ([segue.identifier isEqualToString:@"SearchTableViewController"]) {
        SearchTableViewController *svc = (SearchTableViewController*)segue.destinationViewController;
        svc.delegate = self;
        svc.currentUrlStr = self.currentKeyword;
    }
}


@end

@implementation SearchViewController(tableView)
-(void)SearchTableViewControllerFillUrl:(NSString *)str{
    self.searchBar.text = str;
    [self searchBar:self.searchBar textDidChange:str];
}
-(void)SearchTableViewControllerClickUrl:(NSString *)str{
    self.searchBar.text = str;
    [self searchBarSearchButtonClicked:self.searchBar];
}
@end
