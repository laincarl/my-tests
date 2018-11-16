const fs = require('fs');
const path = require('path');
const basicPath = path.resolve(__dirname, '../src/test-cases');
const dirPath = path.resolve(__dirname, '../template');
const traversefolder = require('./traverseFolder');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
//为写文件准备路径
function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}
const CreateFiles = async function CreateFiles(originPath, targetPath, replaceCode) {
  // fs.mkdir(path.resolve(basicPath, `${targetPath}`), () => {
  let data = await readFile(originPath, 'utf8');
  //内容替换
  Object.keys(replaceCode).forEach(code => {
    const reg = new RegExp(`{%${code}%}`, 'g');
    data = data.replace(reg, (match) => {
      return replaceCode[code];
    });
  })
  ensureDirectoryExistence(targetPath);
  let value = await writeFile(targetPath, data);
  //await会阻塞后面代码
  console.log(path.basename(targetPath), '创建成功')
  return value;
}

const CreateFromTemplate = (template, replaceCode) => new Promise((resolve, reject) => {
  const originPath = path.resolve(dirPath, template);
  // 遍历文件夹，替换所有改变路径
  traversefolder(originPath)
    .then((files) => {
      // console.log(files);
      Promise.all(files.map(file => {
        //绝对路径转相对路径
        let relativePath = path.relative(originPath, file);
        Object.keys(replaceCode).forEach(code => {
          const reg = new RegExp(`{%${code}%}`, 'g');
          relativePath = relativePath.replace(reg, (match) => {
            // console.log('替换', match, '为', replaceCode[code]);
            return replaceCode[code];
          });
        })
        const targetPath = path.resolve(basicPath, replaceCode.Component, relativePath)
        // aysnc函数返回一个promise对象
        return CreateFiles(file, targetPath, replaceCode);
      })).then(() => {
        console.log("模块创建成功");
        resolve();
      })
    })
    .catch(e => console.error(e));
}
)
module.exports = { CreateFromTemplate, CreateFiles };
