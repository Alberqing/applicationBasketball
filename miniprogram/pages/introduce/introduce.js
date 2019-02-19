const app = getApp();
const util = require('../../common/json.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        playerData: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.showNavigationBarLoading();
        wx.cloud.init();
        wx.cloud.callFunction({
            name: 'queryDataBase',
            data: {
                databaseName: 'player',
                page: 0,
                pageSize: 20
            },
            success: res => {
                this.setData({
                    playerData: res.result.reverse()
                })
            },
            fail: err => {
                wx.showToast({
                    title: '加载失败',
                })
                setTimeout(() => {
                    wx.hideToast();
                }, 3000)
            },
            complete: () => {
                wx.hideNavigationBarLoading()
            }
        })
    },
    playerDetail: function(e) {
        app.globalData.requestId = e.currentTarget.id;
        wx.navigateTo({
            url: '../playerDetail/playerDetail',
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        return {
            title: '你想要的球员资料都在这里啦~',
            path: 'pages/index/index'
        }
    }
})