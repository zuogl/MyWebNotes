const express = require('express');
const router = require('./引入的路由器文件.js');
// 创建服务对象
const app = express();
app.use(router);

app.listen(80, message => {
    console.log('服务已启动，80端口正在监听中');
});