## 一、 async函数
### 1. 介绍
- async函数的返回值为promise对象
- promise对象的结果由async函数执行的返回值决定

### 2. 具体返回值分析
1. async 函数当中无返回值，返回的是一个成功状态的promise，值为undefined
```js
    async function box() {
    }
    console.log(box());
    /* 输出结果如下：
    Promise {<fulfilled>: undefined}
        __proto__: Promise
        [[PromiseState]]: "fulfilled"
        [[PromiseResult]]: undefined
    */ 
```
2. 如果返回的是一个非promise值，运行之后，得到的都是成功状态的promise，值为返回值
```js
    async function box1() {
        return 1
    }
    console.log(box1());
    /* 输出结果如下：
    Promise {<fulfilled>: 1}
        __proto__: Promise
        [[PromiseState]]: "fulfilled"
        [[PromiseResult]]: 1
    */ 

```
3. 如果返回的是一个promise值，运行之后，得到的promise与返回的promise状态相同、值相同；但是二者不是全等的。
```js
    async function box2() {
        return new Promise((resolve, reject) => {
            resolve('成功')
        })
    }
    console.log(box2());
        /* 输出结果如下：
   Promise {<pending>}
        __proto__: Promise
        [[PromiseState]]: "fulfilled"
        [[PromiseResult]]: "成功"
    */ 

// ******************************************************
    const p1 = new Promise((resolve, reject) => {
        resolve('成功')
    })
    async function box3() {
        return p1
    }
    console.log(box3() === p1);//false
```
 4. 如果async 函数中发生了异常，返回的是一个失败状态的promise，值为异常信息
 ```js
    async function box4() {
        throw '异常'
    }
    console.log(box4());
        /* 输出结果如下：
    Promise {<rejected>: "异常"}
        __proto__: Promise
        [[PromiseState]]: "rejected"
        [[PromiseResult]]: "异常"
    */ 

 ```
### 3. 常见写法
```js
    async function fn1() {}

    const fn2 = async function fn2() {}

    const obj = {
        async fn3(){},
        fn4:async function () {},
        fn5:async () =>{}
    }
    
    (async function(){})()
```

## 二、 await表达式
- await必须写在async函数中, 但async函数中可以没有await
- await右侧的表达式一般为promise对象, 但也可以是其它的值
### 1. 返回值分析
1. 如果表达式是其他值，直接将此值作为await的返回值
```js
    async function run2() {
        const v = await 2
        console.log(v);//2
    }
    run2();
```
2. 如果表达式是promise对象, await返回的是promise成功的值;await会等待promise的状态更改。状态一旦更改会将**成功的值**赋值给等号左边的变量.
```js
    async function run2() {
        const p2 = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('成功')
            }, 3000);
        })
        console.log(p2);//成功
    }
    run2()
```
3. 如果await的promise失败了,就会抛出异常,后续的代码不会执行,需要通过try...catch捕获处理,错误信息为失败的promise的值
```js
    async function run2() {
        try {
            const p3 = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject('失败')
                }, 3000);
            })
        } catch (err) {
            console.log(11111, err);//111,失败
        }
        console.log(p3);// Uncaught (in promise) ReferenceError: p3 is not defined
    }
```

