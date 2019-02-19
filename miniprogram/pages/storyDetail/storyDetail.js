// miniprogram/pages/articleDetail/articleDetail.js
const app = getApp();
const util = require('../../common/json.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        storyDetail: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const id = app.globalData.storyId;
        const db = wx.cloud.database();
        db.collection('userStory')
            .where({
                _id: id
            })
            .get({
                success: res => {
                    util.time(res.data[0].userStory);
                    this.setData({
                        storyDetail: res.data[0].userStory
                    })
                }
            })
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        const title = this.data.articleDetail.title;
        return {
            title: `${title}`,
            path: 'pages/index/index'
        }
    }
})