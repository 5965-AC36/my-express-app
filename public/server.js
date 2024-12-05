const express = require('express');
const path = require('path');
const app = express();

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 监听端口 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});