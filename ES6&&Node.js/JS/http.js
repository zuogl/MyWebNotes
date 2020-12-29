// 1. 引入http模块
const http = require('http');
// 引入URL内置模块
const url = require('url')
// 2. 调用函数返回一个服务对象
// request 是对请求报文的封装对象 通过request对象可以获取到请求报文中的内容
// response 是对响应报文的封装对象 通过response对象可以设置http响应报文
// 每一个http请求到来后，都由回调函数处理请求，并设置响应
const server = http.createServer(function(request,response){
    // 获取请求类型
    console.log(request.method);
    // 获取请求的URL，返回的URL包含路径和查询字符串
    console.log(request.url);
    // 获取请求头的内容
    console.log(request.headers);
    // 注意这儿因为有短横岗，所以要用[]的方式访问
    console.log(request.headers['user-agent']);
    // 调动URL的parse方法自动解析URL
    console.log(url.parse(request.url,true));
    // 获取http请求中的版本号，很少用
    console.log(request.httpVersion);
    // 设置相响应头
response.setHeader('Content-type','text/html;charset=utf-8')
// end 方法是用来设置相应体的
response.end('456852741963')

})
// 3.监听一个端口，启动服务
// 端口号：计算机的服务窗口号，总共65536个
// http的默认端口是80
server.listen(80,() =>{
    console.log('服务已经启动。。。。。。');
})