(function (c) {
  if (!c.UCBrowserMessageCenter) {
    var b = {};
    c.UCBrowserMessageCenter = b;
    var e = [];
    b.isMsgHandlerPostMsg = !1;
    b.isSendingMessage = function (b, d) {
      var a = e.indexOf(b);
      d && -1 != a && e.splice(a, 1);
      return -1 == a ? !1 : !0
    };
    b.sendMessage = function (c) {
      if (b.isMsgHandlerPostMsg)
        window.webkit.messageHandlers.ucjsbridge.postMessage(c);
      else {
        var d = new XMLHttpRequest,
          a;
        a = (new Date).getTime();
        var f = Math.floor(900 * Math.random()) + 100;
        a = a.toString() + f.toString();
        e.push(a);
        d.open("POST", (0 < location.host.length ? "" : location.origin + "/") + "u.c.b.r.o.w.s.e.r/___ucbrowser_msg_" + c + "?msgId=" + a, !0);
        d.setRequestHeader("Cache-Control", "no-cache");
        d.send()
      }
    }
  }
})(window);
