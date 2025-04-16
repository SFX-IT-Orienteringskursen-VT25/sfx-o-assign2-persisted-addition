const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const DATA_PATH = path.join(__dirname, 'data.json');

app.use(express.static('.')); // 让 HTML 和 JS 可以直接访问
app.use(express.json());

// 初始化 data.json 文件
function initDataFile() {
    if (!fs.existsSync(DATA_PATH)) {
        fs.writeFileSync(DATA_PATH, JSON.stringify([]));
    }
}

// 核心函数：读/写并返回和
function addAndSummarize(newNumber) {
    initDataFile();
    let numbers = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));

    numbers.push(newNumber);
    fs.writeFileSync(DATA_PATH, JSON.stringify(numbers, null, 2));

    const sum = numbers.reduce((a, b) => a + b, 0);
    return { numbers, sum };
}

// POST: 添加数字
app.post('/add-number', (req, res) => {
    const { number } = req.body;

    if (typeof number !== 'number') {
        return res.status(400).send('Invalid input');
    }

    const result = addAndSummarize(number);
    res.json(result);
});

// GET: 获取当前数据
app.get('/data', (req, res) => {
    initDataFile();
    const numbers = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    const sum = numbers.reduce((a, b) => a + b, 0);
    res.json({ numbers, sum });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

//module.exports = { addAndSummarize };

