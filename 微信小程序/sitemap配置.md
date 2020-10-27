微信现已开放小程序搜索，当开发者允许微信索引时，微信会通过爬虫的形式，为小程序的页面内容建立索引。

## sitemap 配置

sitemap.json 如果不存在则默认所有页面都允许被索引。sitemap.json 有以下属性：

- rules Object[] 必填 索引规则列表

### rules

rules 配置项指定了索引规则，每项规则为一个 JSON 对象，属性如下所示：

```
{
  "rules":[{
    "action": "allow", // 是否可以被索引，否disallow
    "page": "path/to/page", // 规则对应页面
    "params": ["a", "b"],
    "matching": "exact" // 当小程序页面参数列表等于params时，规则命中
  }, {
    "action": "disallow",
    "page": "path/to/page"
  }]
}
```

> 详见[官方文档](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/sitemap.html)
