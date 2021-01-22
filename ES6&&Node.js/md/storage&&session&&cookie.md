## 一、storage
### 1. storage介绍
storage可以存储==相同域名==下的数据，实现同域名下页面间的数据共享。只允许存储字符串。
storage可以分为==两类==：
    - localStorage:本地存储；永久性存储，直到被手动清除。
    - sessionStorage:会话存储，当浏览器关闭时，存储的数据就会被清除。
### 2. storage的方法
> ==以下方法全部使用于`localStorage`和`sessionStorage`两种数据==
#### 1. 设置storage的方法
归根到底，storage还是window下的一个对象。所以可以使用对象添加属性的方式进行设置。包括`.`和`[]`；同时storage还提供了一个方法`setItem(key,value)`,如果key已经存在，将会进行更新。
```js
    localStorage.userName = 'laoli',
    localStorage.setItem('age','12'),
    localStorage['sex'] = '男'
```
#### 2. 获取storage的方法
同理，也可以使用对象读取属性的方法（`.`和`[]`）读取相对应的storage值;同时，storage还提供了一个方法`getItem(key)`用于读取对应的值。
```js
    console.log(localStorage.userName);
    console.log(localStorage.getItem('sex'));
    console.log(localStorage['age']);
```

#### 3. 删除storage的方法
1. 删除对应的storage值
```js
    localStorage.removeItem('sex');//删除sex这个值
```

2. 清空storage值
```js
    localStorage.clear();//清空必
```
### 3.storage事件
当被监听的storage的值发生改变时，自动执行的事件。

```js

// 在A页面中的代码
    const arr = ['red','green','yellow']
    let index = 0
        localStorage.bg = arr[index]
        function change() {
            index++
            if(index >2)
                index = 0;
            localStorage.bg = arr[index]
        }

// 在同域名的B页面中的代码。
    window.onstorage = function (e) {
        // 判断被更改的storage的key值是否是bg,如果是，则改变该页面的背景颜色
        if (e.key === 'bg')
            document.body.style.background = localStorage.bg

    }
```
## 二、cookie
### 1. cookie介绍
可以说cookie是一个头（请求头/响应头）；服务器以响应头的形式将Cookie发送给浏览器，浏览器收到以后会自动将Cookie保存；当浏览器再次访问服务器时，会以请求头的形式将Cookie发回给服务器。
服务器就可以通过检查浏览器发回的Cookie来识别出不同的浏览器。

### 2.cookie的不足
各个浏览器对cookie的数量和大小都有不同的限制，这样就导致我们不能在Cookie中保存过多的信息。一般数量不超过50个，单个大小不超过4kb。
cookie是由服务器发送给浏览器，再由浏览器将cookie发回，如果cookie较大会导致发送速度非常慢，降低用户的体验。
### 3. cookie的常用设置
#### 1. 设置cookie值
> 注意cookie中不能有中文，有中文就会报错。TypeError [ERR_INVALID_CHAR]: Invalid character in header content ["Set-cookie"]

1. 设置单个cookie
```js
    res.set('Set-cookie','userName ==xixi')
```
2. 设置多个cookie
由于响应头相同，当设置第二个cookie时，第一个cookie会被覆盖。要想设置多个cookie值，需要使用数组。每个cookie值之间使用逗号`,`分隔。
```js
res.set('Set-cookie',["userName = 'xixi'",'age = 18',"sex = '1'"])
```
#### 2. 设置cookie值的特性
cookie值的特性在对应的cookie值之后设置，中间用分号`;`隔开。常见的几个特性有`path`、`domain`、`max-age`、`expires`。
1. path
pathd的默认值为/，表示站点下所有目录都会获取与发生cookie；
path = /abc，表示只有站点下目录为/abc下边的页面才能够发送与获取cookie
```js
res.set('Set-cookie',["userName = 'xixi';path=/test",'age = 18']);
```
2. domain
domain表示域的概念。
domain = .xiaozuo.com表示不限制二级域名;
domain = test.xiaozuo.com表示只有在test的二级域名下才能发送和获取cookie
```js
res.set('Set-cookie',["userName = 'xixi';path=/test;domain = test.xiaozuo.com",'age = 18']);
```
3. max-age
max-age指的是过期的秒数,==单位是秒==。不写的话，默认关闭浏览器，cookie丢失。
```js
res.set('Set-cookie',["userName = 'xixi';path=/test;max-age=10",'age = 18']);
```
4. expires
expires指定utc时间，指定过期的日期。当max-age和expires同时出现时，max-age的权重更高。
```js
// 生成utc时间,默认60秒过期
function getUtcTime(time=60*1000){
    const da = new Date();
    da.setTime(Date.now()+time);// 指定毫秒数,设置为60秒
    return da.toUTCString();
}
res.set('Set-cookie',["userName = 'xixi'max-age=10",`age = 18;expires=${getUtcTime(1000*1000)}`]);
```
#### 3. 获取cookie值
要想在前端控制台中输出cookie值
```js
console.log(req.headers.cookie)
```
### 4. cookie-parser包的使用
1. 安装包
```js
npm i cookie-parser
```
2. 引入包
```js
const cookieParser = require('cookie-parser');
```
3. 设置cookie值及其对应的特性
使用cookie-parser设置cookie时，cookie值的特性和其对应值之间用逗号分隔，所有的特性组成一个大的对象。默认可以设置多个cookie值，不会产生覆盖。
```js
    res.cookie("userName","zhangsan",{
        maxAge:10*1000,// 毫秒
        path:"/abc",
        domain:".zhangpeiyue.com",
    });
    res.cookie("age","12");
```
4. 获取cookie值
直接使用req.cookies即可获取所有cookie值。
```js
console.log(req.cookies)
```


## 三、 session
### 1. session介绍
Session是一个对象，存储特定用户会话所需的属性及配置信息。Session是保存在服务端的数据。（保存介质可以是：文件，数据库，内存）。
### 2. session运作流程
我们可以在服务器中为每一次会话创建一个对象，然后每个对象都设置一个唯一的id，并将该id以cookie的形式发送给浏览器，然后将会话中产生的数据统一保存到这个对象中，这样我们就可以将用户的数据全都保存到服务器中，而不需要保存到客户端，客户端只需要保存一个id即可。
### 3. session的使用
1. 安装express-session模块
```js
    yarn add express-session
```
2. 引入模块
```js
    const expressSession = require('express-session')
```
3. 设置与之相关的中间件
session的相关配置主要有如下几项：
- name
返回客户端的key的名字，默认值是connect.sid,通过name属性，将key重新设置
```js
name:"sessionId"
```
- secret
密文。是一个字符。作为服务端生成Session的一个签名。
```js
secret:"%……&*"
```
- resave
是否在每次请求时重新保存session。
```js
resave:false
```
- saveUninitialized
设置session的初始值。如果为false,当你没有设置session时，在浏览器中无值，如果为true,不管你有没有设置session在浏览器中都有值。
```js
saveUninitialized: false, 
```
- cookie
```js
cookie: {
        httpOnly: false, // 开启后前端无法通过 JS 操作
        maxAge: 1000*10 // 这一条 是控制 sessionID 的过期时间的
    }
```
完整的代码如下：
```js
    web.use(expressSession({
    name:"sessionId",
    secret:"%……&*",
    resave:false,
    saveUninitialized: false, 
    cookie: {
        httpOnly: false, 
        maxAge: 1000*10 
    }
}))
```

4. session值的操作
- 设置
```js
    req.session.userName = 'xixi';
    req.session.age = 12
```
- 读取
```js
    // 在服务器端读取
    req.session.userName,
    req.session.age

    // 在浏览器中读取
    console.log(document.cookie)
```
- 删除
```js
    // 1.让你的session值过期
    req.session.cookie.maxAge = 0;
    // 2. 用destroy()方法，该方法需要接收一个回调作为参数。
    req.session.destroy(() =>{
        res.send('销毁成功')
    })
```

### 4. session和cookie的区别
1. 存在的位置：
cookie 存在于客户端
session 存在于服务器端，一个session域对象为一个用户浏览器服务
2. 安全性：  
cookie是以明文的方式存放在客户端的，安全性较低，可以通过一个加密算法进行加密后存放
session存放于服务器中，所以安全性较好
3. 网络传输量：
cookie会传递消息给服务器
session本身存放于服务器，但是通过cookie传递id，会有少量的传送流量
4. 大小：
cookie 保存的数据不能超过4K，很多浏览器都限制一个站点最多保存50个cookie
session 保存数据理论上没有任何限制



