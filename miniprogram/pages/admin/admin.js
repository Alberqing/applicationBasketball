// miniprogram/pages/admin/admin.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        cell: [],
        newsTitle: '',
        newsPrompt: '',
        newsContent: '',
        newsSrc: '',
        article: []
    },

    onChange(event) {
        if (event.detail.title === '新闻列表') {
            this.query('news');
        } else if (event.detail.title === '文章列表') {
            this.query('article');
        }
    },
    query: function(baseName) {
        const db = wx.cloud.database();
        db.collection(`${baseName}`).get({
            success: res => {
                console.log(res);
                if (baseName === 'news') {
                    this.setData({
                        cell: res.data
                    });
                } else if (baseName === 'article') {
                    this.setData({
                        article: res.data
                    })
                }

            },
            fail: err => {
                console.log(err);
            }
        })
    },
    submit: function() {
        const {
            newsTitle,
            newsPrompt,
            newsContent,
            newsSrc
        } = this.data;
        const time = new Date();
        const db = wx.cloud.database();
        db.collection('news')
            .add({
                data: {
                    img: newsSrc,
                    prompt: newsPrompt,
                    time: time,
                    title: newsTitle,
                    content: newsContent
                }
            })
            .then(res => {
                console.log(res);
            }, err => {
                console.log(err);
            })

    },
    articleSubmit: function() {
        const {
            newsTitle,
            newsPrompt,
            newsContent,
            newsSrc
        } = this.data;
        const time = new Date();
        const db = wx.cloud.database();
        db.collection('article')
            .add({
                data: {
                    img: newsSrc,
                    prompt: newsPrompt,
                    time: time,
                    title: newsTitle,
                    content: newsContent
                }
            })
            .then(res => {
                console.log(res);
            }, err => {
                console.log(err);
            })
    },
    titleChange: function(event) {
        this.setData({
            newsTitle: event.detail
        });
    },
    promptChange: function(event) {
        this.setData({
            newsPrompt: event.detail
        });
    },
    contentChange: function(event) {
        this.setData({
            newsContent: event.detail
        });
    },
    srcChange: function(event) {
        this.setData({
            newsSrc: event.detail
        });
    },
    exchange: function(){
        wx.switchTab({
            url: '../personalCenter/personalCenter',
        })
    },
    onLoad: function(options) {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})