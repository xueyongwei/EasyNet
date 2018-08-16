(function () {
  var styleElem = null,
    doc = document,
    ie = doc.all,
    allEle = 'abbr,address,applet,acronym,area,article,aside,audio,base,basefont,bdi,bdo,big,blockquote,body,br,button,caption,center,cite,code,col,colgroup,command,datalist,dd,del,details,dfn,dir,div,dl,dt,embed,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,header,hr,html,iframe,img,input,ins,keygen,kbd,label,legend,li,link,map,mark,menu,meta,meter,nav,noframes,noscript,object,ol,optgroup,option,output,p,param,pre,progress,q,rp,ruby,s,samp,script,select,small,source,strike,strong,style,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr,rt,section',
    decl = '{background-color:#31343c!important}*,* h1,h2,h3,h4,h5,h6{color:#D7DFF1!important;border-color:#606684!important}.oofstyle-opacty{background-color:rgba(51,66,88,.1)!important}a,a *{color:#4a7df7!important}';
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
    // return styleElem;
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
  function isLightStyle() {
    return document.querySelectorAll('.oof-browser-style').length == 0;
  }
  window.OOF_STYLE = '';
  window.OOF_IS_CHANGING_STYLE = false
  window.OOF_SET_STYLE = function (str) {
    window.OOF_STYLE = str;
    if ((isLightStyle() && str === 'light') || (!isLightStyle() && str === 'night')) {
      return;
    }
    if (!window.OOF_SET_STYLE || window.OOF_IS_CHANGING_STYLE) {
      return;
    }
    console.log('set style' + str);
    window.OOF_IS_CHANGING_STYLE = true;
    var frames = document.querySelectorAll('iframe');
    console.log(frames);
    if (str === 'night') {
      if (isLightStyle()) {
        createCSS(decl, styleElem);
      }
      changeTransparentLayer();
      if (frames) {
        for (var i = 0; i < frames.length; i++) {
          try {
            console.log(frames[i].src);
            window.postMessage('OOF_STYLE_NIGHT', frames[i].src)
          } catch (e) {}
        }
      }
    } else {
      for (var e = document.getElementsByClassName('oof-browser-style'), t = e.length; t > 0 && e[0];) {
        e[0].remove();
      }

      if (frames) {
        for (var i = 0; i < frames.length; i++) {
          try {
            window.postMessage('OOF_STYLE_LIGHT', frames[i].src)
          } catch (e) {}
        }
      }
    }
    window.OOF_IS_CHANGING_STYLE = false;
  }

  window.OOF_STYLE_DOM_CHANGED_CALLBACK = function (e) {
    if (e.target.tagName !== 'IFRAME') {
      return;
    }
    console.log(e.CustomEventName);
    window.OOF_SET_STYLE(OOF_STYLE);
  }
  window.addEventListener('message', function (e) {
    // console.log('get message' + e.data);
    if (e.data === 'OOF_STYLE_NIGHT') {
      console.log('set night');
      window.OOF_SET_STYLE('night')
    } else if (e.data === 'OOF_STYLE_LIGHT') {
      console.log('set light');
      window.OOF_SET_STYLE('light')
    }
  });
  document.addEventListener('DOMNodeInserted', function (e) {
    e.CustomEventName = 'DOMNodeInserted';
    window.OOF_STYLE_DOM_CHANGED_CALLBACK(e);
  }, false);
  document.addEventListener('DOMAttrModified', function (e) {
    e.CustomEventName = 'DOMAttrModified';
    window.OOF_STYLE_DOM_CHANGED_CALLBACK(e);
  }, false);
  //iframe test
  try {
    if (parent != window) {
      // alert('iframe' + window.OOF_STYLE);
      if (parent.OOF_STYLE) {
        window.OOF_SET_STYLE(parent.OOF_STYLE);
      }
    }
  } catch (e) {}
  // document.addEventListener('DOMNodeRemoved', function (e) {
  //   e.CustomEventName = 'DOMNodeRemoved';
  //   window.OOF_STYLE_DOM_CHANGED_CALLBACK(e);
  // }, false);

  // window.OOF_SET_STYLE() && window.OOF_SET_STYLE('night');
})();
