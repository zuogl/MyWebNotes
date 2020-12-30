// 搭建服务
// 当路径为/table时，响应一个4行3列的表格，并实现每行随机颜色
const http = require('http');
const url = require('url');
const fs = require('fs')


const server = http.createServer((request, response) => {
    const repath = url.parse(request.url, true).pathname;
    if (repath === '/table') {
        // response.end(fs.readFileSync('./http隔行变色.html'))//相对路径版
        response.end(fs.readFileSync('../html/http隔行变色.html'))//绝对路径版

    }
})
server.listen(80)


