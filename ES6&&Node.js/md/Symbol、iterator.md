## 一、 symbol
ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，是一种类似于字符串的数据类型。
Symbol特点
1)	Symbol的值是唯一的，用来解决命名冲突的问题
2)	Symbol值不能与其他数据进行运算


```js
    // 定义两个独一无二的方法名
    let upKey = Symbol('upup');
    let downKey = Symbol('downdown');

    //向对象中添加方法
    let game = {
        name:'俄罗斯方块',
     //第二种  对象内部添加 Symbol类型的属性
        [upKey]: function(){
                console.log('向上 向上');
        },
        [downKey]: function(){
            console.log('向下 向下');
        }
    };
		
    // 第一种 为对象添加方法 在对象的外部添加
        game[upKey] = function(){
            console.log('up up up ');
        }
        game[downKey] = function(){
            console.log('down down down');
        }

    // 调用upKey方法
	game[upKey]()

```

## 二、迭代器（iterator）
迭代器（Iterator）是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作。
1. ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费
2. 原生具备iterator接口的数据(可用for of遍历)
    - Array
	- Arguments
	- Set
	- Map	
    - String
	- TypedArray
    - NodeList

3	工作原理
-	创建一个指针对象，指向当前数据结构的起始位置
-	第一次调用对象的next方法，指针自动指向数据结构的第一个成员
-	接下来不断调用next方法，指针一直往后移动，直到指向最后一个成员
-	每调用next方法返回一个包含value和done属性的对象

**需要自定义遍历数据的时候，要想到迭代器。**

```js

        //需求 使用 for...of 遍历 team 这个对象, 并且遍历的数据是 members 中的元素
        for(let v of team){
            console.log(v);
        }

        const team = {
            name: '终极一班',
            members: [
                'xiaoming',
                'xiaoning',
                'xiaotian',
                'knight'
            ],
            //添加迭代器方法
            [Symbol.iterator]: function(){
                //声明一个变量 index
                let index = 0;
                return {
                    next: () => {
                        //value 属性的设置
                        let result =  {value: this.members[index]};
                        //done属性的设置
                        if(index < this.members.length-1){
                            result.done = false;
                        }else{
                            result.done = true;
                        }
                        //自增下标
                        index++;
                        //返回最终的对象
                        return result;
                    }
                };
            }
        }
```



