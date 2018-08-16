//sites.js

var cache = {};
window.OOFVOIDACTIONSHEET = true;
window.OOF_GET_INDEX_DATA = function (data) {
  cache.homeList = data;
  cache.homeList = recordSites.objArrUnique(cache.homeList)
  if($('title').text() == "首页") { //index.html
    if($('#firstPage ul').length) {
      recordSites.show(1);
    } else {
      recordSites.show(2);
    }
  } else { //addurl.html
    setTimeout(function () {
      var my = cache.homeList;

      var Sites = Y("#SiteBox li");
      if(my.length <= 0) return;
      for(var i = 0; i < my.length; i++) {
        if(my[i].title) {
          var _self = my[i];
          my[i] = [_self.title, _self.link, _self.icon, _self.id];
        }
        var str = my[i][0];
        var id = my[i][3];
        for(var j = 0; j < Sites.length; j++) {
          var _str = Sites.eq(j).Attr("data-info").split(',')[0];
          if(str == _str) {
            Sites.eq(j).addClass("select");
            Sites.eq(j).get(0).id = id;
            break;
          }
        }
      }
    }, 100);
  }
}
var DefaultSite = [
	["书签/历史", "javascript:;", "0"],
    ["网址导航", "http://m.hao123.com/?union=1&from=1012550g&tn=ops1012550g", "7"], ["百度", "http://m.baidu.com/s?from=1006749l", "6"],
	["生活服务", "http://v2.tjj.com/click.php?id=11962&tourl=http%3A%2F%2Fh5.114la.com%2Fbrowser%2F%3Ft%3Dlive%26title%3Dyes", "1"],
	["今日头条", "http://toutiao.eastday.com/?qid=jrtt", "2"],
	// ["看视频","http://v2.tjj.com/click.php?id=11954&tourl=http%3A%2F%2Fv.114la.com%2Fm","3"],
	// ["免费小说","http://v2.tjj.com/click.php?id=11955&tourl=http%3A%2F%2Fdushu.baidu.com","4"],
	["放松一下", "http://v2.tjj.com/click.php?id=11956&tourl=http%3A%2F%2Fwww.qiushibaike.com", "5"], ["金融理财", "http://m.caihang.com?channelwap=M96", "8"],
	["天猫", "http://s.click.taobao.com/t?e=m%3D2%26s%3DZ7yc9Gb9X1AcQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMRw%2FIUM%2FQCJNJ1gyddu7kN%2BfYR3yNcR58W5gf3vy9Hup03EXPehL9PJyHW2IHTzG6aUuZxIcp9pfUIgVEmFmgnbDX0%2BHH2IEVa7A5ve%2FEYDnFveQ9Ld2jopwTqWNBsAwm%2BIKl4JSR4lzxgxdTc00KD8%3D", "9"],
	["爱淘宝", "http://ai.m.taobao.com?pid=mm_33597634_9482690_36918974", "11"],
	["淘宝", "http://m.taobao.com", "10"]
];
var AllSite = {
  "hot": [ //热门
		["新浪微博", "http://weibo.com/", "hot2", "热门"],
		["美团", "http://www.meituan.com/", "hot4"],
		// ["今日头条", "http://toutiao.com/", "hot5"],
		["携程旅游", "http://www.ctrip.com/", "hot7"],
		["优酷", "http://www.youku.com/", "hot8"],
		["去哪儿", "http://www.qunar.com/", "hot10"],
		["汽车之家", "http://m.autohome.com.cn/", "hot11"],
		["爱奇艺", "http://www.iqiyi.com/", "hot13"],
		["新浪", "http://www.sina.cn/", "news1"],
		["斗鱼TV", "http://www.douyutv.com/", "hot12"]
	],
  "news": [ //新闻
		["网易", "http://www.163.com/", "news2", "新闻"],
		["凤凰网", "http://www.ifeng.com/", "news4"],
		["搜狐", "http://m.sohu.com/", "news6"],
		["腾讯", "http://info.3g.qq.com/", "news7"],
		["百度新闻", "http://jian.news.baidu.com/", "news11"]
	],
  "tv": [ //视频
		["乐视", "http://m.le.com/", "tv2", "视频"],
		["搜狐视频", "http://tv.sohu.com/", "tv4"],
		["网易视频", "http://v.163.com/", "tv5"],
		["新浪视频", "http://video.sina.com.cn/", "tv6"],
		["腾讯视频", "http://v.qq.com/", "tv7"],
		["凤凰视频", "http://v.ifeng.com/", "tv8"],
		["芒果TV", "http://m.hunantv.com/#/splash", "tv9"],
		["PPTV", "http://www.pptv.com/", "tv10"],
		["百度视频", "http://www.video.baidu.com/", "tv11"]
	],
  "shopping": [ //购物
		["苏宁易购", "http://www.suning.com/", "shopping3", "购物"],
		["京东商城", "http://www.jd.com/", "shopping2"],
		["国美在线", "http://www.gome.com.cn/", "shopping5"],
		["亚马逊", "http://www.amazon.cn/", "shopping6"],
		["美丽说", "http://www.meilishuo.com/", "shopping7"],
		["蘑菇街", "http://www.mogujie.com/", "shopping8"],
		["1号店", "http://www.yhd.com/", "shopping9"],
		["唯品会", "http://www.vip.com/", "shopping10"],
		["聚美优品", "http://gz.jumei.com/", "shopping11"],
		["当当网", "http://www.dangdang.com/", "shopping12"]
	],
  "live": [ //生活
		["美团网", "http://www.meituan.com/", "live1", "生活"],
		["大众点评", "http://www.dianping.com/", "live2"],
		["赶集网", "http://www.ganji.com/", "live3"],
		["携程旅游", "http://www.ctrip.com/", "live4"],
		["阿里旅行", "https://www.alitrip.com/", "live7"]
	],
  "book": [ //小说
		["起点", "http://h5.qidian.com/", "book1", "小说"],
		["纵横", "http://www.zongheng.com/", "book2"],
		["17k小说", "http://www.17k.com/", "book7"],
		["红袖添香", "http://www.hongxiu.com/", "book9"]
	],
  "gaoxiao": [ //搞笑
		["糗事百科", "http://www.qiushibaike.com/", "gaoxiao1", "搞笑"],
		["暴走漫画", "http://baozoumanhua.com/", "gaoxiao3"],
		["捧腹网", "http://www.pengfu.com/", "gaoxiao2"],
		["笑话集", "http://www.jokeji.cn/", "gaoxiao4"]
	]
}

//path
var recordSites = {
  StoragenName: "mysites",
  ImgPath: '',
  DefaultImg: "default",
  onepage: function () {
    if(window.orientation == 180 || window.orientation == 0) {
      //cache.screenType = 1;
      cache.height = window.screen.height;
      cache.width = window.screen.width;
    }
    if(window.orientation == 90 || window.orientation == -90) {
      //cache.screenType = 0;
      cache.height = window.screen.width;
      cache.width = window.screen.height;
    }
    var num = (~~(cache.height / 150) + 2) * 4;
    return num;
  },
  MaxPage: 10,
  hasChange: 0,
  touchTimeout: null,
  index: 'index.html',
  sites: 'addurl.html',
  reset: function () {
    Y("#allpage").tabPage();
  },
  loadSite: function () {
    var Site_html = '';
    var Sort_html = '';
    for(var i in AllSite) {
      var obj = AllSite[i];
      Sort_html += '<a href="javascript:void(0)">' + obj[0][3] + '</a>';
      for(var j = 0; j < obj.length; j++) {
        if(j == 0) {
          obj[j].pop();
        }
        var info = obj[j];
        var css = j == 0 ? ' class="tag"' : '';
        Site_html += '<li' + css + ' data-info="' + info.join(",") + '"><a href="javascript:void(0)"><div class="img"><b class="s"></b><img src="' + recordSites.ImgPath + info[2] + '.png" alt="' + info[0] + '"></div><p>' + info[0] + '</p></a></li>';
      }
    }
    $("#SiteBox").html(Site_html);
    $("#SiteSort").html(Sort_html);
    $("#SiteSort a").eq(0).addClass('on');
    var h_sitebox = document.documentElement.clientHeight - Y("#AllSites .isites").Offset(Y(".AllWrap").get(0)).top;
    Y("#SiteBox").get(0).style.height = h_sitebox + "px";
    Y("#AllSites .isites").pointSc("#SiteBox", "#SiteSort a", ".tag");
    $(".allSites .isites li").on("click", function () {
      var _self = $(this);
      var sel = $(this).hasClass("select");
      var info = $(this).attr("data-info").split(",");
      if(sel) {
        $(this).removeClass("select");
        var id = $(this).get(0).id;
        recordSites.del(info[0], info[1], info[2], id);
      } else {
        $(this).addClass("select");
        recordSites.add(info[0], info[1], info[2], '', _self);
      }
    });
    this.sitesel();
  },
  add: function (name, url, img, remarks, _self) {
    var _img = img ? img : this.DefaultImg;

    var id, _this = this;

    if(window.webkit.messageHandlers.OOFJS.postMessage) {
      window.webkit.messageHandlers.OOFJS.postMessage({
        fun: "homeAdd",
        arg: [name, url, img, remarks, 'OOF_GET_LINK_ID']
      });
    }

    window.OOF_GET_LINK_ID = function (id) {
      if(!id) {
        id = '000';
      }
      Storage.ArrAdd(_this.StoragenName, [name, url, _img, id]);
      if(_self && id !== '000') {
        _self.get(0).id = id;
      }
      var len = Y("#mySites .page li").length;
      if(len > _this.onepage * _this.MaxPage) {
        _this.alert("您添加的网址数量已达到最大限度！");
      }
    }

  },
  del: function (name, url, img, id) {
    var _img = img ? img : this.DefaultImg;
    if(!id) {
      id = '000';
    }
    Storage.ArrDel(this.StoragenName, [name, url, _img, id]);
    if(id) {
      // alert(id);
      if(window.webkit.messageHandlers.OOFJS.postMessage) {
        window.webkit.messageHandlers.OOFJS.postMessage({
          fun: "homeDelete",
          arg: [id]
        });
      }
    }
  },
  sitesel: function () {
    if(window.webkit.messageHandlers.OOFJS.postMessage) {
      window.webkit.messageHandlers.OOFJS.postMessage({
        fun: 'homeList',
        arg: ['OOF_GET_INDEX_DATA']
      });
    }
  },
  showDel: function () {
    this.hasChange = Storage.get(this.StoragenName);
    Y("#allpage .page li.custom").addClass("del");
    Y("#addSite").get(0).style.display = 'none';
    Y(".isites .complete").addClass("cp_on");
    if(typeof app != "undefined" && typeof app.requestVibration != "undefined") {
      app.requestVibration();
    }
  },
  hideDel: function () {
    if($("#allpage .page li.custom").length > 0) {
      $("#allpage .page li.custom").removeClass("del");
    }
    $("#addSite").hide();
    $(".isites .complete").removeClass("cp_on");
    if(this.hasChange != Storage.get(this.StoragenName)) {
      this.show(1);
      this.sitesel();
    } else {
      //重载
      if(window.webkit.messageHandlers.OOFJS.postMessage) {
        window.webkit.messageHandlers.OOFJS.postMessage({
          fun: 'homeList',
          arg: ['OOF_GET_INDEX_DATA']
        });
      }
    }
  },
  getData: function () {
    var data, _this = this;
    if(window.webkit.messageHandlers.OOFJS.postMessage) {
      cache.homeList = this.objArrUnique(window.webkit.messageHandlers.OOFJS.postMessage({
        fun: "homeList",
        arg: "OOF_GET_INDEX_DATA"
      }));

      data = cache.homeList;
    }
    console.log('homeList:' + JSON.stringify(data));
    return data;
  },

  objArrUnique: function (arrTemp) {
    if((typeof arrTemp) !== "object") {
      console.log("去重失败");
    }
    Array.prototype.unique = function () {
      var res = [];
      var json = {};
      for(var i = 0; i < this.length; i++) {
        if (this[i].link[this[i].link.length - 1] === '/') {
          this[i].link = this[i].link.substr(0 ,this[i].link.length - 1);
        }
        if(!json[this[i].title + this[i].link]) { //避免id不同时，误认为不重复
          res.push(this[i]);
          json[this[i].title + this[i].link] = 1;
        }
      }
      return res;
    };
    return arrTemp.unique();
  },
  show: function (b) {
    if(b && b == 2) {} else {
      Y("#allpage").remove();
      var AllP = document.createElement("div");
      AllP.id = "allpage";
      AllP.className = "allpage";
      if(!window.weatherHtml) weatherHtml = '天气加载中……';
      AllP.innerHTML = '<div class="page" id="firstPage"><div id="iweather" class="iweather" onclick="location.href=\'http://h5.114la.com/browser/?t=weather&title=yes\'">' + weatherHtml + '</div></div>';
      Y(".isites").get(0).insertBefore(AllP, Y(".isites").get(0).firstChild);
    }
    var _this = this;
    var my = cache.homeList;

    var max = my.length >= this.onepage * this.MaxPage;
    var _html = '<ul>',
      _n = 4;
    var over = function () {
      if(!max) {
        if(_n % _this.onepage() == 0) {
          _html += '<div class="page"><ul>'
        }
        var _version = Version ? '?&version=' + Version : '';
        _html += '<li class="add" id="addSite"><a href="javascript:;"><div class="img"><img src="add.png"></div><p>添加</p></a></li>';
        if(_n % _this.onepage() == 0) {
          if(_n == _this.onepage()) {
            _html += '</ul>';
          } else {
            _html += '</ul></div>'
          }
        }
      }
      var newnode = document.createElement("div");
      newnode.innerHTML = _html;
      var ns = newnode.children;
      var len = ns.length;
      for(var i = 0; i < len; i++) {
        if(i == 0) {
          Y("#firstPage").get(0).appendChild(ns[0])
        } else {
          Y("#allpage").get(0).appendChild(ns[0]);
        }
      }
      var n = Math.floor(_n / recordSites.onepage());
      if(b) {
        Y("#allpage").tabPage();
      } else {
        Y("#allpage").tabPage(n);
      }
    }
    var mysto = function () {

      for(var j = 0; j < my.length; j++) {
        if(_n % _this.onepage() == 0) {
          _html += '<div class="page"><ul>'
        }

        // 对象转数组
        if(my[j].title) {
          var _self = my[j];
          if(!_self.icon || _self.icon.indexOf('favicon.ico') > -1 || _self.icon === "default") {
            _self.icon = recordSites.getExistingHostNameImg(_self.link);
          }
          if (_self.link.indexOf("115.com/lx") > -1) {
            _self.icon = "lx";
          }
          my[j] = [_self.title, _self.link, _self.icon, _self.id];
        }

        _html += '<li class="custom" id="' + my[j][3] + '" data-info="' + my[j].join(",") + '"><a href="javascript:void(0)"><div class="img"><b class="d"></b><img src="' + _this.ImgPath + my[j][2] + '.png" alt="' + my[j][0] + '"></div><p><b></b>' + my[j][0] + '</p></a></li>';
        _n++;
        if(_n % _this.onepage() == 0 || (j == my.length - 1 && max)) {
          if(_n == _this.onepage()) {
            _html += '</ul>';
          } else {
            _html += '</ul></div>'
          }
        }
        if(j == my.length - 1) {
          over();
        }
      }
    }
    var inapp = false,
      own, Bs115I = false;
    if(typeof Version != "undefined" && Version) {
      inapp = true;
      own = [1, 3];
      Bs115I = Version == "115I";
    }
    for(var i = 0; i < DefaultSite.length; i++) {
      if(_n % _this.onepage() == 0) {
        _html += '<div class="page"><ul>'
      }
      var nn = parseInt(DefaultSite[i][2]);
      if(inapp && own.indexOf(nn) >= 0) { //自己的链接加参数
        if(!(Bs115I && parseInt(DefaultSite[i][2]) == 3)) { //115浏览器不显示看视频
          _html += '<li><a href="' + DefaultSite[i][1] + '?&v=' + Version + '"><div class="img"><img src="' + _this.ImgPath + DefaultSite[i][2] + '.png" alt="' + DefaultSite[i][0] + '"></div><p>' + DefaultSite[i][0] + '</p></a></li>';
        }
      } else {
        _html += '<li><a href="' + DefaultSite[i][1] + '"><div class="img"><img src="' + _this.ImgPath + DefaultSite[i][2] + '.png" alt="' + DefaultSite[i][0] + '"></div><p>' + DefaultSite[i][0] + '</p></a></li>';
      }
      _n++;
      if(_n % _this.onepage() == 0) {
        if(_n == this.onepage()) {
          _html += '</ul>';
        } else {
          _html += '</ul></div>'
        }
      }
      if(i == DefaultSite.length - 1) {
        if(my.length != 0) {
          mysto();
        } else {
          over();
        }
      }
    }
    Y('#addSite').on('click', function () {
      if(window.webkit.messageHandlers.OOFJS.postMessage) {
        window.webkit.messageHandlers.OOFJS.postMessage({
          fun: "bookMarkAdd",
          arg: [_this.sites]
        });
      } else {
        location.href = recordSites.sites;
      }
    });
    $('#firstPage').on('click', 'ul li:first', function () {
      if(window.webkit.messageHandlers.OOFJS.postMessage) {
        window.webkit.messageHandlers.OOFJS.postMessage({
          fun: "showBookmarkAndHistory",
          arg: []
        });
      }
    });
  },
  IsURL: function (urlString) {
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)" +
      "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
      +
      "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
      +
      "|" // 允许IP和DOMAIN（域名）
      +
      "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
      +
      "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
      +
      "[a-z]{2,6})" // first level domain- .com or .museum
      +
      "(:[0-9]{1,4})?" // 端口- :80
      +
      "((/?)|" // a slash isn't required if there is no file name
      +
      "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re = new RegExp(strRegex);
    if(urlString.indexOf(".") == -1) {
      return false;
    } else {
      return true;
    }
    if(re.test(urlString)) {
      return(true);
    } else {
      return(false);
    }
  },
  save: function () {
    var _name = $.trim($("#SiteName").val());
    var _url = $.trim($("#SiteUrl").val());
    var _version = Version ? '?&version=' + Version : '';

    if(_name == "" && _url == "") {
      this.alert('标题和网址不能为空', 'warn');

      if(window.app && window.app.bookMarkAdd) { //android
        setTimeout(function () {
          window.app.bookMarkAdd('');
        }, 100);
      }
    } else if(_name === "" && _url !== "") {
      this.alert("请输入标题!", "warn");
    } else if(_name !== "" && _url === "") {
      this.alert("请输入网址!", "warn");
    } else {
      if(!this.IsURL(_url)) {
        this.alert("请输入正确的网址!", "warn")
      } else {
        if(!/^(https|http|ftp|rtsp|mms)?:\/\//.test(_url)) {
          _url = "http://" + _url;
        }
        // if(window.webkit.messageHandlers.OOFJS.postMessage) {
        //   cache.homeList = this.objArrUnique(window.webkit.messageHandlers.OOFJS.postMessage.homeList());
        // }

        for(var i = 0; i < cache.homeList.length; i++) {
          if(cache.homeList[i].link === _url && cache.homeList[i].title === _name) {
            this.alert('已添加', 'right');
            cache.repeat = true;
          } else {
            cache.repeat = false;
          }
        }
        if(!cache.repeat) {
          recordSites.add(_name, _url, this.DefaultImg);
          this.alert('添加成功', 'right');
        }
        $('#SiteName').val('');
        $('#SiteUrl').val('');
      }
    }
  },
  getHostName: function (url) {
    if(url.indexOf('http') != 0) return;
    var a = document.createElement('a');
    a.href = url;
    return a.host;
  },
  getExistingHostNameImg: function (url) {
    var self = this;
    var AllSiteTem = AllSite;
    AllSiteTem.default = DefaultSite;
    for(var k in AllSiteTem) {
      for(var i = 0; i < AllSiteTem[k].length; i++) {
        if(self.getHostName(AllSiteTem[k][i][1]) === self.getHostName(url)) {
          return AllSiteTem[k][i][2];
        }
      }
    }
    return self.DefaultImg;
  },
  alert: function (txt, type) { //type:error, right, warn;
    var html = '<div class="box"><p class="img-tip ' + type + '"></p><p class="content">' + txt +
      '</p></div>';
    $('.alertTip').html(html).show();
    setTimeout(function () {
      $('.alertTip').hide();
    }, 1000);
    return false;
  }
};

window.addEventListener("orientationchange", function () {
  setTimeout(function () {
    if($('title').text() === "首页") {
      recordSites.show(1);
    } else {
      var h_sitebox = document.documentElement.clientHeight - Y("#AllSites .isites").Offset(Y(".AllWrap").get(0)).top;
      $("#SiteBox").get(0).style.height = h_sitebox + "px";

    }
    console.log("height:" + cache.height + "width:" + cache.width);

    if($('.cp_on').is(':visible')) { //解决ios 8.4 旋转屏幕时渲染with：100% 出错
      $('[name=viewport]').attr('content', 'width=device-width,initial-scale=1.1,maximum-scale=1.1,user-scalable=no');
      recordSites.showDel();
      setTimeout(function () {
        $('[name=viewport]').attr('content', 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no');
      }, 100);
    }
  }, 300);
});
