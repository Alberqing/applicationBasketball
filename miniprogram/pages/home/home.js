// pages/introduce/introduce.js
const app = getApp();
const util = require('../../common/time.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        home: []
    },
    //点击添加，跳转至写故事页面
    addStory: function() {
        wx.navigateTo({
            url: '../edit/edit',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.query();
    },
    query: function() {
        wx.showNavigationBarLoading();
        const db = wx.cloud.database();
        db.collection('userStory').where({
            _openid: app.globalData.openid
        }).get({
            success: res => {
                util.time(res.data);
                this.setData({
                    home: res.data.reverse()
                });
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
                wx.hideNavigationBarLoading();
            }
        })
    },
    storyDetail: function(e) {
        app.globalData.storyId = e.currentTarget.id;
        wx.navigateTo({
            url: '../storyDetail/storyDetail',
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.query();
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        return {
            title: '这里能记录你的小故事呦~'
        }
    }
})