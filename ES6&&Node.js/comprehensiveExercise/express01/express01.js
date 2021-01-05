// red 需求
// red 新建一个HTML页面，让用户填入用户名，和密码。并通过post提交给/login路径；获取用户输入的信息，并在admin页面展示出来。admin页面需要验证 authority大于3才能进入。在login页面给用户设置成功响应200及OK响应字符串。然后提示用户输入一个电影名字，并重定向去https://www.mvcat.com/进行搜索。将用户在login页面输入的电影名字保存到本地的move.log文件中。然后生成一个新的HTML页面，上边有前10个用户输入的电影名字及时间展示。
// 引入相对应的模块
const fs = require('fs')
const express = require('express');
const bodyParse = require('body-parser')
const moment = require('moment');


let vipCheckMiddleWare = function (request, response, next) {
    let vipNum = Number(request.query.vip ? request.query.vip : 0);
    if (vipNum > 3) {
        next()
    } else {
        response.send('权限不足，禁止进入')
    }
}



let port = 80;
// 创建服务对象
const web = express();
// 调用body-parser的urlencoded方法解析请求体中的内容
web.use(bodyParse.urlencoded({ extended: false }))

web.post('/login', (request, response) => {
    response.statusCode = 200;
    response.statusMessage = 'ok'
    response.send(fs.readFileSync('./express02.html').toString());
    // blue 为什么在这儿调用send会是下载？？？？？

    // var username = request.body.username;
    // var password = request.body.password;
    // // 为了获取到用户的提交，只能将admin写到login内部
    // web.get('/admin', vipCheckMiddleWare, (request, response) => {
    //     response.send(`用户${username}的密码是${password}<br>`)
    // });
});




// https://www.mvcat.com/search/?type=Title,subTitle,Tags&word=111


web.listen(port, message => {
    console.log(`服务已启动，端口${port}正在监听中`);
})