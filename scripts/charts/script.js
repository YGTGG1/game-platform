// 初始化 ECharts 实例
function initECharts() {
    var myChart = echarts.init(document.getElementById('stat-chart'));

    // 模拟新添加的数据
    var realtimeOnline = 300; // 实时在线人数
    var totalRevenue = 5000; // 总收入
    var payingUsers = 150; // 付费用户数
    var totalGames = 120; // 总游戏数量
    var totalUsers = 500; // 总用户数量
    var totalCancelledUsers = 20; // 总注销用户数量
    var todayNewUsers = 50; // 今日新增用户
    var todayActiveUsers = 200; // 今日活跃用户
    var todayRevenue = 800; // 今日收入

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '关键数据统计'
        },
        tooltip: {},
        xAxis: {
            data: [
                '总游戏数量',
                '总用户数量',
                '总注销用户数量',
                '实时在线人数',
                '总收入',
                '今日新增用户',
                '今日活跃用户',
                '今日收入',
                '付费用户数'
            ]
        },
        yAxis: {},
        series: [
            {
                name: '数据值',
                type: 'bar',
                data: [
                    totalGames,
                    totalUsers,
                    totalCancelledUsers,
                    realtimeOnline,
                    totalRevenue,
                    todayNewUsers,
                    todayActiveUsers,
                    todayRevenue,
                    payingUsers
                ]
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

// 导航栏菜单切换逻辑
function initNavMenu() {
    const navLinks = document.querySelectorAll('.nav-links li a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) {
            link.classList.add('active');
        }

        link.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            window.location.href = this.href;
        });
    });
}

// 游戏列表操作按钮交互
function initGameListButtons() {
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    const pauseGameButtons = document.querySelectorAll('.pause-game');
    const resumeGameButtons = document.querySelectorAll('.resume-game');

    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const gameId = this.dataset.gameId;
            alert(`你正在查看游戏 ID 为 ${gameId} 的详情信息。`);
            // 这里可以添加获取游戏详情数据并展示的逻辑
        });
    });

    pauseGameButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const gameId = this.dataset.gameId;
            if (confirm(`确定要暂停游戏 ID 为 ${gameId} 的运营吗？`)) {
                alert(`游戏 ID 为 ${gameId} 已暂停运营。`);
                // 这里可以添加发送请求暂停游戏运营的逻辑
            }
        });
    });

    resumeGameButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const gameId = this.dataset.gameId;
            if (confirm(`确定要恢复游戏 ID 为 ${gameId} 的运营吗？`)) {
                alert(`游戏 ID 为 ${gameId} 已恢复运营。`);
                // 这里可以添加发送请求恢复游戏运营的逻辑
            }
        });
    });
}

// 快捷操作按钮交互
function initQuickActionButtons() {
    const addGameButton = document.querySelector('.add-game');
    const exportDataButton = document.querySelector('.export-data');
    const publishNoticeButton = document.querySelector('.publish-notice');

    addGameButton.addEventListener('click', function (e) {
        e.preventDefault();
        alert('你即将添加新游戏，请准备好相关信息。');
        // 这里可以添加打开添加新游戏表单的逻辑
    });

    exportDataButton.addEventListener('click', function (e) {
        e.preventDefault();
        alert('正在为你导出数据报表，请稍候。');
        // 这里可以添加发送请求导出数据报表的逻辑
    });

    publishNoticeButton.addEventListener('click', function (e) {
        e.preventDefault();
        alert('你即将发布公告，请输入公告内容。');
        // 这里可以添加打开发布公告表单的逻辑
    });
}

// 游戏搜索功能
function initGameSearch() {
    const gameSearchInput = document.getElementById('game-search');
    const gameTableRows = document.querySelectorAll('.game-list table tbody tr');

    gameSearchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        gameTableRows.forEach(row => {
            const gameName = row.children[1].textContent.toLowerCase();
            if (gameName.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// 初始化所有功能
function init() {
    initECharts();
    initNavMenu();
    initGameListButtons();
    initQuickActionButtons();
    initGameSearch();
}

// 页面加载完成后执行初始化
window.addEventListener('load', init);

// 系统设置表单验证
function validateSettingsForm() {
    const gameServerUrl = document.getElementById('game-server-url').value;
    const dataBackupInterval = document.getElementById('data-backup-interval').value;

    if (gameServerUrl === '') {
        alert('游戏服务器地址不能为空');
        return false;
    }

    if (isNaN(dataBackupInterval) || dataBackupInterval <= 0) {
        alert('数据备份间隔必须是大于 0 的数字');
        return false;
    }

    return true;
}

// 用户搜索按钮点击事件
document.getElementById('user-search-button').addEventListener('click', function () {
    const searchText = document.getElementById('user-search').value;
    // 这里可以添加根据搜索文本过滤用户数据的逻辑
    alert(`正在搜索用户：${searchText}`);
});

// 获取用户数据
function fetchUserData() {
    fetch('api/users')
      .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
      .then(data => {
            const tableBody = document.querySelector('table tbody');
            tableBody.innerHTML = '';
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.registerTime}</td>
                    <td>${user.lastLoginTime}</td>
                    <td>${user.status}</td>
                    <td>
                        <a href="#" class="btn">查看详情</a>
                        <a href="#" class="btn">${user.status === '正常'? '封禁' : '解封'}</a>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
      .catch(error => console.error('Error fetching user data:', error));
}

// 页面加载完成后加载用户数据
window.addEventListener('load', fetchUserData);