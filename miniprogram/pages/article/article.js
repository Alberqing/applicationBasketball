// pages/nav/nav.js

const app = getApp()

const util = require('../../common/time.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        article: [],
        page: 0,
        pageSize: 20,
        hasMoreData: false,
        contentlist: [],
        loading: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            loading: true
        })
        wx.cloud.init();
        wx.cloud.callFunction({
            name: 'queryDataBase',
            data: {
                databaseName: 'article',
                page: 0,
                pageSize: this.data.pageSize
            },
            success: res => {
                util.format(res.result);
                this.setData({
                    article: res.result
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
                });
            }
        })
    },
    detail: function(e) {
        app.globalData.articleId = e.currentTarget.id;
        wx.navigateTo({
            url: '../articleDetail/articleDetail',
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        this.setData({
            article: []
        })
        wx.showNavigationBarLoading()
        wx.cloud.init();
        wx.cloud.callFunction({
            name: 'queryDataBase',
            data: {
                databaseName: 'article',
                page: 0,
                pageSize: this.data.pageSize
            },
            success: res => {
                util.format(res.result);
                this.setData({
                    article: res.result,
                    page: 0,
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
                databaseName: 'article',
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
            title: '这里有你喜欢的文章~',
            path: '/pages/index/index',
        }
    }
})