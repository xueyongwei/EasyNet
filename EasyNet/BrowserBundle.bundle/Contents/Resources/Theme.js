(function (D) {
  function v(a) {
    a.target && "preucbrowser_sheet_theme" == a.target.id && (p = window.setTimeout(function () {
      "NightMode" != l.Theme.theme && "EyeProtect" != l.Theme.theme || document.head.appendChild(m);
      p = null
    }, 1), document.head.removeEventListener("DOMNodeRemoved", v, !1))
  }
  function w(a) {
    document.head && (document.head.appendChild(m), document.head.addEventListener("DOMNodeRemoved", v, !1))
  }
  function N(a) {
    var c = !1;
    (c = "EyeProtect" == a ? q() : r()) ? w(a) : (t(), this.theme = "Classic")
  }
  function t() {
    document.head.removeEventListener("DOMNodeRemoved", v, !1);
    p && window.clearTimeout(p);
    var a = document.getElementById("preucbrowser_sheet_theme");
    a && a.parentNode && a.parentNode.removeChild(a)
  }
  function O(a, c) {
    if (!a || 3 == a.nodeType || 8 == a.nodeType)
      return null;
    var b = a.tagName.toUpperCase();
    if (c && c.test(b))
      return null;
    var d = window.getComputedStyle(a, null);
    return d ? E(a, b, d) : null
  }
  function E(a, c, b) {
    var d = parseInt(b.width, 0),
      g = parseInt(b.height, 0);
    a = P.test(b.backgroundColor) && !F;
    c = "fixed" == b.position;
    var f = !1;
    a || (f = Q.test(b.backgroundColor));
    var e = x.test(b.color),
      h = !1;
    if (x.test(b.borderColor) || R.test(b.borderColor))
      h = !0;
    var y = !1,
      k = !1,
      l = !1;
    if ("" !== b.backgroundImage && "none" !== b.backgroundImage) {
      var m = b.backgroundImage;
      -1 == m.indexOf("url(") && S.test(m) ? y = !0 : (b = b.backgroundRepeat, "no-repeat" != b && "repeat" == b && (d > T || 100 < g) && (k = !0))
    } else if (!a || x.test(b.backgroundColor) || U.test(b.backgroundColor))
      l = !0;
    b = "";
    a ? b = y ? b + " UCNightMode_setBorder UCNightMode_changeBgLinear" : k ? b + " UCNightMode_setBorder UCNightMode_delBgImg UCNightMode_transparentBkg" : b + " UCNightMode_transparentBkg" : y ? b += " UCNightMode_setBorder UCNightMode_changeBgLinear" : k && (b += " UCNightMode_setBorder UCNightMode_setBackground");
    l && (b += " UCNightMode_changeBgColor");
    h && (b += " UCNightMode_changeBorder");
    c && (b += " UCNightMode_positionFixed");
    f && (b += " UCNightMode_BgBlack");
    e && (b += " UCNightMode_ColorWhite");
    return b
  }
  function V() {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
      var a = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
      return parseInt(a[1], 10)
    }
    return 8
  }
  function G(a, c, b, d, g) {
    function f(a, b) {
      this.node = a;
      this.cls = b
    }
    b = Math.min(b, a.length);
    for (var e = c; e <= b; e++) {
      var h = a[e];
      h && h.classList && !h.classList.contains("UCUNNIC") && a[e].classList.add("UCUNNIC")
    }
    e = [];
    for (h = c; h <= b; h++)
      (c = O(a[h], d)) && 0 < c.length && (c = new f(a[h], c), e.push(c));
    a = e.length;
    for (d = 0; d <= a; d++)
      (c = e[d]) && c.node && c.node.className && c.cls && 0 < c.cls.length && (c.node.className = c.node.className + " " + c.cls + " UCUNNIC_Done");
    e = [];
    g(b)
  }
  function H(a, c) {
    function b(f) {
      f >= g ? z(a, g, c) : n = window.setTimeout(G, 5, d, f, f + 100, A, b)
    }
    B(a, c);
    null != n && window.clearTimeout(n);
    document.addEventListener("DOMNodeInserted", I, !1);
    var d = Array.prototype.slice.call(document.body.getElementsByTagName("*")),
      g = d ? d.length : 0;
    J = Date.now();
    G(d, 0, 100, A, b)
  }
  function K(a, c) {
    if (a) {
      if (a && 3 != a.nodeType && 8 != a.nodeType) {
        var b = a.tagName.toUpperCase();
        if (!(c && c.test(b) || a.classList.contains("UCUNNIC"))) {
          a.classList.add("UCUNNIC");
          var d = window.getComputedStyle(a, null);
          d && (b = E(a, b, d), a.className += b, a.classList.add("UCUNNIC_Done"))
        }
      }
      for (var d = (b = a.children) ? b.length : 0, g = 0; g < d; g++)
        K(b[g], c)
    }
  }
  function I(a) {
    window.setTimeout(K, 1, a.target, W)
  }
  function B(a, c) {
    F = window.g_wmlBrowser && "object" == typeof window.g_wmlBrowser ? !0 : !1
  }
  function z(a, c, b) {
    if (window.top == window) {
      var d = Date.now() - J;
      a = "Night" == a && 0 < c ? "node=" + c + "&time=" + d : "";
      b ? UCBrowserMessageCenter.sendMessage("on_theme_process_finish" + a) : a && 0 < a.length && UCBrowserMessageCenter.sendMessage("on_theme_process_performance" + a)
    }
  }
  function X(a) {
    a = "PREUCBROWSER_THEME_" + a;
    for (var c = document.getElementsByTagName("iframe"), b = 0; b < c.length; ++b)
      c[b].contentWindow.postMessage(a, "*")
  }
  function r() {
    if (window != window.top && window.top.UC_shouldChangeTheme)
      return window.top.UC_shouldChangeTheme();
    if (void 0 != window.UCshouldChangeTheme)
      return window.UCshouldChangeTheme;
    if ("undefined" != typeof ucreader_directory)
      return window.UCshouldChangeTheme = !1;
    for (var a = !0, c = document.getElementsByTagName("meta"), b = c.length, d = 0; d < b; d++)
      if (c[d].name && "nightmode" == c[d].name && "disable" == c[d].content) {
        a = !1;
        window.UCshouldChangeTheme = !1;
        break
      }
    return a
  }
  function q() {
    var a = !0,
      c = location.href;
    do
      {
        try {
          if (window != window.top && window.top.UC_shouldChangeToEyeProtect) {
            a = window.top.UC_shouldChangeToEyeProtect();
            break
          }
        } catch (b) {}
      if (null != k)
        a = k;
      else if ("about:blank" == location.href)
        a = !1;
      else if ("undefined" != typeof ucreader_directory)
        a = k = !1;
      else if (/https?:\/\/((ixs\.sm\.cn)|((hao|tv|qiqu|go)\.uc\.cn))\//i.test(c))
        a = k = !1;
      else {
        var d = !1;
        /[?&]sm_article_id=/i.test(c) ? d = !0 : /https?:\/\/[a-zA-Z0-9\.]*\.(uczzd|sm|uc)\.cn/i.test(c) && /[?&]aid=/i.test(c) && /[?&](app|commentid|zzd_from)=/i.test(c) ? d = !0 : /https?:\/\/zzd\.sm\.cn\/webapp\/index/i.test(c) && (d = !0);
        if (d)
          a = k = !1;
        else if (/https?:\/\/(([a-zA-Z0-9\.]+\.mp)|(mparticle))\.uc\.cn/i.test(c))
          a = k = !1;
        else if (document && document.head) {
          for (var d = !1, g = document.head.getElementsByTagName("meta"), f = g.length, e = 0; e < f; e++)
            if (g[e].name && "customizetype" == g[e].name && "reader" == g[e].content) {
              d = !0;
              break
            }
          d && (k = a = !1)
        }
      }
    } while (0);
    return a
  }
  function Y(a) {
    r() ? H("Night", a) : (t(), this.theme = "Classic")
  }
  function Z(a) {
    q() ? (w("EyeProtect"), H("EyeProtect", a)) : (t(), this.theme = "Classic")
  }
  function aa(a) {
    if (r()) {
      B("Classic", a);
      null != n && window.clearTimeout(n);
      document.removeEventListener("DOMNodeInserted", I, !1);
      for (var c = Array.prototype.slice.call(document.getElementsByTagName("*")), b = c.length, d = /UCNightMode_[\s\S]*?\b/g, g = 0; g < b; ++g) {
        var f = c[g],
          e = d;
        if (f && 3 != f.nodeType && 8 != f.nodeType) {
          var h = f.tagName.toUpperCase();
          if (!A.test(h) && f.classList.contains("UCUNNIC") && (f.classList.remove("UCUNNIC"), f.classList.remove("UCUNNIC_Done"), e = f.className.match(e)) && (h = e.length, 0 < h))
            for (var k = 0; k < h; k++)
              f.classList.remove(e[k])
        }
      }
      z("Classic", b, a)
    }
  }
  function L(a, c) {
    /interactive|complete/.test(document.readyState) ? u || (u = !0, a(c)) : window.setTimeout(L, 1E3, a, c)
  }
  function M(a, c) {
    /interactive|complete/.test(document.readyState) ? window.setTimeout(a, 1, c) : (document.addEventListener("readystatechange", function d() {
      "complete" == document.readyState && (u || (u = !0, a(c)), document.removeEventListener("readystatechange", d, !1))
    }, !1), void 0 == C && (C = V()), 7 < C && L(a, c))
  }
  if (!D.$PreUCBrowser && document.head) {
    var l = {
      Theme: {}
    };
    D.$PreUCBrowser = l;
    var P = /rgba\(\s*?\d+?\s*?,\s*?\d+?\s*?,\s*?\d+?\s*?,\s*?0\s*?\)/i,
      x = /rgb\(\s*?2\d{2}\s*?,\s*?2\d{2}\s*?,\s*?2\d{2}\s*?\)/i,
      R = /rgb\(\s*?1(6|7|8|9)\d\s*?,\s*?1(6|7|8|9)\d\s*?,\s*?1(6|7|8|9)\d\s*?\)/i,
      Q = /rgba?\((\s*0\s*,){2}\s*0\s*(,\s*(1|0\.\d*[1-9])\s*)?\)/i,
      U = /rgba\(255\, 255\, 255\,/i,
      S = /rgb|-webkit-gradient/i,
      A = /\bCANVAS\b|\bIMG\b|\bIFRAME\b|\bBR\b|\bSCRIPT\b/,
      W = /\bCANVAS\b|\bIMG\b|\bIFRAME\b|\bBR\b|\bSCRIPT\b|\bNOSCRIPT\b|\bSTYLE\b|\bMETA\b|\bLINK\b|\bTITLE\b/,
      F = !1,
      n = null,
      J = 0,
      T = .5 * window.innerWidth,
      p = null,
      k = null,
      m = document.createElement("style");
    m.id = "preucbrowser_sheet_theme";
    m.innerText = ".UCUNNIC.UCNightMode_changeBgColor{background:#31343C!important}.UCUNNIC.UCNightMode_setBackground{background:#31343C!important;color:#d7dff1!important}.UCUNNIC.UCNightMode_changeBgLinear{background:rgba(40,40,40,.6)!important}.UCUNNIC.UCNightMode_changeBorder{border-color:#45484c!important}.UCUNNIC.UCNightMode_setBorder{outline:#45484c solid 1px}.UCUNNIC.UCNightMode_delBgImg{background-image:none!important}:not(.UCUNNIC){border-color:#31343C!important;background-color:#31343C!important}*{text-shadow:none!important;box-shadow:none!important}:after,:before{-webkit-filter:brightness(0.4)}body,html{background:#31343C!important;color:#d7dff1!important}abbr,address,article,aside,b,bdi,bdo,blockquote,br,caption,cite,code,col,colgroup,data,datalist,dc,dd,dfn,dl,dt,em,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hr,i,kbd,keygen,label,legend,li,main,mark,meter,nav,ol,optgroup,option,output,p,pre,progress,q,rp,rt,ruby,s,samp,section,small,span,strong,sub,sup,table,tbody,td,textarea,tfoot,th,thead,time,tr,u,ul,var,wbr{background-color:none;color:#d7dff1!important}textarea{background-color:#31343C!important}div,div.UCUNNIC{color:#d7dff1!important}a,a *,a.UCUNNIC,a.UCUNNIC .UCUNNIC{color:#79a8ff!important}a.UCUNNIC:visited,a.UCUNNIC:visited .UCUNNIC,a.UCUNNIC:visited div.UCUNNIC,a:visited,a:visited *{color:#bd8cff!important}button:not(.UCNightMode_transparentBkg):not(.UCUNNIC),div:not(.UCNightMode_transparentBkg):not(.UCUNNIC),input:not(.UCNightMode_transparentBkg):not(.UCUNNIC),select:not(.UCNightMode_transparentBkg):not(.UCUNNIC){background:#31343C!important}button.UCUNNIC_Done:not(.UCNightMode_transparentBkg):not(.UCNightMode_changeBgLinear):not(.UCNightMode_setBackground),div.UCUNNIC_Done:not(.UCNightMode_transparentBkg):not(.UCNightMode_changeBgLinear):not(.UCNightMode_setBackground),input.UCUNNIC_Done:not(.UCNightMode_transparentBkg):not(.UCNightMode_changeBgLinear):not(.UCNightMode_setBackground),select.UCUNNIC_Done:not(.UCNightMode_transparentBkg):not(.UCNightMode_changeBgLinear):not(.UCNightMode_setBackground){background-color:#31343C!important}input[type=date],input[type=date] *,input[type=datetime-local],input[type=datetime-local] *,input[type=month],input[type=month] *,input[type=time],input[type=time] *,select,select *{color:#fff!important}button,input:not([type=button]):not([type=submit]):not([type=reset]):not([type=image]):not([type=file]):not([type=date]):not([type=datetime-local]):not([type=month]):not([type=time]),input[type=button],input[type=file],input[type=image],input[type=reset],input[type=submit]{color:#d7dff1!important;border-color:#45484c!important}div#K_UCKWebkitReaderSeparator,div.uc_rmst_div{border-style:solid;border-width:1px;border-color:#45484c!important}.threads_list{background:#000!important}textarea.se-input{background-color:#31343C!important}.threads_list .tl_shadow{border-bottom:1px solid #fff}.fixBar,.yk-TitleBar.fixedBar .titlebar{background-color:#31343C!important}p.img[data-norect]{background-image:none}div>i.img._4s0y:not(.UCUNNIC_Done){background-image:none!important;background-color:transparent!important}a>i.img._4s0y:not(.UCUNNIC_Done){background-image:none!important;background-color:rgba(0,0,0,0)!important}div>div.profileMapTile._4p9n:not(.UCUNNIC_Done){background-color:transparent!important;background-image:none!important}";
    var C = void 0;
    l.Theme = {
      theme: "Classic",
      changeIframesTheme: X,
      containerHead: null,
      changeTheme: function (a, c) {
        this.changeIframesTheme(a);
        if (this.theme == a && this.containerHead === document.head)
          B(a, c),
          z(a, 0, c);
        else {
          this.containerHead = document.head;
          if ("NightMode" == a || "EyeProtect" == a)
            if ("Classic" != this.theme && this.theme != a)
              N(a);
            else {
              var b = !1,
                d = null;
              "NightMode" == a ? (b = !0, d = Y) : (b = q(), d = Z);
              b && w(a);
              M(d, c)
            } else
              t(),
              document.body.clientWidth && M(aa, c);
        this.theme = a
        }
      }
    };
    var u = !1;
    window.UC_shouldChangeTheme = r;
    window.UC_shouldChangeToEyeProtect = q;
    window.addEventListener("message", function (a) {
      "PREUCBROWSER_THEME_Classic" != a.data && "PREUCBROWSER_THEME_NightMode" != a.data && "PREUCBROWSER_THEME_EyeProtect" != a.data || l.Theme.changeTheme(a.data.substring(19));
    }, !1)
  }
})(window);
