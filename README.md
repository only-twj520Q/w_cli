# w_cli
###  前言

w_cli是基于node开发的脚手架。

**什么是脚手架**

脚手架可以帮助我们减少重复性的工作，根据自己的个性化配置动态生成项目结构等，从而迅速搭建起项目的运行环境，让我们能专心于写业务。我们常用的脚手架有vue-cli、create-react-app等。

在实际工作中，我们可以定制一个属于自己的脚手架，来提高自己的工作效率。



### 第三方库

关于node开发命令行的包有很多，yarg, shelljs等等。此外还需要了解process、fs等基础模块。

下面是我用到的一些包

* [commander.js](https://github.com/tj/commander.js)，可以自动的解析命令和参数，用于处理用户输入的命令
* [download-git-repo](https://github.com/flipxfx/download-git-repo)，下载并提取 git 仓库，用于下载项目模板
* [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)，通用的命令行用户界面集合，用于和用户进行交互
* [ora](https://github.com/sindresorhus/ora)，下载过程久的话，可以用于显示下载中的动画效果
* [chalk](https://github.com/chalk/chalk)，可以给终端的字体加上颜色



command的API如下

- `command` 定义命令行指令, 后面可以跟上一个`name`，用空格隔开 `.command('module [moduleName]')`
- `alias` 定义一个更短的命令行指令, 是上一项的别名
- `description` 描述，它会在`help`里面展示
- `option` 定义参数。它接受四个参数，在第一个参数中，它可输入短名字 -a和长名字–app ,使用 | 或者,分隔，在命令行里使用时，这两个是等价的，区别是后者可以在程序里通过回调获取到；第二个为描述, 会在 help 信息里展示出来；第三个参数为回调函数，他接收的参数为一个string，有时候我们需要一个命令行创建多个模块，就需要一个回调来处理；第四个参数为默认值
- `action` 注册一个`callback`函数
- `parse` 解析命令行
- `on` 监听某条命令输入后，用第二个参数(函数)来指定自定义动作

### 

### 在命令行中执行

**Bin**

node.js 内置了对命令行操作的支持，在 package.json 中的 bin 字段可以定义命令名和关联的执行文件。

在配置文件中增加了此项后，只需在文件根目录下执行 `npm link` 命令，将包链接到全局环境，相当于在全局环境中加了一条可执行脚本。例如，对于下面的配置，我们可以直接执行`w_cli`。

如果你发布了你的脚手架，那么在其他用户使用命令 `npm install -g <packagename>` 之后，便可以在全局下使用你的脚手架了。

```javascript
"bin": {
  "w_cli": "index.js"
}
```

具体可以参考[这篇文章](https://segmentfault.com/a/1190000015271651)



**/usr/bin/node**

!/usr/bin/node是告诉操作系统执行这个脚本的时候，调用/usr/bin下的node解释器，相当于写死了node路径；
!/usr/bin/env node这种用法是为了防止操作系统用户没有将node装在默认的/usr/bin路径里。当系统看到这一行的时候，首先会到env设置里查找node的安装路径，再调用对应路径下的解释器程序完成操作，推荐这种写法。

