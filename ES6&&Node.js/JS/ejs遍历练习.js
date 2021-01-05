const data = [
    {
        id: 1,
        name: '孙燕姿',
        song: '逆光'
    },
    {
        id: 2,
        name: '周杰伦',
        song: '不能说的密码'
    },
    {
        id: 3,
        name: '林俊杰',
        song: '不为谁而作的歌'
    },
    {
        id: 4,
        name: '五月天',
        song: '干杯'
    },
    {
        id: 5,
        name: '张艺兴',
        song: '莲'
    },
    {
        id: 6,
        name: '刘德华',
        song: '冰雨'
    },
    {
        id: 7,
        name: '张学友',
        song: '情人'
    }
];
// 1.引入模块
const express = require('express');
const ejs = require('ejs');
const fs = require('fs');


const web = express();

web.get('/songs', (request, response) => {

    // 2.数据准备
    let str = fs.readFileSync('./ejs01.html').toString();
    let date = { data }
    // 3.调用render方法
    const result = ejs.render(str, date);

    response.send(result)
})
web.listen(80, message => {
    console.log('服务已启动，80端口正在监听中');
})
