# Html 全局属性

## accesskey

指定访问当前元素的快捷键

```
<a href='http://www.baidu.com/' accesskey='1'>去百度</a>
```

在页面中使用 alt + 1 就能直接跳转（windows）

## autocapitalize

用来控制文本在用户输入/编辑时的大小写，更适合英文场景，中文场景无效。

支持以下值：

- off | none 表示没有自动大写，全部都是小写
- on | sentences 每个句子的第一个字母默认为大写，其他字母为小写
- words 每个单词的第一个字母大写，其他字母默认小写
- characters 所有字母都要大写

实际测试，无效

## class

元素类名，没什么好说的

## contenteditable

可以让元素处于内容可编辑状态，true 和 false 所有浏览器都是支持的

## data-\*

开发人员自己设置的各种属性，方便开发时获取。

可以使用 HTMLElement.getAttribute()方法获取，也可以通过 HTMLElement.dataset 获取

## dir

改变文档流的水平方向

- ltr 文档呈现从左往右
- rtl 文档呈现从右往左
- auto 由浏览器决定文档流的方向

类似微信对话这样的对称布局，可以使用逻辑 CSS 属性，配合 dir 属性实现，即自己的对话布局和他人的对话布局使用完全一样的 HTML 和 CSS 代码，唯一区别就是自己的对话的容器元素设置一个 dir="rtl"就可以了。

## draggable

在拖拽交互中非常有用， true 元素可被拖拽，false 元素不可被拖拽

## hidden

可以让元素隐藏起来，表现为 display: none;但优先级极低，可以轻松 reset

在 reset.css 中添加这一句，这样所有项目中都可以使用

```
[hidden] {
  display: none;
}
```
