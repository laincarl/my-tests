const fs = require('fs');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const path = require('path');

const templatePath = path.resolve(__dirname, '../template');

const inquirer = require('inquirer');
const generateRouter = require('./generateRouter');
const { CreateFromTemplate } = require('./CreateFromTemplate');

console.log('创建新模块');

async function getAnswer() {
  // new之后直接跟名字
  const componentName = process.argv[2];
  // 读取template文件夹下的所有模块
  const files = await readdir(templatePath);
  const questions = [
    {
      type: 'list',
      name: 'template',
      message: '选择模板:',
      choices: files,
      filter(val) {
        return val.toLowerCase();
      },
    },
    {
      type: 'input',
      name: 'Component',
      message: '模块名字:',
      when: !componentName,
      validate(value) {
        const pass = value.length > 0 && value.match(/^[a-zA-Z]*?$/g);
        if (pass) {
          return true;
        }
        return '模块名只能为英文且不包含空格';
      },
    },

  ];

  inquirer.prompt(questions).then((answers) => {
    const { template } = answers;
    let Component = componentName || answers.Component;
    // 首字母大写
    Component = Component[0].toUpperCase().concat(Component.substring(1));
    CreateFromTemplate(template, { Component }).then(() => {
      generateRouter();
    });
    // console.log(answers);
  });
}
getAnswer().then(() => {
  // console.log('开始创建');
});
