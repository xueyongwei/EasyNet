/**
 XueYongWei-2018：这个是JS桥接，注意格式：
 1. js方法的写法
 isInstallApp: function (str) {
 
 }
 注意这个来自js的参数是个json字符串。
 2. 调用iOS方法的js代码
 window.webkit.messageHandlers.OOFJS.postMessage({
 fun: "isInstallApp",
 arg: {
    appName: appName,
    callback: callback
    }
 });

 **/
(function () {
  window.OOFBrowser || (window.Js114la = window.OOFBrowser = {
                        isInstallApp: function (str) {
                        if (typeof str !== 'string')
                        return;
                        var json = JSON.parse(str)
                        var appName = json.appName;
                        var callback = json.callback;
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: "isInstallApp",
                                                                        arg: {
                                                                        appName: appName,
                                                                        callback: callback
                                                                        }
                                                                        });
                        },
                        getNetworkState: function (str) {
                        if (typeof str !== 'string')
                        return;
                        var json = JSON.parse(str);
                        var callback = json.callback;
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: 'getNetworkState',
                                                                        arg: {
                                                                        callback: callback
                                                                        }
                                                                        })
                        },
                        getLxSignInfo: function (str) {
                        if (typeof str !== 'string')
                        return;
                        var json = JSON.parse(str);
                        var callback = json.callback;
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: 'getLxSignInfo',
                                                                        arg: {
                                                                        callback: callback
                                                                        }
                                                                        })
                        },
                        notifyLoginOut: function () {
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: 'notifyLoginOut',
                                                                        arg: {
                                                                        callback: ""
                                                                        }
                                                                        })
                        },
                        setMag: function (str) {
                        if (typeof str !== 'string')
                        return;
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: 'setMag',
                                                                        arg: {
                                                                        magStr: str
                                                                        }
                                                                        })
                        },
                        getMag: function (str) {
                        if (typeof str !== 'string')
                        return;
                        var json = JSON.parse(str);
                        var callback = json.callback;
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: 'getMag',
                                                                        arg: {
                                                                        callback: callback
                                                                        }
                                                                        })
                        },
                        getCurFontSize: function () {
                        return window.GLOBAL_FONT_SIZE;
                        },
                        
                        getUserInfoString: function () {
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: 'setUserInfoString',
                                                                        arg: {
                                                                        callback: ''
                                                                        }
                                                                        })
                        console.log("获取GLOBAL_USERINFO");
                        return window.GLOBAL_USERINFO;
                        },
                        
                        setFontCallback: function (callback) {
                        if (typeof callback !== 'string')
                        return;
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: 'setFontCallback',
                                                                        arg: {
                                                                        callback: callback
                                                                        }
                                                                        })
                        },
                        setPageInfo: function (jsonString) {
                        if (typeof jsonString !== 'string')
                        return;
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: 'setPageInfo',
                                                                        arg: {
                                                                        info: jsonString
                                                                        }
                                                                        })
                        },
                        setShouldAutorotate:function (should) {
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: 'setShouldAutorotate',
                                                                        arg: {
                                                                        info: should
                                                                        }
                                                                        })
                        },
                        setFullScreen: function () {
//                        if (typeof jsonString !== 'string')
//                        return;
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: 'setFullScreen',
                                                                        arg: {
                                                                        info: 'setFullScreen'
                                                                        }
                                                                        })
                        },
                        saveImage: function (url) {
                        if (typeof url !== 'string')
                        return;
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: 'saveImage',
                                                                        arg: {
                                                                        url: url
                                                                        }
                                                                        })
                        },
                        askNewQuestion: function () {
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: 'askNewQuestion',
                                                                        arg: {
                                                                        callback: ""
                                                                        }
                                                                        })
                        },
                        tagsSearch: function (tagsString,type) {
                        if (typeof tagsString !== 'string')
                        return;
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: 'tagsSearch',
                                                                        arg: {
                                                                        tags: tagsString,
                                                                        type: type
                                                                        }
                                                                        })
                        },
                        openExpGroup: function (group_id) {
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: 'openExpGroup',
                                                                        arg: {
                                                                        group_id: group_id,
                                                                        }
                                                                        })
                        },
                        shareAdvertisementUrl: function (title,url,img) {
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: 'shareAdvertisementUrl',
                                                                        arg: {
                                                                        title: title,
                                                                        url: url,
                                                                        img: img
                                                                        }
                                                                        })
                        },
                        callLoginForUrl: function (url) {
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: 'callLoginForUrl',
                                                                        arg: {
                                                                        url: url,
                                                                        }
                                                                        })
                        },
                        handle114laClientLogin: function () {
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: 'handle114laClientLogin',
                                                                        arg: {
                                                                        callback: '1'
                                                                        }
                                                                        })
                        },
                        
                        saveAdvertisement: function (tid, type, op, callback) {
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: 'saveAdvertisement',
                                                                        arg: {
                                                                        tid: tid,
                                                                        type: type,
                                                                        op: op,
                                                                        callback: callback
                                                                        }
                                                                        })
                        },
                        
                        pushWeb: function (url,type) {
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: 'pushWeb',
                                                                        arg: {
                                                                        url: url,
                                                                        type: type
                                                                        }
                                                                        })
                        },
                        
                        openPicBrowser: function (pics) {
                        window.webkit.messageHandlers.OOFJS.postMessage({
                                                                        fun: 'openPicBrowser',
                                                                        arg: {
                                                                        pics: pics
                                                                        }
                                                                        })
                        }
                        });
  
  })(window);

