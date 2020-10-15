## 工作流程

- 组件初始化时，调用生命周期 render，生成虚拟 dom。主要时 React.createElement(), ReactElement() 方法
- 通过 ReactDom.render(),实现虚拟 dom 到真实 dom 的转换
- 当组件更新时，再次调用 render() 生成新的虚拟 dom，再借助 diff 定位两次虚拟 dom 的差异，从而对发生变化的真实 dom 做定向更新

## 生命周期 React15

- 挂载阶段 一生一次

  constructor -> componentWillMount -> render -> componentDidMount

- 更新阶段

  更新阶段可能是 props 变化，自身 state 变化，父组件重渲染等导致

  componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate

  其中自身 state 变化导致的更新，会跳过 componentWillReceiveProps

  但其他两个因素都会导致 componentWillReceiveProps，即就算父组件更新的数据与该子组件无关，也会导致子组件重渲染

> componentReceiveProps 并不是由 props 的变化触发的，而是由父组件的更新触发的

- 卸载阶段 组件销毁

componentWillUnmount

出发卸载的原因：

1. 组件在父组件中被移除了
2. 组件中设置了 key 属性，父组件在 render 过程中发现 key 值和上次不一样，那么组件就会被干掉（React 调和过程）

## shouldComponentUpdate

```
shouldComponentUpdate(nextProps, nextState)
```

render 方法由于伴随着对虚拟 dom 的构建和对比，十分耗时，为了避免不必要的 render 操作，提供了 shouldComponentUpdate 方法，React 组件会根据 shouldComponentUpdate 的返回值，来决定是否执行该方法之后的生命周期，其默认值为 true，即无条件 re-render
