git init 将本地项目变成 git 项目

git clone [remoteUrl] [localDirName] 克隆远程 git 项目

git add [fileName] 跟踪一个文件

git add . 跟踪所有未跟踪文件

git commit 提交暂存区到 git 仓库

git status [-s] 查看工作区文件状态,-s 简洁模式

git log [-p] [-2] 查看 git 项目提交记录,参数则显示最近的两次提交

git diff [--staged] 查看尚未暂存的文件更新了哪些部分, 添加参数则表示对比最后一次提交与当前暂存区文件的差异

git remote -v 查看远程仓库信息

git push origin master 将本地项目推送到远程仓库

git tag 列出标签
