// miniprogram/pages/playerDetail/playerDetail.js
import * as echarts from '../../package/ec-canvas/echarts';

const app = getApp();

let chart = null;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        player: {},
        ec: {
            lazyLoad: true,
        },
        maxHighData: [],
        maxBasicData: []
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
    initAdvance: function() {
        this.advanceComponent.init((canvas, width, height) => {
            const chartAdvance = echarts.init(canvas, null, {
                width: width,
                height: height
            });
            canvas.setChart(chartAdvance);
            chartAdvance.setOption(this.getOptionAdvance())
            return chartAdvance;
        })
    },
    getOptionAdvance: function() {
        const seriesData = [{
            value: this.data.player.advanceData,
            name: '进阶数据'
        }];
        const indicatorData = this.data.maxHighData;
        return {
            backgroundColor: "#130f0f",
            title: {
                text: '进阶数据分析图',
                textStyle: {
                    color: '#fff', //标题颜色
                    align: 'center'
                },
                bottom: '5%',
                left: 'center'
            },
            textStyle: {
                color: '#dfd5d5', //文本颜色
                fontSize: 10,
            },
            color: "#0066ff", //拐点颜色
            xAxis: {
                show: false
            },
            yAxis: {
                show: false
            },
            radar: {
                indicator: indicatorData,
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
                        color: '#000' // 图表背景网格的颜色
                    }
                },
            },
            tooltip: {
                show: false
            },
            series: [{
                name: '进阶数据分析',
                type: 'radar',
                symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
                symbolSize: 8, // 拐点的大小
                data: seriesData,
                itemStyle: {
                    normal: {
                        lineStyle: {
                            color: "#0766f6",
                            width: 4
                        },
                        areaStyle: {
                            color: "#206fe6",
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
    getOption: function() {
        const seriesData = [{
            value: this.data.player.datasource,
            name: '基础数据'
        }];
        const indicatorData = this.data.maxBasicData;
        return {
            backgroundColor: "#130f0f",
            title: {
                text: '基础数据分析图',
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
                indicator: indicatorData,
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
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.graphComponent = this.selectComponent('#mychart-dom-graph');
        this.advanceComponent = this.selectComponent('#mychart-advance');
        const db = wx.cloud.database();
        db.collection('player').where({
            _id: app.globalData.requestId
        }).get({
            success: res => {
                wx.setNavigationBarTitle({
                    title: res.data[0].name,
                })
                this.setData({
                    player: res.data[0],
                    myrich: res.data[0].introduce
                }, () => {
                    this.initChart();
                    this.initAdvance();
                });
            },
            fail: err => {
                wx.showToast({
                    title: '加载失败，请重试',
                })
            }
        });
        db.collection('maxData').get({
            success: res => {
                this.setData({
                    maxBasicData: res.data[0].maxPlayerData,
                    maxHighData: res.data[1].maxPlayerData
                })
            }
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function(res) {
        const name = this.data.player.name;
        return {
            title: `${name}的详细介绍都在这里啦~`,
            path: '/pages/index/index',
            success: function() {
                wx.showToast({
                    title: '转发成功',
                })
            },
            fail: function() {}
        }
    }
})