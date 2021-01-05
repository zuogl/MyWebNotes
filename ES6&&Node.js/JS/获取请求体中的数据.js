// 引入express 和 body-parser工具包
const express = require('express');
const bodyParse = require('body-parser');

// 创建服务对象
const app = express();
// 调用body-parser的urlencoded方法，解析请求体中的内容
app.use(bodyParse.urlencoded({extended:false}))

app.post('/login',(request,response) =>{
    // 输出请求体内容
    console.log(request.body);
    // 设置响应
    response.send('登陆成功');
}).listen(80)