## ES6模块化
### 1. 导出（暴露）方式 --export
1. 单个导出
分别导出变量a、常量METHORD、函数fn、phone类。注意，ES6中的模块都严格遵守严格模式，所以在导出的函数顶层不能输出`this`,导入后this为undefined。
```js
// module.js
export let a = 100;
export const METHORD = 'get';
export function fn() {
    console.log('我是导入的函数')
    console.log(this)
};
export class Phone {}
```
2. 批量导出
可以先定义，然后用大括号批量导出
```js
let a = 100;
const METHORD = 'get';
function fn() {};
class Phone {}

export {a,METHORD,fn,Phone}
```
3. 重命名导出
通常情况下，`export`输出的变量就是本来的名字，但是可以使用`as`关键字重命名。这个时候在导入的时候，需要导入重命名后的变量名。本例中，在导入时应该导入`myfunction`
```js
let a = 100;
const METHORD = 'get';
function fn() {};
class Phone {}

export {a,METHORD,fn as myfunction,Phone}
```
4. 默认导出
在一个模块中，默认导出只能出现一次。
```js
let a = 100;
const METHORD = 'get';
function fn() {};
class Phone {}

export default {
    a,METHORD
}

// 因为上边已经默认导出过一次了，再次默认导出在导入的时候会出现错误。
// export default {
//     fn,Phone
// }  
```
5. 混合导出
既有export导出，也有默认导出的形式称为混合导出。
```js
let a = 100;
const METHORD = 'get';
function fn() {};
class Phone {}

export {
    a,METHORD
}

export default {
    fn,Phone
}
```

### 2. 导入（依赖)方式 -- import
html默认是不支持导入的，需要在`script`标签中加入`type`属性，`type="module"`
1. 引入模块
用`import...from`引入模块，后边的路径可以是相对路径也可以是绝对路径。
```js
import {a,METHORD,fn as myfunction,Phone} from ./module/module.js
```
2. as重命名
当我们引入多个模块时，可能会出现变量重名的情况，可以用`as`进行重命名。
```js
import {a,METHORD,fn,Phone} from ./module/module.js
import {a as a2 ,fn as myfunction} from ./module/module2.js
```
3. 导入到指定的对象中
如果我们需要导入某个模块中的好多个变量或者函数时，可以将其放置到一个对象中，然后用对象的方法进行调用。
==注意：这个是不需要加大括号的==
```js
import * as module2 from ./module/module2.js
console.log(module2.a);
console.log(module2.fn);
```
4. 默认导出的导入
当你导入默认导出的内容时，你可以任意的自定义名字（在命名规则内）；默认导出的是啥，你的变量名就代表啥。这个时候也不需要大括号。
```js
import module2 from ./module/module2.js
```
5. 混合引入
在混合引入时，一定要先接收默认导出的内容。
```js
import mybianliang from ./module/module2.js
import {a as a2 ,Phone} from  ./module/module.js
```