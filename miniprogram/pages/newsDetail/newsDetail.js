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
        collectionStatus: '收藏',
        likeStatus: 1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const id = app.globalData.newsId;
        const db = wx.cloud.database();
        const _ = db.command
        db.collection('news').doc(`${id}`).update({
            data: {
                readVol: _.inc(1)
            },
            success(res) {
               
            }
        })
        db.collection('news')
            .where({
                _id: id
            })
            .get({
                success: res => {
                    // util.time(res.data[0]);
                    
                    this.setData({
                        newsDetail: res.data[0],
                        block: true,
                        read: res.data[0].readVol,
                        amount: res.data[0].likeVol,
                        
                    })
                }
            })
    },
    like: function() {
        let {
            amount,
            iconName,
            likeStatus,
        } = this.data;
        likeStatus === 0 ?( iconName = 'like' ,amount= amount + 1,likeStatus=1 ): (iconName = 'like-o' ,amount = amount - 1,likeStatus=0);
        this.setData({iconName,amount,likeStatus});
        const id = app.globalData.newsId;
        const db = wx.cloud.database();
        const _ = db.command
        db.collection('news').doc(`${id}`).update({
            data: {
                likeVol: amount,
                likeStatus: likeStatus,
            },
            success(res) {

            }
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
        const id = app.globalData.newsId;
        const db = wx.cloud.database();
        const _ = db.command
        db.collection('news').doc(`${id}`).update({
            data: {
                collectionStatus: collectionStatus,
            },
            success(res) {

            }
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