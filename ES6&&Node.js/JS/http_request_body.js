// 引入 querystring模块，该模块的作用就是为了解析查询字符串
const qs = require('querystring')
require('http')
.createServer((request,response) =>{
    // 获取请求体内容
    // 1. 声明变量
    let body = '';
    request.on('data',chunk =>{
        body + chunk
    })
    request.on('end',() =>{
        console.log(qs.parse(body))
        response.end('Over');
    })

}).listen(80)