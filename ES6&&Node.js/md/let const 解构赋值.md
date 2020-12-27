## 一、 let
1. 声明特点
    - 不允许重复声明
    ```js
    let start = '罗志祥'
    let start = '123' //报错 Uncaught SyntaxError: Identifier 'start' has already been declared
    ```
    - 块级作用域(带{}就形成块级作用域)：
     ```js
        {
            let a = 'hello';
        }
        console.log(a); // 打印结果报错：Uncaught ReferenceError: a is not defined
    ```
    - 变量不会进行提升
    ```js
    console.log(dance);//报错Uncaught ReferenceError: Cannot access 'dance' before initialization
    let dance ='精武门'

    ```
    - 不影响作用域链
    ```js
    function fn() {
    let song = '123';
        function fn2() {
            console.log(song);//正常输出
        }
        fn2();
    }
    fn();//123
    ```
## 二、const
1. 用来声明一个常量（值不可修改）
2. 特点
    - 声明的时候一定要赋初始值
    ```js
    const A;//Uncaught SyntaxError: Missing initializer in const declaration
    ```
    - 常量的名称一般为大写
    ```js
    const ABCD = 13;
    ```

    - 不能修改常量的值
    ```js
    const MYCAR = 'CX-4';
    MYCAR = 'BMW';//Uncaught TypeError: Assignment to constant variable.
    ```
    - 不允许重复声明
    ```js
    const MYCAR = 'CX-4';
    const MYCAR = 'BMW';//Uncaught SyntaxError: Identifier 'MYCAR' has already been declared
    ```
    - 块级作用域
    ```js
    {
    const HOUSE = '1000 MERTERS'
    }
    console.log(HOUSE);//Uncaught ReferenceError: HOUSE is not defined
    ```
    - 关于数组和对象的元素的修改（常量保存的是堆的引用地址）
        - 修改数组和对象中的值，不会报错
    ```js
    const FAMILY = ['father', 'mother', 'son', 'dauther']
    FAMILY.push('PET')
    console.log(FAMILY);// ["father", "mother", "son", "dauther", "PET"]

    ```
## 三、 解构赋值
### 1.解构赋值的概念

**解构赋值**：ES6 允许我们，按照一一对应的方式，从数组或者对象中**提取值**，再将提取出来的值赋值给变量。

解构：分解数据结构；赋值：给变量赋值。

解构赋值在实际开发中可以大量减少我们的代码量，并且让程序结构更清晰。

### 2.数组的解构赋值

数组的结构赋值：将数组中的值按照**位置**提取出来，然后赋值给变量。

#### 语法

在 ES6 之前，当我们在为一组变量赋值时，一般是这样写：

```javascript
var a = 1;
var b = 2;
var c = 3;
```
或者是这样写：

```js
var arr = [1, 2, 3];

var a = arr[0];
var b = arr[1];
var c = arr[2];
```

现在有了 ES6 之后，我们可以通过数组解构的方式进行赋值：（根据**位置**进行一一对应）

```javascript
let [a, b, c] = [1, 2, 3];
```

二者的效果是一样的，但明显后者的代码更简洁优雅。

#### 未匹配到的情况

数据的结构赋值，是根据位置进行一一对应来赋值的。可如果左边的数量大于右边的数量时（也就是变量的数量大于值的数量时），多余的变量要怎么处理呢？

答案是：如果变量在一一对应时，没有找到对应的值，那么，**多余的变量会被赋值为 undefined**。

#### 解构时，左边允许有默认值

在解构赋值时，是允许使用默认值的。举例如下：

```javascript
{
    //一个变量时
    let [foo = true] = [];
    console.log(foo); //输出结果：true
}

{
    //两个变量时
    let [a, b] = ['小左呀']; //a 赋值为：小左呀。b没有赋值
    console.log(a + ',' + b); //输出结果：小左呀,undefined
}

{
    //两个变量时
    let [a, b = 'xzy'] = ['小左呀']; //a 赋值为：小左呀。b 采用默认值 xzy
    console.log(a + ',' + b); //输出结果：小左呀,xzy
}

{
    //两个变量时
    let [a = 'ddgyre efgf'  , b ='kjhgfd' ] = ['小左呀']; //a 赋值为：小左呀。b 采用默认值 kjhgfd
    console.log(a + ',' + b); //输出结果：小左呀,kjhgfd
    // 这个案列说明，右边的数据的'权重'高于左边的默认值
}
```

#### 将右边的 `undefined`和`null`赋值给变量

如果我们在赋值时，采用的是 `undefined`或者`null`，那会有什么区别呢？

```javascript
{
    let [a, b = 'xzy'] = ['小左呀', undefined]; //b 虽然被赋值为 undefined，但是 b 会采用默认值
    console.log(a + ',' + b); //输出结果：小左呀,xzy
}

{
    let [a, b = 'xzy'] = ['小左呀', null]; //b 被赋值为 null
    console.log(a + ',' + b); //输出结果：小左呀,null
}
```

上方代码分析：

-   undefined：相当于什么都没有，此时 b 采用默认值。

-   null：相当于有值，但值为 null。

### 3. 对象的解构赋值

对象的结构赋值：将对象中的值按照**属性匹配的方式**提取出来，然后赋值给变量。

#### 语法

在 ES6 之前，我们从接口拿到 json 数据后，一般这么赋值：

```javascript
var name = json.name;

var age = json.age;

var sex = json.sex;
```

上面这种写法，过于麻烦了。

现在，有了 ES6 之后，我们可以使用对象解构的方式进行赋值。举例如下：

```js
const person = { name: 'xiaozuoya', age: 28, sex: '男' };
let { name, sex,age } = person; // 对象的结构赋值

console.log(name); // 打印结果：xiaozuoya
console.log(sex); // 打印结果：男
console.log(age); // 打印结果：28
```

上方代码可以看出，对象的解构与数组的结构，有一个重要的区别：**数组**的元素是按次序排列的，变量的取值由它的**位置**决定；而**对象的属性没有次序**，是**根据键来取值**的。


#### 未匹配到的情况

对象的结构赋值，是根据属性名进行一一对应来赋值的。可如果左边的数量大于右边的数量时（也就是变量的数量大于值的数量时），多余的变量要怎么处理呢？

答案是：如果变量在一一对应时，没有找到对应的值，那么，**多余的变量会被赋值为 undefined**。


#### 给左边的变量自定义命名

对象的结构赋值里，左边的变量名一定要跟右边的属性名保持一致么？答案是不一定。我们可以单独给左边的变量自定义命名。

举例如下：

```js
const person = { name: 'xiaozuoya', age: 28 };
let { name: myName, age: myAge } = person; // 对象的结构赋值

console.log(myName); // 打印结果：xiaozuoya
console.log(myAge); // 打印结果：28

console.log(name); // 打印报错：Uncaught ReferenceError: name is not defined
console.log(age); // 打印报错：Uncaught ReferenceError: age is not defined
```

上方的第 2 行代码中：（请牢记）

-   等号左边的属性名 name、age 是对应等号右边的属性名。

-   等号左边的 myName、myAge 是左边自定义的变量名。

或者，我们也可以理解为：将右边 name 的值赋值给左边的 myName 变量，将右边 age 的值赋值给左边的 myAge 变量。现在，你应该一目了然了吧？



#### 圆括号的使用

如果变量 foo 在解构之前就已经定义了，此时你再去解构，就会出现问题。下面是错误的代码，编译会报错：

```javascript
	let foo = 'haha';
	{ foo } = { foo: 'xzy' };
	console.log(foo);

```

要解决报错，只要在解构的语句外边，加一个圆括号即可：

```javascript
let foo = 'haha';
({ foo } = { foo: 'xzy' });
console.log(foo); //输出结果：xzy
```

### 4.字符串解构

字符串也可以解构，这是因为，此时字符串被转换成了一个类似数组的对象。举例如下：

```javascript
const [a, b, c, d] = 'hello';
console.log(a); //输出结果：h
console.log(b); //输出结果：e
console.log(c); //输出结果：l

console.log(typeof a); //输出结果：string
```



### 5.总结
1. 数组的解构赋值
    - 按照数组的位置一一赋值
    - 左边允许有默认值，但是会被右边的赋值覆盖（不会被undefined覆盖）
    - 左边的变量数量大于右边的数据个数时，多余的变量为undefined
    - null 赋值为null；undefined赋值给变量（没有默认值为undiluted，有默认值为默认值）
2. 对象的解构赋值
    - 按照对象的键值对取值
    - 左边的变量数量大于右边的数据个数时，多余的变量为undefined
    - 左边的变量自定义命名后，赋值的目标对象变为自定义的名字
    - 当一个变量在解构赋值前已经被声明赋值了，在进行解构赋值时就会报错；可以通过给整个解构赋值语句加上一个圆括号来解决该问题
3. 字符串的解构赋值
    - 类似于数组的解构赋值（将字符串隐式拆成单个字母/汉字），按照位置对应赋值
    - 可以有默认值，权重低于右侧的数据



****注意：频繁使用对象方法、数组元素，就可以使用解构赋值形式**

