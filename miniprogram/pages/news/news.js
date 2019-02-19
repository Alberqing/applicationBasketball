// miniprogram/pages/news/news.js
const app = getApp();
const util = require('../../common/time.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        text: [],
        movies: [],
        indicator: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        current: 0,
        page: 0,
        pageSize: 20,
        hasMoreData: false,
        loading: false,
    },

    /**
     * 生命周期函数--监听页面加载
     * 限制展示数据条数
     */
    onLoad: function(options) {
        this.setData({
            loading: true
        })
        wx.cloud.init();
        wx.cloud.callFunction({
            name: 'queryDataBase',
            data: {
                databaseName: 'news',
                page: 0,
                pageSize: this.data.pageSize
            },
            success: res => {
                util.format(res.result);
                this.setData({
                    text: res.result
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
                this.setData({
                    loading: false
                })
            }
        })
    },
    onShow() {
        const db = wx.cloud.database();
        db.collection('swiper').get({
            success: res => {
                this.setData({
                    movies: res.data
                })
            }
        })
    },
    detail: function(e) {
        app.globalData.newsId = e.currentTarget.id;
        wx.navigateTo({
            url: '../newsDetail/newsDetail',
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        this.setData({
            text: []
        })
        wx.showNavigationBarLoading()
        wx.cloud.init();
        wx.cloud.callFunction({
            name: 'queryDataBase',
            data: {
                databaseName: 'news',
                page: 0,
                pageSize: this.data.pageSize
            },
            success: res => {
                util.format(res.result);
                this.setData({
                    text: res.result,
                })
            },
            fail: err => {
                wx.showToast({
                    title: '刷新失败，请重试~',
                })
            },
            complete: () => {
                wx.hideNavigationBarLoading()
            }
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     * 加载第二页
     */
    onReachBottom: function() {
        this.setData({
            loading: true,
            hasMoreData: false
        })
        wx.cloud.init();
        wx.cloud.callFunction({
            name: 'queryDataBase',
            data: {
                databaseName: 'news',
                page: this.data.page + 1,
                pageSize: this.data.pageSize
            },
            success: res => {
                util.format(res.result);
                let page = this.data.page;
                page++;
                this.setData({
                    article: res.result,
                    page: page
                })
                wx.hideLoading();
                if (res.result.length < this.data.pageSize) {
                    this.setData({
                        hasMoreData: true
                    })
                }
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
                this.setData({
                    loading: false
                });
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        return {
            title: '这里有你想要的新闻~~~',
            path: 'pages/index/index'
        }
    }
})