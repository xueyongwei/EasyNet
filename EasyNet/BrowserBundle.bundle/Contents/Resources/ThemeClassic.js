(function (f) {
  f.$PreUCBrowserClassic || (f.$PreUCBrowserClassic = {}, window.addEventListener("message", function (b) {
    var a = b.data;
    if (a) {
      var d = null,
        c = !1,
        e = null;
      if ("PREUCBROWSER_THEME_CHANGE_TO_NIGHT_MODE" == a || "PREUCBROWSER_THEME_CHANGE_TO_NIGHT_MODE_WITH_CALLBACK" == a || "PREUCBROWSER_THEME_NightMode" == a)
        c = "PREUCBROWSER_THEME_CHANGE_TO_NIGHT_MODE_WITH_CALLBACK" == b.data,
        d = "NightMode",
        e = "PREUCBROWSER_THEME_CHANGE_TO_NIGHT_MODE";
      else if ("PREUCBROWSER_THEME_CHANGE_TO_EYE_PROTECT" == a || "PREUCBROWSER_THEME_CHANGE_TO_EYE_PROTECT_WITH_CALLBACK" == a || "PREUCBROWSER_THEME_EyeProtect" == a)
        c = "PREUCBROWSER_THEME_CHANGE_TO_EYE_PROTECT_WITH_CALLBACK" == b.data,
        d = "EyeProtect",
        e = "PREUCBROWSER_THEME_CHANGE_TO_EYE_PROTECT";
      if (d && !document.getElementById("ucbrowser_night_mode_style"))
        for (b = document.createElement("script"), b.id = "ucbrowser_night_mode_style", c && (b.onload = function () {
          window.$PreUCBrowser && window.$PreUCBrowser.Theme && window.$PreUCBrowser.Theme.changeTheme(d, !0)
        }), b.src = "/u.c.b.r.o.w.s.e.r/night_mode_theme_night.js", document.head.appendChild(b), c = document.getElementsByTagName("iframe"), b = c.length, a = 0; a < b; ++a)
          c[a].contentWindow.postMessage(e, "*")
    }
  }, !1))
})(window);
