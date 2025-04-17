const fs = require('fs');
const path = require('path');
const { addAndSummarize } = require('./app');

const dataPath = path.join(__dirname, 'data.json');

beforeEach(() => {
    // 每次测试前重置文件内容
    fs.writeFileSync(dataPath, JSON.stringify([]));
});

test('adds numbers and returns correct sum', () => {
    let result = addAndSummarize(5);
    expect(result.sum).toBe(5);

    result = addAndSummarize(3);
    expect(result.sum).toBe(8);

    result = addAndSummarize(-1);
    expect(result.sum).toBe(7);
});
