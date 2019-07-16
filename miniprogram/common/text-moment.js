const moment = require('./moment.js');
const richTextParse = require('./richText.js');

/**
 * 修改时间
*/
function getTime(data) {
    data.map(item => {
        item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss');
    });
    return data;
}

/**
 * 修改文本格式
 */ 
function richText(data) {
    data.map(item => {
        item.content = richTextParse.go(item.content);
    })
    return data[0].content;
}

module.exports = {
    getTime,
    richText
}