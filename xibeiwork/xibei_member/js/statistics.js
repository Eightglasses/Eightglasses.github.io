var _S = {};
_S.init = function () {
    _S.load();
}
_S.load = function () {
    var data1 = data2 = data3 = data4 = [{
            value: 150,
            name: '直接访问',
            itemStyle: {
                color: {
                    x: 0.4,
                    y: 0,
                    x2: 0.1,
                    y2: 0.3,
                    colorStops: [{
                            offset: 0,
                            color: '#A6DFFF' // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: '#A294FC' // 100% 处的颜色
                        }
                    ]
                }
            },
        },
        {
            value: 50,
            itemStyle: {
                color: {
                    colorStops: [{
                        offset: 1,
                        color: '#f9f9f9' // 100% 处的颜色
                    }]
                }
            },
        }
    ];

    var data5 = [{
            value: 12345,
            name: '甄选实收',
            itemStyle: {
                color: {
                    x: 0.4,
                    y: 0,
                    x2: 0.1,
                    y2: 0.3,
                    colorStops: [{
                            offset: 0,
                            color: '#FFD77F' // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: '#FFDE74' // 100% 处的颜色
                        }
                    ]
                },
            },
        },
        {
            value: 12345,
            name: '堂食实收',
            itemStyle: {
                color: {
                    x: 0.4,
                    y: 0,
                    x2: 0.1,
                    y2: 0.3,
                    colorStops: [{
                            offset: 0,
                            color: '#FE962C' // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: '#FFC855' // 100% 处的颜色
                        }
                    ]
                }
            },
        },
        {
            value: 12345,
            name: '外卖实收',
            itemStyle: {
                color: {
                    x: 0.4,
                    y: 0,
                    x2: 0.1,
                    y2: 0.3,
                    colorStops: [{
                            offset: 0,
                            color: '#FF9172' // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: '#FF5B49' // 100% 处的颜色
                        }
                    ]
                }
            },
        },
    ]

    setEcharts("#echart1", data1, false);
    setEcharts("#echart2", data2, false);
    setEcharts("#echart3", data2, false);
    setEcharts("#echart4", data2, false);
    setEcharts("#echart5", data5, true);
}
_S.init();


function setEcharts(element, dataList, labelShow) {
    var myChart = echarts.init(document.querySelector(element));
    console.log(labelShow);

    option = {
        // tooltip: {
        //     trigger: 'item',
        //     formatter: '{a} <br/>{b}: {c} ({d}%)'
        // },

        label: {
            formatter: '￥{c} \n {b}',
            color: '#212763',
        },

        series: [{
            type: 'pie',
            silent: true,
            radius: ['70%', '90%'],
            avoidLabelOverlap: true,
            label: {
                show: labelShow,
            },
            itemStyle: {
                normal: {
                    barBorderRadius: 40,
                },
                emphasis: {
                    barBorderRadius: 40
                },
            },
            data: dataList
        }]
    };
    if (labelShow) {
        option.series[0].radius = ['55%', '70%']
    } else {
        option.series[0].radius = ['70%', '90%']
    }
    console.log(option);

    myChart.setOption(option);

}