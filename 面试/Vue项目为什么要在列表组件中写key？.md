没有绑定 key 的情况下，在遍历简单模板的情况下，虚拟新旧节点对比更快，节点也会复用，并且是就地复用。

```
<div id="app">
    <div v-for="i in dataList">{{ i }}</div>
</div>

var vm = new Vue({
  el: '#app',
  data: {
    dataList: [1, 2, 3, 4, 5]
  }
}
```

以上例子，v-for 指令会生成一下 dom 节点，我们人为给每个节点标记一个身份 id

```
  [
    '<div>1</div>', // id： A
    '<div>2</div>', // id:  B
    '<div>3</div>', // id:  C
    '<div>4</div>', // id:  D
    '<div>5</div>'  // id:  E
  ]
```

改变 dataList 数据，对比改变后的数据

```
vm.dataList = [4, 1, 3, 5, 2] // 数据位置替换

// 没有key的情况，节点位置不变，但是节点内容更新了
[
  '<div>4</div>', // id： A
  '<div>1</div>', // id:  B
  '<div>3</div>', // id:  C
  '<div>5</div>', // id:  D
  '<div>2</div>'  // id:  E
]

// 有key的情况，只交换了dom节点的位置
[
  '<div>4</div>', // id： D
  '<div>1</div>', // id:  A
  '<div>3</div>', // id:  C
  '<div>5</div>', // id:  E
  '<div>2</div>'  // id:  B
]
```

增删 dataList 列表项

```
vm.dataList = [3, 4, 5, 6, 7] // 数据进行增删

// 没有key的情况，节点位置不变，内容也更新了（原地复用）
[
  '<div>3</div>', // id： A
  '<div>4</div>', // id:  B
  '<div>5</div>', // id:  C
  '<div>6</div>', // id:  D
  '<div>7</div>'  // id:  E
]

// 有key的情况，节点删除了 A, B 节点，新增了 F, G 节点
[
  '<div>3</div>', // id： C
  '<div>4</div>', // id:  D
  '<div>5</div>', // id:  E
  '<div>6</div>', // id:  F
  '<div>7</div>'  // id:  G
]
```

从上面的例子可以看出，不带 key，且是简单模板，可以有效的复用节点，diff 速度也比带 key 的快。原因是 dom 的增删更耗时。

但是改模式会带来一些隐藏的副作用，比如不产生过渡效果，或者某些节点绑定的数据（表单）状态会出现错位。

> 所以 Vue 建议尽可能在使用 v-for 时提供 key attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

key 实际上是给每一个 VNodes（虚拟 dom）一个唯一的 id，在新旧 nodes 对比时辨识 VNodes
