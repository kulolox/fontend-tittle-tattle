## Page(Object object)

注册小程序中的一个页面。接受一个 Object 类型参数，其指定页面的初始数据、生命周期回调、事件处理函数等。

## 参数

- data Object 页面初始数据
- onLoad function 生命周期回调—监听页面加载
- onShow function 生命周期回调—监听页面显示
- onReady function 生命周期回调—监听页面初次渲染完成
- onHide function 生命周期回调—监听页面隐藏
- onUnload function 生命周期回调—监听页面卸载
- onPullDownRefresh function 监听用户下拉动作
- onReachBottom function 页面上拉触底事件的处理函数
- onShareAppMessage function 用户点击右上角转发
- onShareTimeline function 用户点击右上角转发到朋友圈
- onAddToFavorites function 用户点击右上角收藏
- onPageScroll function 页面滚动触发事件的处理函数
- onResize function 页面尺寸改变时触发，详见 响应显示区域变化
- onTabItemTap function 当前是 tab 页时，点击 tab 时触发
- 其他 any 开发者可以添加任意的函数或数据到 Object 参数中，在页面的函数中用 this 可以访问

示例代码

```
Page({
  data: {
    text: "This is page data."
  },
  onLoad: function(options) {
    // Do some initialize when page load.
  },
  onShow: function() {
    // Do something when page show.
  },
  onReady: function() {
    // Do something when page ready.
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
  },
  onShareAppMessage: function () {
    // return custom share data when user share.
  },
  onPageScroll: function() {
    // Do something when page scroll
  },
  onResize: function() {
    // Do something when page resize
  },
  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  // Event handler.
  viewTap: function() {
    this.setData({
      text: 'Set some data for updating view.'
    }, function() {
      // this is setData callback
    })
  },
  customData: {
    hi: 'MINA'
  }
})
```

### data

data 是页面第一次渲染使用的初始数据。

页面加载时，data 将会以 JSON 字符串的形式由逻辑层传至渲染层，因此 data 中的数据必须是可以转成 JSON 的类型：字符串，数字，布尔值，对象，数组。

渲染层可以通过 WXML 对数据进行绑定。

### onLoad(Object query)

页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。

名称 类型 说明
query Object 打开当前页面路径中的参数

### onReady()

页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。

注意：对界面内容进行设置的 API 如 wx.setNavigationBarTitle，请在 onReady 之后进行。

### onPullDownRefresh()

- 需要在 app.json 的 window 选项中或页面配置中开启 enablePullDownRefresh。
- 可以通过 wx.startPullDownRefresh 触发下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。
- 当处理完数据刷新后，wx.stopPullDownRefresh 可以停止当前页面的下拉刷新。

### onReachBottom()

- 可以在 app.json 的 window 选项中或页面配置中设置触发距离 onReachBottomDistance。
- 在触发距离内滑动期间，本事件只会被触发一次。

### onAddToFavorites(Object object)

此事件处理函数需要 return 一个 Object，用于自定义收藏内容：

字段 说明 默认值
title 自定义标题 页面标题或账号名称
imageUrl 自定义图片，显示图片长宽比为 1：1 页面截图
query 自定义 query 字段 当前页面的 query

```
Page({
  onAddToFavorites(res) {
    // webview 页面返回 webviewUrl
    console.log('WebviewUrl: ', res.webviewUrl)
    return {
      title: '自定义标题',
      imageUrl: 'http://demo.png',
      query: 'name=xxx&age=xxx',
    }
  }
})
```

### onShareAppMessage(Object object)

监听用户点击页面内转发按钮（button 组件 open-type="share"）或右上角菜单“转发”按钮的行为，并自定义转发内容。

注意：只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮

参数 Object object:

字段 说明 默认值 最低版本
title 转发标题 当前小程序名称
path 转发路径 当前页面 path ，必须是以 / 开头的完整路径
imageUrl 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持 PNG 及 JPG。显示图片长宽比是 5:4。 使用默认截图

## 组件事件处理函数

Page 中还可以定义组件事件处理函数。在渲染层的组件中加入事件绑定，当事件被触发时，就会执行 Page 中定义的事件处理函数。

```
<view bindtap="viewTap">click me</view>

Page({
  viewTap: function() { // 自定义事件
    console.log('view tap')
  }
})
```

## page.route

到当前页面的路径，类型为 String。

```
Page({
  onShow: function() {
    console.log(this.route)
  }
})
```

## Page.prototype.setData(Object data, Function callback)

setData 函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）

字段 类型 必填 描述
data Object 是 这次要改变的数据
callback Function 否 setData 引起的界面更新渲染完毕后的回调函数

> 单次设置的数据不能超过 1024kB，请尽量避免一次设置过多的数据。请不要把 data 中任何一项的 value 设为 undefined ，否则这一项将不被设置并可能遗留一些潜在问题。

## 页面通信

如果一个页面由另一个页面通过 wx.navigateTo 打开，这两个页面间将建立一条数据通道：

- 被打开的页面可以通过 this.getOpenerEventChannel() 方法来获得一个 EventChannel 对象；
- wx.navigateTo 的 success 回调中也包含一个 EventChannel 对象。
  这两个 EventChannel 对象间可以使用 emit 和 on 方法相互发送、监听事件。

## getCurrentPages()

获取当前页面栈。数组中第一个元素为首页，最后一个元素为当前页面。

- 不要尝试修改页面栈，会导致路由以及页面状态错误。
- 不要在 App.onLaunch 的时候调用 getCurrentPages()，此时 page 还没有生成。
