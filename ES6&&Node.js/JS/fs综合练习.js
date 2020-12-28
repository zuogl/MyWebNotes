// 命令总结
// fs.readFile()
// fs.createReadStream()
// fs.writeFile()
// fs.createWriteStream()
// fs.readdir()
// fs.rename()
// fs.unlink()
// fs.mkdir()
// fs.rmdir()


// 在D盘下，按以下要求创建文件/夹。
// - TEST 
//     - CSS
//         - index.css（普通创建）
//         - 要求在该文件中，写入‘我是index.css中的内容’
//         - author.css（流式创建），并写入author.md中的内容
//     - JS
//         - index.js（普通创建）
//         - author.js（流式创建），并写入author.md中的内容
//     - HTML 
//         - index.html （普通创建）
//         - author.html（流式创建），并写入author.md中的内容
//     - author.md
//         - name：xxx
//         - age：xxx
//         - height:xxx
//         - weight:xxx
// 最后输出TEST下的所有文件/文件夹

const fs = require('fs');

fs.mkdir('D:/TEST', err => {
    if (err && err.code === 'EEXIST') {
        fs.rmdir('D:/TEST',{recursive:true}, err => {
            if (err) {
                console.log('创建失败');
                return
            } else {
                fs.mkdir('D:/TEST',err =>{
                    if(err) throw err;
                    makedirFunction() 
                })
               
            }
        })
    } else {
        makedirFunction()
    }
})

function makedirFunction() {
    const ws =fs.createWriteStream('D:/TEST/author.md')
    ws.write('name:xiaozuo\r\n')
    ws.write('age:18\r\n')
    ws.write('height:170\r\n')
    ws.write('weight:70\r\n')
    ws.close()
    console.log('author.md创建成功');
    var  rs = fs.createReadStream('D:/TEST/author.md')

    fs.mkdir('D:/TEST/CSS',err =>{
        if(err) throw err;
        fs.writeFile('D:/TEST/CSS/index.css','我是index.css中的内容',err =>{
            if(err) throw err;
            console.log('idex.css创建成功');
        })
        const ws = fs.createWriteStream('D:/TEST/CSS/author.css');
        
        rs.on('data',chunk =>{
             ws.write(chunk)
        })
        console.log('author.css流式创建成功');
    })
    fs.mkdir('D:/TEST/JS',err =>{
        if(err) throw err;
        fs.writeFile('D:/TEST/JS/index.js','我是index.js中的内容',err =>{
            if(err) throw err;
            console.log('idex.js创建成功');
        })
        const ws = fs.createWriteStream('D:/TEST/JS/author.js');
        rs.on('data',chunk =>{
             ws.write(chunk)
        })
        console.log('author.js流式创建成功');
    })
    fs.mkdir('D:/TEST/HTML',err =>{
        if(err) throw err;
        fs.writeFile('D:/TEST/HTML/index.htnl','我是index.html中的内容',err =>{
            if(err) throw err;
            console.log('idex.html创建成功');
        })
        const ws = fs.createWriteStream('D:/TEST/HTML/author.html');
        rs.on('data',chunk =>{
             ws.write(chunk)
        })
        console.log('author.html流式创建成功');
    })

}
fs.readdir('D:/TEST',{withFileTypes:true},(err,data) =>{
    if(err) throw err;
    console.log(data);
})