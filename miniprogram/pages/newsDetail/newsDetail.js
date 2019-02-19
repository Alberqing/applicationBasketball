// miniprogram/pages/newsDeatil/newsDetail.js
const app = getApp();
const util = require('../../common/json.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        newsDetail: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
                        newsDetail: res.data[0]
                    })
                }
            })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        const title = this.data.newsDetail.title;
        return {
            title: `${title}`,
            path: 'pages/index/index'
        }
    }
})