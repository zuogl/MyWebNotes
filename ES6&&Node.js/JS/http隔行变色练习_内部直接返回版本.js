// 搭建服务
// 当路径为/table时，响应一个4行3列的表格，并实现每行随机颜色
const http = require('http');
const url = require('url');


const server = http.createServer((request, response) => {
    const repath = url.parse(request.url, true).pathname;
    if (repath === '/table') {
        response.end(`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        td {
            width: 200px;
            text-align:center;
        }

        tr {
            height: 30px;
        }
        tr:nth-of-type(1){
            background:#ddd
        }
        tr:nth-of-type(3){
            background:#ddd
        }
    </style>
</head>

<body>
    <table>
    </table>

        <script>
            window.onload = function () {
                var table = document.querySelector('table')
                for (var i = 0; i < 4; i++) {
                    var trNode = document.createElement('tr');
                    for (var j= 0; j < 3; j++){
                        var tdNode = document.createElement('td');
                        tdNode.innerHTML = '我是第'+(i+1)+'行的数据'
                        trNode.appendChild(tdNode)
                        
                    }
                    table.appendChild(trNode)
                }
            }
        </script>
    
</body>

</html>
 
        `)

    }
})
server.listen(80)


// tdNode.innerHTML = '我是第'+(i+1)+'行的数据' 为什么用${i}会报错，不是在``中吗？？？？