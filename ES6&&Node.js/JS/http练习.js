const http = require('http');
const url = require('url');

const serve = http.createServer(function(request,response){
    const remethod = request.method;
    const reurl = url.parse(request.url,true);
    const repath = reurl.pathname;
    response.setHeader('Content-type','text/html;charset=utf-8')
    if(remethod == 'GET' && repath == '/login'){
        response.end('登陆页面')
    }else if(remethod == 'GET' && repath == '/register'){
        response.end('注册页面')
    }else if(remethod == 'GET' && repath == '/home'){
        response.end('网站首页')
    }else if(remethod == 'GET' && repath == '/center'){
        response.end('个人中心页面')
    }else{
        response.end('404 未找到页面')
    }

})

serve.listen(80,() =>{
    console.log('服务已启动，正在监听80端口');
})