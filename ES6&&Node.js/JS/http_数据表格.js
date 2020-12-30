// ## 练习

// 响应一个表格 N 行 3 列表格

const data = [
    {
        id:1,
        name: '孙燕姿',
        song: '逆光'
    },
    {
        id:2,
        name: '周杰伦',
        song: '不能说的密码'
    },
    {
        id:3,
        name:'林俊杰',
        song: '不为谁而作的歌'
    },
    {
        id:4,
        name: '五月天',
        song:'干杯'
    },
    {
        id: 5,
        name: '张艺兴',
        song: '莲'
    },
    {
        id:6,
        name:'刘德华',
        song:'冰雨'
    },
    {
        id: 7,
        name: '张学友',
        song: '情人'
    }
]

require('http')
.createServer((request,response) =>{
    // 遍历拼串
    let songStr = ''
    data.forEach(item =>{
        let str =`<tr><td>${item.id}</td><td>${item.name}</td><td>${item.song}</td></tr>`
        songStr += str
    })

    response.end(`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <table>
        <th><td>序号</td><td>歌手</td><td>歌曲</td></th>
        ${songStr}
    </table>

</body>

</html>
    
    `)
}).listen(80,err =>{
    console.log('端口80已经开始启动')
})