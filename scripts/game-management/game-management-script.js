// 模拟游戏数据
const games = [
    { id: 1, icon: "game1.png", name: "游戏 1", status: "正常运营", time: "2025-01-01" },
    { id: 2, icon: "game2.png", name: "游戏 2", status: "维护中", time: "2025-02-01" },
    // 更多游戏数据...
];

const itemsPerPage = 5; // 每页显示的游戏数量
let currentPage = 1;

const tableBody = document.getElementById('game-table-body');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');

function displayGames() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const gamesToDisplay = games.slice(startIndex, endIndex);

    tableBody.innerHTML = '';
    gamesToDisplay.forEach(game => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${game.id}</td>
            <td><img src="${game.icon}" alt="${game.name}图标" width="50"></td>
            <td>${game.name}</td>
            <td>${game.status}</td>
            <td>${game.time}</td>
            <td>
                <a href="#" class="btn">编辑</a>
                <a href="#" class="btn">删除</a>
            </td>
        `;
        tableBody.appendChild(row);
    });

    pageInfo.textContent = `第 ${currentPage} 页，共 ${Math.ceil(games.length / itemsPerPage)} 页`;
}

prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayGames();
    }
});

nextPageButton.addEventListener('click', () => {
    const totalPages = Math.ceil(games.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayGames();
    }
});

displayGames();

// 获取筛选下拉框
const statusFilter = document.getElementById('status-filter');

// 筛选函数
function filterGamesByStatus() {
    const selectedStatus = statusFilter.value;
    const filteredGames = selectedStatus === 'all' ? games : games.filter(game => game.status === selectedStatus);
    tableBody.innerHTML = '';
    filteredGames.forEach(game => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="game-checkbox" data-game-id="${game.id}"></td>
            <td><img src="${game.icon}" alt="${game.name}图标" width="50"></td>
            <td>${game.name}</td>
            <td>${game.status}</td>
            <td>${game.time}</td>
            <td>
                <a href="#" class="btn">编辑</a>
                <a href="#" class="btn">删除</a>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// 筛选下拉框事件监听
statusFilter.addEventListener('change', filterGamesByStatus);