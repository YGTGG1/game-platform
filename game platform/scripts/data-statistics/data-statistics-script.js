// 初始化第一个 ECharts 实例
var myChart1 = echarts.init(document.getElementById('stat-chart1'));

// 指定第一个图表的配置项和数据
var option1 = {
    title: {
        text: '每日新增用户统计'
    },
    tooltip: {},
    xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {},
    series: [{
        name: '新增用户数',
        type: 'bar',
        data: [50, 60, 80, 70, 90, 110, 100]
    }]
};

// 使用刚指定的配置项和数据显示第一个图表。
myChart1.setOption(option1);

// 初始化第二个 ECharts 实例
var myChart2 = echarts.init(document.getElementById('stat-chart2'));

// 指定第二个图表的配置项和数据
var option2 = {
    title: {
        text: '游戏收入分布'
    },
    tooltip: {},
    xAxis: {
        data: ['游戏 1', '游戏 2', '游戏 3', '游戏 4', '游戏 5']
    },
    yAxis: {},
    series: [{
        name: '收入（元）',
        type: 'bar',
        data: [2000, 1500, 1800, 2200, 1600]
    }]
};

// 使用刚指定的配置项和数据显示第二个图表。
myChart2.setOption(option2);