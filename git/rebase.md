## git rebase

对某一段线性提交历史进行编辑、删除、复制、粘贴；

> 不要通过 rebase 对任何已经提交到公共仓库中的 commit 进行修改（你自己一个人玩的分支除外）

1. 合并多个 commit 为一个完整 commit

```
git rebase -i [startpoint] [endpoint]
```

-i 表示弹出交互式界面让用户完成合并操作，合并[startpoint]到[endpoint]提交区间进行合并，不指定[endpoint]则区间的终点默认是当前分支 HEAD

使用该命令后我们将进入交互式界面，按照提示操作后，将进入 commit 修改界面，修改 commit message 后保存退出即完成本次 rebase 操作。

2. 将某一段 commit 粘贴到另一个分支上

```flow
st=>start: 页面加载
e=>end: End:>http://www.google.com
op1=>operation: get_hotel_ids|past
op2=>operation: get_proxy|current
sub1=>subroutine: get_proxy|current
op3=>operation: save_comment|current
op4=>operation: set_sentiment|current
op5=>operation: set_record|current

cond1=>condition: ids_remain空?
cond2=>condition: proxy_list空?
cond3=>condition: ids_got空?
cond4=>condition: 爬取成功??
cond5=>condition: ids_remain空?

io1=>inputoutput: ids-remain
io2=>inputoutput: proxy_list
io3=>inputoutput: ids-got

st->op1(right)->io1->cond1
cond1(yes)->sub1->io2->cond2
cond2(no)->op3
cond2(yes)->sub1
cond1(no)->op3->cond4
cond4(yes)->io3->cond3
cond4(no)->io1
cond3(no)->op4
cond3(yes, right)->cond5
cond5(yes)->op5
cond5(no)->cond3
op5->e

```
