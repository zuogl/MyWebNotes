require('http')
    .createServer((request, Response) => {
        // 响应的数值
        // 1. 响应状态码的设置
        response.statusCode = 200;
        // 2. 响应字符串的数值 很少设置
        response.statusMessage = 'OK'
        // 3.相应头的数值,头的名字与值不能使用中文
        response.setHeader('name', 'xiaozuo')
        // 4. 相应体的设置
        //直接调用end方法，只能调用一次
        response.end('Over');
        // 调用write方法与end方法.write是流式写入，必须配合end结束流事件
        response.write('ddddg')
        response.write('vvvvv')
        response.end()
    }).listen(80)