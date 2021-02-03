### 1.webpack介绍
#### 1.什么是webpack<https://www.webpackjs.com/>
  * Webpack是一个模块打包器(bundler)。
  *webpack可以提供打包压缩、转换、提供站点服务、快速预览项目、帮你提供代理服务
  * 在Webpack看来, 前端的所有资源文件(js/json/css/img/less/...)都会作为模块处理
  * 它将根据模块的依赖关系进行静态分析，生成对应的静态资源
#### 2.五个核心概念
  * Entry：入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。
  * Output：output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件
  * Loader：loader 让 webpack 能够去处理那些非 JavaScript 文件
  * Plugins：插件则可以用于执行范围更广的任务。例如：打包优化、压缩，
  * Mode：模式，有生产模式 production 和开发模式 development 
#### 3.理解 Loader
  * Webpack 本身只能加载 JS/JSON 模块，如果要加载其他类型的文件(模块)，就需要使用对应的loader 进行转换/加载
  * Loader 本身也是运行在 node.js 环境中的 JavaScript 模块
  * 本身是一个函数，接受源文件作为参数，返回转换的结果
  * loader 一般以 xxx-loader 的方式命名，xxx 代表了这个 loader 要做的转换功能，比如 less-loader。
#### 4.理解 Plugins
  * 插件可以完成一些loader不能完成的功能。
  * 插件的使用一般是在 webpack 的配置信息 plugins 选项中指定。
#### 5.配置文件(默认)
  * webpack.config.js : 是一个node模块，返回一个 json 格式的配置信息对象
### 2. webpack的安装
由于webpack的使用频率很高、版本迭代较快，且版本间的兼容性较差，故不建议全局安装，建议直接安装在项目中。
```js
npm i webpack webpack-cli -D 
```
webpack:核心模块
webpack-cli:可以运行webpack的命令

### 3.webpack零配置运行。
所谓的零配置，就是在不需要配置文件的情况下，通过运行特定的命令也可以完成部分工作。下边，逐个介绍一下常用的命令。
#### 1. 查看版本号
```js
npx webpack -v 
```
#### 2. 默认打包
在没有设置配置文件，`npx webpack`后边也没有任何参数的情况下，该命令会默认将当前路径下的`index.js`进行打包，打包到`dist/main.js`
```js
npx webpack
```
#### 3. --entry
`--entry`用于指定要打包的文件，可以同时打包多个文件。
```js
npx webpack --entry ./src/one.js  //将./src/one.js打包到dist ->main.js
npx webpack --entry ./src/one.js ./src/index.js  //打包多个文件
```
#### 4. --output
`--output`用于指定将打包的文件放置到什么位置上，叫什么名字。有两个二级参数，`-filename`表示指定输出的文件名字，`-path`指定输出的路径。
```js
npx webpack --entry ./src/one.js --output-path built //./src/one.js 打包到成main.js并输出到命令所在路径下的built文件夹内。
npx webpack --entry ./src/one.js --output-path built --output-filename my.js //将./src/one.js 打包到命令所在路径下的built文件夹内，并命名为my.js
```
#### 5. mode
`mode`用于指定打包到什么环境下。`development`表示开发环境（我们写代码的环境），`production`表示生产环境（线上环境）
```js
npx webpack --entry ./src/one.js --output-path built --output-filename my.js --mode development 指定环境
```
### 4. webpack配置文件
在零配置的情况下，webpack能够编译打包 js 和 json 文件；能将 es6 的模块化语法转换成浏览器能识别的语法；也能实现压缩代码。但是也存在两点不足：
* 不能编译打包 css、img 等文件
* 不能将js的es6基本语法转化为es5以下的语法
==可以通过使用 webpack 配置文件解决以上问题，并实现自定义功能==
==在设置了配置文件后，运行`npx webpack`会自动执行配置文件。==

#### 1. 配置文件的位置及名称
webpack的配置文件一般放在项目文件的根目录下，默认的名称为`webpack.config.js`;在该配置文件下我们可以配置如下参数。
#### 2. entry:指定入口
- 当`entry`的值为一个字符串时，表示指定一个特定的文件为入口文件（被打包的文件）
```js
// webpack.confin.js
module.exports = {
    entry:"./src/one.js"
}
```
- 当`entry`的值为一个数组时，表示指定多个特定的文件为入口文件（被打包的文件）
```js
// webpack.confin.js
module.exports = {
    entry:["./src/index.js","./src/one.js"]
}
```
- 当`entry`的值为一个对象时，表示指定多个特定的文件为入口文件（被打包的文件），并被打包为多个文件。
```js
// webpack.confin.js
module.exports = {
      entry:{
        home:"./src/index.js",
        one:"./src/one.js"
    }
}
```
#### 3.output指定打包后的文件名及路径
1. filename
- 当不写filename时，默认打包后的文件名为`main.js`
- 指定一个输出文件.注意`./`默认的是当前路径下的dist文件夹。
```js
// webpack.confin.js
module.exports = {
      output:{
          filename:"./test/my.js"
      }
}
```
- 指定输出多个文件。在这种情况下，`name`表示一个替换符、代表的是entry当中的key属性。
```js
// webpack.confin.js
module.exports = {
      output:{
          filename: "[name].js"// home.js  one.js
      }
}
```
```js
// webpack.confin.js
module.exports = {
      output:{
//   hash:默认生成20位的字符串  hash:8 生成一个8位的字符串
        filename: "[name].[hash:8].js",// home.xxxxxx.js   one.xxxxx.js
      }
}
```
2. path 
与输出一个文件和多个文件没有关系。只是指定输出的目录.但是一定要注意
==path路径一定要写成绝对地址==
```js
// webpack.confin.js
module.exports = {
      output:{
        path:__dirname+"/my/built"//将当前文件夹下的my->built作为输出目录
      }
}
```
如果要输出到上级目录下，需要引入path模块。
```js
// webpack.confin.js
module.exports = {
      output:{
        path:path.resolve(__dirname,"../built")
      }
}
```
#### 4. 指定打包模式
`production`表示生产环境,`development`表示开发环境。
```js
// webpack.confin.js
module.exports = {
      mode:"production"
}
```
#### 5. 使用插件
可以使用各种各样的插件来提高、改善我们的工作效率。例如：每次打包生成了文件，都需要手动删除，我们可以引入插件 `clean-webpack-plugin` 帮助我们自动删除上一次生成的文件。其他插件的使用方式大同小异。
1. 安装插件
```js
npm install clean-webpack-plugin -D
```
2.在配置文件中引入插件
```js
// 我们只需要这个插件中的CleanWebpackPlugin对象，所以我们采用解构赋值的方式引入。
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
```
3. 在配置文件的`plugins`属性中使用
```js
 plugins: [
        new HtmlWebpackPlugin()
 ]
```
4. 运行`npx webpack`命令

### 5.loader
Webpack 本身只能加载 JS/JSON 模块，如果要加载其他类型的文件(模块)，就需要使用对应的loader 进行转换/加载.
loader是通过配置文件中的`module`属性来进行设置的。在此，列举常用的module作为演示。
#### 1. 加载css/less/scss文件。
1. 下载安装对应的模块
```js
npm install style-loader css-loader -D
npm install less-loader less -D
npm install sass-loader node-sass -D
```
2. 在配置文件中进行设置
```js
// webpack.confin.js
module.exports = {
      module:{
          rules:[{
               test:/\.css$/,//正则
              // use,将使用的loader放置到use当中。从右至左来执行
                // css-loader:解析css文件
                // style-loader:将css文件的样式放置到页面当中的style标签当中
                use:["style-loader","css-loader"]
          },
           {
                // 支持less 资源
                // cnpm install less-loader less -D
                test:/\.less$/,  		// 检查文件是否以.less结尾（检查是否是less文件）
                use:[					// 数组中loader执行是从下到上，从右到左顺序执行
                    'style-loader', 	// 创建style标签，添加上js中的css代码
                    'css-loader', 		// 将css以commonjs方式整合到js文件中
                    'less-loader' 		// 将less文件解析成css文件
                ]
            },
            {
                // 支持sass
                // cnpm install sass-loader node-sass -D
                test:/\.scss$/,  		// 检查文件是否以.less结尾（检查是否是less文件）
                use:[					// 数组中loader执行是从下到上，从右到左顺序执行
                    'style-loader', 	// 创建style标签，添加上js中的css代码
                    'css-loader', 		// 将css以commonjs方式整合到js文件中
                    'sass-loader' 		// 将sass文件解析成css文件
                ]
            }
             

          ]
      }
}
```
#### 2.对js文件进行语法检查
webpack 使用 ESLint（<https://eslint.bootcss.com/>） 能对 JS 基本语法错误/隐患进行提前检查，但是不能检测运行时错误,使用步骤如下：
1. 安装对应的模块
```js
npm install  eslint-loader eslint -D
eslint 是语法检查的包
eslint-loader 是 eslint 在 webpack 中的 loader 包
```
2. 在配置文件中进行设置
```js
// webpack.confin.js
module.exports = {
      module:{
          rules:[ {
                // 对js文件进行语法检查
                test: /\.js$/, //只检测js文件
                exclude: /node_modules/, //排除node_modules文件夹
                enforce: "pre", //提前加载使用
                use: {
                    loader: "eslint-loader"	//使用eslint-loader解析
                }
            }
          ]
      }
}
```
3.创建 `.eslintrc.js` 文件
`.eslintrc.js`的位置，一般放在项目的根目录下。
```js
// .eslintrc.js
module.exports = {
    "parserOptions": {
        "ecmaVersion": 6, // 支持es6
        "sourceType": "module"	// 使用es6模块化
    },
    "env": { // 设置环境
        "browser": true,  // 支持浏览器环境： 能够使用window上的全局变量
        "node": true     // 支持服务器环境:  能够使用node上global的全局变量
    },
    "globals": {	// 声明使用的全局变量, 这样即使没有定义也不会报错了
        // "$": "readonly"	不允许重写变量
        "$":"writable",// 可以进行读写操作。
        "Promise":"writable"// 可以进行读写操作。
    },
    "rules": {  // eslint检查的规则  0 忽略 1 警告 2 错误
        "no-console": 0, 	// 不检查console
        "eqeqeq": 2,		// 用 == 而不用 === 就报错
        "no-alert": 0, 		// 不能使用alert
        "for-direction":0,
        "no-unused-vars":0
    },
    "extends": "eslint:recommended" // 使用eslint推荐的默认规则
}
```
#### 3. 语法转换
借助 Babel 可以将浏览器不能识别的新语法（ES6, ES7）转换成原来识别的旧语法（ES5），浏览器兼容性处理
1. 下载对应的模块
```js
npm install babel-loader @babel/core @babel/preset-env -D
// @babel/core  是 babel 的核心库
// @babel/preset-env  是 babel 的预设的工具包，默认可以将所有最新的语法转为为 ES5
// babel-loader   是 babel 在 webpack 中的 loader 包
```
2. 在配置文件中进行设置
```js
// webpack.confin.js
module.exports = {
      module:{
          rules:[  {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']// 支持最新的语法规则。
                    }
                }
            }
          ]
      }
    // webpack5,指定打包的语法为 es5;
    target: ["web","es5"]
}
```
### 6.JS 兼容性处理

Polyfill 是一块代码（通常是 Web 上的 JavaScript），用来为旧浏览器提供它没有原生支持的较新的功能
1. 安装 polyfill
```js
npm install @babel/polyfill
```
2. app.js（入口文件）引入
```js
   import '@babel/polyfill';
```
> 解决 babel 只能转换语法的问题(如：let/const/解构赋值...)，引入polyfill可以转换高级语法(如:Promise...)












修改了默认配置文件名后运行方式。
webpack --config webpack.config.dev.js

