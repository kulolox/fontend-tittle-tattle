## 常用代码收集

- 高斯模糊

```
-webkit-filter: blur(8px);
-moz-filter: blur(8px);
-ms-filter: blur(8px);
filter: blur(8px);
```

- 禁止选中文本

```
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
```

- DIV 禁止选择

```
<div unselectable="on" onselectstart="return false;">
  abcdefghigklmnopqrstuvwxyz
</div>
```

- 基于文件类型的链接样式

```
// 链接
a[href^="http://"]{
    padding-right: 20px;
    background: url(external.gif) no-repeat center right;
}
// 邮件
a[href^="mailto:"]{
    padding-right: 20px;
    background: url(email.png) no-repeat center right;
}

// pdf文件
a[href$=".pdf"]{
    padding-right: 20px;
    background: url(pdf.png) no-repeat center right;
}
```

- 网站快速变灰（灾难）

```
-webkit-filter: grayscale(100%);
-moz-filter: grayscale(100%);
-ms-filter: grayscale(100%);
filter: grayscale(100%);
```

- DIV 可编辑

```
<div id="edit" contentEditable="true"  />
```

- Input 的 placeholder 设置颜色

```
::-webkit-input-placeholder { /* WebKit browsers */
  color: #999;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #999;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #999;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
  color: #999;
}
```

- 单行文本超出省略

```
display:bolck;
overflow:hidden;
white-space:nowrap;
text-overflow:ellipsis;
```

- 多行文本超出省略

```
overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2; // 保留几行
-webkit-box-orient: vertical; // 核心
```
