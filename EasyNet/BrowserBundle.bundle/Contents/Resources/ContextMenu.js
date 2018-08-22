/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function () {

  "use strict";

  var MAX_RADIUS = 9;

  var longPressTimeout = null;
  var touchDownX = 0;
  var touchDownY = 0;
  var highlightDiv = null;
  var touchHandled = false;

  function cancel() {
    if (longPressTimeout) {
      clearTimeout(longPressTimeout);
      longPressTimeout = null;

      if (highlightDiv) {
        document.body.removeChild(highlightDiv);
        highlightDiv = null;
      }
    }
  }

 // 获取选择的内容
 function getSelectionAndSendMessage()
 {
    var txt = document.getSelection().toString() ;
    window.webkit.messageHandlers.OOFJS.postMessage({fun: "userSelection",
                                                 arg:txt,
                                                 }) ;
 }
 document.onmouseup = getSelectionAndSendMessage();
 document.onkeyup   = getSelectionAndSendMessage();
 document.oncontextmenu  = getSelectionAndSendMessage();
 
  function createHighlightOverlay(element) {
    // Create a parent element to hold each highlight rect.
    // This allows us to set the opacity for the entire highlight
    // without worrying about overlapping opacities for each child.
    highlightDiv = document.createElement("div");
    highlightDiv.style.pointerEvents = "none";
    highlightDiv.style.top = "0px";
    highlightDiv.style.left = "0px";
    highlightDiv.style.position = "absolute";
    highlightDiv.style.opacity = 0.1;
    highlightDiv.style.zIndex = 99999;
    document.body.appendChild(highlightDiv);
 
    var zoom = document.body.style.zoom || 1;
    var rects = element.getClientRects();
    for (var i = 0; i != rects.length; i++) {
      var rect = rects[i];
      var rectDiv = document.createElement("div");
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
      var top = rect.top + scrollTop/zoom - 2.5;
      var left = rect.left + scrollLeft - 2.5;

      // These styles are as close as possible to the default highlight style used
      // by the web view.
      rectDiv.style.top = top + "px";
      rectDiv.style.left = left + "px";
      rectDiv.style.width = rect.width + "px";
      rectDiv.style.height = rect.height + "px";
      rectDiv.style.position = "absolute";
      rectDiv.style.backgroundColor = "#000";
      rectDiv.style.borderRadius = "2px";
      rectDiv.style.padding = "2.5px";
      rectDiv.style.pointerEvents = "none";

      highlightDiv.appendChild(rectDiv);
    }
  }

  function handleTouchMove(event) {
    if (longPressTimeout) {
 getSelectionAndSendMessage();
      var {
        screenX,
        screenY
      } = event.touches[0];
      // Cancel the context menu if finger has moved beyond the maximum allowed distance.
      if (Math.abs(touchDownX - screenX) > MAX_RADIUS || Math.abs(touchDownY - screenY) > MAX_RADIUS) {
        cancel();
      }
    }
  }

  function handleTouchEnd(event) {
    cancel();

    removeEventListener("touchend", handleTouchEnd);
    removeEventListener("touchmove", handleTouchMove);

    // If we're showing the context menu, prevent the page from handling the click event.
    if (touchHandled) {
      touchHandled = false;
      event.preventDefault();
    }
  }

  addEventListener("touchstart", function (event) {
    if (window.OOFVOIDACTIONSHEET)
      return;
    console.log('touchstart')
    // Don't show the context menu for multi-touch events.
    if (event.touches.length !== 1) {
      cancel();
      return;
    }

    OOF_PICBROWSER_GET_ALL_IMAGE_URL('picBrowser');
    OOF_REMOVE_IMAGE_DEL_CLASS();
    var data = {};
    var element = event.target;

    // Listen for touchend or move events to cancel the context menu timeout.
    element.addEventListener("touchend", handleTouchEnd);
    element.addEventListener("touchmove", handleTouchMove);

    do {
      if (!data.link && element.localName === "a") {
        data.link = element.href;
        data.linkText = element.innerText;
        // The web view still shows the tap highlight after clicking an element,
        // so add a delay before showing the long press highlight to avoid
        // the highlight flashing twice.
        var linkElement = element;
        setTimeout(function () {
          if (longPressTimeout) {
            createHighlightOverlay(linkElement);
          }
        }, 100);
      }

      if (!data.image && element.localName === "img") {
        data.image = element.src;
      }
      data.cookie = document.cookie
      element = element.parentElement;
    } while (element);

    if (data.link || data.image || data.linkText) {
      var touch = event.touches[0];
      touchDownX = touch.screenX;
      touchDownY = touch.screenY;
      window.OOF_TOUCHDOWN_Y = window.scrollY;
      longPressTimeout = setTimeout(function () {
        touchHandled = true;
        cancel();
        webkit.messageHandlers.OOFJS.postMessage(data);
      }, 500);

      webkit.messageHandlers.OOFJS.postMessage({
        handled: true
      });
    }
  }, true);

  // If the user touches down and moves enough to make the page scroll, cancel the
  // context menu handlers.
  addEventListener("scroll", cancel);

  //*************PICBrowser**************

  window.OOF_PICBROWSER_ARRAY = []
  window.OOF_PICBROWSER_GET_ALL_IMAGE_URL = function (type) {
    var srcs = document.querySelectorAll('[src]');
    var urlArray = []
    for (var n = 0; n < srcs.length; n++) {
      if (srcs[n].tagName.indexOf('IMG') > -1) {
        urlArray.push(srcs[n].getAttribute('src'));
      }
    }

    OOF_PICBROWSER_ARRAY = urlArray;
    webkit.messageHandlers.OOFJS.postMessage({
      fun: "getPicBrowserArray",
      arg: [OOF_PICBROWSER_ARRAY.join('*|*')]
    });

 if(type != 'picBrowser')  {//云收藏
     for (var i = 0; i < window.frames.length; i++) {
     var win = window.frames[i];
     try {
     win.postMessage('{"str":"OOF_GET_ALL_IMAGE_URL"}', win.location.href);
     } catch (error) {}
     }
 }
  }

  window.addEventListener('message', function (e) {
    if (typeof e.data !== 'string') return;
    try {
      var data = JSON.parse(e.data);
      if (data.str == 'OOF_GET_ALL_IMAGE_URL') {
        OOF_PICBROWSER_GET_ALL_IMAGE_URL()
      }
    } catch (e) {}
  })

  window.OOF_SCROLL_TO_BOTTOM = function () {
    scrollTo(0, document.body.scrollHeight)
    setTimeout(function () {
      OOF_PICBROWSER_GET_ALL_IMAGE_URL('picBrowser')
    }, 500)
  }

  window.OOF_SCROLL_TO_Y = function () {
    scrollTo(0, OOF_TOUCHDOWN_Y);
  }

  function setImage() {
    var imgs = document.getElementsByTagName("img");
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].setAttribute("onClick", "imageClick(" + i + ")");
    }
  }

  function getImageData(i) {
    var imgs = document.getElementsByTagName("img");
    var img = new Image;
    var src = imgs[i].src;
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    img.crossOrigin = "Anonymous";
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, img.width, img.height);
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      localStorage.setItem("savedImageData", canvas.toDataURL("image/png"));
    }
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.src = src;
    }
    console.log(canvas.toDataURL());
    return canvas.toDataURL()
  }

  function getImageRect(i) {
    var imgs = document.getElementsByTagName("img");
    var rect;
    rect = imgs[i].getBoundingClientRect().left + "::";
    rect = rect + imgs[i].getBoundingClientRect().top + "::";
    rect = rect + imgs[i].width + "::";
    rect = rect + imgs[i].height;
    return rect;
  }

  function imageClick(i) {
    var rect = getImageRect(i);
    var url = "clickgirl::" + i + "::" + rect;
    document.location = url;
  }
})();

//特殊网站的夜间模式处理
window.OOF_REMOVE_IMAGE_DEL_CLASS = function () {
  var count = 0;
  var hostArr = ['m.mgtv.com', 'v.ifeng.com'];

  function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  }

  function addClass(obj, cls) {
    if (!this.hasClass(obj, cls))
      obj.className += " " + cls;
  }

  function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      obj.className = obj.className.replace(reg, ' ');
    }
  }

  function isHasHost() {
    return hostArr.indexOf(location.host) > -1;
  }

  function removeClass_delBgImg() {
    if (isHasHost() && !window.OOF_REMOVECLASS_TIMER) {
      OOF_REMOVECLASS_TIMER = setInterval(function () {
        count++;
        console.log(count);
        if (count > 4) {
          clearInterval(window.OOF_REMOVECLASS_TIMER);
          window.OOF_REMOVECLASS_TIMER = null;
          return;
        }
        //m.mgtv.com
        var nodes = document.querySelectorAll('.slide-banner .img');
        for (var i = 0; i < nodes.length; i++) {
          removeClass(nodes[i], 'UCNightMode_delBgImg');
        }
        //v.ifeng.com
        var nodes1 = document.querySelectorAll('.swiper-slide .cover');
        for (var i = 0; i < nodes1.length; i++) {
          removeClass(nodes1[i], 'UCNightMode_delBgImg');
        }
      }, 1000);
    }
  }
  removeClass_delBgImg();
};
