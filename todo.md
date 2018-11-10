# Electron / Vue / Websocket 实现微信客户端  
#----------------------------- 华丽的分割线 -----------------------------  

#告诉你个东西  
名字很高大上 --------》本地聊天历史记录存储（No more talking，show you the code）  
npm run dev 打开页面，并打开页面控制台  
在页面控制台输入以下代码（在运行代码前，先瞄一眼当前项目的log文件夹，现在是不是只有一个demo.log）  
#log文件夹是我提前帮你建好的  
#----------------------------  
```javascript
var fs = require('fs')  
var writeStream = fs.createWriteStream('./log/10001.log')  
writeStream.write(JSON.stringify({  
  name: 'richole',  
  img: '---',  
  id: 10001,  
  data: [  
    {  
      time: 1541338981084,  
      message: '老婆在不在'  
    }, {  
      time: 1541339095342,  
      message: '今晚约吗'  
    }  
  ]  
}))  
writeStream.end()  
```
#----------------------------  
运行完后，你会惊呆的发现在你项目log文件夹，居然多了个10001.log文件  
什么？？我居然可以在页面JS 生成了一个文件？？  
是的，你没有眼花看错，在electron生成的页面中，你可以同时操作页面，你也可以使用node.js的所有功能  
这引起了我们一个考虑，我们可以把聊天信息存储在我们自己的项目中，下次打开项目我们读取log文件夹里的log文件，再把他们显示在页面上就好了  
所以现在，我们要理清我们的数据结构了  
我们的聊天数据应该定义成什么样子，并在打开页面的时候加载并渲染  
我给你一个方案是，log文件夹里存放所有你朋友的聊天信息，为了防止重复名字的朋友，用唯一的id做日志文件的标识名字如，10001.log,10002.log等  
日志文件存储的是这个人的名字，id，头像链接以及历史聊天信息（这个头像图片一般不放在本地，存储在服务端）（PS：你也可以把头像从服务端拿来后，本地存储下来）  
#----------------------------- 华丽的分割线 -----------------------------  
# 2018-11-05 任务  
Todo  
--右上角 最小化 最大化 关闭按钮的悬浮样式  
--拉宽或拉高软件，能够自适应显示, 详情查看todo0.jpg  
--登陆注册页面（Vue-router）  
--点击头像 修改信息页面 （上传头像或修改名字）  
#----------------------------- 华丽的分割线 -----------------------------  
# 2018-11-06 任务  
Todo（10分一道题）  
--右上角 最小化 最大化 关闭按钮的悬浮样式 <!--已解决-->  
--文本消息框 alt + s自动发送，shift+enter 换行，enter自动发送 <!-- 【shift+enter 换行 不会！！！】 -->  
--登陆注册页（参考一下其他软件，好的设计的网站）<!-- 页面样式写好了  功能接口未对接 -->  
--BUG: 直接输入回车样式错乱，正常不能发送空字符串，详情查看bug0.jpg <!--已解决-->  
  
面试题（4分一道题）  
1.跨域请求有哪几种
<!--
第一种：JSONP，动态插入一个script标签请求跨域
<script>
function fn (res) {
    ...响应数据
}
var _script = document.createElement('script')
_script.type = 'text/javascript'
_script.src = 'https://www.xxx.com/jsonp?callback=fn'
document.head.appendChild(_script)
</script>

第二种
后端人员在处理数据请求的时候，添加允许跨域请求的相关操作，如配置
res.writeHead(200, {
    "Content-Type": "text/html; charset=UTF-8",
    "Access-Control-Allow-Origin":'http://localhost',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type'
});

第三种
协议代理，需要跨域的请求不在浏览器发送执行，而是发到后台服务器，由后台服务器去执行这个跨域请求，再把得到的数据响应给回前端，这样的过程。

-->
2.盒子模型是什么
<!--
在前端页面显示中，一个元素由几大部分组成，由content(元素内容)、paddding(内边距)、border(边框)、margin(外边距)组成的部分称之为CSS中元素的盒子模型。
-->
3.cookie的设置、修改、删除，以及设置expire  
<!--
cookie是有js生成
--------------错的-----------------
document.cookie(name,value,expires) //设置（expires过期时间要是为天数，需转换成有效地区日期时间）
document.cookie(name,newValue,expires) //修改，会覆盖原来相同名字的cookie的值
document.cookie(name,'',1970/01/01) //删除,cookie值为空，以及设置过期时间为初始值即可删除
--------------错的-----------------

不设置expires过期时间，则仅在浏览器关闭前有效

参数天数，转换成有效地区日期时间
var formatExpires = function (day) {
    var date = new Date()
    date.setTime(date.getTime() + (day * 24 * 60 * 60 * 1000))
    return 'expires=' + date.toGMTString() 
}
-->
4.http 头部中content-type有哪些常用类型
<!--
Content-Type来表示具体请求中的媒体类型信息。
Content-Type: [type]/[subtype]; parameter
例如： Content-Type: text/html;charset:utf-8;

application/xhtml+xml ：XHTML格式
application/xml     ： XML数据格式
application/atom+xml  ：Atom XML聚合格式    
application/json    ： JSON数据格式
application/pdf       ：pdf格式  
application/msword  ： Word文档格式
application/octet-stream ： 二进制流数据（如常见的文件下载）

application/x-www-form-urlencoded ： <form encType=””>中默认的encType，form表单数据被编码为         key/value格式发送到服务器（表单默认的提交数据的格式）
默认的。如果不指定content-type，默认使用此格式。

参数格式：key1=value1&key2=value2


text/html ： HTML格式
text/plain ：纯文本格式
text/xml ：  XML格式

image/gif ：gif图片格式
image/jpeg ：jpg图片格式
image/png：png图片格式

multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式
-->
5.http 有哪些方法
<!--
GET获取资源
POST传输实体文本
PUT传输文件
DELETE删除文件
OPTIONS询问支持的方法
-->


7.同步和异步的区别
<!--
同步是指进程在处理一个ajax请求的时候，会阻塞进程，在请求发送后，不会往下执行下面的操作。而是一直等，等到该请求返回数据得到响应时，才继续往下解析，继续进程。异步则不是阻塞模式，在处理请求时，发送完不等待，继续往下执行其他解析操作，不影响进程的进行，等到请求有了响应数据系统会通知进行相关处理。
-->

8.用原生实现一个ajax请求
<!--
if (window.XMLHttpRequest) {
var xmlhttp = new XMLHttpRequest()
} else {
var xmlhttp = new ActiveXOject(Microsoft.XMLHttpRequest)
}
xmlhttp.open(method, url, async)

// xmlhttp.setRequestHeader('Content-type','application/json')
xmlhttp.send(JSON.stringify(data))

xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
            console.log(xmlhttp.responseText)
        }
    }
}

-->
9.var a = [3,4,5,6,7,8,9,0,1,2,3], a怎么排序以及倒序
<!--
a.sort()数组会按照字符的Unicode进行排序（把数组里面当成字符串处理）
arr.sort((a, b) => {
    return a - b //数值从小到大排序
    return b - a //数值从大到小排序
})
a.reverse()倒序
-->
10.var a = [3,4,5,6,7,8,9,0,1,2,3], 过滤数组中大于5的元素  
<!-- 
a.filter((item) => {
 return item > 5
})
-->

11.怎么对a标签设置高度
<!-- 
a {
    display: inline-block/block;
    height: ...
}
 -->

#----------------------------------面试题未完成--------------------------------------

6.http和https的差别
12.Flex-shrink有什么作用
13.块级格式化上下文是什么  
14.Vue的生命周期函数有哪些  
15.图片base64 相比 URL加载有哪些优势

#----------------------------- 华丽的分割线 -----------------------------  
# 2018-11-07 任务  
--Shift enter 我之前没用过，明天我试一下  
#  
<!-- --BUG：连续发送很多条消息，后面的消息不显示了，要出现滚动条
通过css优化滚动条样式，让他好看点   -->
<!-- --BUG .main-box为什么要有border，很不美观 详情参考bug2.jpg   -->
<!-- --BUG 默认字体使用 "Microsoft YaHei", "arial"，现在字体很难看，在我mac这里   -->

# 2018-11-07 未完成的任务
--BUG 详情参考bug1.jpg，随软件缩小，最左边选项栏宽度不变，搜一下官方文档，看看窗口有没有最小宽度，不让用户把软件缩到很小  
--明日联调登陆注册，改完上述问题之后，找我联调  
--Important 做页面的时候时刻想现在页面好不好看，以及开发同时多点自测功能，发现BUG，以后如果测试测出一大堆页面问题或体验问题，就很尴尬了  
  
复盘上面面试题  
不会->先谷歌自行了解->有疑问->再问我  
#----------------------------- 华丽的分割线 -----------------------------  

# 2018-11-07 昨日问题回顾
```javascript
document.cookie(name,value,expires) //设置（expires过期时间要是为天数，需转换成有效地区日期时间）
document.cookie('name', '1')
VM1736:2 Uncaught TypeError: document.cookie is not a function
    at <anonymous>:2:10
```
你真的有自己试过吗。。。
#------------------------------更正-----------------------------------------
javascript中cookie的设置、更改、删除
document.cookie = "encodeURIComponent(name)=encodeURIComponent(value); expires=expiresdate" // 设置cookie

document.cookie = "encodeURIComponent(name)=encodeURIComponent(newValue); expires=newExpiresdate" //直接覆盖更改

document.cookie = "name=; expires= 01 Jan 1970 00:00:00 GMT" //删除时不必指定 cookie 的值。



# 2018-11-08 任务
1.css优化滚动条样式（网上搜一下）
<!-- 滚动条样式没改 -->
2.keyup 和 keydown 和 keypress的区别  
<!-- 
keyup: 释放按键
keydown: 按下按键的时候触发
keypress: 按下按键或者释放按键的时候触发
 -->
3.event.stopPropagation() 和 event.preventDefault() 有什么作用  
<!-- 
event.stopPropagation()阻止冒泡
event.preventDefault()阻止元素本身的事件
 -->

4.event.altKey 和 event.shiftKey有什么作用  
<!-- 在事件里面获取判断是否按下了alt键或者shift键
event.altKey:true 是按下alt键
event.altKey:false 否按下alt键
event.shiftKey:true 是按下shift键
event.shiftKey:false 否按下shift键 -->

5.发送消息不能有个回车的动画  
<!-- 
在keydown事件里面判断回车(event.keyCode === 13)，阻止绑定在元素本身的事件发生event.preventDefault
 -->
6.shift+enter要换行  
<!-- 
在keydown事件里面判断回车加shift按键(event.keyCode === 13 && event.shiftKey)，实现换行
 -->

7.全局搜索：mustFixed 注释，修改我要你修改的点  
<!-- 
还有一个没改：
// mustFixed 关闭打开基本信息弹窗 这样写得不好，我暂时也没想到好方法，不过要换种写法
// 基本信息弹窗样式效果不好，仔细看微信的样式怎么实现
 -->

面试题  
12.Flex-shrink有什么作用
<!-- 用数值来定义收缩比率
作用于伸缩盒子，当盒子内元素内容的宽度之和超出盒子元素的宽度时，flex-shrink是指按一定的比例对子元素进行缩放，默认值为1
超出的部分将按照各因子的flex-shrink值相加之后计算比率来对各子元素进行收缩。
 -->
13.块级格式化上下文是什么
<!-- 
BFC
 -->

14.Vue的生命周期函数有哪些
<!-- 
beforecreate : el 和 data 并未初始化 【举个栗子：可以在这加个loading事件】
created ：完成了 data 数据的初始化，el没有【在这结束loading，还做一些初始化，实现函数自执行】
beforeMount：完成了 el 和 data 初始化
mounted：完成挂载
beforeupdate
updated
beforeDestroy
destroyed
 -->

#-------------------------------自定义指令的钩子函数-------------------

<!-- 
bind只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
inserted被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
update
componentUpdated
unbind只调用一次，指令与元素解绑时调用。
 -->



3.cookie的设置、修改、删除，以及设置expire  （我要可以直接执行的，直接可以用的）  
<!-- 
document.cookie = "encodeURIComponent(name)=encodeURIComponent(value); expires=expiresdate" // 设置cookie

document.cookie = "encodeURIComponent(name)=encodeURIComponent(newValue); expires=newExpiresdate" //直接覆盖更改

document.cookie = "name=; expires= 01 Jan 1970 00:00:00 GMT" //删除时不必指定 cookie 的值。
 -->

15.图片base64 相比 URL加载有哪些优势

6.http和https的差别  
#----------------------------- 华丽的分割线 -----------------------------  
<!--   
# 未来可接受任务  
Todo（Websocket联调）  
--两次聊天消息间隔5分钟，新消息来的时候显示当前时间，详情查看todo1.jpg  
--若聊天时间为昨天，相隔的消息显示 昨天 时:分 详情查看todo2.jpg  
--若为前天及以前的信息直接显示时间 年-月-日 时:分  
--上述时间需要自己做转换（一般后台会传时间戳给你） Date.now() 或 (new Date()).getTime() 得出的一串数字就是时间戳  
--新朋友发消息给你，需要新开个聊天窗口  
上传头像先转base64
-->  
