const ejs = require('ejs');
// 2.数据准备
const str = `
    <h2>欢迎回来</h2>
    <%if (vip != 1){%>
    <div id = 'ad'>不是每一滴牛奶，都叫特仑苏</div>
    <%}%>
`
const data = {
    vip:1 //表示是否是会员
}
// 3. 调用方法
const result = ejs.render (str,data)
console.log(result)