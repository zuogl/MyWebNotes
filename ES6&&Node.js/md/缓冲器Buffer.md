##  Buffer(缓冲器)

### 介绍
Buffer 是一个和数组类似的对象，不同的是Buffer是专门用来保存二进制数据的。
### 特点
- 大小固定：在创建时就确定了，且无法调整
- 性能较好：直接对计算机的内存进行操作
- 每个元素大小为 1 字节（byte）

###　创建
```js
let buf_1 = Buffer.alloc(10);//对字节进行归零处理,括号中是元素个数
console.log(buf_1);//<Buffer 00 00 00 00 00 00 00 00 00 00> 一共十个0;00是一个十六进制数
let buf_2 = Buffer.allocUnsafe(10);//不会对内存字节进行归零，括号中是元素个数
console.log(buf_2);//上个程序在内部写入了一些数据 内存申请过来时会显示上个程序内部的数据 重新写入时会覆盖上个程序的内容
let buf_3 = Buffer.from('I LOVE YOU');//直接将数据写入申请来的内存中，以十六进制保存
console.log(buf_3);//<Buffer 69 6c 6f 76 65 79 6f 75> 69是i在ASCII码表里的编号
```
### Buffer元素值的获取与设置
 
可以直接通过 `[]` 的方式直接对数据进行处理（十六进制），也可以使用 toString 方法将 Buffer 转化为字符串输出

-  `[]`:对 buffer 进行读取和设置
-  `toString`:将 Buffer 转化为字符串
```js
console.log(buf_3[0]);//73
console.log(buf_3.toString());//转换成字符串显示 I LOVE YOU
buf_3[0] = 120;
```
### 关于溢出
给定的值大于最大值（255），会进行高位舍弃（高于8位的数据都会被舍弃，从右向左数）
```js
buf_3[0] = 300; //100101100
```

### js支持unicode声明字符串
```js
let str = '\u6211\u7231\u4f60'
console.log(str);//我爱你
```
#### 一个UTF-8的中文字符占3个字节

