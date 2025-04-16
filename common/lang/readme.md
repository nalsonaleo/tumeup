此目录的作用是批量翻译某一个语言， 然后更新到/locale目录，并修改系统支持的语言信息/pages/index/user

## 批量翻译语法
[语言代码](https://uniapp.dcloud.io/tutorial/i18n.html#%E8%AF%AD%E8%A8%80%E4%BB%A3%E7%A0%81)参考这里， 以批量翻译为日文为例：
```
node add.js jp Japanese
```

## 更新其他语言
修改了英文翻译后，同步翻译其他语言，以前已经存在的翻译，不会再次被翻译
```
node update.js
```

## 发布系统语法
modules目录下是经过批量翻译之后的文件，通过翻译软件可能存在某些没有翻译成功，需要手动修改，手动修改之后，执行如下命令，更新到/locale目录下
```
node index.js
```
