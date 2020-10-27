- ## 生命周期

  React 语法风格

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
