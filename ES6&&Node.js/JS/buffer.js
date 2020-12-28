// 创建一个长度为10字节的buffer
let buf_1 = Buffer.alloc(10);//对字节进行归零处理
let buf_2 = Buffer.allocUnsafe(10);//不会对内存字节进行归零
let buf_3 = Buffer.from('I LOVE YOU');
console.log(buf_1);
console.log(buf_2);
console.log(buf_3);

// Buffer元素值的获取与设置
console.log(buf_3[0]);
console.log(buf_3.toString());
buf_3[0] = 120;

// 关于溢出
buf_3[0] = 300;
console.log(buf_3[0]);
//给定的值大于最大值，会进行高位舍弃（高于8位的数据都会被舍弃，从右向左数）
// 一个UTF-8的中文字符占3个字节


// js支持unicode声明字符串
let str = '\u6211\u7231\u4f60'
console.log(str);
