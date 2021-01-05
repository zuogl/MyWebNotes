// 1.引入express
const { request, response } = require('express');
const express = require('express');
//读取data.json的数据
let data = require('./data.json')
//创建服务对象
let web = express();
let port =8000;
//设置模版引擎
// 设置模版引擎类型
web.set('view engine','ejs');
// 设置模版的存放位置
web.set('views',__dirname+'/views')

//启动静态资源服务
web.use(express.static(__dirname+'/public'))
//创建路由规则
// http://movie.com/3.html  
//响应的结果为 电影的播放页面
web.get('/:id.html',(request,response) =>{
    let id = request.params.id;
    let movieInfo;
    for(let i =0; i<data.movies.length;i++){
        if(data.movies[i].id ===Number(id)){
            movieInfo = data.movies[i]
            break
        }
    }
    response.render('detail',{movieInfo})
});
web.get('/list',(request,response) =>{
    response.render('list',{data})
});
//启动服务
web.listen(port,err =>{
    if (err) throw err;
    console.log(`服务已启动，端口${port}正在监听中`);
})