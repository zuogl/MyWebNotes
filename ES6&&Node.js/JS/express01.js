// 1.引入express模块
const { response } = require('express');
const express = require('express')
// 2.创建服务对象
const app = express();

app.get('/login', (request, response) => {
    response.send('你提交的用户名为'+request.query.username+'你提交的密码为'+request.query.password)
    // console.log(request.query);
});


// 占位符练习
app.get('/:pid', (request, response) => {
    console.log(request.query);
    response.send('当前页面的路径为'+request.params.pid+'当前页面的查询字符串为'+request.query.wd)
});
app.get('/register', (request, response) => {
    response.end('register')
});
app.get('/xiangying',(request,response)=>{
    response.statusCode = 200;
    response.statusMessage = 'OK';
    // response.send('我是express中的响应体设置');
    response.download('./package.json');
    response.sendFile(__dirname+'/express01.html');
    // response.redirect('https://www.baidu.com/');

})

app.listen(80,message =>{
    console.log('80端口正在监听中');
})