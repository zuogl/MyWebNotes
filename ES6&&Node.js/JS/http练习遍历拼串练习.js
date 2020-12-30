// 将下边的数据拼接为一<ui><li>甄子丹</li><li>吴京</li></ul>的字符串
const arr = ['甄子丹','吴京','李连杰','张晋']

let str = '<ul>'
arr.forEach(item =>{
    str += `<li>${item}</li>`
})
str += '</ul>'
console.log(str);//<ul><li>甄子丹</li><li>吴京</li><li>李连杰</li><li>张晋</li></ul>