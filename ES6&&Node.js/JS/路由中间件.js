// red 需求：>>>>>>admin 有后台的意思 必须要携带 vip=1 才能访问后台首页, 如果没有该 url 参数则返回无权限访问<<<<<<
// 1.引入express模块
const express = require('express');
let port = 80;
// 2.创建服务对象
const web = express();

// 声明路由中间件
let vipCheckMiddleWare = function (request, response, next) {
    let vipNum = Number(request.query.vip ? request.query.vip : 0);
    if (vipNum === 1) {
        next()
    } else {
        response.statusCode = 404;
        response.send('404 NotFound')
    }
}

// red 路由中间件声明完后，不需要在全局调用；而是将其直接放在需要的路由规则的回调函数前即可。
// 3.创建路由规则
web.get('/admin', vipCheckMiddleWare, (request, response) => {
    response.send('授权许可，已登录；请进行管理操作')
});
web.get('/setting', vipCheckMiddleWare, (request, response) => {
    response.send('授权许可，已登录;请进行设置')
});

// 4. 设置监听
web.listen(port, message => {
    console.log(`服务已启动，${port}端口正在监听中`);
});