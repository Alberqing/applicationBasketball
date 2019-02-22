// miniprogram/pages/newsDeatil/newsDetail.js
const app = getApp();
const util = require('../../common/json.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        newsDetail: {},
        iconName: 'like-o',
        amount: 0,
        block: false,
        read: 0,
        plain: true,
        collectionStatus: '收藏'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let {
            read
        } = this.data;
        read = read + 1;
        this.setData({
            read
        });
        const id = app.globalData.newsId;
        const db = wx.cloud.database();
        db.collection('news')
            .where({
                _id: id
            })
            .get({
                success: res => {
                    util.time(res.data[0]);
                    this.setData({
                        newsDetail: res.data[0],
                        block: true,
                    })
                }
            })
    },
    like: function() {
        let {
            amount,
            iconName
        } = this.data;
        iconName === 'like-o' ?
            this.setData({
                iconName: 'like',
                amount: amount + 1,
            }) :
            this.setData({
                iconName: 'like-o',
                amount: amount - 1,
            })

    },
    collection: function() {
        let {
            plain,
            collectionStatus
        } = this.data;
        plain ? collectionStatus = '已收藏' : collectionStatus = '收藏'
        this.setData({
            plain: !plain,
            collectionStatus,
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        const title = this.data.newsDetail.title;
        return {
            title: `${title}`,
            path: 'pages/index/index'
        }
    }
})