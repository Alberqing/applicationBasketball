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
                wx.getSetting({
                    success(res) {
                        if (res.authSetting["scope.userInfo"]) {
                            wx.switchTab({
                                url: '../teamData/teamData',
                            })
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
        const db = wx.cloud.database();
        db.collection('userForm').add({
            data: {
                userData: e.detail.userInfo
            },
            //成功获取进入小程序主页面
            success: res => {
                // this.queryUser();
                // TODO 查询数据库中是否存在用户信息
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
    }
});