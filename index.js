#! /usr/bin/env node

const commander = require('commander');
const inquirer = require('inquirer');
const download = require('download-git-repo');
const ora = require('ora');
const fs = require('fs');
const chalk = require('chalk');

commander
  .version('1.0.0', '-v --version')
  .command('init <name>')
  .description('初始化新项目')
  .action(name => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'description',
        message: '请输入项目描述'
      },
      {
        type: 'input',
        name: 'author',
        message: '请输入作者名称'
      },
      {
        type: 'list',
        name: 'css',
        message: '选择一项作为css预处理器',
        choices: ['sass', 'less', 'stylus']
      }
    ])
    .then(answers => {
      let { description, author } = answers;
      const spinner = ora('正在下载模板...');
      spinner.start();
      download(
        'github:only-twj520Q/marriage#01-login',
        `${name}`,
        { clone: true },
        err => {
          if (err) {
            spinner.fail('下载失败');
          }
          spinner.succeed('下载成功');
          fs.access(`${name}`, function(err){
              if(err) throw err;
              const packageInfo = `${name}/package.json`;
              const encoding = 'utf-8';
              let content = fs.readFileSync(packageInfo, encoding);
              try {
                content = JSON.parse(content);
              } catch(e) {
                console.log('json解析报错', e)
              }
              content.description = description;
              content.author = author;
              content = JSON.stringify(content);
              fs.writeFileSync(packageInfo, content, encoding);
              console.log(chalk.green('项目初始化完成'));
            });
        }
      )
    })
  })

commander.parse(process.argv);
