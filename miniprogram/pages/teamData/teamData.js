// pages/teamData/teamData.js
import * as echarts from '../../package/ec-canvas/echarts';
import storage from '../../common/storage.js';
const request = require('../../common/request.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        ec: {},
        active: 0,
        playerColumn: [{
                title: '号码',
                key: 'player_number',
            },
            {
                title: '球员',
                key: 'player_name',
            },
            {
                title: '场数',
                key: 'play_times',
            },
            {
                title: '时间',
                key: 'play_time_sec',
            },
            {
                title: '得分',
                key: 'score',
            },
            {
                title: '两分(中)',
                key: 'two_point_shot_goal',
            },
            {
                title: '两分(投)',
                key: 'two_point_shot_total',
            },
            {
                title: '两分(率)',
                key: 'two_point_shot_per',
            },
            {
                title: '三分(中)',
                key: 'three_point_shot_goal',
            },
            {
                title: '三分(投)',
                key: 'three_point_shot_total',
            },
            {
                title: '三分(率)',
                key: 'three_point_shot_per',
            },
            {
                title: '罚球(中)',
                key: 'free_throw_goal',
            },
            {
                title: '罚球(投)',
                key: 'free_throw_total',
            },
            {
                title: '罚球(率)',
                key: 'free_throw_per',
            },
            {
                title: '前场篮板',
                key: 'rebound_offensive',
            },
            {
                title: '后场篮板',
                key: 'rebound_defenstive',
            },
            {
                title: '篮板',
                key: 'rebound_total',
            },
            {
                title: '扣篮',
                key: 'dunk',
            },
            {
                title: '盖帽',
                key: 'block',
            },
            {
                title: '抢断',
                key: 'steal',
            },
            {
                title: '助攻',
                key: 'assist',
            },
            {
                title: '被侵犯',
                key: 'fouled',
            },
            {
                title: '犯规',
                key: 'foul',
            },
            {
                title: '失误',
                key: 'turnover',
            }
        ],
        playerData: [],
        againstColumn: [{
                title: '对手',
                key: 'against_name',
            },
            {
                title: '场数',
                key: 'matches',
            },
            {
                title: '得分',
                key: 'score',
            },
            {
                title: '两分(中)',
                key: 'two_point_shot_goal',
            },
            {
                title: '两分(投)',
                key: 'two_point_shot_total',
            },
            {
                title: '两分(率)',
                key: 'two_point_shot_per',
            },
            {
                title: '三分(中)',
                key: 'three_point_shot_goal',
            },
            {
                title: '三分(投)',
                key: 'three_point_shot_total',
            },
            {
                title: '三分(率)',
                key: 'three_point_shot_per',
            },
            {
                title: '罚球(中)',
                key: 'free_throw_goal',
            },
            {
                title: '罚球(投)',
                key: 'free_throw_total',
            },
            {
                title: '罚球(率)',
                key: 'free_throw_per',
            },
            {
                title: '前场篮板',
                key: 'rebound_offensive',
            },
            {
                title: '后场篮板',
                key: 'rebound_defenstive',
            },
            {
                title: '篮板',
                key: 'rebound_total',
            },
            {
                title: '扣篮',
                key: 'dunk',
            },
            {
                title: '盖帽',
                key: 'block',
            },
            {
                title: '抢断',
                key: 'steal',
            },
            {
                title: '助攻',
                key: 'assist',
            },
            {
                title: '犯规',
                key: 'foul',
            },
            {
                title: '胜',
                key: 'wins',
            },
            {
                title: '负',
                key: 'loses',
            },
        ],
        againstData: [],
        basicColumn: [{
                title: '场数',
                key: 'matches',
            },
            {
                title: '得分',
                key: 'score',
            },
            {
                title: '两分(中)',
                key: 'two_point_shot_goal',
            },
            {
                title: '两分(投)',
                key: 'two_point_shot_total',
            },
            {
                title: '两分(率)',
                key: 'two_point_shot_per',
            },
            {
                title: '三分(中)',
                key: 'three_point_shot_goal',
            },
            {
                title: '三分(投)',
                key: 'three_point_shot_total',
            },
            {
                title: '三分(率)',
                key: 'three_point_shot_per',
            },
            {
                title: '罚球(中)',
                key: 'free_throw_goal',
            },
            {
                title: '罚球(投)',
                key: 'free_throw_total',
            },
            {
                title: '罚球(率)',
                key: 'free_throw_per',
            },
            {
                title: '前场篮板',
                key: 'rebound_offensive',
            },
            {
                title: '后场篮板',
                key: 'rebound_defenstive',
            },
            {
                title: '篮板',
                key: 'rebound_total',
            },
            {
                title: '扣篮',
                key: 'dunk',
            },
            {
                title: '盖帽',
                key: 'block',
            },
            {
                title: '抢断',
                key: 'steal',
            },
            {
                title: '助攻',
                key: 'assist',
            },
            {
                title: '犯规',
                key: 'foul',
            },
            {
                title: '胜',
                key: 'wins',
            },
            {
                title: '负',
                key: 'loses',
            },
        ],
        basicData: [],
        highColumn: [{
                title: '场数'
            }, {
                title: '一节得分'
            }, {
                title: '二节得分'
            }, {
                title: '三节得分'
            }, {
                title: '四节得分'
            }, {
                title: '场均得分'
            }, {
                title: '场均失分'
            }, {
                title: '净胜分'
            },
            {
                title: '进攻效率'
            }, {
                title: '有效投篮'
            }, {
                title: '真实投篮'
            },
        ],
        highData: [{
            '场数': 29,
            '一节得分': 26.7,
            '二节得分': 26.5,
            '三节得分': 30.6,
            '四节得分': 28.8,
            '场均得分': 112.5,
            '场均失分': 101.1,
            '净胜分': 11.4,
            '进攻效率': 119.8,
            '有效投篮': 0.564,
            '真实投篮': 0.602
        }],
        processColumn: [
            {
                title: '比赛时间',
                key: 'matchTime',
            },
            {
                title: '比赛类型',
                key: 'leagueTypeName',
            },
            {
                title: '比赛轮次',
                key: 'round',
            },
            {
                title: '主队',
                key: 'homeClubName',
            },
            {
                title: '比分',
                key: 'last_score',
            },
            {
                title: '客队',
                key: 'guestClubName',
            },
            {
                title: '赛果',
                key: 'result',
            },
        ],
        processData:[]
    },
    // 标签页切换
    onChange(event) {
        wx.setNavigationBarTitle({
            title: `${event.detail.title}`,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.graphComponent = this.selectComponent('#mychart-dom-graph');
        this.initChart();
        const playerData = storage.get('playerData');
        const againstData = storage.get('againstData');
        const processData = this.timeTamp(storage.get('processData'));
        const clubData = this.searchLN(storage.get('clubData'));
        const {
            playerColumn,
            againstColumn,
            basicColumn,
            processColumn
        } = this.data;
        let newPlayerData = [];
        let newAgainstData = [];
        let newBasicData = [];
        let newProcessData = [];
        let dataJson = {play_times:0,home1st:0,home2nd:0,home3rd:0,home4th:0,guest1st:0,guest2nd:0,guest3rd:0,guest4th:0,home_score:0,guest_score:0,win_score:0};
        playerData.map(item => {
            item.play_time_sec = (item.play_time_sec/60).toFixed(1);
            newPlayerData.push(this.jsonSort(playerColumn, item));
        })
        againstData.map(item => {
            newAgainstData.push(this.jsonSort(againstColumn, item));
        })
        clubData.map(item => {
            dataJson.play_times = item.matches;
            newBasicData.push(this.jsonSort(basicColumn, item));
        })
        processData.map(item => {
            item.last_score = `${item.homeScore} : ${item.guestScore}`
            newProcessData.push(this.jsonSort(processColumn, item));
            item.homeClubName === '辽宁本钢' ? 
                (dataJson.home1st += item.home1st, dataJson.home2nd += item.home2nd, dataJson.home3rd += item.home3rd, dataJson.home4th += item.home4th, dataJson.guest1st += item.guest1st, dataJson.guest2nd += item.guest2nd, dataJson.guest3rd += item.guest3rd, dataJson.guest4th += item.guest4th,dataJson.home_score += item.homeScore,dataJson.guest_score += item.guestScore) : 
                (dataJson.home1st += item.guest1st, dataJson.home2nd += item.guest2nd,
                    dataJson.home3rd += item.guest3rd, dataJson.home4th += item.guest4th,
                    dataJson.guest1st += item.home1st, dataJson.guest2nd += item.home2nd, dataJson.guest3rd += item.home3rd, dataJson.guest4th += item.home4th, dataJson.home_score += item.guestScore, dataJson.guest_score += item.homeScore);
            dataJson.win_score = dataJson.home_score - dataJson.guest_score;
        })
        // processData.filter(item => {
        //     item.homeClubName === '辽宁本钢' ? dataJson.home1st += item.home1st : dataJson.home1st += item.guest1st;
            
        // });
        // console.log(a);
        console.log(dataJson);
        this.setData({
            playerData: newPlayerData,
            againstData: newAgainstData,
            basicData: newBasicData,
            processData: newProcessData,
        })
    },
    //求和
    // filter: function(str){
    //     return item.homeClubName === '辽宁本钢';
    // },
    //json数据按照指定的顺序排序
    jsonSort: function(column, data) {
        let arr = [];
        let newJson = {};
        column.map(item => {
            arr.push(item.key);
        })
        arr.map(item => {
            const key = item;
            newJson[key] = data[key];
        })
        return newJson;
    },
    // 筛选出辽宁队数据
    searchLN: function(dataArr) {
        let newData = [];
        dataArr.map(item => {
            if (item.id === 670522) {
                item.matches = item.wins + item.loses; // 校正比赛场数
                newData.push(item);
            }
        })
        return newData;
    },
    // 时间戳处理
    timeTamp: function(arr){
        arr.map(item => {
            let time = new Date(item.matchTime);
            time = time.getFullYear() + '-' + this.length(time.getMonth() + 1) + '-' + this.length(time.getDate());
            item.matchTime = time;
        });
        return arr;
    },
    // 时间位处理
    length:function(len) {
        return len < 10 ? `0${len}` : len;
    },
    initChart: function() {
        this.graphComponent.init((canvas, width, height) => {
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height
            });
            canvas.setChart(chart);
            chart.setOption(this.getOption());
            return chart;
        })
    },
    getOption: function() {
        const highData = this.data.highData[0];
        let data = [];
        for (let key in highData) {
            data.push(highData[key]);
        }
        const seriesData = [{
            value: data.splice(5, 10),
            name: '高阶数据'
        }];
        return {
            backgroundColor: "#130f0f",
            title: {
                text: '高阶数据分析图',
                textStyle: {
                    color: '#fff', //标题颜色
                    align: 'center'
                },
                bottom: '5%',
                left: 'center'
            },
            textStyle: {
                color: '#dfd5d5', //文本颜色
                fontSize: 12,
                lineHeight: 20,
            },
            color: ["#e2255a"],
            tooltip: {
                show: false
            },
            xAxis: {
                show: false
            },
            yAxis: {
                show: false
            },
            radar: {
                indicator: [{
                        name: '场均得分',
                        max: 117.5
                    },
                    {
                        name: '场均失分',
                        max: 117.2
                    },
                    {
                        name: '净胜分',
                        max: 14.5
                    },
                    {
                        name: '进攻效率',
                        max: 121.1
                    },
                    {
                        name: '有效投篮',
                        max: 0.588
                    },
                    {
                        name: '真实投篮',
                        max: 0.616
                    }
                ],
                splitNumber: 8,
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: '#130f0f' // 图表背景网格的颜色
                    }
                },
                axisLine: { // 坐标轴线
                    show: true, // 默认显示，属性show控制显示与否
                    lineStyle: {
                        color: '#000'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#000'
                        // 图表背景网格的颜色
                    }
                },
            },
            series: [{
                name: '基础数据分析',
                type: 'radar',
                symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
                symbolSize: 8, // 拐点的大小
                data: seriesData,
                itemStyle: {
                    normal: {
                        lineStyle: {
                            color: "#ff545e",
                            width: 4
                        },
                        areaStyle: {
                            color: "#8f3433",
                            type: 'default'
                        },
                        opacity: 0.9
                    }
                },
                label: {
                    show: true
                }
            }]
        };
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        return {
            title: '来这里看看辽宁队的数据吧~',
            path: '/pages/index/index',
        }
    }
})