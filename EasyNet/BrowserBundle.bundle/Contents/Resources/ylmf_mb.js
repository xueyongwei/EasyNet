/*by chenjianhua 2015-11-6*/
var Ajax = function () {
  var request = function (url, opt) {
    function fn() {}
    var async = opt.async !== false,
      method = opt.method || 'GET',
      _data = opt.data || null,
      success = opt.success || fn,
      failure = opt.failure || fn;
    method = method.toUpperCase();
    var data = null;
    opt.before && opt.before();
    if(_data) {
      data = "";
      for(var key in _data) {
        data += "&" + key + "=" + encodeURIComponent(_data[key]);
      }
      data = data.slice(1);
    }
    if(method == 'GET' && data) {
      url += (url.indexOf('?') == -1 ? '?' : '&') + data;
      data = null;
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      _onStateChange(xhr, success, failure);
    };
    xhr.open(method, url, async);
    if(method == 'POST') {
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;');
    }
    xhr.send(data);
    return xhr;
  }
  var _onStateChange = function (xhr, success, failure) {
    if(xhr.readyState == 4) {
      var s = xhr.status;
      if(s >= 200 && s < 300) {
        var html = xhr.response.clearBr();
        var reg = /\<script[^>]*\>([^\x00]+)\<\/script\>/i;
        var fun = null;
        if(html.match(reg)) {
          fun = html.match(reg)[1];
          xhr.html = html.replace(html.match(reg)[0], "");
        } else {
          xhr.html = html;
        }
        xhr.fun = fun;
        success(xhr);
        fun && eval(fun);
      } else {
        failure(xhr);
      }
    } else {}
  }
  var ScriptLoader = function (src, charset, callback) {
    if(!src) return;
    var doc = document;
    var Head = doc.getElementsByTagName('head')[0],
      Script = doc.createElement('script');
    Script.onload = Script.onreadystatechange = function () {
      if(Script && Script.readyState && Script.readyState != 'loaded' && Script.readyState != 'complete') return;
      Script.onload = Script.onreadystatechange = Script.onerror = null;
      Script.Src = '';
      if(!doc.all) {
        Script.parentNode.removeChild(Script);
      }
      Script = null;
      callback && callback();
    };
    Script.src = src;
    Script.charset = charset || 'utf-8';
    Head.insertBefore(Script, Head.firstChild);
    return Script;
  }
  return {
    request: request,
    ScriptLoader: ScriptLoader
  };
}();

var Storage = {
  set: function (name, val) {
    window.localStorage.setItem(name, val);
  },
  get: function (name) {
    return window.localStorage[name] || null;
  },
  clear: function (name) {
    window.localStorage.removeItem(name);
  },
  ArrGet: function (name) {
    var arr = window.localStorage[name] ? JSON.parse(window.localStorage[name]) : [];
    return arr;
  },
  ArrAdd: function (name, val) {
    if(arguments.length < 2) return;
    var arr = this.ArrGet(name);
    var _i = this.Check(arr, val);
    if(_i >= 0) return false;
    arr.push(val);
    arr = JSON.stringify(arr);
    this.set(name, arr);
  },
  ArrDel: function (name, val) {
    if(arguments.length < 2) return;
    var arr = this.ArrGet(name);
    var _i = this.Check(arr, val);
    if(_i < 0) return false;
    arr.splice(_i, 1);
    if(arr.length == 0) {
      this.clear(name);
    } else {
      arr = JSON.stringify(arr);
      this.set(name, arr);
    }
  },
  Check: function (arr, val) {
    if(typeof val == "object") {
      var str = val.join(",");
      for(var i = 0; i < arr.length; i++) {
        var _str = arr[i].join(",");
        if(_str == str) {
          return i;
        } else if(i == arr.length - 1) {
          return -1;
        }
      }
    } else {
      if(Array.prototype.indexOf.call(arr, val) >= 0) {
        return Array.prototype.indexOf.call(arr, val);
      } else {
        return -1;
      }
    }
  }
} /*数组方法支持二维数组*/

;
(function () {
  var ylmf = (function () {
    var ylmf = function (selector, context) {
        return new ylmf.fn.init(selector, context);
      },
      push = Array.prototype.push;
    String.prototype.Trim = function () {
        var str = this.replace(/\s+/g, "");
        str = str.replace(/[\r\n]/g, "");
        return str;
      } //清除空行
    String.prototype.clearBr = function () {
        return this.replace(/[\r\n]/g, "");
      } //清除换行
    String.prototype.clearSide = function () {
        var s = this.clearBr();
        s = s.replace(/^(\s+)/, "");
        s = s.replace(/(\s+)$/, "");
        return s;
      } //清除两边空格
    ylmf.GetUrlPar = function (name) {
      var reg = new RegExp("(&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r != null) return unescape(r[2]);
      return null;
    }
    ylmf.fn = ylmf.prototype = {
      init: function (selector, context) {
        context = context || document;
        if(!selector) {
          this.length = 0;
          return this;
        } else if(selector == document) {
          this[0] = document;
          this.length = 1;
        } else if(selector instanceof HTMLElement) {
          this[0] = selector;
          this.length = 1;
        } else {
          var el = context.querySelectorAll(selector);
          if(arguments.length > 2) {
            this[0] = el[i];
            this.length = 1;
          } else {
            for(var i = 0; i < el.length; i++) {
              this[i] = el[i];
            }
            this.length = el.length
          };
        }
        return this;
      },
      length: 1,
      eq: function (n) {
        var _n = this[n];
        var obj = new ylmf();
        obj[0] = _n;
        obj.length = 1;
        return obj;
      },
      get: function (n) {
        return this[n];
      },
      Ele: function () {
        var obj = [];
        for(var i = 0; i < this.length; i++) {
          obj.push(this[i]);
        }
        return obj;
      },
      on: function (e, f) {
        var _this = this.Ele();
        for(var i = 0; i < _this.length; i++) {
          _this[i].addEventListener(e, f, false);
          _this[i].index = i;
        }
      },
      css: function (st, val) {
        if(arguments.length < 2) {
          return window.getComputedStyle(this)[st];
        }
        this.style[st] = val;
      },
      Css: function (n) {
        var _n = parseInt(n);
        this.Attr("style", "-webkit-transform:translate(" + _n + "px,0);transform:translate3d(" + _n + "px,0,0);"); //为兼容低版，这里第一个用2d
        this.Attr("data-f", _n);
      },
      Attr: function (attr, val) {
        var _this = this.get(0);
        if(arguments.length < 2) {
          try {
            return _this.getAttribute(attr) == null ? "" : _this.getAttribute(attr);
          } catch(e) {
            return null
          }
        }
        _this.setAttribute(attr, val);
      },
      remove: function () {
        var _this = this.Ele();
        for(var i = 0; i < _this.length; i++) {
          var _par = _this[i].parentNode;
          _par.removeChild(_this[i]);
        }
      },
      clearSpace: function (str) {
        var s = str.replace(/\s+/g, " ");
        s = s.replace(/^(\s+)/, "");
        s = s.replace(/(\s+)$/, "");
        return s;
      },
      addClass: function (css) {
        var _this = this;
        if(_this.hasClass(css)) return;
        if(_this.length) {
          for(var i = 0; i < _this.length; i++) {
            var _css = this.eq(i).Attr("class");
            _css = _css + " " + css;
            _css = this.clearSpace(_css);
            this.eq(i).Attr("class", _css);
          }
        } else {
          var _css = this.Attr("class");
          _css = _css + " " + css;
          _css = this.clearSpace(_css);
          this.Attr("class", _css);
        }
      },
      hasClass: function (css) {
        var _css = this.Attr("class");
        var has = _css.indexOf(css);
        return has > -1 ? true : false;
      },
      removeClass: function (css) {
        var _this = this;
        if(_this.length) {
          for(var i = 0; i < _this.length; i++) {
            var _css = this.eq(i).Attr("class");
            if(_css != "" && _css != null) {
              if(_css.indexOf(css) > -1) {
                _css = _css.replace(css, "");
                _css = this.clearSpace(_css);
                this.eq(i).Attr("class", _css);
              }
            }
          }
        } else {
          var _css = this.Attr("class");
          if(_css) {
            if(_css.indexOf(css) > -1) {
              _css = _css.replace(css, "");
              _css = this.clearSpace(_css);
              this.Attr("class", _css);
            }
          }
        }
      },
      css: function (st, val) {
        var _this = this.get(0);
        if(arguments.length < 2) {
          return window.getComputedStyle(_this)[st];
        }
        _this.style[st] = val;
      },
      touch: function (config) {
        var x_s;
        var x_e;
        var y_s;
        var y_e;
        config.obj = this;
        config.ele = this.get(0);
        this.get(0).addEventListener("touchstart", function (e) {
          var tar = e.target;
          config.e = e;
          x_s = e.touches[0].clientX;
          y_s = e.touches[0].clientY;
          config.xs = x_s;
          config.ys = y_s;
          config.xe = x_s;
          config.ye = y_s;
          config.start && config.start();
        }, false);
        this.get(0).addEventListener("touchmove", function (e) {
          var tar = e.target;
          x_e = e.touches[0].clientX;
          y_e = e.touches[0].clientY;
          if((config.horizontal && Math.abs(y_e - y_s) > 60) || (!config.horizontal && Math.abs(x_e - x_s) > 60)) {
            return;
          }
          config.e = e;
          config.xe = x_e;
          config.ye = y_e;
          config.move && config.move();
        }, false);
        this.get(0).addEventListener("touchend", function (e) {
          var tar = e.target;
          config.end && config.end();
        }, false);
      },
      Scroll: function (t, speed) {
        var _ele = this.get(0);
        var _t = _ele.scrollTop;
        var fps = speed > 1000 ? Math.ceil(speed / 20) : 36; //动画帧数
        var pic = (t - _t) / fps; //动画样式每帧值差
        var inter = Math.ceil(speed / fps); //每帧时差
        ;
        (function () {
          // console.log("scroll");
          _t += pic;
          if((_t >= t && pic >= 0) || (_t <= t && pic <= 0)) {
            _ele.scrollTop = _t;
          } else {
            _ele.scrollTop = _t;
            setTimeout(arguments.callee, inter);
          }
        })();
      },
      Animate: function (prop, speed, callback) {
        var _this = this;
        var start = parseInt(_this.Attr("data-f")); //动画样式初始值
        var end; //动画样式结束值
        var fps = speed > 1000 ? Math.ceil(speed / 50) : 20; //动画帧数
        var pic; //动画样式每帧值差
        var inter = Math.floor(speed / fps); //每帧时差
        for(var i in prop) {
          end = parseInt(prop[i]);
          pic = (end - start) / fps;
        }
        if(Math.abs(end - start) <= 1) return; //首尾差小于1,返回
        var _css = function (n) {
          _this.Attr("style", "-webkit-transform:translate3d(" + n + "px,0,0);transform:translate3d(" + n + "px,0,0);");
        };
        (function () {
          start += pic;
          if((start >= end && pic > 0) || (start <= end && pic < 0)) {
            _this.Css(end);
            callback && callback();
          } else {
            _css(start);
            setTimeout(arguments.callee, inter);
          }
        })();
      },
      tabPage: function (a) {
        if(!this[0]) return;
        var _this = this;
        var _thisEle = _this.get(0);
        var num = ylmf(".page", _thisEle).length;
        var lias = ylmf(".page li.custom", _thisEle);
        for(var j = 0; j < lias.length; j++) {
          lias.eq(j).touch({
            start: function () {
              this.e.preventDefault();
              timeout1 = window.setTimeout(function () {
                recordSites.showDel();
              }, 1000);
              timeout2 = 1;
              window.setTimeout(function () {
                timeout2 = null;
              }, 200);
            },
            move: function () {
              this.e.preventDefault();
              if(timeout2) {
                window.clearTimeout(timeout2);
              }
            },
            end: function () {
              var a = ylmf(this.ele).Attr("data-info").split(",")[1];
              var delMode = ylmf(this.ele).hasClass("del"),
                id = ylmf(this.ele).get(0).id;
              if(timeout1) {
                window.clearTimeout(timeout1);
              }
              if(timeout2) {
                if(Math.abs(this.xs - this.xe) < 5) {
                  if(!delMode) {
                    // if (!navigator.onLine) {
                    //   recordSites.alert("移动网络已断开",'');
                    //   return false;
                    // }
                    window.location.href = a;
                  } else {
                    this.ele.parentNode.removeChild(this.ele);
                    var info = ylmf(this.ele).Attr("data-info").split(",");
                    recordSites.del(info[0], info[1], info[2], id);
                  }
                }
              }
              _move = false;
            }
          });
        }
        if(num <= 1) {
          Y("#pageBtn").get(0).innerHTML = '';
          return;
        }
        var nn = a ? a : 0;
        var btn = '';
        for(var i = 0; i < num; i++) {
          if(i == nn) {
            btn += '<b class="on"></b>'
          } else {
            btn += "<b></b>";
          }
        }
        Y("#pageBtn").get(0).innerHTML = btn;
        var wid = document.documentElement.clientWidth;
        var _btn = ylmf("#pageBtn b");
        var _move = false;
        var timeout1 = null;
        var timeout2 = null;
        _this.Css(-nn * wid);
        _this.Attr("data-f", -nn * wid);
        var play = function (n) { //运行切换方法主函数
          _move = true;
          _this.Animate({
            "transform": -n * wid
          }, 250, function () {
            _move = false;
          });
          _btn.eq(nn).removeClass("on");
          _btn.eq(n).addClass("on");
          nn = n;
        }
        ylmf(".page li", _thisEle).on("click", function () { //避免如uc点击图标链接后返回此页一直不会切换bug
          _move = false;
        });
        _this.touch({
          horizontal: true,
          start: function () {
            if(_move) {
              this.flag = true;
              return;
            } else {
              this.flag = false;
              _move = true;
              this.nowleft = parseInt(_this.Attr("data-f"));
            }
          },
          move: function () {
            if(this.flag) {
              return;
            }
            var _x = this.xe - this.xs;
            var _y = this.ye - this.ys;
            if(Math.abs(_y) > Math.abs(_x) || (nn == 0 && _x > 0) || (nn == num - 1 && _x < 0)) {
              this.flag = true;
              _move = false;
            } else {
              this.e.preventDefault();
              var _left = this.nowleft + _x;
              _this.Css(_left);
            }
          },
          end: function () {
            if(this.flag) {
              return;
            }
            if(this.xe - this.xs > 60) {
              var N = nn - 1;
              play(N);
            } else if(this.xs - this.xe > 60) {
              var N = nn + 1;
              play(N);
            } else {
              _this.Animate({
                "transform": this.nowleft
              }, 100, function () {
                _move = false;
              });
            }
          }
        });
        window.onresize = function () { //为兼容横竖屏切换
          wid = document.documentElement.clientWidth;
          _this.Css(-nn * wid);
        }
      },
      size: function () {
        return [this.get(0).clientWidth, this.get(0).clientHeight];
      },
      Offset: function (par) {
        var node = this.get(0);
        var offset = {};
        offset.top = 0;
        offset.left = 0;
        var Node = node;
        var Par = par ? par : document.body;;
        (function () {
          if(Node == Par) {
            return offset;
          }
          offset.top += Node.offsetTop;
          offset.left += Node.offsetLeft;
          Node = Node.parentNode;
          arguments.callee()
        })();
        return offset;
      },
      pointSc: function (list, btn, tag) {
        var _ele = this.get(0);
        var _list = ylmf(list, _ele);
        var listNode = _list.get(0);
        var _btn = ylmf(btn, _ele);
        var _tag = ylmf(tag, listNode);
        var n = _btn.length;
        var _i = 0;
        _btn.on("click", function () {
          if(ylmf(this).hasClass("on")) return;
          var _n = this.index;
          var _top = _tag.eq(_n).Offset(listNode).top;
          var current = Y('#SiteSort a.on').get(0).index;
          if(current > 2 && _n > 2) {
            $('#SiteSort a.on').removeClass('on');
            $('#SiteSort a').eq(_n).addClass('on');
            return;
          }
          _list.Scroll(_top, 360);
          if(_n > 3) {
            setTimeout(function () {
              $('#SiteSort a.on').removeClass('on');
              $('#SiteSort a').eq(_n).addClass('on');
            }, 700);
          }
        });
        _list.on("scroll", function () {
          if(_btn) {}
          _btn.eq(3).removeClass("on");
          _btn.eq(4).removeClass("on");
          _btn.eq(5).removeClass("on");
          _btn.eq(6).removeClass("on");

          var _top = listNode.scrollTop + 15;
          for(var i = 0; i < n; i++) {
            if(_top >= _tag.eq(i).Offset(listNode).top) {
              console.log('on');
              //_btn.eq(_i).moveClass("on");
              _btn.eq(_i).removeClass("on");
              _btn.eq(i).addClass("on");
              _i = i;
            }
          }
        });
      },
      printPara: function (paraStr) {
        var ele = this.get(0);
        var _html = ele.innerHTML;
        var reg = /\(\#(.*?)\#\)/g;
        _html = _html.replace(reg, function ($1, $2) {
          var str = paraStr + "." + $2;
          try {
            if(typeof eval(str) == "string") {
              str = eval(str);
            } else {
              str = "该参数非字符串或未定义";
            }
          } catch(e) {
            str = "该参数非字符串或未定义";
          }
          return str;
        });
        ele.innerHTML = _html;
        ele.style.display = 'block';
      },
      push: push,
      sort: [].sort,
      splice: [].splice
    }
    ylmf.fn.init.prototype = ylmf.fn;
    return ylmf;
  })();
  window.ylmf = window.Y = ylmf;
})();
