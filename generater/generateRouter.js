const fs = require('fs');
const path = require('path');
const { CreateFiles } = require('./CreateFromTemplate');

const basicPath = path.resolve(__dirname, '../src/test-cases');
const dirPath = path.resolve(__dirname, '../generate');
function generateRouter() {
  fs.readdir(basicPath, (err, files) => {
    // 路由路径
    files = files.filter(file => ['index.js', 'Home', 'NotFoundPage'].indexOf(file) === -1);
    const routers = []; 
    // const imports = []; 
    const async_imports = []; 
    const menus = []; 
    const exportModules = [];
    Promise.all(files.map((file) => {
      const indexPath = path.resolve(basicPath, file, './index.js');
      // 找出所有模块引用
      return new Promise(resolve => fs.readFile(indexPath, 'utf8', (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const reg = /export default([^]*?);/g;
          const arr = [];
          while (result = reg.exec(data)) {
            arr.push(result[1]);
            const oneItem = result[1].trim();
            async_imports.push(
              `const ${oneItem} = asyncComponent(() => import("./test-cases/${file}"));`,
            );
            routers.push(
              `<Route path="/${oneItem}" component={${oneItem}} />`,
            );
            menus.push(
              `<Menu.Item key="/${oneItem}">${oneItem}</Menu.Item>`,
            );
          }
          // console.log(arr.join(','));
          if (arr.length > 1) {
            exportModules.push(
              `export { ${arr.join(',')} } from './${file}';`,
            );
          } else if (arr.length > 0) {
            exportModules.push(
              `export { default as ${arr[0].trim()} } from './${file}';`,
            );
          }
          resolve(arr.length > 0 ? arr.join(',') : '');
        }
      }));
    })).then((data) => {
      const imports = data.filter(one => one !== '');
      CreateFiles(path.resolve(dirPath, './Router.js'), path.resolve(basicPath, '../Router.js'), { imports, routers: routers.join('\n') });
      CreateFiles(path.resolve(dirPath, './MenuTest.js'), path.resolve(basicPath, '../MenuTest.js'), { menus: menus.join('\n') });
      CreateFiles(path.resolve(dirPath, './index.js'), path.resolve(basicPath, './index.js'), { exportModules: exportModules.join('\n') });
    });
  });
}

module.exports = generateRouter;
