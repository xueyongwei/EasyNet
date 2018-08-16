var Weather = {
  DefaultCity: '101010100',
  //默认城市id，为北京城市id
  StorageName: "mycity",
  //记录localStorage的名称
  nowid: '',
  //目前城市
  errortimes: 0,
  //加载城市失败次数
  url: "http://h5.114la.com/browser/?t=weather",
  //j天气页链接
  sim_Get: function (id) {
    Ajax.ScriptLoader("http://api.tianqi.114la.com/weather/index.php/api/weather_115browser_index/areaid/" + id + "/cb/Weather.sim_callback");
  },
  sim_callback: function (data) {
    if(data.error_code) {
      //加载不到天气文件时
      this.sim_Get(this.DefaultCity);
      return;
    }
    var _qua = data.weatherinfo.air_quality ? data.weatherinfo.air_quality.substr(0, 2) : data.weatherinfo.air_quality;
    var _qua2 = !data.weatherinfo.air_aqi && !data.weatherinfo.air_pm25 ? '' : '<p><span class="' + data.weatherinfo.air_quality_leve + '">空气质量：' + data.weatherinfo.air_aqi + '</span><span class="qu ' + data.weatherinfo.air_quality_level + '">' + _qua + '</span></p>';
    var _html = '<div class="img"><img src="' + data.weatherinfo.IconPath + data.weatherinfo.img + '.png" /></div><div class="cc">' + data.weatherinfo.temp + '</div><div class="dt"><p><span>' + data.weatherinfo.city + '</span><span>' + data.weatherinfo.weather + '</span></p>' + _qua2 + '</div>';
    document.getElementById('iweather').innerHTML = _html;
    window["weatherHtml"] = _html;
  },
  searchCity: function (val, ele) {
    var dd = '';
    val = val.toLowerCase();
    var setli = function () {
      for(var i in AllCity) {
        for(var j = 0; j < AllCity[i].length; j++)
          if(AllCity[i][j]["district"].search(val) >= 0 || AllCity[i][j]["all_letter"].search(val) >= 0) {
            var info = AllCity[i][j];
            dd += '<dd onclick="Weather.selectCity(' + info["weather_id"] + ')">' + info["province"] + '-' + info["city"] + '-' + info["district"] + '</dd>';
          }
      }
      if(ele) {
        if(dd == '') {
          dd = '<dd>“' + val + '”  相关的城市似乎不存在哦！</dd>'
        }
        ele.innerHTML = dd
      }
    }
    if(typeof AllCity != "undefined") {
      setli();
    } else {
      Ajax.ScriptLoader("citys.js", "utf-8", function () {
        setli();
      });
    }
  },
  com_Get: function (id) {
    Weather.nowid = id;
    Ajax.ScriptLoader("http://api.tianqi.114la.com/weather/index.php/api/weather_115browser_detail/areaid/" + id + "/cb/Weather.com_callback");
  },
  bg_code: function (code) {
    var wd_event = {
        "rain": ["03", "07", "08", "09", "10", "11", "12", "21", "22", "23", "24", "25"],
        "snow": ["13", "14", "15", "16", "17", "26", "27", "28"],
        "dust": ["20", "31"]
      },
      _code;
    for(i in wd_event) {
      if(wd_event[i].indexOf(code) > -1) {
        _code = wd_event[i][0];
        break;
      }
    }
    return _code || code;
  },
  com_callback: function (data) {
    if(data.error_code) {
      //加载不到天气文件时
      if(Storage.get(Weather.StorageName)) {
        if(Weather.errortimes >= 3) {
          alert("由于多次获取天气数据失败，请手动选择其他相近城市！");
        } else {
          Weather.com_Get(data.shenghuiID);
          Weather.errortimes++;
          //加载失败次数+1
          alert("您选的地区无数据！正为您读取该省会天气数据！");
        }
      } else {
        alert("自动获取城市失败，正在为您加载北京天气，可以手动设置城市！");
        this.com_Get(this.DefaultCity);
      }
      return;
    }
    if(!data.weatherinfo.air_aqi && !data.weatherinfo.air_pm25) {
      //例如香港、澳门等城市没有等，不显示空气质量等
      Y(".levbox").get(0).style.display = 'none';
      Y(".tqinfo").get(0).style.display = 'none';

    }
    var wd_code = this.bg_code(data.weatherinfo.img1);
    Y(".weatherbox").get(0).style.backgroundImage = 'url(static/images/weatherbg/' + wd_code + '.jpg)';
    var _qua = data.weatherinfo.air_quality ? data.weatherinfo.air_quality.substr(0, 2) : data.weatherinfo.air_quality;
    var _qua2 = !data.weatherinfo.air_aqi && !data.weatherinfo.air_pm25 ? '' : '<p><span class="' + data.weatherinfo.air_quality_leve + '">空气质量：' + data.weatherinfo.air_aqi + '</span><span class="qu ' + data.weatherinfo.air_quality_level + '">' + _qua + '</span></p>';
    var _top = '<div class="img"><img src="' + data.weatherinfo.IconPath + data.weatherinfo.img1 + '.png" /></div><div class="cc">' + data.weatherinfo.temp1.split(",")[0] + "°/" + data.weatherinfo.temp1.split(",")[1] + '°</div><div class="dt"><p><span>' + data.weatherinfo.city + '</span><span>' + data.weatherinfo.weather1 + '</span></p>' + _qua2 + '</div>';
    document.getElementById('iweather').innerHTML = _top;
    var future = '';
    for(var i = 2; i <= 6; i++) {
      future += '<li><div class="img"><img src="' + data.weatherinfo.IconPath + data.weatherinfo["img" + i] + '.png"></div><p>' + data.weatherinfo["week" + i] + '</p></li>'
    }
    document.getElementById('future').innerHTML = future;
    document.getElementById('air_qua').innerHTML = data.weatherinfo.air_aqi + _qua;
    document.getElementById('air_qua').className = data.weatherinfo.air_quality_level
    var pollute = '<li>PM2.5：' + data.weatherinfo.air_pm25 + '</li><li>PM10 ：' + data.weatherinfo.air_pm10 + '</li><li>二氧化硫：' + data.weatherinfo.air_so2 + '</li><li>二氧化氮：' + data.weatherinfo.air_no2 + '</li>';
    document.getElementById('pollute').innerHTML = pollute;
    var others = {
      "zwx": "紫外线强度：",
      "cy": "穿衣指数：",
      "cl": "晨练指数：",
      "ssd": "舒适度指数：",
      "xc": "洗车指数：",
      "ls": "晾晒指数：",
      "gm": "感冒指数：",
      "kt": "空调指数："
    }
    for(var j in others) {
      var ele = Y("#" + j).get(0);
      var ps = Y("p", ele);
      ps.get(0).innerHTML = others[j] + '<span style="color:' + data.weatherinfo[j + "l_color"] + '">' + data.weatherinfo[j + "l"] + '</span>';
      ps.get(1).innerHTML = data.weatherinfo[j + "s"];
    }
    var temps = [];
    for(var k = 2; k <= 6; k++) {
      temps.push(parseInt(data.weatherinfo["temp" + k].split(",")[0]));
      temps.push(parseInt(data.weatherinfo["temp" + k].split(",")[1]));
    }
    var city_txt = Y(".mycity");
    for(var l = 0; l < city_txt.length; l++) {
      city_txt.get(l).innerHTML = data.weatherinfo.city;
    }
    new setWave({
      ele: Y("#MoreWeather").get(0),
      temps: temps
    });
    Storage.set(Weather.StorageName, Weather.nowid + "|" + data.weatherinfo.city);
    Weather.errortimes = 0;
  },
  selectCity: function (id) {
    Storage.set(Weather.StorageName, id + "|$");
    location.href = Weather.url;
  },
  writeCity: function () {
    var hot = Y("#hotcity dl").get(0);
    var _hot = '<dt id="hot">热门城市</dt>';
    for(var i = 0; i < AllCity.hotCity.length; i++) {
      var info = AllCity.hotCity;
      _hot += '<dd onclick="Weather.selectCity(' + info[i].weather_id + ')">' + info[i].district + '</dd>'
    }
    hot.innerHTML = _hot;
    try {
      Y(".mycity").get(0).innerHTML = Storage.get(Weather.StorageName).split("|")[1];
    } catch(e) {}
    var TimeO = null,
      Val = '',
      Ele = Y("#result dl").get(0);
    Y(".scitys").on("focus", function () {
      Y("#scbox").addClass("focus");
      var _this = Y(this);
      TimeO = window.setInterval(function () {
        if(_this.get(0).value != Val) {
          Val = _this.get(0).value
          if(Val == '') {
            Y("#hotcity").get(0).style.display = 'block';
            Y("#result").get(0).style.display = 'none';
          } else {
            Y("#hotcity").get(0).style.display = 'none';
            Y("#result").get(0).style.display = 'block';
          }
          Weather.searchCity(Val, Ele);
        }
      }, 500);
    });
    Y(".scitys").on("blur", function () {
      window.clearInterval(TimeO);
    });
    Y(".sdel").on("click", function () {
      Y(".scitys").get(0).value = '';
      Y("#hotcity").get(0).style.display = 'block';
      Y("#result").get(0).style.display = 'none';
    });
    Y(".sreset").on("click", function () {
      Y("#scbox").removeClass("focus");
      Y(".scitys").get(0).value = '';
      Y("#hotcity").get(0).style.display = 'block';
      Y("#result").get(0).style.display = 'none';
    });
  },
  startLoad: function (fun) {
    window['ILData_callback'] = function () {
      var _city = ILData[3];
      var over = false;
      for(var i in AllCity) {
        for(var j = 0; j < AllCity[i].length; j++) {
          if(AllCity[i][j]["city"] == _city) {
            fun(AllCity[i][j]["weather_id"]);
            Storage.set(Weather.StorageName, AllCity[i][j]["weather_id"] + "|" + _city);
            over = true;
            break;
          }
        }
        if(over)
          break;
      }
    };
    var City = Storage.get(Weather.StorageName);
    if(City) {
      fun(City.split("|")[0]);
    } else {
      Ajax.ScriptLoader("citys.js", "utf-8", function () {
        Ajax.ScriptLoader('http://api.114la.com/ip');
      });
    }
  }
}
