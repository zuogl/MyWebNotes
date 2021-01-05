const express = require('express');
// 创建路由对象
const router = express.Router();
// 设置路由规则
router.get('/home', (request, response) => {
    response.send('主页')
});
router.get('/login', (request, response) => {
    response.send('登陆页面')
});
router.all('*', (request, response) => {
    response.send('404 Not Found')
});
// 暴露路由对象
module.exports = router;
