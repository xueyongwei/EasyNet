// alert('test.js')
// // JS方法如下，不过两个客户端返回值会有些不同，平台限制
// // array OOFJS.browser.homeList()
// // void  OOFJS.browser.homeDelete(id)
// // int(id)  OOFJS.browser.homeAdd(title, link, icon, remarks)
// // homeList 返回的数据里面包含5个字段 id,title,link,icon,remarks
//
// var testArr = [{
//   "id": 1,
//   "title": "美团",
//   "link": "http://www.meituan.com/",
//   "icon": "hot4",
//   "remarks": ""
// }, {
//   "id": 2,
//   "title": "新浪微博",
//   "link": "http://weibo.com/",
//   "icon": "hot2",
//   "remarks": ""
// }, {
//   "id": 3,
//   "title": "新浪微博",
//   "link": "http://weibo.com/",
//   "icon": "default",
//   "remarks": ""
// }];
// var OOFJS = {};
// OOFJS.browser = {
//   homeList: function () {
//     return testArr;
//   },
//   homeDelete: function (id) {
//     console.log('del_' + id);
//   },
//   homeAdd: function (title, link, icon, remarks) {
//     testArr.push({
//       "id": "",
//       "title": title,
//       "link": link,
//       "icon": icon,
//       "remarks": remarks
//     });
//     return icon + '_id';
//   }
// };
