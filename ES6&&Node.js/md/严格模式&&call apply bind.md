##　一 、严格模式
### 1. 概念
**理解**：除了正常运行模式(混杂模式)，ES5添加了第二种运行模式："严格模式"（strict mode）。
顾名思义，这种模式使得Javascript在更严格的语法条件下运行。

**目的**：
- 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为

- 消除代码运行的一些不安全之处，为代码的安全运行保驾护航

- 为未来新版本的Javascript做好铺垫

### 2.使用

- 针对整个脚本文件：将`use strict`放在脚本文件的第一行，则整个脚本文件将以严格模式运行。因为第这种方法不利于文件合并，所以更好的做法是，借针对单个函数的方法，将整个脚本文件放在一个立即执行的匿名函数(自调用函数)之中。
- 针对单个函数：将`use strict`放在函数体的第一行，则整个函数以严格模式运行。
PS：如果浏览器不支持，则这句话只解析为一条简单的语句, 没有任何副作用。

### 3.严格模式和普通模式的区别
-  必须用 var 声明变量，不允许使用未声明的变量
    ```js
     v = 3 //引用错误   严格模式.html:12 Uncaught ReferenceError: v is not defined
    ```
-  禁止自定义的函数中的 this 指向 window
    ```js
     function f(){
        console.log(this);            
    }
    f()//undefind
    ```
-  创建 eval 作用域
    ```js
    eval('var x = 5')
    console.log(x);// 引用错误  Uncaught ReferenceError: x is not defined
    ```
-  对象不能有重名的属性（Chrome 已经修复了这个 Bug，IE 还会出现）
    ```js
    var obj ={
        a = 3,
        a = 4
    }
    console.log(obj);//Uncaught SyntaxError: Invalid shorthand property initializer
    ```
-  函数不能有重复的形参
    ```js
    function f(a,a,a) {
    }
    f() //Uncaught SyntaxError: Duplicate parameter name not allowed in this context
    ```
-  新增一些保留字, 如: implements interface private protected public


## 二、call apply和bind
* call 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数

* apply 方法调用一个具有给定 this 值的函数，以及作为一个数组（或类似数组对象）提供的参数

* bind 同 call 相似，不过该方法会返回一个新的函数，而不会立即执行

```js
function main(){
    console.log(this);
}
// 1. 直接调用函数
main();		//  window

// 2. 创建一个对象
var company = {name: '尚硅谷', age: 10};

// 使用这个对象调用 main 方法
main.call(company);	// company
main.apply(company);// company

// bind 修改 this 的值，返回一个新的函数
var fn = main.bind(company);
fn();	// company
```

**面试题**: call()、apply()和bind()的区别：

- 都能改变this的指向

- call()/apply()是**立即调用函数**

- bind()：绑定完this后，不会立即调用当前函数，而是**将函数返回**，因此后面还需要再加`()`才能调用。

PS：bind()传参的方式和call()一样。
