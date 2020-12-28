//复制文件
const fs = require('fs');

//创建读取流对象
const rs = fs.createReadStream('./file/刻意练习.mp3');
//创建写入流对象
const ws = fs.createWriteStream('../../致胜法宝.mp3');

// 绑定事件
rs.on('data', chunk => {
    //将数据写入到目标文件中
    ws.write(chunk);
});

//简便操作  pipe 管道
rs.pipe(ws);