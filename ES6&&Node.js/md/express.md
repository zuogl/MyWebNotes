##　express框架
### 1. express简介
Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，它提供一系列强大的特性，帮助你快速创建各种 Web 和移动设备应用。
==简单来说Express就是运行在node中的用来搭建服务器的模块。==

### 2. express的基本使用流程
0.安装express模块
```js
npm i express
```
1.引入express
```js
const express = require('express')
```
2.创建服务对象
```js
const app = express()
```
3.创建路规则
```js
app.get('/home',(request,response) =>{
    response.end('home')
});//当请求方法为get，并且路径为/home的时候，返回对应的内容

app.post('/login',(request,response) =>{
    response.end('login')
});

app.all('/support',(request,response) =>{
    response.end('我是all方法的返回')
});

app.all('*',(request,response) =>{
    response.end('<h1>404 Not Found</h1>')
});
```

4. 监听端口，启动服务
```js
app.listen('80')
```

#### 在express中获取请求参数
- 原生的获取方式，在express中都可以使用
```js
app.get('/qingqiu',(request,response) =>{
    // send 是response的一个方法，只能在express中使用
    response.send('home');//这行代码等价于 response.setHeader('Content-type','text/html;charset=utf-8') 和 response.end('home')
 
    // 获取查询字符串
    console.log(request.query);
    // 原生获取查询字符串
    console.log(require('url').parse(request.url,true).query)
    // 请求头的获取,获取所有的请求头组成的对象
    request.headers

    request.get('cache-control');//获取请求头中cache-control属性的值
    app.get('/：pid.html',(request,response) =>{//：pid 路径占位符
    request.params;//获取占位符对应的参数值
    });
});
```


#### 在express中设置响应
```js
app.get('/xiangying',(request,response) =>{
    // 设置响应
    // 状态码
    response.statusCode = 404;
    // 相应状态字符串
    response.statusMessage = 'hahaha';
    // 响应头
    response.setHeader('abc','def');
    // 响应体
    response.send('dddd');
    // 下载响应，目标下载文件的路径
    response.download('目标文件的路径')
    // 响应文件中的内容， 将文件中的内容作为相应体,必须是绝对路径
    response.sendFile(__dirname + 'package.json');
    // 重定向设置，将目标写在参数中 重定向的优先级高
    response.redirect('http:www.baidu.com')

});
```
#### 获取请求体中的内容
- 需要用到body-parser工具包
```js
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
```

### 3.关于express中请求和响应API总结
#### 请求
- request.query 获取请求行中的查询字符串
- request.params 获取占位符中的数据
- request.headers 获取请求头对象
#### 响应
- response.statusCode = xx 设置响应码
- response.setHeader()  设置响应头
- response.end() 设置响应体
- response.send() 框架设置响应体，这个默认添加的响应头的格式为text/html格式
- response.download() 下载响应
- response.redirect() 重定向响应


### 4.中间件
#### 全局中间件
<p style='color:red'>全局中间件在声明完后，需要在全局进行设置`app.use(logMidddleWare)`;路由中间件声明完后，不需要在全局调用；而是将其直接放在需要的路由规则的回调函数前即可。</p>

```js
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

```

##### 内置中间件(全局中间件的一种)
静态资源--长时间内容不发生改变的资源，包含但不限于：HTML文件、css文件、js文件、图片资源
express中路由与静态资源服务应用场景
    - 为客户端响应动态网页内容（HTML）的时候，使用路由规则
    - 为客户端响应静态资源服务的时候，使用app.use
```js
app.use(express.static(__dirname+'/public'))//public为网页根目录
```
#### 路由中间件
```js
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
```

#### 路由器
<p style='color:red'>路由器的功能就是为主程序减负的。将许多路由规则都在其他文件中进行处理，并暴露数据接口；然后在主文件中通过接入暴露的数据接口，并使用中间件。</p>

```js
// 路由主文件
const express = require('express');
const router = require('./引入的路由器文件.js');
// 创建服务对象
const app = express();
app.use(router);

app.listen(80, message => {
    console.log('服务已启动，80端口正在监听中');
});

// 引入的路由文件
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
```

### 5.ejs
ejs是一个模版引擎包
模版引擎是一种用于分离页面（HTML）和数据（服务端JS代码）的技术。
<p style='color:red'>ejs.render就是将第二个参数（一定要是个对象）放到第一个参数的对应占位符中去进行处理计算</p>

#### 1. ejs基本使用 
```js
// 在HTML页面中用占位符进行占位
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1> <%= res%> </h1>
</body>
</html>

// 所有的数据处理都交给js文件处理
const ejs = require('ejs');
const fs = require('fs');
const moment = require('moment')

let str = fs.readFileSync('./ejs01.html').toString();
let timeStr = moment().format('YYYY-MM-DD HH:mm:SS');
let res = `现在的时间是：${timeStr}`

let result = ejs.render(str,{res,timeStr})
console.log(result);
```

#### 2.ejs 遍历操作
```js
// 在HTML中进行遍历
<table>
        <tr>
            <th style="border: 1px solid red;">id</th>
            <th style="border: 1px solid red;">name</th>
            <th style="border: 1px solid red;">song</th>
        </tr>
        <%for(let i=0;i<data.length;i++){%>
            <tr style="text-align: center;">
                <td style="border: 1px solid red;">
                    <%= data[i].id%>
                </td>
                <td style="border: 1px solid red;">
                    <%= data[i].name%>
                </td>
                <td style="border: 1px solid red;">
                    <%= data[i].song%>
                </td>
            </tr>
            <%}%>

    </table>


// 在js中进行数据的拼接
// 1. 引入模块
const fs = require('fs');
const ejs = require('ejs')
    // 2.数据准备
    let str = fs.readFileSync('./ejs01.html').toString();
    let date = { data }
    // 3.调用render方法
    const result = ejs.render(str, date);
```


#### 3.ejs 逻辑判断
```js
// 
// 1. 引入模块
const ejs = require('ejs');
// 2.数据准备
const str = `
    <h2>欢迎回来</h2>
    <%if (vip != 1){%>
    <div id = 'ad'>不是每一滴牛奶，都叫特仑苏</div>
    <%}%>
`
const data = {
    vip:0 //表示是否是会员
}
// 3. 调用方法
const result = ejs.render (str,data)
console.log(result)
```

#### 4.在express中使用ejs的简便方法
通过这种方式在express中使用ejs，只需要配置相关的ejs文件即可，不需要引入ejs包，fs模块等；在进行数据准备时，只需要将需要用到的数据做成对象即可，数据的最终展示结果在ejs模版文件中设置。
```js
// 1. 引入ejs模块
const express = require('express');
const app = express();
// 2. 设置ejs
// 设置模版引擎的类型
app.set('view engine','ejs')//固定写法

// 设置模版的存放文件夹；具有ejs语法的文件为模版文件
app.set('views',__dirname + '/html')

app.get('/songs', (request, response) => {
    const songs = [
        {
            id:1,
            name: '孙燕姿',
            song: '逆光'
        },
        {
            id:2,
            name: '周杰伦',
            song: '不能说的密码'
        },
        {
            id:3,
            name:'林俊杰',
            song: '不为谁而作的歌'
        },
    ];
//3. 准备数据
let data = {
        songs
}
//4. 页面的渲染(编译)  调用 render 方法
//第一个参数为『模板的名称』,设置的时候不需要写后缀. 但是模板的名字必须为 ejs 后缀
//第二个参数为『数据』
response.render('table', data);
});

// table.ejs中的文件
    <table border="1">
        <tr><td>ID</td><td>歌手</td><td>歌曲</td></tr>
        <% for(let i=0;i<songs.length;i++){ %>
        <tr><td><%= songs[i].id %></td><td><%= songs[i].name %></td><td><%= songs[i].song %></td></tr>    
        <% } %>
    </table>
```


页面的url若没有填写协议、域名、端口，发送请求时，使用的都是当前网页的相关信息