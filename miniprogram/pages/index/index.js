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
                app.globalData.openid = res.result.OPENID
                wx.getSetting({
                    success(res) {
                        if (res.authSetting["scope.userInfo"]) {
                            wx.switchTab({
                                url: '../personalCenter/personalCenter',
                            })
                            // wx.navigateTo({
                            //     url: '../admin/admin',
                            // })
                            Promise.all([
                                request._get('7/stats/'),
                                request._get('process?clubId=7'),
                                request._get('7/player-stat-cout'),
                                request._get('clubs/stats?year=20182019&league_type=2&rank_type=score'),
                                request._get('process?clubId=7'),
                            ]).then(result => {
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