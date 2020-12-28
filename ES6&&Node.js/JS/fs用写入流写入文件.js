// 引入fs模块
const fs = require('fs');
// 创建写入流对象
const ws = fs.createWriteStream('./xiaozuo.txt')
// 写入文件

ws.write('我是小左\r\n')
ws.write('欢迎来到我的导航')

ws.on('close',()=>{
    console.log('写入成功');
})

// 关闭事件流
ws.close()