const storage = {
    set(key, value) { //存值
        try {
            wx.setStorageSync(key, value)
        } catch (e) {
            console.log(e);
        }
    },
    get(key) { //取值
        try {
            var value = wx.getStorageSync(key)
            if (value) {
                return value;
            }
        } catch (e) {
            console.log(e);
        }

    },
    remove(key) { //删除值
        wx.removeStorageSync(key);
    },
    clear() { // 清除缓存
        try {
            wx.clearStorageSync()
        } catch (e) {
            console.log(e);
        }
    }
};
export default storage; //导出模块