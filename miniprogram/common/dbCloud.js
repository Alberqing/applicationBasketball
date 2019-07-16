const db = wx.cloud.database();

const dbClound = ({name, param = {}, method, ...others}) => {
        return new Promise((resolve, reject) => {
            db.collection('userStory')
                .where(param)
                .method({
                    success: res => {
                        util.time(res.data[0].userStory);
                        this.setData({
                            storyDetail: res.data[0].userStory
                        })
                    }
                })
        })
}

get = (name, param) => {
    return dbClound({
        url,
        param,
        method: get
    })
}