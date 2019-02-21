function time(arr) {
    arr.map(item => {
        let time = item.userStory.time || item.time;
        time = time.getFullYear() + '-' + this.date((time.getMonth() + 1)) + '-' + time.getDate() + ' ' + this.date(time.getHours()) + ':' + this.date(time.getMinutes());
        item.userStory.time = time;
    });
    return arr;
}
//时间位数处理函数，在<10的数字前面加上0

function date(len) {
    if (len < 10) {
        return '0' + len;
    } else {
        return len;
    }
}


function format(arr) {
    arr.map(item => {
        let time = item.time;
        let date = time.split('T');
        item.time = `${date[0]}`
    })
    return arr;
}
module.exports = {
    time: time,
    date: date,
    format: format
}