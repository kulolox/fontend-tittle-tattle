## React Hooks

React hooks 是 react 16.8 的新增特性。可以让我们在不编写 class 的情况下使用 state 以及其他 react 特性。

### hooks 规则

- 不要在循环、条件或者嵌套函数中调用 hooks
- 只在 react 函数组件中使用 hooks

后者是显而易见的，我们需要为组件添加功能，前者则有些莫名奇妙了。

### state hooks

简单用法：

```
function Example() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
