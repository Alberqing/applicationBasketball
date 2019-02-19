function time(json) {
    let time = json.time;
    time = time.getFullYear() + '-' + this.date((time.getMonth() + 1)) + '-' + time.getDate();
    json.time = time;
    return json;
}
//时间位数处理函数，在<10的数字前面加上0

function date(len) {
    if (len < 10) {
        return '0' + len;
    } else {
        return len;
    }
}
module.exports = {
    time: time,
    date: date
}