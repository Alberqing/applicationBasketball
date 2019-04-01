//index.js
import storage from '../../common/storage.js';
const request = require('../../common/request.js');
const app = getApp()

Page({
    data: {
        userInfo: {},
        hidden: false,
    },
    onLoad() {
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
                console.log(res);
                app.globalData.openid = res.result.OPENID
                wx.getSetting({
                    success(res) {
                        if (res.authSetting["scope.userInfo"]) {
                            wx.switchTab({
                                url: '../personalCenter/personalCenter',
                            })
                        } else {
                            wx.hideLoading();
                            that.setData({
                                hidden: true
                            })
                        }
                    }
                })
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

    //点击授权获取用户信息
    onGotUserInfo: function(e) {
        wx.getUserInfo({
            success: res => {
                this.addUser(res.userInfo);
            },
            fail: err => {
                console.log(err);
            }
        })
    },
    // 添加用户信息至用户表中
    addUser: function(userInfo){
        const db = wx.cloud.database();
        db.collection('userForm').add({
            data: {
                userInfo: userInfo
            },
            success: res => {
                wx.switchTab({
                    url: '../personalCenter/personalCenter' //进入个人中心
                });
            },
            fail: err => {
                wx.showToast({
                    title: '失败了',
                })
            }
        })
    }
});