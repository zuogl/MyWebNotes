## NPM

### 介绍

全称：Node Package Manager , Node 的包管理器，也是一个应用程序。

### 包是什么

Node.js 的包基本遵循 CommonJS 规范，将一组相关的模块组合在一起，形成一个完整的工具

### 作用

通过 NPM 可以对 Node 的工具包进行搜索、下载、安装、删除、上传。借助别人写好的包，可以让我们的开发更加方便。

### 安装

安装完 nodejs 之后会自动安装 npm

### npm的使用步骤
1. npm init在项目的文件件下运行
2. npm i 包名 安装相关的工具
3. 直接使用工具

### 常用命令

#### 查看 npm 的版本

```sh
npm -v 
```

#### 初始化

```sh
npm init   这个命令就是为了创建package.json文件的。
npm init --yes or npm init --y 可以快速的创建package.json文件。但是注意所在文件夹不能有中文和大写
```

运行后会创建 package.json 文件，这个文件叫做包的配置文件             

```json
{
  "name": "1-npm",      #包的名字
  "version": "1.0.0",   #包的版本
  "description": "",    #包的描述 可以用中文
  "main": "index.js",   #包的入口文件
  "scripts": {			#脚本配置
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",			#作者
  "license": "ISC"		#版权声明
}
```

> ==注意生成的包名不能使用中文，大写 ！！！ 不能使用 npm 作为包的名字==

关于开源证书扩展阅读

<http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html>

#### 搜索包

一般在搜索工具包的时候，会到 https://npmjs.org 搜索

#### 安装工具包

```sh
npm install jquery
npm i jquery

# 安装并在 package.json 中的dependencies属性中保存包的版本信息 （在npm 6 以后的版本中，这个已经变成了默认的）
npm install jquery --save
npm install jquery -S

# 安装并在 package.json 中的devDependencies属性中保存包的版本信息
npm install babel --save-dev
npm i babel -D
```
### 依赖类型
dependencies：生产依赖
devDependencies：开发依赖

package-lock.json 包的版本锁文件 锁定版本
node_modules存放npm安装的模块的代码


#### 全局安装

```sh
npm install less -g
npm install nodemon -g 
```

全局安装一般用于安装全局工具，如 cnpm，yarn，webpack ，gulp等，全局命令的安装位置
#### 修改全局包的默认安装路径
```
npm config set prefix "D:Node\node_global"
```


> 全局安装命令在任意的命令行下, 都可以执行

#### 安装依赖

根据 package.json 中的依赖声明， 安装工具包。当你克隆下来其他人的项目时，可能因为没有对应的包，所以会报错。这个时候就需要安装依赖。

```sh
npm i
npm install
```

#### 移除包

```sh
npm remove jquery   remove 可以替换成 uninstall un unlink rm r 

```

### 使用流程

团队开发时使用流程

1. 从仓库中拉取仓库代码
2. ==运行 npm install 安装相关依赖==
3. 运行项目，继续开发

### 封装 NPM 包

创建自己的 NPM 包可以帮助代码进行迭代进化，使用步骤也比较简单

0. 修改为官方的地址 (npm config set registry https://registry.npmjs.org/)

1. 创建文件夹，并创建文件 index.js， 在文件中声明函数，使用 module.exports 暴露
2. npm init 初始化工具包，package.json 填写包的信息
3. 账号注册（激活账号）,==完成邮箱验证==
4. 命令行下 『npm login』 填写相关用户信息
5. 命令行下『 npm publish』 提交包 👌

> npm 有垃圾检测机制，如果名字简单或做测试提交，很可能会被拒绝提交
>
> ==可以尝试改一下包的名称来解决这个问题==

### 升级/修改 NPM 包
升级 NPM 包，需要修改 package.json 中的版本号修改，只需要执行『npm publish』就可以能提交，修改代码做如下操作：

1. 修改包代码
2. 修改 package.json 中版本号
3. npm publish 提交

### 删除 npm 包

```
npm unpublish 包名 --force
```

### CNPM

#### 介绍

cnpm 是淘宝对国外 npm 服务器的一个完整镜像版本，也就是淘宝 npm 镜像，网站地址<http://npm.taobao.org/>(只能下载，不能上传)

#### 安装

安装配置方式有两种

* npm install -g cnpm --registry=https://registry.npm.taobao.org
下边这种方式只适用与linunx系统
* alias cnpm="npm --registry=https://registry.npm.taobao.org \
  --cache=$HOME/.npm/.cache/cnpm \
  --disturl=https://npm.taobao.org/dist \
  --userconfig=$HOME/.cnpmrc"       (只能在Linux下使用)

#### 使用

配置完成后，就可以使用 cnpm 命令来管理包，使用方法跟 npm 一样

```sh
cnpm install lodash
```

#### npm 配置镜像地址

```sh
//淘宝镜像
npm config set registry https://registry.npm.taobao.org
//官方镜像   
npm config set registry https://registry.npmjs.org/
```

> 在发布工具的时候, 一定要将仓库地址, 修改为官方的地址

### Yarn

#### 介绍

yarn 是 Facebook 开源的新的包管理器，可以用来代替 npm。

#### 特点

yarn 相比于 npm 有几个特点

* 本地缓存。安装过的包下次不会进行远程安装
* 并行下载。一次下载多个包，而 npm 是串行下载
* 精准的版本控制。保证每次安装跟上次都是一样的

#### 安装

##### yarn 安装

只需要一行命令即可安装 yarn

```sh
npm install yarn -g
```

##### msi 安装包安装

<https://classic.yarnpkg.com/en/docs/install#windows-stable>

#### 相关命令

yarn 的相关命令

1)  yarn --version/ --v

2)  yarn init  //生成package.json   

3)  yarn global add  package (全局安装)

​	全局安装路径 `C:\Users\你的用户名\AppData\Local\Yarn\bin`

4)  yarn global remove less (全局删除)

5)  yarn add package (局部安装)

6)  yarn add package --dev (相当于npm中的--save-dev)

7)  yarn remove package 移除

8)  yarn list //列出已经安装的包名 用的很少

9)  yarn //安装package.json中的所有依赖 

> npm 5 引入离线缓存，提高了安装速度，也引入了 package-lock.json 文件增强了版本控制

yarn 修改仓库地址

```sh
yarn config set registry https://registry.npm.taobao.org
```

### CYarn

跟 npm 与 cnpm 的关系一样，可以为 yarn 设置国内的淘宝镜像，提升安装的速度

```sh
npm install cyarn -g --registry "https://registry.npm.taobao.org"
```

配置后，只需将yarn改为cyarn使用即可

### 附录

安装指定版本的工具包

```shell
yarn add jquery@1.11.2
```

npm 清除缓存(npm命名，没有错误，就是安装不上。)

```
npm cache clean ---force //可以在任何位置执行
```


####　npm运行脚本
可以在package.json文件中的scripts对象中添加一个子属性
```js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    'a':"node test.js"
  },
```
这样就可以通过 npm run a 来运行test.js这个服务了。
**但是，要注意，package.json和要运行的服务必须在同一路径下**

