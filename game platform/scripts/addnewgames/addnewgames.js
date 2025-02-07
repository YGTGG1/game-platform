

// 获取按钮和模态框元素
const addGameBtn = document.getElementById('add-game-btn');
const addGameModal = document.getElementById('add-game-modal');
const closeBtn = document.querySelector('.close');
const gameForm = document.querySelector('form');

// 点击按钮时显示模态框
addGameBtn.addEventListener('click', function (event) {
    event.preventDefault();
    addGameModal.style.display = 'block';
});

// 点击关闭按钮时隐藏模态框并清空表单
closeBtn.addEventListener('click', function () {
    addGameModal.style.display = 'none';
    gameForm.reset();
});