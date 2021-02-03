# 一、React简介
### 1.Recat介绍
- recat是一个用于构建用户界面的jacascript库。
- 是一个将数据渲染为HTML视图的开源jacascript库。
- 由Facebook开发，且开源。
### 2.原生JavaScript的痛点
- 原生JavaScript操作DOM繁琐（==DOM-API操作UI==）
- 原生JavaScript操作DOM效率低，浏览器会进行大量的==重绘重排==。
- 原生JavaScript没有==组件化==编码方案，代码复用率低。

### 3.React的特点
1. 采用==组件化==模式、==声明式编码==，提高开发效率及组件复用率。
2. 在React Native中可以使用React语法进行==移动端开发==
3. 使用==虚拟DOM==和优秀的==Diffing算法==，尽量减少与真实DOM的交互

# 二、React API
### 1.虚拟dom解释
1. 其本质是一个object类型的对象
2. 虚拟dom比较“轻”，真实dom比较“重”；因为虚拟dom是React内部在用的，无序真实dom上那么多的属性。
3. 虚拟dom早晚会被React转为真实dom，并呈现在页面中。

### 2.jsx语法规则
1. 定义虚拟dom时，最外层不能写引号

2. 标签结构中，混入js表达式时，要用花括号`{}`包裹。（表达式和语句的区别详见附录）
```js
  <h2 id={myid} className ='mes'>我是小左</h2>
```
3. 样式的类名指定不要用class，要用className
```js
<h2 className="demo1" id={myId.toLowerCase()}>我是小左</h2>
```
4. 行内样式，要用`style = {{}}`这种形式，且像font-size这种属性要转为fontSize
```js
<span style={{color:'red',fontSize:'30px'}}>{myMessage}</span>
```
5. 只能有一个根标签。如果出现多个根标签，直接报错。
6. 标签必须闭合
```js
 <input type="text"/>;//向input这种标签可以采用自闭合的方式
````
7. 标签首字母：
- 若标签首字母小写：则将该标签转为HTML中同名的元素，若HTML中无该元素，则报错。

```js
<peiqi style={{color:'red',fontSize:'30px'}}>{myMessage}</peiqi>
;//Warning: The tag <peiqi> is unrecognized in this browser.
```
- 若首字母大写，则React去渲染对应的组件，若没有定义过该组件，报组件未定义。

```js
ReactDOM.render(<Peiqi/>,document.getElementById('test'));//Uncaught ReferenceError: Peiqi is not defined
```


### 3. ReactDOM.render()
该方法用于将虚拟DOM转换为真实的DOM，并将其放到指定的页面位置。
- 第一个参数：虚拟DOM
- 第二个参数：要放置的位置

## 4. 组件
### 1. 组件的定义
用来实现局部功能的代码和资源的集合
没有状态的就是简单组件。有状态的是复杂组件。
### 2. 函数式组件：
用`function`定义的组件称为函数式组件。其具有以下几点必须要注意的事项：
1. 定义时首字母必须大写
2. 必须有`return`返回值
3. 渲染的时候要有组件标签`<组件名/>`

#### 渲染函数式组件的步骤
执行了`ReactDOM.render(< Demo/>，document.getElementById('test'))`以后，发生了什么？
1. React解析组件标签,寻找Demo组件，若没找到，则报错：Demo is not definded ; 若找到了，则进行下一步：
2. React发现Demo是用函数定义的组件；React调用Demo函数，将返回的虚拟DOM结构渲染到页面。

### 3. 类式组件
用class定义的组件称为类式组件。其具有以下几点必须要注意的事项：
1. 类式组件必须要继承`React.Comonent`
2. 必须写`render`方法，==render中的this指向的是Demo的实例对象==
3. render方法必须要有`return`返回值（一般为页面结构）

#### 渲染类式组件的步骤
执行了`ReactDOM.render(< Demo/>，document.getElementById('test'))`以后，发生了什么？
1. React解析组件标签,寻找Demo组件，若没找到，报错：Demo is not definded ; 若找到了，则进行下一步：
2. React发现Demo是用类定义的，随后React帮我们去`new`了一个Demo的实例：d；
3. 通过d调用==Demo原型上的render方法==，即d.render()。
4. 将返回的虚拟DOM结构渲染到页面。

#### 关于类式组件的其他注意事项
1. 类中的构造器不是必须写的，要对实例进行初始化时，添加相对应的属性时才写。
2. 如果A类继承了B类，且A类中写了构造器，那么A类构造器中必须调用`super`方法。
3. 关于类式组件的实例对象，我们常见以下几种称谓：
xxx类的实例对象 === xxx组件的实例对象=== xxx组件对象

<p style ='color:red;font-weight:bold;'>类式组件之所以强大，是因为其具备三大核心属性---state、props、refs</p>


### 4. 组件之间的关系及使用
组件之间和HTML标签之间的关系一样，存在祖孙关系、兄弟关系、后代关系。
```js
class A extends React.Component{
	state = {carName:'阿特兹'}
//组件将要接收props（第一次不算）
	componentWillReceiveProps(){
		console.log('A---componentWillReceiveProps---')
	}
	render(){
		return (
		<div className="a">
			<h2>我是A组件，我有一台车：{this.state.carName}</h2>
			<h4>我家在：{this.props.address}</h4>
			<button onClick={this.changeCar}>发达了，换车！</button>
			// 在A组件的定义中使用B组件；B组件则称为A组件的后代组件。
			<B/>
		</div>
		)
	}
	changeCar = ()=>{
		this.setState({carName:"奔驰c63"})
	}
}
//定义一个B组件
class B extends React.Component{
	render(){
		console.log('B---render---')
		return (
		<div className="b">
			<h2>我是B组件，我收到了父亲给我的车：{this.props.cheming}</h2>	
		</div>
		)
	}
}

```

### 5.组件实例的三大核心属性
#### 1. state
组件的状态state能够驱动页面的显示。
1. state中的回调函数中this丢失原因。
定义回调函数时，其是在堆内存中的；当该回调被当作事件回调时，react中的事件容器会收集该回调（并放入栈内存中）。当事件触发时，直接从事件容器中调用，this指向window，但是，由于babel编译，全局严格模式；严格模式不允许自定义函数中this==默认==指向window所以this为undefined。
2. 解决state中的回调函数中this丢失的办法：
- bind
```js
        class Weather extends React.Component {
            constructor(props) {
                super(props);
                this.state = { isHot: true }
                this.changeHot = this.changeHot.bind(this);//用Weather原型上的changhot，将其this改变为指向实例对象，并将其添加到实例对象身上，还命名为changhot方法。
            }
            changeHot() {
                const { isHot } = this.state
                this.setState({ isHot: !isHot })
            }
            render() {
                return <h2 onClick={this.changeHot}>今天天气很{this.state.isHot ? '炎热' : "凉爽"}</h2>
            }
        }
```
- 赋值语句加箭头函数
```js
class Weather extends React.Component{
        // class类里边可以直接写赋值语句
        state = {
            isHot:true,
            wind:"七级大风"
        }
        render(){
            const {isHot,wind} = this.state
            return(
                <div>
                    <button onClick = {this.changeWeather}>天气预报 </button>
                    <h1>今天天气很{isHot === true? '炎热':"凉爽"}</h1>   
                    <h3>今天的风力为：{wind}</h3>
                </div>
            )
        }
        // 采用直接赋值的方式，对应的属性和方法都是直接加在实例对象身上的。用箭头函数解决了this指向丢失的问题
        changeWeather = () =>{
            const {isHot,wind} = this.state;
            this.setState({isHot: !isHot,wind:"我哪儿知道啊？"})
        }
    }
```


3. setState() 
state不能直接更改，需要调用setState({})方法。
this.setState({})方法主要有两个作用：
    1. 更改状态；
    2. 重新调用render
#### 2. props
该属性用于接收从组件外部传递的数据。
1. 传参的两种方式
- 直接在标签中一个一个的传参
```js
ReactDOM.render(<Person name="小左" sex="男" age="25"/>,document.getElementById('test'))
```
- 先定义一个需要传递的数据的对象，然后用展开运算符（...）展开
在原生的js语法中，展开运算符是不能够展开对象的。
react+babel可以让...展开一个对象，但仅仅适用于标签属性的传递。
```js
const p1 = {
    name:'小左',
    sex:'男'
    age:25
}
ReactDOM.render(<Person {...p1}/>,document.getElementById('test'))
```
2. 获取传入的参数
用解构赋值获取props中的数据。
```js
const {name,sex,age} = this.props
```

3. 对props进类型、必要性的行限制
在对props进行限制时，需要引入`prop-types.js`库。很少用到限制。
- 类式组件的限制
对类式组件的限制是在定义类时，在类的静态属性`propTypes`和`defaultProps`中进行限制的。
```js
class Person extends React.Component{
	//对传递的props进行:类型、必要性的限制
	static propTypes = {
	    name:PropTypes.string.isRequired,
	    age:PropTypes.number.isRequired,
	    sex:PropTypes.string
	}
	//给props设置默认值
	static defaultProps = {
		sex:'男',
	}
	render(){
		const {name,sex,age} = this.props
		return (
			<ul>
			    <li>姓名：{name}</li>
			    <li>性别：{sex}</li>
			    <li>年龄：{age+1}</li>
			</ul>
		)
	}
}
```
- 函数式组件的限制
对函数式中的props进行限制时，是在定义完了组件后，在组件之外进行的。这点违反了模块化的基本概念，所以基本不用。下边的例子中Person是定义的组件名称。
```js
//对传递的props进行:类型、必要性的限制
Person.propTypes = {
    name:PropTypes.string.isRequired,
    age:PropTypes.number.isRequired,
    sex:PropTypes.string
}
//给props设置默认值
Person.defaultProps = {
	sex:'男',
}
```

#### 3. refs
在进行事件操作时，收集对应的节点。==收集到的是真实的DOM节点==。
#### 1. 字符串形式的ref
会被refs自动收集。
```js
class Demo extends React.Component{
	render(){
		return(
            <div>
            // 在理解上，可以将ref当作id来对待。
			    <input ref="input1" type="text"/>
			    <button onClick={this.showData}>点左侧数据</button>&nbsp;
			    <input ref="input2" onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>
	    </div>
		)
	}
	//点击按钮的回调
	showData = ()=>{
		alert(this.refs.input1.value)
	}
	//失去焦点的回调
	showData2 = ()=>{
		alert(this.refs.input2.value)
	}
}
```
#### 2. 回调形式的ref
该类型的ref直接加载在事件对象身上，不会被refs收集；回调建议写成箭头函数类型，避免this的问题。
```js
class Demo extends React.Component{
	render(){
		return(
            <div>
            // 将当前节点传递给实例对象的input1属性。
			    <input ref={ currentElement => this.input1 = currentElement}  type="text"/>
			    <button onClick={this.showData}>点我提示左侧数据</button>&nbsp;
			    <input ref={ c => this.input2 = c } onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>
	    </div>
		)
	}
	showData = ()=>{
		alert(this.input1.value)
	}
	showData2 = ()=>{
		alert(this.input2.value)
	}
}
```
#### 3. React.createRef()
createRef()会创建一个容器，该容器装着当前节点。容器的结构为对象｛current:节点名｝但是一个容器只能装一个节点
```js
class Demo extends React.Component{
	//准备好一个容器存储节点---容器“专人专用”
	r1 = React.createRef()
	r2 = React.createRef()
	render(){
		return(
		<div>
		    <input ref={this.r1} type="text"/>
		    <button onClick={this.showData}>点我提示左侧数据</button>&nbsp;
		    <input ref={this.r2} onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>
	    </div>
		)
	}
	showData = ()=>{
		alert(this.r1.current.value)
	}
	showData2 = ()=>{
		alert(this.r2.current.value)
	}
}
```

### 6. React的事件处理
1. React 底层并没有使用原生的DOM事件，而是采用了合成事（自定义事件）
2. React自己实现了一套高效的事件系统，包含：事件注册、件绑定、时间爱你存储、事件分发等全套逻辑 ；在原生DOM事体系的基础上有了很大的改进；减少了内存的消耗，最大程度上决了浏览器的兼容性问题。
3. React中事件都是通过事件委托的方式实现的。
4. React中通过onxxx去绑定事件（注意大小写）
5. 可以通过event.target得到发生事件的事件对象

### 7. 受控组件和非受控组件
1. 非受控组件
如果组件中的表单数据，是通过节点.value“现用现取”那么就是非受控组件。
```js
class Login extends React.Component{
	render(){
		return(
	    <form onSubmit={this.handleLogin}>
		    用户名：<input ref="username" type="text"/>
		    密码：<input ref="password" type="password"/>
		    <button>登录</button>
	    </form>
		)
	}
	handleLogin = (event)=>{
		event.preventDefault() //阻止默认行为
		const {username,password} = this.refs //此处获取的是节点！！
		alert(`用户名为：${username.value}，密码为：${password.value}`)
	}
}
```
2. 受控组件
表单中输入类的DOM，随着用户的输入，就会把输入的值维护到状态中的组件，称之为受控组件。
```js
class Login extends React.Component{
	//初始化状态（表单收集几个数据，我就在状态中准备几组key-value）
	state = {
		username:'', //存储用户名-初始值为空
		password:'' //存储密码-初始值为空
	}
	render(){
		return(
	    <form onSubmit={this.handleLogin}>
		    用户名：<input onChange={this.saveUserName} type="text"/>
		    密码：<input onChange={this.savePassword} type="password"/>
		    <button>登录</button>
	    </form>
		)
	}
	//用户名发生改变的回调
	saveUserName = (event)=>{
		this.setState({username:event.target.value})
	}
	//密码发生改变的回调
	savePassword = (event)=>{
		this.setState({password:event.target.value})
	}
	//登录按钮的回调
	handleLogin = (event)=>{
		event.preventDefault() //阻止默认行为
		const {username,password} = this.state //不再节点.value获取输入了，去状态中获取
		alert(`用户名为：${username},密码为：${password}`)
	}
}
```

### 8. 高阶函数和柯里化
1. 高阶函数：如果有一个函数符合下面2个规范中的任何一个，那么该函数就是高阶函数。
- 1.若A函数，接收的参数是一个函数，那么A函数就可以称之为高阶函数
- 2.若A函数，调用的返回值依然是一个函数，那么A函数就可以称之为高阶函数
常见的高阶函数有哪些？ Promise、bind、setTimeout、arr.map

2. 函数的柯里化技术：通过函数调用继续返回函数的方式，实现多次接收参数，最后统一处理的编码形式。
```js
function sum (a){
	return (b)=>{
		return (c)=>{
			return a+b+c
		}
	}
}
const res = sum(3)(4)(5)
console.log(res);//12
```
### 9. React的生命周期函数
一般的，我们称呼React的生命周期函数有如下称呼：
生命周期回调函数 <=> 生命周期钩子函数 <=>  生命周期函数 <=>  生命周期钩子
#### 1. 经典生命周期
下边是旧生命周期的原理图（经典版本;面试建议画这个图）
![](../img/2_react生命周期(旧).png)	
```js
1. 初始化阶段: 由ReactDOM.render()触发 或 父组件(A)中用到子组件(B)---初次渲染
	1.	constructor();//初始化
	2.	componentWillMount();// 组件即将挂载
	3.	render();//初始化+ 状态更新时调用
	4.	componentDidMount();//组件挂载完毕，只调用一次
		在钩子中常做一些初始化的事儿：
			- 在页面上一上来就要展示一些信息，可以在此发送网络请求
			- 订阅消息
			- 开启定时器
2. 更新阶段: 由组件内部this.setSate() 或 父组件重新render 触发
	1.	shouldComponentUpdate();//控制state的状态是否可以更改，返回的值为布尔值；如果为false，组件的状态仍旧会更新，但是render不会被执行。
	2.	componentWillUpdate();//组件将要更新
	3.	render();//状态更新时调用
	4.	componentDidUpdate(preProps,preState,snapshotValue);//组件更新完毕
			该钩子可以接收三个参数，更新前的props，state，快照值。
3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
	1.	componentWillUnmount();//组件即将卸载，只调用一次
		在该钩子中常做一些收尾的事儿。
			- 关闭与服务器的长连接
			- 清除之前开启的定时器
			- 取消消息订阅
forceUpdate:不改变任何state里的东西，强制更新一下
```

#### 2.新生命周期
下边是新生命周期的原理图
![](../img/react生命周期(新).png)	
在新生命周期中即将被取消的三个生命周期;被重命名且被不推荐！！！
```js
componentWillMount(); 被重命名为 UNSAFE_componentWillMount()
componentWillUpdate();被重命名为 UNSAFE_componentWillUpdate()
componentWillReceiveProps(); 被重命名为 UNSAFE_componentWillReceiveProps();//一次不接收，第二次才开始接收
```
在生命周期中新加入的两个生命周期 --也不常用
1. getDerivedStateFromProps(从props得到一个派生的状态)
- 该方法是对象的静态方法，所以必须要有`static`关键字
- 该钩子可以接收传递的数据存到props中，并且可以获取初始化时的state数据
- 该钩子必须返回一个状态对象；返回的数据会自动合并到state的状态里边
- 任何时候state的值都取决于props
	- 直接赋值props到state上；
	- 比较props和state的不同，然后去更新state
```js
static getDerivedStateFromProps(props，state){
	return props  
}
```
2. getSnapshotBeforeUpdate(在更新前获取一个快照)
- 此方法必须配合componentDidUpdate使用
- 只有返回的是DOM相关的值，才有意义
```js
getSnapshotBeforeUpdate(){
	// 要想给哪个节点拍照就得给哪个节点添加ref。
	return this.refs.title.innerText
}
```
新的声明周期总结
```js
1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
	1.	constructor()
	2.	getDerivedStateFromProps 
	3.	render()
	4.	componentDidMount()
2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发
	1.	getDerivedStateFromProps
	2.	shouldComponentUpdate()
	3.	render()
	4.	getSnapshotBeforeUpdate
	5.	componentDidUpdate()
3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
	1.	componentWillUnmount()
```

### 10.Diffing算法原理
面试常问的方式：
- react/vue中的key有什么作用？（key的内部原理是什么？）
- 为什么遍历列表时，key最好不要用index?
- 请你简单的聊聊DOM的Difffing算法？
					
1. 虚拟DOM中key的作用：
- 简单的说: key是虚拟DOM对象的标识, 在更新显示时key起着极其重要的作用。

- 详细的说: 当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM】, 随后React进行【新虚拟DOM】与【旧虚拟DOM】的diff比较，比较规则如下：
	- 旧虚拟DOM中找到了与新虚拟DOM相同的key：
		- 若虚拟DOM中内容没变, 直接使用之前的真实DOM
		- 若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM
	- 旧虚拟DOM中未找到与新虚拟DOM相同的key根据数据创建新的真实DOM，随后渲染到到页面
											
2. 用index作为key可能会引发的问题：
	- 若对数据进行：逆序添加、逆序删除等破坏顺序操作:会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
	- 如果结构中还包含输入类的DOM：会产生错误DOM更新 ==> 界面有问题。
	- 注意！如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。
							
3. 开发中如何选择key?:
	1. 最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
	2. 如果确定只是简单的展示数据，用index也是可以的。


### 11. React 脚手架
0. 配置淘宝镜像（要下很多的代码，不配置国内的镜像，下载龟速）
```js
npm config set registry https://registry.npm.taobao.org
yarn config set registry https://registry.npm.taobao.org -g
```
1. 全局安装命令
```js
npm i create-react-app -g
```
2. 创建项目
```js
在想要创建项目的目录下，运行 ： create-react-app `objectName(项目名)`
```
3. 启动项目
查看 package.json    
yarn start 

4. 项目文件分析

src/index.js 是 yarn start 的入口文件



### 10. 其他
1. 在不适用webpack，单纯的使用script标签引入相对应的模块时，react的核心库一定要最先引入！
2. 在script中用jsx语法创建虚拟DOM时，要在script标签中写入`type=text/babel`，否则浏览器会将jsx的语法默认当作js语法，而导致错误。
3. 区分js语句和js表达式的区别
表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方(用一个变量来接，能接到值的都算表达式)常见表达式类型：
- 单独的变量：a
- 一些内置的函数：alert()
- 各种运算表达式：a+b
- 函数调用：fn(2)
- 定义函数：function test(){}
常见语句如下：
- if(){}
- for(){}
- switch()case()
