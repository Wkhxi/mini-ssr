##### 1.npm init

```
目录结构：

react-ssr
├─ pages
│  └─ index.js
├─ package.json
├─ server.js
└─ webpack.server.js




```

##### 2.

```shell

npm install webpack webpack-cli babel-loader @babel/core @babel/preset-env @babel/preset-react react react-dom express



# webpack webpack-cli 用于打包

# babel-loader、@babel/core、@babel/preset-env、 @babel/preset-react 用于编译 React

# react、react-dom 用于写 React 代码

```

##### 3. server.js

```shell

# 启动node服务
node server.js

# 此时访问 http://localhost:3000/ 得到 界面渲染为 Counters 0 times


# <html>
#    <head>
#        <title>Tiny React SSR</title>
#    </head>
#    <body>
#     <div id='root'>
#       Counters 0 times
#     </div>
#    </body>
# </html>


```

##### 4. 实现 ssr，将组件 转为 string

```shell
# 1. 修改 server.js
# renderToString

# 2. webpack.server.js 解决 jsx 编译 和 import语法 的问题


# 运行打包后的文件
# webpack --config webpack.server.js && node ./build/server.bundle.js


```

##### 5.水合, 为服务端返回的 html 绑定事件

```
//  实现一遍 CSR
react-ssr
├─ pages
│  └─ index.js
├─ client.js
├─ package.json
├─ server.js
├─ webpack.client.js
└─ webpack.server.js

// 1. 打包客户端 JS
//    客户端核心 React 代码的 pages/index.js
//    引用 pages/index.js 的 client.js
//    引用 pages/index.js 的 server.js

//    将 client.js 打包到 public下的 client.bundle.js
//    将 server.js 打包到 build 下的 server.bundle.js

webpack --config webpack.client.js && webpack --config webpack.server.js && node ./build/server.bundle.js

// 此时 功能便能 正常使用, 但是会出现 同样的内容渲染两遍 的情况
// 当访问 localhost:3000的时候，服务端会先渲染一遍组件代码，然后输出到 HTML 中
// 引用 client.bundle.js，然后用 JS 重新渲染一遍，并同时绑定上事件。
```

##### 6.hydrateRoot

```
// 修改下 client.js
// hydrateRoot会复用 服务端生成的dom

import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from'./pages/index'

hydrateRoot(document.getElementById('root'), <App />);


```

##### 7.优化 实现 getServerSideProps

```
import 该文件，获取导出的 getServerSideProps 函数。

然后在 服务端调用！！！ 该函数 得到 getServerSideProps 返回的数据，最后将返回的数据传入到组件中。


```
