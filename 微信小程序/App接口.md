## APP(Object object)

注册小程序。接受一个 Object 参数，其指定小程序的生命周期回调等。

> App() 必须在 app.js 中调用，必须调用且只能调用一次。不然会出现无法预期的后果。

其他组件中可通过：

```
const app = getApp();
```

获取 app 实例。

> 不要在定义于 App() 内的函数中，或调用 App 前调用 getApp() ，使用 this 就可以拿到 app 实例。

> 通过 getApp() 获取实例之后，不要私自调用生命周期函数。

### 参数

- onLaunch function 生命周期回调——监听小程序初始化。
- onShow function 生命周期回调——监听小程序启动或切前台。
- onHide function 生命周期回调——监听小程序切后台。
- onError function 错误监听函数。
- onPageNotFound function 页面不存在监听函数。
- onUnhandledRejection function 未处理的 Promise 拒绝事件监听函数。
- onThemeChange function 监听系统主题变化
- 其他 any 开发者可以添加任意的函数或数据变量到 Object 参数中，用 this 可以访问

```
App({
  onLaunch (options) {
    // Do something initial when launch.
  },
  onShow (options) {
    // Do something when show.
  },
  onHide () {
    // Do something when hide.
  },
  onError (msg) {
    console.log(msg)
  },
  globalData: 'I am global data'
})
```

### onLaunch(Object object)

小程序初始化完成时触发，全局只触发一次。参数也可以使用 wx.getLaunchOptionsSync 获取。

### onShow(Object object)

小程序启动，或从后台进入前台显示时触发。也可以使用 wx.onAppShow 绑定监听。

### onHide()

小程序从前台进入后台时触发。也可以使用 wx.onAppHide 绑定监听。

### onError(String error)

小程序发生脚本错误或 API 调用报错时触发。也可以使用 wx.onError 绑定监听。

### onPageNotFound(Object object)

小程序要打开的页面不存在时触发。也可以使用 wx.onPageNotFound 绑定监听。注意事项请参考 wx.onPageNotFound。

```
App({
  onPageNotFound(res) {
    wx.redirectTo({
      url: 'pages/...'
    }) // 如果是 tabbar 页面，请使用 wx.switchTab
  }
})
```

### onUnhandledRejection(Object object)

小程序有未处理的 Promise 拒绝时触发。也可以使用 wx.onUnhandledRejection 绑定监听。

### onThemeChange(Object object)

系统切换主题时触发。也可以使用 wx.onThemeChange 绑定监听。
