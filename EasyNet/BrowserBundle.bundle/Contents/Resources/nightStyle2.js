(function () {
  var styleElem = null,
    doc = document,
    ie = doc.all,
    allEle = 'abbr,address,applet,acronym,area,article,aside,audio,base,basefont,bdi,bdo,big,blockquote,body,br,button,caption,center,cite,code,col,colgroup,command,datalist,dd,del,details,dfn,dir,div,dl,dt,embed,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,header,hr,html,iframe,img,input,ins,keygen,kbd,label,legend,li,link,map,mark,menu,meta,meter,nav,noframes,noscript,object,ol,optgroup,option,output,p,param,pre,progress,q,rp,ruby,s,samp,script,select,small,source,strike,strong,style,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr,rt,section',
    decl = '{background-color:#31343c!important}*{color:#D7DFF1!important;border-color:#606684!important}.oofstyle-opacty{background-color:rgba(51,66,88,.1)!important}a,a *{color:#4a7df7!important}';
  function createCSS(decl, styleElem) {
    var doc = document,
      h = doc.getElementsByTagName('head')[0],
      styleElem = styleElem;
    if (!h) {
      h = doc.createElement('head'),
      doc.appendChild(h);
    }
    if (!styleElem) {
      var s = doc.createElement('style');
      s.setAttribute('type', 'text/css');
      s.className = 'oof-browser-style';
      styleElem = ie ? doc.styleSheets[doc.styleSheets.length - 1] : h.appendChild(s);
    }
    styleElem.innerHTML = '';
    styleElem.appendChild(doc.createTextNode(allEle + decl));

  }
  // function getParentUrlHash() {
  //   var url = null;
  //   var hash = ''
  //   if (parent !== window) {
  //     try {
  //       url = parent.location.href;
  //     } catch (e) {
  //       url = document.referrer;
  //     }
  //   } else {
  //     url = location.href;
  //   }
  //   if (url.indexOf('#') > 0) {
  //     hash = url.split('#').pop();
  //   }
  //   return hash;
  // }

  window.GET_PARENT_OOF_STYLE = function () {
    if (parent !== window) {
      try {
        window.OOF_STYLE = parent.OOF_STYLE;
      } catch (e) {}
    }
  }
  function getHost(url) {
    if (!url) {
      return;
    }
    var a = document.createElement('a');
    a.href = url;
    return a.host;
  }
  function isLightStyle() {
    return document.querySelectorAll('.oof-browser-style').length == 0;
  }
  function changeTransparentLayer() {
    var nodes = document.querySelectorAll('a,div,p');
    for (var i = 0; i < nodes.length; i++) {
      (function () {
        var n = nodes[i];
        var bgColor = n.style.backgroundColor;
        var bgImage = n.style.backgroundImage;
        var nodeClass = n.className + ' oofstyle-opacty';
        if (bgColor == '' && bgImage == '' && n.className.indexOf('oofstyle-opacty') < 0) {
          n.className = nodeClass;
        }
        n = null;
        bgColor = null;
        bgImage = null;
        nodeClass = null;
      })();
    }
  }

  window.OOF_SET_STYLE = function (str) {
    // if ((isLightStyle() && str === 'light') || (!isLightStyle() && str === 'night')) {
    //   return;
    // }
    var frames = document.querySelectorAll('iframe');
    if (str === 'night') {
      window.OOF_STYLE = 'night';
      if (document.querySelectorAll('.oof-browser-style').length == 0) {
        createCSS(decl, styleElem);
        changeTransparentLayer();
      }

      if (frames) {
        for (var i = 0; i < frames.length; i++) {
          if (getHost(location.href) !== getHost(frames[i].src)) {
            continue;
          }
          if (frames[i].contentWindow.OOF_SET_STYLE) {
            frames[i].contentWindow.OOF_SET_STYLE(str);
          }
        }
      }
    } else {
      window.OOF_STYLE = 'light';
      for (var e = document.getElementsByClassName('oof-browser-style'), t = e.length; t > 0 && e[0];) {
        e[0].remove();
      }
      if (frames) {
        for (var i = 0; i < frames.length; i++) {
          if (getHost(location.href) !== getHost(frames[i].src)) {
            continue;
          }
          if (frames[i].contentWindow.OOF_SET_STYLE) {
            frames[i].contentWindow.OOF_SET_STYLE(str);
          }
        }
      }
    }
    window.OOF_IS_CHANGING_STYLE = false;
  }
  window.OOF_IS_CHANGING_STYLE = false
  window.OOF_STYLE_DOM_CHANGED_CALLBACK = function (e) {
    // if (e.target.tagName !== 'IFRAME') {
    //   return;
    // }
    window.GET_PARENT_OOF_STYLE();
    if (!window.OOF_STYLE || !window.OOF_SET_STYLE || window.OOF_IS_CHANGING_STYLE) {
      return;
    }
    window.OOF_IS_CHANGING_STYLE = true;
    window.OOF_SET_STYLE(OOF_STYLE);
  }

  document.addEventListener('DOMNodeInserted', function (e) {
    window.OOF_STYLE_DOM_CHANGED_CALLBACK(e);
    // console.log('DOMNodeInserted');
  }, false);
  document.addEventListener('DOMAttrModified', function (e) {
    window.OOF_STYLE_DOM_CHANGED_CALLBACK(e);
    // console.log('DOMAttrModified');
  }, false);
  // document.addEventListener('DOMNodeRemoved', function () {
  //   window.OOF_STYLE_DOM_CHANGED_CALLBACK();
  //   // console.log('DOMNodeRemoved');
  // }, false);

})();
