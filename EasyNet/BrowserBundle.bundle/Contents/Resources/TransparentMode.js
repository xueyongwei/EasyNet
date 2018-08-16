(function (v) {
  function w() {
    var a = document.getElementById("preucbrowser_stylesheet_transparentmode_pre");
    a && a.parentNode && a.parentNode.removeChild(a)
  }
  function l() {
    return O.test(window.location.hostname) ? !0 : !1
  }
  function m() {
    return P.test(window.location.hostname) ? !0 : !1
  }
  function n() {
    return Q.test(window.location.hostname) ? !0 : !1
  }
  function f(a) {
    a = a.backgroundRepeat;
    return 0 <= a.indexOf("repeat-x") || 0 <= a.indexOf("repeat-y") ? !0 : !1
  }
  function p(a) {
    return (a = a.backgroundImage) && 0 <= a.indexOf("url") ? !0 : !1
  }
  function x(a) {
    a = a.match(g);
    var c = 125 > (a ? a[2] : 0) ? 0 : 255,
      b = 125 > (a ? a[3] : 0) ? 0 : 255,
      d = "UCTransparentMode_fontColor";
    255 == (125 > (a ? a[1] : 0) ? 0 : 255) && (d += "_FR");
    255 == c && (d += "_FG");
    255 == b && (d += "_FB");
    return d
  }
  function y(a) {
    return null != a.borderBottomStyle && "" != a.borderBottomStyle && "none" != a.borderBottomStyle ? !0 : !1
  }
  function z(a) {
    a = a.match(g);
    var c = 125 > (a ? a[2] : 0) ? 0 : 255,
      b = 125 > (a ? a[3] : 0) ? 0 : 255,
      d = "UCTransparentMode_borderBottomColor";
    255 == (125 > (a ? a[1] : 0) ? 0 : 255) && (d += "_BR");
    255 == c && (d += "_BG");
    255 == b && (d += "_BB");
    return d
  }
  function A(a) {
    return null != a.borderTopStyle && "" != a.borderTopStyle && "none" != a.borderTopStyle ? !0 : !1
  }
  function B(a) {
    a = a.match(g);
    var c = 125 > (a ? a[2] : 0) ? 0 : 255,
      b = 125 > (a ? a[3] : 0) ? 0 : 255,
      d = "UCTransparentMode_borderTopColor";
    255 == (125 > (a ? a[1] : 0) ? 0 : 255) && (d += "_BR");
    255 == c && (d += "_BG");
    255 == b && (d += "_BB");
    return d
  }
  function C(a) {
    return null != a.borderRightStyle && "" != a.borderRightStyle && "none" != a.borderRightStyle ? !0 : !1
  }
  function D(a) {
    a = a.match(g);
    var c = 125 > (a ? a[2] : 0) ? 0 : 255,
      b = 125 > (a ? a[3] : 0) ? 0 : 255,
      d = "UCTransparentMode_borderRightColor";
    255 == (125 > (a ? a[1] : 0) ? 0 : 255) && (d += "_BR");
    255 == c && (d += "_BG");
    255 == b && (d += "_BB");
    return d
  }
  function E(a) {
    return null != a.borderLeftStyle && "" != a.borderLeftStyle && "none" != a.borderLeftStyle ? !0 : !1
  }
  function F(a) {
    a = a.match(g);
    var c = 125 > (a ? a[2] : 0) ? 0 : 255,
      b = 125 > (a ? a[3] : 0) ? 0 : 255,
      d = "UCTransparentMode_borderLeftColor";
    255 == (125 > (a ? a[1] : 0) ? 0 : 255) && (d += "_BR");
    255 == c && (d += "_BG");
    255 == b && (d += "_BB");
    return d
  }
  function G(a, c, b) {
    if (!(H && H.test(c.tagName) || !c || "string" != typeof c.className || c.className && -1 != c.className.indexOf("UCTransparentMode"))) {
      var d = !1;
      switch (a) {
        case "baidu":
          a = !1;
          if (n())
            switch (c.tagName) {
              case "DIV":
                R.test(c.className) ? (b.push(c), b.push("UCTransparentMode_baidu_suggest_div"), a = !0) : S.test(c.className) && (b.push(c), b.push("UCTransparentMode_transparentBG"), a = !0);
                break;
              case "TEXTAREA" : b.push(c),
                b.push("UCTransparentMode_fontColor_FR_FG_FB"),
                b.push(c),
                b.push("UCTransparentMode_clear_TextS"),
                b.push(c),
                b.push("UCTransparentMode_transparentBGColor"),
                a = !0
            }
          d = a;
          break;
        case "shenma" : a = !1;
          if (l())
            switch (c.tagName) {
              case "LI":
                T.test(c.className) && (b.push(c), b.push("UCTransparentMode_shenma_sug_div"), a = !0)
            }
          d = a;
          break;
        case "jd" : a = !1;
          if (m())
            switch (c.tagName) {
              case "DIV":
                U.test(c.className) && (b.push(c), b.push("UCTransparentMode_jd_quicknav_div"), a = !0)
            }
          d = a
      }
      if (!d)
        switch (a = null, c.tagName) {
          case "SPAN":
          case "I":
          case "A":
          case "STRONG":
          case "ABBR":
          case "B":
          case "BDI":
          case "BDO":
          case "BR":
          case "CITE":
          case "CODE":
          case "DATA":
          case "DFN":
          case "EM":
          case "KBD":
          case "MARK":
          case "Q":
          case "RP":
          case "RT":
          case "RTC":
          case "RUBY":
          case "S":
          case "SAMP":
          case "SMALL":
          case "SUB":
          case "SUP":
          case "TIME":
          case "U":
          case "VAR":
          case "WBR":
            a = window.getComputedStyle(c, null),
            d = x(a.color),
            b.push(c),
            b.push(d),
            b.push(c),
            b.push("UCTransparentMode_clear_TextS");
          case "HTML":
          case "TBODY":
            null == a && (a = window.getComputedStyle(c, null));
            if (!p(a) || f(a) || h.test(a.backgroundColor))
              f(a) || I.test(a.backgroundImage) ? (b.push(c), b.push("UCTransparentMode_transparentBG")) : (b.push(c), b.push("UCTransparentMode_transparentBGColor"));
            break;
          case "H1" :
          case "H2" :
          case "H3" :
          case "H4" :
          case "H5" :
          case "H6" :
          case "LI" :
          case "P" :
          case "DIV" :
          case "INPUT" :
          case "TD" :
          case "BUTTON" :
          case "ARTICLE" : a = window.getComputedStyle(c, null),
            d = x(a.color),
            b.push(c),
            b.push(d),
            b.push(c),
            b.push("UCTransparentMode_clear_TextS");
          case "NAV" :
          case "SECTION" :
          case "ADDRESS" :
          case "ARTICLE" :
          case "ASIDE" :
          case "HGROUP" :
          case "UL" :
          case "DD" :
          case "DL" :
          case "DT" :
          case "FIGCAPTION" :
          case "FIGURE" :
          case "HR" :
          case "MAIN" :
          case "OL" :
          case "PRE" :
          case "TABLE" :
          case "TFOOT" :
          case "THEAD" :
          case "TH" :
          case "TR" :
          case "MENU" :
          case "FORM" :
          case "LABEL" : null == a && (a = window.getComputedStyle(c, null));
            var e = window.getComputedStyle(c, "before");
            A(a) ? (d = B(a.borderTopColor), b.push(c), b.push(d)) : null != e && A(e) && (d = B(e.borderTopColor), b.push(c), b.push(d));
            y(a) ? (d = z(a.borderBottomColor), b.push(c), b.push(d)) : null != e && y(e) && (d = z(e.borderBottomColor), b.push(c), b.push(d));
            E(a) ? (d = F(a.borderLeftColor), b.push(c), b.push(d)) : null != e && E(e) && (d = F(e.borderLeftColor), b.push(c), b.push(d));
            C(a) ? (d = D(a.borderRightColor), b.push(c), b.push(d)) : null != e && C(e) && (d = D(e.borderRightColor), b.push(c), b.push(d));
            if (!p(a) || f(a) || h.test(a.backgroundColor))
              d = "fixed" == a.position ? !0 : !1,
              d ? (b.push(c), b.push("UCTransparentMode_translucentBG2")) : f(a) || I.test(a.backgroundImage) ? (b.push(c), b.push("UCTransparentMode_translucentBG")) : (b.push(c), "rgba(0, 0, 0, 0)" != a.backgroundColor ? h.test(a.backgroundColor) ? b.push("UCTransparentMode_transparentBGColor") : b.push("UCTransparentMode_translucentBGColor") : b.push("UCTransparentMode_transparentBGColor"));
            break;
          case "BODY" : a = window.getComputedStyle(c, null);
            !p(a) || f(a) || h.test(a.backgroundColor) ? (b.push(c), b.push("UCTransparentMode_translucentBG")) : (b.push(c), b.push("UCTransparentMode_translucentBGColor"));
            break;
          case "HEADER" : if (a = window.getComputedStyle(c, null), d = document.getElementsByTagName("body"), 1 == d.length && (d = window.getComputedStyle(d[0], null), parseInt(a.width, 10) + parseInt(a.paddingLeft, 10) + parseInt(a.paddingRight, 10) < parseInt(d.width, 10)))
              break;
            case "FOOTER" : null == a && (a = window.getComputedStyle(c, null));
            if (!p(a) || f(a) || h.test(a.backgroundColor))
              b.push(c),
              b.push("UCTransparentMode_translucentBG");
            break;
          case "TEXTAREA" : b.push(c),
            b.push("UCTransparentMode_fontColor_FR_FG_FB"),
            b.push(c),
            b.push("UCTransparentMode_clear_TextS"),
            b.push(c),
            b.push("UCTransparentMode_transparentBGColor")
        }
      0 != b.length && (b.push(c), b.push("UCTransparentMode"))
    }
  }
  function J(a) {
    for (var c = a.length, b = 0; b < c; b += 2)
      a[b].classList && a[b].classList.add(a[b + 1])
  }
  function K(a, c, b) {
    if (c) {
      G(a, c, b);
      for (var d = (c = c.children) ? c.length - 1 : -1; 0 <= d; --d)
        K(a, c[d], b)
    }
  }
  function L(a) {
    var c = "none";
    n() ? c = "baidu" : l() ? c = "shenma" : m() && (c = "jd");
    var b = [];
    K(c, a.target, b);
    J(b)
  }
  function V(a) {
    if ("turnOff" != window.$UCBrowser_TransparentMode.status && (a = W.test(window.location.hostname) ? !0 : !1, !a)) {
      w();
      a = "none";
      n() ? (a = "baidu", document.head && document.head.appendChild(q)) : l() ? (a = "shenma", document.head && document.head.appendChild(r)) : m() && (a = "jd", document.head && document.head.appendChild(t));
      document.head && document.head.appendChild(u);
      for (var c = Array.prototype.slice.call(document.all), b = c.length, d = 0, e = 500; d < b; d += e) {
        d + e > b && (e = b - d);
        for (var f = c.slice(d, d + e), g = [], h = a, p = g, k = f.length - 1; 0 <= k; --k)
          G(h, f[k], p);
        J(g)
      }
      document.addEventListener("DOMNodeInserted", L, !1)
    }
  }
  function e(a, c, b) {
    for (var d = a.length - 1; 0 <= d; --d)
      c.push(a[d]),
      c.push(b)
  }
  function X() {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
      var a = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
      return parseInt(a[1], 10)
    }
    return 8
  }
  function M(a, c) {
    /interactive|complete/.test(document.readyState) ? window.setTimeout(a, 1, c) : window.setTimeout(M, 1E3, a, c)
  }
  function Y(a, c) {
    /interactive|complete/.test(document.readyState) ? window.setTimeout(a, 1, c) : 7 < X() ? M(a, c) : document.addEventListener("readystatechange", function d() {
      "complete" == document.readyState && (window.setTimeout(a, 1, c), document.removeEventListener("readystatechange", d, !1))
    }, !1)
  }
  if (!v.$UCBrowser_TransparentMode && document.head) {
    var N = {},
      h = /rgb\(\s*?2\d{2}\s*?,\s*?2\d{2}\s*?,\s*?2\d{2}\s*?\)/i,
      I = /rgb|-webkit-gradient/i,
      H = /\bCANVAS\b|\bIMG\b|\bIFRAME\b|\bBR\b|\bSCRIPT\b|\bNOSCRIPT\b|\bSTYLE\b|\bMETA\b|\bLINK\b|\bTITLE\b/,
      g = /rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d+.?\d+)?\)/,
      k = document.createElement("style");
    k.id = "preucbrowser_stylesheet_transparentmode_pre";
    k.innerText = "*{background:rgba(0,0,0,0) !important; color:rgb(255, 255, 255) !important;}body{background:rgba(0,0,0,0.4) !important}";
    var u = document.createElement("style");
    u.id = "preucbrowser_stylesheet_transparentmode";
    u.innerText = ".UCTransparentMode{}.UCTransparentMode_fontColor{color:#fff !important}.UCTransparentMode_fontColor::before{color:#fff !important}.UCTransparentMode_transparentBG{background:rgba(0,0,0,0) !important}.UCTransparentMode_transparentBG::before{background:rgba(0,0,0,0) !important}.UCTransparentMode_transparentBGColor{background-color:rgba(0,0,0,0) !important}.UCTransparentMode_transparentBGColor::before{background-color:rgba(0,0,0,0)!imporant}.UCTransparentMode_translucentBG{background:rgba(0,0,0,0.4) !important}.UCTransparentMode_translucentBG::before{background:rgba(0,0,0,0.4) !important}.UCTransparentMode_translucentBG2{background:rgba(0,0,0,0.85) !important}.UCTransparentMode_translucentBG2::before{background:rgba(0,0,0,0.85) !important}.UCTransparentMode_translucentBGColor{background-color:rgba(0,0,0,0.4) !important}.UCTransparentMode_fontColor_FR{color:#FFABAB !important}.UCTransparentMode_fontColor_FR::before{color:#FFABAB !important}.UCTransparentMode_fontColor_FR_FG{color:#FFFCC8 !important}.UCTransparentMode_fontColor_FR_FG::before{color:#FFFCC8 !important}.UCTransparentMode_fontColor_FR_FB{color:#FEC5FE !important}.UCTransparentMode_fontColor_FR_FB::before{color:#FEC5FE !important}.UCTransparentMode_fontColor_FR_FG_FB{color:#FFFFFF !important}.UCTransparentMode_fontColor_FR_FG_FB::before{color:#FFFFFF !important}.UCTransparentMode_fontColor_FG{color:#C9FFC9 !important}.UCTransparentMode_fontColor_FG::before{color:#C9FFC9 !important}.UCTransparentMode_fontColor_FG_FB{color:#AEFFFF !important}.UCTransparentMode_fontColor_FG_FB::before{color:#AEFFFF !important}.UCTransparentMode_fontColor_FB{color:#9CC6FF !important}.UCTransparentMode_fontColor_FB::before{color:#9CC6FF !important}.UCTransparentMode_clear_TextS{text-shadow:none !important}.UCTransparentMode_clear_TextS::before{text-shadow:none !important}.UCTransparentMode_borderLeftColor_BR{border-left-color:rgba(255,171,171,0.3) !important}.UCTransparentMode_borderLeftColor_BR::before{border-left-color:rgba(255,171,171,0.3) !important}.UCTransparentMode_borderLeftColor_BR_BG{border-left-color:rgba(255,255,200,0.3) !important}.UCTransparentMode_borderLeftColor_BR_BG::before{border-left-color:rgba(255,255,200,0.3) !important}.UCTransparentMode_borderLeftColor_BR_BB{border-left-color:rgba(254,197,254,0.3) !important}.UCTransparentMode_borderLeftColor_BR_BB::before{border-left-color:rgba(254,197,254,0.3) !important}.UCTransparentMode_borderLeftColor_BR_BG_BB{border-left-color:rgba(255,255,255,0.3) !important}.UCTransparentMode_borderLeftColor_BR_BG_BB::before{border-left-color:rgba(255,255,255,0.3) !important}.UCTransparentMode_borderLeftColor_BG{border-left-color:rgba(201,255,201,0.4) !important}.UCTransparentMode_borderLeftColor_BG::before{border-left-color:rgba(201,255,201,0.3) !important}.UCTransparentMode_borderLeftColor_BG_BB{border-left-color:rgba(174,255,255,0.3) !important}.UCTransparentMode_borderLeftColor_BG_BB::before{border-color:rgba(174,255,255,0.3) !important}.UCTransparentMode_borderLeftColor_BB{border-left-color:rgba(156,198,255,0.3) !important}.UCTransparentMode_borderRightColor_BB::before{border-right-color:rgba(156,198,255,0.3) !important}.UCTransparentMode_borderRightColor_BR{border-right-color:rgba(255,171,171,0.3) !important}.UCTransparentMode_borderRightColor_BR::before{border-right-color:rgba(255,171,171,0.3) !important}.UCTransparentMode_borderRightColor_BR_BG{border-right-color:rgba(255,255,200,0.3) !important}.UCTransparentMode_borderRightColor_BR_BG::before{border-right-color:rgba(255,255,200,0.3) !important}.UCTransparentMode_borderRightColor_BR_BB{border-right-color:rgba(254,197,254,0.3) !important}.UCTransparentMode_borderRightColor_BR_BB::before{border-right-color:rgba(254,197,254,0.3) !important}.UCTransparentMode_borderRightColor_BR_BG_BB{border-right-color:rgba(255,255,255,0.3) !important}.UCTransparentMode_borderRightColor_BR_BG_BB::before{border-right-color:rgba(255,255,255,0.3) !important}.UCTransparentMode_borderRightColor_BG{border-right-color:rgba(201,255,201,0.3) !important}.UCTransparentMode_borderRightColor_BG::before{border-right-color:rgba(201,255,201,0.3) !important}.UCTransparentMode_borderRightColor_BG_BB{border-right-color:rgba(174,255,255,0.3) !important}.UCTransparentMode_borderRightColor_BG_BB::before{border-right-color:rgba(174,255,255,0.3) !important}.UCTransparentMode_borderRightColor_BB{border-right-color:rgba(156,198,255,0.3) !important}.UCTransparentMode_borderRightColor_BB::before{border-right-color:rgba(156,198,255,0.3) !important}.UCTransparentMode_borderTopColor_BR{border-top-color:rgba(255,171,171,0.3) !important}.UCTransparentMode_borderTopColor_BR::before{border-top-color:rgba(255,171,171,0.3) !important}.UCTransparentMode_borderTopColor_BR_BG{border-top-color:rgba(255,255,200,0.3) !important}.UCTransparentMode_borderTopColor_BR_BG::before{border-top-color:rgba(255,255,200,0.3) !important}.UCTransparentMode_borderTopColor_BR_BB{border-top-color:rgba(254,197,254,0.3) !important}.UCTransparentMode_borderTopColor_BR_BB::before{border-top-color:rgba(254,197,254,0.3) !important}.UCTransparentMode_borderTopColor_BR_BG_BB{border-top-color:rgba(255,255,255,0.3) !important}.UCTransparentMode_borderTopColor_BR_BG_BB::before{border-top-color:rgba(255,255,255,0.3) !important}.UCTransparentMode_borderTopColor_BG{border-top-color:rgba(201,255,201,0.3) !important}.UCTransparentMode_borderTopColor_BG::before{border-top-color:rgba(201,255,201,0.3) !important}.UCTransparentMode_borderTopColor_BG_BB{border-top-color:rgba(174,255,255,0.3) !important}.UCTransparentMode_borderTopColor_BG_BB::before{border-color:rgba(174,255,255,0.3) !important}.UCTransparentMode_borderTopColor_BB{border-top-color:rgba(156,198,255,0.3) !important}.UCTransparentMode_borderTopColor_BB::before{border-top-color:rgba(156,198,255,0.3) !important}.UCTransparentMode_borderBottomColor_BR{border-bottom-color:rgba(255,171,171,0.3) !important}.UCTransparentMode_borderBottomColor_BR::before{border-bottom-color:rgba(255,171,171,0.3) !important}.UCTransparentMode_borderBottomColor_BR_BG{border-bottom-color:rgba(255,255,200,0.3) !important}.UCTransparentMode_borderBottomColor_BR_BG::before{border-bottom-color:rgba(255,255,200,0.3) !important}.UCTransparentMode_borderBottomColor_BR_BB{border-bottom-color:rgba(254,197,254,0.3) !important}.UCTransparentMode_borderBottomColor_BR_BB::before{border-bottom-color:rgba(254,197,254,0.3) !important}.UCTransparentMode_borderBottomColor_BR_BG_BB{border-bottom-color:rgba(255,255,255,0.3) !important}.UCTransparentMode_borderBottomColor_BR_BG_BB::before{border-bottom-color:rgba(255,255,255,0.3) !important}.UCTransparentMode_borderBottomColor_BG{border-bottom-color:rgba(201,255,201,0.3) !important}.UCTransparentMode_borderBottomColor_BG::before{border-bottom-color:rgba(201,255,201,0.3) !important}.UCTransparentMode_borderBottomColor_BG_BB{border-bottom-color:rgba(174,255,255,0.3) !important}.UCTransparentMode_borderBottomColor_BG_BB::before{border-bottom-color:rgba(174,255,255,0.3) !important}.UCTransparentMode_borderBottomColor_BB{border-bottom-color:rgba(156,198,255,0.3) !important}.UCTransparentMode_borderBottomColor_BB::before{border-bottom-color:rgba(156,198,255,0.3) !important}";
    var O = /m.sp.sm.cn/,
      T = /sug/,
      r = document.createElement("style");
    r.id = "preucbrowser_stylesheet_shenma_transparentmode";
    r.innerText = ".UCTransparentMode_shenma_sug_div{background:rgba(0,0,0,0.8) !important}.UCTransparentMode_shenma_sug_div::before{background:rgba(0,0,0,0.8) !important}";
    var P = /m.jd.com/,
      U = /quick-nav-box/,
      t = document.createElement("style");
    t.id = "preucbrowser_stylesheet_jd_transparentmode";
    t.innerText = ".UCTransparentMode_jd_quicknav_div{opacity:0 !important}.UCTransparentMode_jd_quicknav_div::before{opacity:0 !important}";
    var Q = /baidu/,
      R = /suggest-div/,
      S = /se-inner/,
      q = document.createElement("style");
    q.id = "preucbrowser_stylesheet_baidu_transparentmode";
    q.innerText = ".UCTransparentMode_baidu_suggest_div{background:rgba(0,0,0,0.8) !important}.UCTransparentMode_baidu_suggest_div::before{background:rgba(0,0,0,0.8) !important}";
    var W = /(tieba.baidu.com)|(image.baidu.com)|(guba.eastmoney.com)/,
      N = {
        status: "autoTurnOn",
        autoTurnOnTransparentMode: function (a) {
          this.status = "autoTurnOn";
          document.head && document.head.appendChild(k);
          Y(V, a)
        },
        turnOffTransparentMode: function (a) {
          this.status = "turnOff";
          n() ? (a = document.getElementById("preucbrowser_stylesheet_baidu_transparentmode")) && a.parentNode && a.parentNode.removeChild(a) : l() ? (a = document.getElementById("preucbrowser_stylesheet_shenma_transparentmode")) && a.parentNode && a.parentNode.removeChild(a) : m() && (a = document.getElementById("preucbrowser_stylesheet_jd_transparentmode")) && a.parentNode && a.parentNode.removeChild(a);
          w();
          (a = document.getElementById("preucbrowser_stylesheet_transparentmode")) && a.parentNode && a.parentNode.removeChild(a);
          var c = "none";
          n() ? c = "baidu" : l() ? c = "shenma" : m() && (c = "jd");
          a = [];
          var b = document;
          switch (c) {
            case "baidu":
              n() && e(Array.prototype.slice.call(document.getElementsByClassName("UCTransparentMode_baidu_suggest_div")), a, "UCTransparentMode_baidu_suggest_div");
              break;
            case "shenma":
              l() && e(Array.prototype.slice.call(document.getElementsByClassName("UCTransparentMode_shenma_sug_div")), a, "UCTransparentMode_shenma_sug_div");
              break;
            case "jd":
              m() && e(Array.prototype.slice.call(document.getElementsByClassName("UCTransparentMode_jd_quicknav_div")), a, "UCTransparentMode_jd_quicknav_div")
          }
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode")), a, "UCTransparentMode");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_fontColor")), a, "UCTransparentMode_fontColor");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_fontColor_FR")), a, "UCTransparentMode_fontColor_FR");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_fontColor_FB")), a, "UCTransparentMode_fontColor_FB");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_fontColor_FG")), a, "UCTransparentMode_fontColor_FG");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_fontColor_FG_FB")), a, "UCTransparentMode_fontColor_FG_FB");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_fontColor_FR_FB")), a, "UCTransparentMode_fontColor_FR_FB");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_fontColor_FR_FG")), a, "UCTransparentMode_fontColor_FR_FG");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_fontColor_FR_FG_FB")), a, "UCTransparentMode_fontColor_FR_FG_FB");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_transparentBG")), a, "UCTransparentMode_transparentBG");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_transparentBGColor")), a, "UCTransparentMode_transparentBGColor");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_translucentBG")), a, "UCTransparentMode_translucentBG");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_translucentBGColor")), a, "UCTransparentMode_translucentBGColor");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_clear_TextS")), a, "UCTransparentMode_clear_TextS");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderTopColor_BR")), a, "UCTransparentMode_borderTopColor_BR");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderTopColor_BR_BG")), a, "UCTransparentMode_borderTopColor_BR_BG");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderTopColor_BR_BB")), a, "UCTransparentMode_borderTopColor_BR_BB");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderTopColor_BR_BG_BB")), a, "UCTransparentMode_borderTopColor_BR_BG_BB");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderTopColor_BG")), a, "UCTransparentMode_borderTopColor_BG");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderTopColor_BG_BB")), a, "UCTransparentMode_borderTopColor_BG_BB");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderTopColor_BB")), a, "UCTransparentMode_borderTopColor_BB");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderLeftColor_BR")), a, "UCTransparentMode_borderLeftColor_BR");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderLeftColor_BR_BG")), a, "UCTransparentMode_borderLeftColor_BR_BG");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderLeftColor_BR_BB")), a, "UCTransparentMode_borderLeftColor_BR_BB");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderLeftColor_BR_BG_BB")), a, "UCTransparentMode_borderLeftColor_BR_BG_BB");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderLeftColor_BG")), a, "UCTransparentMode_borderLeftColor_BG");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderLeftColor_BG_BB")), a, "UCTransparentMode_borderLeftColor_BG_BB");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderLeftColor_BB")), a, "UCTransparentMode_borderLeftColor_BB");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderRightColor_BR")), a, "UCTransparentMode_borderRightColor_BR");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderRightColor_BR_BG")), a, "UCTransparentMode_borderRightColor_BR_BG");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderRightColor_BR_BB")), a, "UCTransparentMode_borderRightColor_BR_BB");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderRightColor_BR_BG_BB")), a, "UCTransparentMode_borderRightColor_BR_BG_BB");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderRightColor_BG")), a, "UCTransparentMode_borderRightColor_BG");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderRightColor_BG_BB")), a, "UCTransparentMode_borderRightColor_BG_BB");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderRightColor_BB")), a, "UCTransparentMode_borderRightColor_BB");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderBottomColor_BR")), a, "UCTransparentMode_borderBottomColor_BR");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderBottomColor_BR_BG")), a, "UCTransparentMode_borderBottomColor_BR_BG");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderBottomColor_BR_BB")), a, "UCTransparentMode_borderBottomColor_BR_BB");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderBottomColor_BR_BG_BB")), a, "UCTransparentMode_borderBottomColor_BR_BG_BB");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderBottomColor_BG")), a, "UCTransparentMode_borderBottomColor_BG");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderBottomColor_BG_BB")), a, "UCTransparentMode_borderBottomColor_BG_BB");
          e(Array.prototype.slice.call(b.getElementsByClassName("UCTransparentMode_borderBottomColor_BB")), a, "UCTransparentMode_borderBottomColor_BB");
          c = a.length;
          for (b = 0; b < c; b += 2)
            a[b].classList && a[b].classList.remove(a[b + 1]);
          document.removeEventListener("DOMNodeInserted", L, !1)
        }
      };
    v.$UCBrowser_TransparentMode = N
  }
})(window);
