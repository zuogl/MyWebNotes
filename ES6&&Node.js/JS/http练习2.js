const url = require('url')
require('http')
.createServer((request, response) => {
        let bg = url.parse(request.url, true).query.bg;
        bg = bg || '#999'
        // 方法一
        // response.end(`
        // <html>
        //     <head>
        //         <style>
        //             body{
        //                 background: ${bg}
        //             }
        //         </style>
        //     </head>
        //     <body>
        //     </body>
        // </html
        // `)
        // 方法二
        response.end(`<html style="background:${bg}"></html>`)
    }).listen(80)