## 创建实例的方式变化了

```
// vue2
const vue = new Vue({})
// vue3
const vue = createApp({})
```

## Global Api 改为在实例上调用

```
// vue2
Vue.component()
// vue3
createApp({}).component()
```

受影响的 api：

- Vue.config
- Vue.component
- Vue.directive
- Vue.mixin
- Vue.use
- Vue.filter (remove)

## v-model 变化

model 选项和 v-bind 的 sync 修饰符被移除，统一为 v-model 参数形式

```
// v-model语法糖展开变化
// vue2
:value=""
@input="
// vue3
:modelValue=""
@update:modelValue="

```

> 子组件中 model 选项移除

如果希望自定义属性名称

```
v-model:[name] = "" // name默认为modelValue
```

## 渲染函数 api 修改

## 函数式组件

函数式组件仅通过简单函数方式创建，functional 选项废弃

- 性能提升在 vue3 中可忽略不计，vue3 推荐使用状态组件
- 函数式组件仅通过纯函数形式声明，接受 props 和 context 两个参数
- 不能在.vue->template 上设置 functional 特性声明
- { functional: true } 组件选项移除

## 异步组件

异步组件要求使用 defineAsyncComponent 方法创建，为了和函数式组件区分开

不带选项：

```
const demoPage = () => import('./DemoPage.vue') // 函数式组件
const asyncPage = defineAsyncComponent(() => import('./NextPage.vue'))
```

带选项：

```
const asyncPage = defineAsyncComponent({
  loader: () => import('./NextPage.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent,
  loadingComponent
})
```

## data 选项声明为函数，不再为对象形式

## 自定义组件白名单

不同编译环境，写法不同，主要是 isCustomElement 选项，具体 google

## is 属性仅用在 component 标签上

```
<component is="comp"></component>
```

dom 内模板解析使用 v-is 代替

```
<ul>
  <li v-is="blog-post-row"></li>
</ul>
```

## 插槽相关

$scopedSlots属性移除， 都用$slots 代替

- 插槽均以函数形式暴露
- \$scopedSlots 属性移除

## 自定义指令 api 和组件保持一致

自定义指令不用单独记钩子函数名了，统一为组件声明周期的命名

- bind -> beforeMount
- inserted -> mounted
- beforeUpdate new
- update （移除）
- componentUpdated -> updated
- beforeUnmount new
- unbind -> unmounted

## transition 类名变更

- v-enter -> v-enter-from
- v-leave -> v-leave-from

## 组件 watch 选项和实例方法的\$watch 不再支持点分隔符字符串路径

```
this.$watch(() => this.foo.bar, (v1, v2) => {
  console.log(this.foo.bar)
})
```

## 移除的 api

- keyCode 作为 v-on 修饰符被移除

```
// keyCode方式不在被支持
<input v-on:keyup.13="submit"/>
// 只能使用alias方式
<input v-on:keyup.enter="submit" />
```

- $on,$off,\$once 完全移除

上述 3 个方法被认为不应该由 vue 提供，因此被移除，可以使用第三方库实现（mitt）

- filters 移除

使用方法或计算属性替代
