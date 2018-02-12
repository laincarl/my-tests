const { CreateFromTemplate } = require('./CreateFromTemplate');
const fs = require('fs');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const path = require('path');
const templatePath = path.resolve(__dirname, './template');

var inquirer = require('inquirer');

console.log('创建新模块');

async function getAnswer(params) {
  //读取template文件夹下的所有模块
  const files = await readdir(templatePath);
  var questions = [
    {
      type: 'list',
      name: 'template',
      message: '选择模板:',
      choices: files,
      filter: function (val) {
        return val.toLowerCase();
      }
    },
    {
      type: 'input',
      name: 'Component',
      message: "模块名字:",
      validate: function (value) {
        var pass = value.length > 0 && value.match(/^[a-zA-Z]*?$/g);
        if (pass) {
          return true;
        }
        return '模块名只能为英文且不包含空格';
      }
    },

  ];

  inquirer.prompt(questions).then(answers => {
    let { template, Component } = answers;
    //首字母大写
    Component = Component[0].toUpperCase().concat(Component.substring(1));
    CreateFromTemplate(template, { Component });
    // console.log(answers);
  });
}
getAnswer().then(data => {
  // console.log('开始创建');
})