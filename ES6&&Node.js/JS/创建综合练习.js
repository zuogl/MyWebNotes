const fs = require('fs');
fs.mkdir('D:/project', err=>{
    if(err && err.code === 'EEXIST'){
        fs.rmdir('D:/project', {recursive:true}, err =>{
            if(err){
                console.log('failed');
                return;
            }else{
                fs.mkdir('D:/project', err => {
                    if(err) throw err;
                    //创建project内部结构
                    createStruct();        
                })
            }
        })
    }else{
        //调用函数 创建 project 内部结构
        createStruct(); 
    }    
});
function createStruct(){
    //显示成功
    fs.mkdir('D:/project/images', err => {
        if(err) throw err;
        //创建 logo.png
        fs.writeFile('D:/project/images/logo.png', '', err=>{
            if(err) throw err;
            console.log('logo.png 创建成功')
        })
    });

    fs.mkdir('D:/project/css', err => {
        if(err) throw err;
        //创建 logo.png
        fs.writeFile('D:/project/css/app.css', '', err=>{
            if(err) throw err;
            console.log('app.css 创建成功')
        })
    });

    fs.mkdir('D:/project/js', err => {
        if(err) throw err;
        //创建 logo.png
        fs.writeFile('D:/project/js/app.js', '', err=>{
            if(err) throw err;
            console.log('app.js 创建成功')
        })
    });

    fs.writeFileSync('D:/project/index.html', '', err => {
        if(err) throw err;
        console.log('index.html 创建成功');
    })
}