# Taro 小程序开发初探

**Taro** 是一个开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发微信/京东/百度/支付宝/字节跳动/ QQ 小程序/H5 等应用。

## 安装及使用

```
# 使用 npm 安装 CLI
$ npm install -g @tarojs/cli
# OR 使用 yarn 安装 CLI
$ yarn global add @tarojs/cli
# OR 安装了 cnpm，使用 cnpm 安装 CLI (不推荐，cnpm偶尔会出现一些莫名其妙的bug)
$ cnpm install -g @tarojs/cli
```

taro推荐使用taro-ui作为UI库， taro-ui 使用的 sass 预处理语言。由于国内网络限制 node-sass 安装经常出问题。解决方案：

```
npm install -g mirror-config-china

cnpm install node-sass

```

初始化项目

```
taro init myapp
```

## taro2 与 taro3 及相关技术使用差异

> 当前 taro 为 3.0.0 写法与 2.x 有一些不同，后文以 3 和 2 直接指代 taro 对应的版本

2: import Taro, { Component } from '@tarojs/taro';

3: import React, { Component } from 'react';

2: import { connect } from '@tarojs/redux';

3: import { connect } from 'react-redux';

2: connect 第一个参数必须为一个函数;

部分源码：

```javascript
export default function connect (mapStateToProps, mapDispatchToProps) {
  const store = getStore()
  const dispatch = store.dispatch
  const initMapDispatch = wrapPropsWithDispatch(mapDispatchToProps, dispatch)
  initMapDispatch.dispatch = dispatch

  const stateListener = function () {
    let isChanged = false
    const newMapState = mapStateToProps(store.getState(), this.props)
    const prevProps = Object.assign({}, this.props)
    Object.keys(newMapState).forEach(key => {
      let val = newMapState[key]
      if (isObject(val) && isObject(initMapDispatch[key])) {
        val = mergeObjects(val, initMapDispatch[key])
      }
      if (this.props[key] !== val) {
        this.props[key] = val
        isChanged = true
      }
    })
    if (isChanged) {
      this.prevProps = prevProps
      this._unsafeCallUpdate = true
      this.setState({}, () => {
        delete this._unsafeCallUpdate
      })
    }
  }

  return ...
}
```

3: connect 第一个参数可以为 null 或 undefined

部分源码：

```javascript
function connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  {
    pure = true,
    areStatesEqual = strictEqual,
    areOwnPropsEqual = shallowEqual,
    areStatePropsEqual = shallowEqual,
    areMergedPropsEqual = shallowEqual,
    ...extraOptions
  } = {},
) {
  const initMapStateToProps = match(
    mapStateToProps,
    mapStateToPropsFactories,
    'mapStateToProps',
  )
  const initMapDispatchToProps = match(
    mapDispatchToProps,
    mapDispatchToPropsFactories,
    'mapDispatchToProps',
  )
  const initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps')

  return connectHOC(selectorFactory, {
    // used in error messages
    methodName: 'connect',

    // used to compute Connect's displayName from the wrapped component's displayName.
    getDisplayName: (name) => `Connect(${name})`,

    // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
    shouldHandleStateChanges: Boolean(mapStateToProps),

    // passed through to selectorFactory
    initMapStateToProps,
    initMapDispatchToProps,
    initMergeProps,
    pure,
    areStatesEqual,
    areOwnPropsEqual,
    areStatePropsEqual,
    areMergedPropsEqual,

    // any extra options args can override defaults of connect or connectAdvanced
    ...extraOptions,
  })
}
```

2: 组件内有 config 属性，可以配置小程序一些公共属性

3: 无 config 属性，对应页面的配置需要创建[pageName].config.js 配置文件

2: 通过 this.\$router.params 获取路由参数

3: 通过 getCurrentInstance().router.params 获取路由参数

2: 组件样式无法通过 cssStyles['className']方式在外部定义

3: 可以像写 react 组件一样修改子组件样式

（小程序可以引用页面或父组件的样式，即使启用了样式隔离 `isolated` ，组件仍然可以在局部引用组件所在页面的样式或父组件的样式。）

> 基础库 2.9.2 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)。


taro3.x 对应需要下载 taro-ui@3.0.0-alpha.0，taro-ui2 编译会报错

> 以上为目前发现的差异，3 目前似乎 bug 较多，谨慎升级，官方说法：当前 Taro 已进入 3.x 时代，相较于 Taro 1/2 采用了重运行时的架构，让开发者可以获得完整的 React/Vue 等框架的开发体验

## 生命周期

**Taro** 遵循 [React](https://reactjs.org/) 语法规范，它采用与 React 一致的组件化思想，组件生命周期与 React 保持一致，同时支持使用 [JSX 语法](https://nervjs.github.io/taro/docs/2.2.8/jsx.html)，让代码具有更丰富的表现力，使用 **Taro** 进行开发可以获得和 React 一致的开发体验。

taro 生命周期与小程序生命周期对照表

| Taro                   | 小程序                          |
| ---------------------- | ------------------------------- |
| componentWillMount     | 页面 onLoad 或 app 中 onLaunch  |
| componentDidMount      | 页面 onReady 或 app 中 onLaunch |
| componentDidShow       | onShow                          |
| componentDidHide       | onHide                          |
| componentDidCatchError | onError                         |
| componentDidNotFound   | onPageNotFound                  |
| shouldComponentUpdate  |                                 |
| componentWillUpdate    |                                 |
| componentDidUpdate     |                                 |
| componentWillUnmount   | onUnload                        |

Taro 开发中特有的方法

| 方法                 | 作用                                  |
| -------------------- | ------------------------------------- |
| onPullDownRefresh    | 页面相关事件处理函数–监听用户下拉动作 |
| onReachBottom        | 页面上拉触底事件的处理函数            |
| onShareAppMessage    | 用户点击右上角转发                    |
| onPageScroll         | 页面滚动触发事件的处理函数            |
| onTabItemTap         | 当前是 tab 页时，点击 tab 时触发      |
| componentWillPreload | 预加载，只在微信小程序中可用          |

## 小程序相关知识

前台状态：小程序启动后，界面被展示给用户

后台状态：当用户点击右上角胶囊按钮关闭小程序，或者按了设备 Home 键离开微信时，小程序并没有完全终止运行。

冷启动：小程序第一次打开，或者小程序销毁后再打开。

热启动：用户已经打开过某小程序，然后在一定时间内再次打开该小程序，此时小程序并未被销毁，只是从后台状态进入前台状态

销毁时机：长时间后台状态、占用系统资源过高。

### 生命周期调用顺序

app: onLaunch>onShow

page:onLoad>onShow>onReady

- 小程序注册完成后，加载页面，触发 onLoad 方法。（可取到 navigateTo，redirectTo 中的 query）

- 页面载入后触发 onShow 方法，显示页面。

- 首次显示页面，会触发 onReady 方法，渲染页面元素和样式，一个页面只会调用一次。（对界面的设置，如 setNavigationBarTitle 需要在 onReady 之后设置）

- 当小程序后台运行或跳转到其他页面时，触发 onHide 方法。（一般为 navigateTo 或底部 tab 切换后）

- 当小程序由后台进入到前台运行或重新进入页面时，触发 onShow 方法。

- 当使用重定向方法 wx.redirectTo(OBJECT)或关闭当前页返回上一页 wx.navigateBack()，触发 onUnload。

小程序初始化完成后，页面首次加载触发 onLoad，只会触发一次。

当小程序进入到后台，先执行页面 onHide 方法再执行应用 onHide 方法。

当小程序从后台进入到前台，先执行应用 onShow 方法再执行页面 onShow 方法。

### 小程序分包

目前小程序分包大小有以下限制：

- 整个小程序所有分包大小不超过 16M
- 单个分包/主包大小不能超过 2M

假设小程序目录结构如下：

```
├── app.js
├── app.json
├── app.wxss
├── packageA
│   └── pages
│       ├── cat
│       └── dog
├── packageB
│   └── pages
│       ├── apple
│       └── banana
├── pages
│   ├── index
│   └── logs
└── utils
```

开发者可以通过 app.json 中 subpackages 字段声明项目分包结构

```
{
  "pages":[
    "pages/index",
    "pages/logs"
  ],
  "subpackages": [
    {
      "root": "packageA",
      "pages": [
        "pages/cat",
        "pages/dog"
      ]
    }, {
      "root": "packageB",
      "name": "pack2",
      "pages": [
        "pages/apple",
        "pages/banana"
      ]
    }
  ]
}
```

### subpackages 分包配置项

- root String 分包根目录
- name String 分包别名，分包预下载可以使用
- pages StringArray 分包页面路径，相对于分包根目录
- independent Boolean 分包是否是独立分包

### 分包预下载

开发者可以通过配置，在进入小程序某个页面时，由框架自动预下载可能需要的分包，提升进入后续分包页面时的启动速度。对于独立分包，也可以预下载主包。

通过 app.json preloadRule 配置来控制。

```
{
  "pages": ["pages/index"],
  "subpackages": [
    {
      "root": "important",
      "pages": ["index"],
    },
    {
      "root": "sub1",
      "pages": ["index"],
    },
    {
      "root": "indep",
      "pages": ["index"],
      "independent": true
    }
  ],
  "preloadRule": {
    "pages/index": {
      "network": "all",
      "packages": ["important"]
    },
    "sub1/index": {
      "packages": ["hello", "sub3"]
    },
    "indep/index": {
      "packages": ["__APP__"]
    }
  }
}
```

preloadRule 中，key 是页面路径，value 是进入此页面的预下载配置：

- packages StringArray 进入页面后预下载分包的 root 或 name。**APP**表示主包（针对独立分包）。
- network String 在指定网络下预下载，可选值 all（不限网络）， wifi（默认）

> 限制：同一个分包中的页面享有共同的预下载大小限额 2M，限额会在工具中打包时校验。例如：页面 A 和 B 都在同一个分包中，A 中预下载总大小 0.5M 的分包，B 中最多只能预下载总大小 1.5M 的分包。

### 独立分包

独立分包是小程序中一种特殊类型的分包，可以独立于主包和其他分包运行。从独立分包中页面进入小程序时，不需要下载主包。当用户进入普通分包或主包内页面时，主包才会被下载。

## 最佳实践

- 使用 ESLint。

- 不能用 Array.map 以外的方法操作 JSX 数组。

- 为组件提供 defaultProps，正确设置 `defaultProps` 可以避免很多异常的情况的出现。

- 组件传递函数属性名以 on 开头,官方的说法为

  > 在 v1.3.0-beta.0 之后，自定义组件间的事件传递可以不用 `on` 开头，但内置组件的事件依然是以 `on` 开头的，为了一致性我们仍然推荐你以 `on` 开头命名你的事件。

- 不要在小程序端打印组件传入的函数，拿不到结果。

- 请不要对 this.props.children 进行任何操作。Taro 在小程序中实现这个功能使用的是小程序的 [slot](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html) 功能。

- render props，属性名要以 render 开头， 它也是通过小程序的 [slot](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html) 功能实现的，也有 this.props.children 相同的限制。

  ```
  class Cat extends Taro.Component {
    render() {
    	...
    }
  }

  class Mouse extends Taro.Component {
    constructor(props) {
      super(props);
      this.handleMouseMove = this.handleClick.bind(this);
      this.state = { x: 0, y: 0 };
    }

    handleClick(event) {
      const { x, y }  = event.detail
      this.setState({
        x,
        y
      });
    }

    render() {
      return (
        <View style={{ height: '100%' }} onClick={this.handleClick}>

          {/*
            我们可以把 prop 当成一个函数，动态地调整渲染内容。
          */}
          {this.props.renderCat(this.state)}
        </View>
      );
    }
  }

  // MouseTracker.js
  class MouseTracker extends Taro.Component {
    render() {
      return (
        <View>
          <View>点击鼠标!</View>
          {/*
            Mouse 如何渲染由 MouseTracker 的状态控制
          */}
          <Mouse renderCat={mouse => (
            <Cat mouse={mouse} />
          )}/>
        </View>
      );
    }
  }
  ```

* 不要以 id，class，style 为自定义组件的属性名，在小程序中会丢失。

* 尽量不要在 componentDidMount 中调用 this.setState()，会导致触发更新。

* render 方法必须有返回值。

* js 中使用单引号。

* jsx 中使用单引号，使用双引号可能导致编译错误。

* 推荐使用 redux 作为状态管理工具。
