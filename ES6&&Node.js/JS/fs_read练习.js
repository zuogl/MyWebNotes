// 用流式读取
const fs = require('fs')
const rs = fs.createReadStream('C:/Windows/Boot/ootDebuggerFiles.ini')


rs.on('data',chunk =>{
    console.log(chunk.toString());
})

// 普通读取
fs.readFile('C:/Windows/Boot/ootDebuggerFiles.ini',(err,data) =>{
    if(err) throw err;
    console.log(data);
})
