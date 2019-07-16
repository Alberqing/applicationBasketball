// miniprogram/pages/articleDetail/articleDetail.js
const app = getApp();
// const util = require('../../common/json.js');
const moment = require('../../common/text-moment.js');
const richTextParse = require('../../common/richText.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        articleDetail: {},
        nodes:[],
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
        let {read} = this.data;
        read = read+1;
        this.setData({read});
        const id = app.globalData.articleId;
        const db = wx.cloud.database();
        db.collection('article')
            .where({
                _id: id
            })
            .get({
                success: res => {
                    const data = moment.getTime(res.data);
                    const nodes = moment.richText(data);
                    this.setData({
                        articleDetail: data[0],
                        nodes:nodes,
                        block: true,
                    })
                }
            })
    },
    
    /**
     * 喜欢
     */
    like: function(){
        let {amount, iconName} = this.data;
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
    /**
     * 收藏
     */
    collection: function(){
        let {plain,collectionStatus} = this.data;
        plain ? collectionStatus='已收藏' : collectionStatus = '收藏'
        this.setData({
            plain: !plain,
            collectionStatus,
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        const title = this.data.articleDetail.title;
        return {
            title: `${title}`,
            path: 'pages/index/index'
        }
    }
})