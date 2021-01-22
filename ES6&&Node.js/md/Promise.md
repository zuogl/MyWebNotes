## 0、知识准备
### 1. 区别实例对象与函数对象
- 实例对象: new 函数产生的对象, 称为实例对象, 简称为对象
- 函数对象: 将函数作为对象使用时, 简称为函数对象

```js
function Fn(){};//Fn是一个函数

const fn = new Fn();//fn是一个实例对象；Fn是一个构造函数。

console.log(Fn.prototype);//Fn是一个函数对象
Fn.call();//Fn是一个函数对象

$('button');//$是一个函数

$.ajax();//$是一个函数对象
```
总的说来：
- 点`.``的左边是对象（可能是函数对象也可能是实例对象）；
- 括号`()`的左边是函数

### 2. 两种类型的回调
回调函数，就是被当作参数传递给其他函数并执行的函数。分为同步回调和异步回调。
- 同步回调
立即执行，不会进入回调队列中；数组遍历相关的回调函数以及promise的excutor函数（执行器）。
==注意==： promise的执行器是个同步回调，如果里边的函数是同步的，会立即执行；如果里边有一个异步回调，则该异步回调还是会进回调队列的（例3）。
```js
const arr = [1,2,3];
arr.forEach(item =>{
    console.log(item);
})
console.log(100);
// 以上代码先输出1、2、3，然后在输出100
// *********************************

const p1 = new Promise(function(){
    console.log(11111);
})
console.log(2222);
// 以上代码先输出11111，在输出2222
// *********************************

const p1 = new Promise(function(){
    console.log(111);
    setTimeout(() => {
        console.log(333);
    }, 2000);
})
console.log(222);
// 以上代码先输出111，再输出222，最后输出333
```
- 异步回调
不会立即执行，会直接放入回调队列中；例如定时器、ajax回调、promise的成功（resolve）|失败（reject）的回调。
```js
setTimeout(() => {
    console.log(111);
}, 1000);
console.log(222);
// 以上代码先输出222，再输出111
// ***********************************
const p1 = new Promise(function(resolve,reject){
    resolve(111);
    setTimeout(() => {
        reject(333);
    }, 2000);
    reject(444)
})

p1.then(value =>{
    console.log(value);
},reason =>{
    console.log(reason);
})

console.log(222);
// 以上代码先输出222，再输出111；不会输出333和444
```
### 3. JS的几种错误类型
- Error: 所有错误的父类型
- ReferenceError: 引用的变量不存在，只会影响后边的代码
```js
console.log(111);
console.log(a);
console.log(222);
//  以上代码，111正常输出，然后报错：ReferenceError: a is not defined；222不会输出
// ********************************************
function fn(cb) {
    const err=123;
    cb(err)
}
fn(function () {
    console.log(err); // 因为这个cb没有接收参数，所以会报：ReferenceError: err is not defined
})


```
- TypeError: 数据类型不正确的错误，只会影响后边的代码
```js
console.log(111);
const obj = undefined;
obj.userName = '123'
// 111正常输出，然后报错TypeError: Cannot set property 'userName' of undefined
```
- RangeError: 数据值不在其所允许的范围内，只会影响后边的代码
```js
console.log(111);
const arr = new Array(-1)
console.log(222);
//111正常输出，然后报错： RangeError: Invalid array length
```
- SyntaxError: 语法错误，程序无法运行
```js
console.log(111);
let 8abc = ''
console.log(222);
// 整个程序无法运行，SyntaxError: Invalid or unexpected token
```
### 4. 错误的处理
- try...catch
将要执行的代码放在try代码段中，在catch中输出错误；finally一般很少使用，可以不加。
```js
function fn() {
    console.log(11111111);
    // try是捕获不到语法错误
    try{
        const a = null
        a.userName = "laoli";
    }catch (err) {
        console.log(err);//err对象有两个属性，分别是message和stack
        console.log(1111,err.message);// 会提示错误的相关信息
        console.log(222,err.stack);// 会提示错误的位置
    }finally {
        // 不管try当中是否发生异常，  finally都会执行;但是如果出现SyntaxError错误，是没有办法执行的。
        console.log(333333);
    }
    
    console.log(222222)
}
fn();
```
- throw err
```js
function fn(){
    try{
        throw new Error("你好")
    }catch (e) {
        console.log(e.message);//你好
    }
}
fn();

// **********************************
function fn(){
    try{
        throw '出错了'
    }catch (e) {
        console.log(e);//出错了
    }
}
fn();
```

## 一、Promise
### 1. promise介绍
promise是一项用于JS中解决异步编程的技术，从本质上来讲，promise是一个构造函数。
### 2. promise的状态
promise一共有三种状态，分别是：
pending：初始状态
```js
const p1 = new Promise(() =>{});
console.log(p1); //Promise { <pending> }
```
fulfilled：成功状态（resolved）;
```js
const p1 = new Promise((resolve,reject) =>{
    resolve(2);
    reject(1);
});
p1.then(value =>{
    console.log(value);//2
},reason =>{
    console.log(reason);
})
console.log(p1); //Promise { 2 }
// 以上代码先输出Promise { 2 },然后再输出2
```
rejected：失败状态
```js
const p1 = new Promise((resolve,reject) =>{
    reject(1);
    resolve(2);
  
});
p1.then(value =>{
    console.log(value);
},reason =>{
    console.log(reason);//1
})
console.log(p1); //Promise { <rejected> 1 }
// 以上代码先输出Promise { <rejected> 1 },然后再输出1
```
==注意==：resolve将promise的状态改为成功状态fulfilled，reject将promise的状态修改为失败状态rejected；**一个promise对象的状态只能修改一次**。无论是成功还是失败，都会有一个结果数据，成功的结果数据我们习惯上叫做value，失败的结果数据一般称为reason。

### 3. promise的基本使用

- resolve和reject都只接收一个参数，但是参数的类型是不限制的，可以是数组，对象、函数、变量等


```js
const p1 = new Promise(function (resolve,reject) {
    setTimeout(()=>{
    const time = Date.now();
    if(time % 2 === 0){
        resolve({
                time,
                result:"偶数"
            });
         }else{
            reject({
                time,
                result:"奇数"
            });
        }
    },200)
})

p1.then(value=>{
    console.log("成功",value);// 成功 { time: 1611206824482, result: '偶数' }
},reason=>{
    console.log("失败",reason);//失败 { time: 1611206827705, result: '奇数' }
})
```


### 4. promise的API
#### 1. 执行器
在实例化promise时，传入Promise括号中最外层的函数叫做promise的执行器。
- 在实例化promise时，一定要出入一个excutor函数（执行器），否则会报错(TypeError: Promise resolver undefined is not a function);
- 该执行器是同步函数。如果里边的函数是同步的，会立即执行；如果里边有一个异步回调，则该异步回调还是会进回调队列的。一般里边传入的都是异步操作
```js
cosnt p1 = new Promise(function(){})
```
#### 2.  promise.prototype.then()
- then函数接收两个参数，两个参数都是函数类型。
- then函数本身是同步的，但是接收的两个函数类型的参数，它们是异步的。
```js
const p1 = new Promise ((resolve) =>{
    resolve(333)
})
console.log(111);
p1.then(value =>{
    console.log(value);
})
console.log(222);
// 以上代码输出111,222,333

// *******************************************************
const p2 = new Promise ((resolve) =>{
    resolve(333)
})

console.log(111);
p2.then(
    console.log(333)
)
console.log(222);
// 以上代码输出111,333，222
```
#### 3.Promise.prototype.catch（）
- 用于接收失败的回调函数，是then的语法糖，相当于then的第二个参数。
```js
const p1 = new Promise(function (resolve,reject) {
    setTimeout(()=>{
        reject(1);
    })
})

p1.catch(reason => {
    console.error(reason);//1
})
p1.then(undefined,reason =>{
    console.log(reason);//1
})
```
#### 4. Promise.resolve()
返回一个成功/失败的promise对象
- 出入非Promise,返回一个成功状态的Promise，value就是出入的值。
```js
const p1 = Promise.resolve(1);
console.log(p1);//Promise { 1 }
p1.then(value=>{
    console.log(value);//1
})
```
- 传入的是一个Promise,那么返回值就是该Promise
```js
const p = new Promise(function (resolve,reject) {
    resolve(0);
})
const p1 = Promise.resolve(p);
console.log(p1);//Promise { 0 }
console.log(p1 === p);// true
p1.then(value =>{
    console.log(value);//0
})

// *********************************
const p = new Promise(function (resolve,reject) {
    reject(2);
})
const p1 = Promise.resolve(p);
console.log(p1);//Promise { <rejected> 2 }
console.log(p1 === p);// true
p1.catch(reason =>{
    console.log(reason);//2
})
```
#### 5. Promise.reject()
返回一个失败的promise对象
- 传入的值为非promise
```js
const p1 = Promise.reject(1);
console.log(p1);//Promise { <rejected> 1 }
p1.catch(reason => {
    console.log(reason);//1
})
```
- 传入的是一个失败状态的promise,返回值的状态是失败的，值是传入的promise
```js
const p1 = Promise.reject(new Promise(function (resolve, reject) {
    reject("异常")
}));
console.log(p1);//Promise { <rejected> Promise { <rejected> '异常' } }
p1.catch(reason => {
    console.log(reason);//Promise { <rejected> '异常' }
    reason.then(value=>{
        console.log(value)
    },reason => {
        console.error(reason);//异常
    })
})
```
- 传入的是一个成功状态的promise,返回的状态是失败的，值是传入的promise
```js
const p2 = Promise.reject(new Promise(function (resolve,reject) {
    resolve("异常")
}));
console.log(p2);//Promise { <rejected> Promise { '异常' } }
p2.catch(reason => {
    console.log(reason);//Promise { '异常' }
    reason.then(value=>{
        console.log(value)
    },reason => {
        console.error(reason);//异常
    })
})
```

#### 6. promise.all()
回一个新的promise
- 如果all传入的数组内的promise全部成功状态的，返回的promise是成功状态的,value 是一个数组，数组的元素即是相对应的promise返回值。
```js
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);
const p4 = Promise.resolve(4);
const p5 = Promise.resolve(5);
const p = Promise.all([p5,p1,p2,p3,p4]);
console.log(p);//Promise { <fulfilled> }

p.then(value=>{
    console.log(value);//[ 5, 1, 2, 3, 4 ]
}).catch(reason => {
    console.error(reason);
})
```
- 如果传入的promise有一个是失败的，返回的promise是失败状态的，返回的值是失败的promise的值
```js
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.reject(3);
const p4 = Promise.resolve(4);
const p5 = Promise.resolve(5);
const p = Promise.all([p5,p1,p2,p3,p4]);
console.log(p);//Promise { <rejected> }

p.then(value=>{
    console.log(value);
}).catch(reason => {
    console.error(reason);//3
})
```
#### 7. promise.race()
返回一个新的promise, 谁先执行完，就得到谁的结果（包括值和状态）
```js
const p1 = new Promise(function (resolve) {
    setTimeout(function () {
        resolve(1);
    },200)
})
const p2 = new Promise(function (resolve) {
    setTimeout(function () {
        resolve(2);
    },400)
})
const p3 = new Promise(function (resolve,reject) {
    setTimeout(function () {
        reject(3);
    },100)
})
const p = Promise.race([p1,p2,p3]);
p.then(value=>{
    console.log(value);
},reason => {
    console.error(reason);//3
})
```
### 5. promise的几个关键问题
#### 1. 如何改变promise的状态
除了resolve将promise的状态改为成功状态fulfilled，reject将promise的状态修改为失败状态rejected外，当抛出异常时，也会将promise的状态修改为失败。
```js
const p1 = new Promise(function (resolve,reject) {
    throw "异常";
})
console.log(p1);//Promise { <rejected> '异常' }
p1.catch(err=>{
    console.log(err);//异常
})
```
#### 2. 一个promise指定多个成功/失败回调函数, 当promise改变为对应的状态时，都会调用吗。

#### 3.改变promise状态和指定回调函数谁先谁后?
**都有可能**，正常情况下是先指定回调再改变状态，但是也可以先改变状态在指定回调
- 如何先改状态再指定回调?
1. 在执行器中直接调用resolve()/reject()
```js
const p1 = new Promise(function (resolve) {
    console.log(111);
    resolve("success");
})
p1.then(value => {
    console.log(222);
    console.log(value);
})
// 以上代码依次输出111,222，success
```
2. 延迟更长时间才调用then()

```js
const p1 = new Promise(function (resolve) {
    setTimeout(()=>{
        resolve("success");// 更改状态的
    },100)

})
setTimeout(()=>{
    p1.then(value=>{
        console.log(value);
    })
},200)
```
- 什么时候得到数据
1. 如果先指定的回调, 那当状态发生改变时, 回调函数就会调用, 得到数据
2. 如果先改变的状态, 那当指定回调时, 回调函数就会调用, 得到数据
#### 4.promise.then()返回的新promise的结果状态由什么决定?
由then()指定的回调函数执行的结果决定
- 如果抛出异常, 新promise变为rejected, reason为抛出的异常
```js
const p1 = new Promise(function (resolve,reject) {
    resolve("success");
})
const p2 = p1.then(value=>{
    throw "异常"
})
console.log(p2);//Promise { <rejected> '异常' }
```
- 如果返回的是非promise的任意值, 新promise变为resolved, value为返回的值
```js
const p2 = p1.then(value=>{
    return 12345;
})
console.log(p2);//Promise { <fulfilled> '12345' }
p2.then(value=>{
    console.log(value);//12345
})
```
- 如果返回的是另一个新promise, 此promise的结果就会成为新promise的结果
```js
const p2 = p1.then(value=>{
    return Promise.reject(1);
    })
console.log(p2);//Promise { <rejected> '1' }

// **************************************
const p2 = p1.then(value=>{
    return Promise.resolve(2);
    })
console.log(p2);//Promise { <fulfilled> '2' }
```

#### 5. promise如何串连多个操作任务?
通过then的链式调用串连多个同步/异步任务
```js
new Promise(function (resolve) {
    resolve(1);
}).then(value=>{
    console.log(value);
    return 2;
}).then(value=>{
    console.log(value);
    return 3;
}).then(value=>{
    console.log(value);
    return 4;
}).then(function (value) {
    console.log(value);
})
// 以上代码依次输出 1,2,3,4
```
#### 6.	promise异常传透?
当使用promise的then链式调用时, 可以在最后指定失败的回调, 前面任何操作出了异常, 都会传到最后失败的回调中处理
```js
new Promise(function (resolve) {
    resolve(1);
}).then(value=>{
    console.log(111,value);//111 1
    throw "我出错啦"
}).then(value=>{
    console.log(222,value);
    return 3;
},reason => {
    console.log(33333,reason);// 3333 我出错了
    return 33;
}).then(value=>{
    console.log(444,value);//444 33
    return 4;
}).then(function (value) {
    console.log(555,value);//555 4
}).catch(err=>{
    console.error(666,err);
})
```
#### 7.	中断promise链?
当使用promise的then链式调用时, 在中间中断, 不再调用后面的回调函数
办法: 在回调函数中返回一个pendding状态的promise对象

```js
new Promise(function (resolve) {
    resolve(1);
}).then(value => {
    console.log(value);
    return new Promise(function () { });
}).then(value => {
    console.log(value);
    return 3;
}).then(value => {
    console.log(value);
    return 4;
}).then(function (value) {
    console.log(value);
})
// 以上代码只输出1
```


