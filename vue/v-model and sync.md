## v-model

v-model 是语法糖,它实际上做了两件事，为组件绑定 value 属性（默认），为组件注册 input 事件（默认）

- :value
- @input

此时子组件需要写对应的属性和事件绑定，通过\$emit 触发父组件的 input 事件

v-model 可以通过 modal 选项自定义

```
export default {
  model: {
    event: 'onChange',
    prop: 'value'
  },
  data() {
    return {}
  }
}
```

v-model 写起来更方便，但有两个弊端

1. 语法糖隐藏了真正的实现方式，让使用者只知其然，不知其所以然
2. v-model 只能绑定单条属性,对于多属性和对象无解

## .sync

当一个组件需要多个双向绑定的属性是，v-modal 就不适用了，.sync 出现。

.sync 也是通过\$emit 触发父组件属性变动

```
$emit('udapte:[attr]', newValue)
```
