## React.StrictMode

严格模式检查仅在开发模式下运行，它不会渲染任何可见 UI，它为其后代元素触发额外的检查和警告，所以组件非 render 部分将执行 2 次；

作用：

- 识别不安全的生命周期
- 过时字符串 ref api 警告
- 废弃的 findDomNode 方法警告
- 意外的副作用
- 过时的 context Api

使用：用该组件包裹你需要启用严格模式的子组件，可以在全局包裹。
