const express = require('express');
const fs = require('fs');
const moment = require('moment');
// 创建服务对象
const app = express();

// 定义一个获取客户端ip的函数
function getClientIP(req) {
    return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress;
};

// 定义中间件
let logMidddleWare = function (request, response, next) {
    // 获取URL路径
    // decodeURI（）将路径中的中文转码
    let path = decodeURI(require('url').parse(request.url, true).pathname);
    // 获取客户端的ip
    let ip = getClientIP(request);
    // 利用moment包的format方法格式化时间
    let timeStr = moment().format('YYYY-MM-DD HH:mm:SS');
    // 拼出最终的效果
    let str = `[${timeStr}] ${ip} ${path} \r\n`;
    // 将输出写入到指定的文件
    fs.writeFileSync(__dirname + '/access.log', str, { flag: 'a' });
    // 如果需要继续执行后续的回调函数，一定要调用next函数
    next();
}
// 设置中间件
app.use(logMidddleWare)


app.get('/home', (request, response) => {
    response.send('主页')
});
app.get('/login', (request, response) => {
    response.send('登陆页面')
});
app.all('*', (request, response) => {
    response.send('404 Not Found')
});

app.listen(80, message => {
    console.log('服务已启动，80端口正在监听中');
});
