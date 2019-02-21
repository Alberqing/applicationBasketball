//index.js
import storage from '../../common/storage.js';
const app = getApp()

Page({
    data: {
        userInfo: {}
    },
    //点击授权获取用户信息
    onGotUserInfo: function(e) {
        // console.log(e);
        const db = wx.cloud.database();
        db.collection('userForm').add({
            data: {
                userData: e.detail.userInfo
            },
            //成功获取进入小程序主页面
            success: res => {
                wx.switchTab({
                    url: '../personalCenter/personalCenter' //切换到home选项卡
                });
            },
            fail: err => {
                wx.showToast({
                    title: '失败了',
                })
                console.error(err);
            }
        })
    },

    //拒绝授权
    onGetUserRefuse: function() {
        wx.showModal({
            title: "提示",
            content: "拒绝后您将无法浏览小程序，是否确认拒绝,点击返回可重新授权",
            cancelText: "返回",
            confirmText: "确认",
            success: function(res) {
                if (res.confirm) {
                    //退出小程序
                    wx.navigateBack({
                        delta: -1,
                    })
                } else if (res.cancel) {
                    wx.navigateBack();
                }
            }
        })
    },
    onShow: function() {
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
    onQuery: function() {
        const db = wx.cloud.database();
        db.collection('userForm').where({
            _openid: app.globalData.openid
        }).get({
            success: res => {
                if (res && res.data && res.data.length) {
                    // if (res.data[0]._openid === 'o9Y8X0UBaJjnTmgyFtOGJiv5ZihA'){ //管理者进入管理后台
                    //   wx.navigateTo({
                    //     url: '../admin/admin',
                    //   })
                    // } else {
                    //   wx.switchTab({
                    //     url: '../home/home',
                    //   })
                    // }
                    wx.switchTab({
                        url: '../news/news',
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
});