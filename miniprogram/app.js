//app.js
import storage from './common/storage.js';
const request = require('./common/request.js');
App({
  globalData: {
    openid: '',
    requestId:'',
    articleId:'',
    newsId:'',
    storyId:''
  },
  onLaunch: function () {
    var that = this;
    wx.showLoading({
      title: '登录中',
    });
    wx.cloud.init();
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        this.onQuery();
      },
      fail: err => {
        wx.showToast({
          title: '请求失败，请重试',
          icon: '../image/icon/关闭.png',
          duration: 2,
          mask: true,
        })
      }
    });
  },
  //查询登录用户是否已经授权成功，如果已经授权过，直接进入主页面，如果没有踢到授权登录页
        onQuery: function () {
        const db = wx.cloud.database();
        db.collection('userForm').where({
            _openid: this.globalData.openid
        }).get({
            success: res => {
                if (res && res.data && res.data.length) {
                    // if (res.data[0]._openid === 'o9Y8X0UBaJjnTmgyFtOGJiv5ZihA'){ //管理者进入管理后台
                    //     wx.navigateTo({
                    //         url: '../admin/admin',
                    //     })
                    //     } else {
                        wx.switchTab({
                            url: '../home/home',
                        })
                    // }
                    Promise.all([
                        request._get('7/stats/'),
                        request._get('process?clubId=7'),
                        request._get('7/player-stat-cout'),
                        request._get('clubs/stats?year=20182019&league_type=2&rank_type=score'),
                        request._get('process?clubId=7'),
                    ]).then(result => {
                        // console.log(result[3].data);
                        storage.set('againstData', result[0].data);
                        storage.set('competition', result[1].data);
                        storage.set('playerData', result[2].data);
                        storage.set('clubData', result[3].data);
                        storage.set('processData', result[4].data);
                    }).catch(e => {
                        console.log(e)
                    })
                } else {
                    wx.hideLoading();
                    }
                },
                fail: err => {
                    wx.navigateTo({
                        url: '../index/index',
                    })
                }
    })
  },
})
