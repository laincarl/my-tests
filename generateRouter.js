const fs = require('fs');
const Router = require('./config'); //router配置信息
const { URL } = require('url');
const path = require('path');
const basicPath = path.resolve(__dirname,'./src/test-cases');
const dirPath = path.resolve(__dirname, './template/Component.js');


//总的index
// export { default as TableNest } from './table-nest';

//单文件夹的index
// import TableNest from './TableNest';
// export default TableNest;

// Router.forEach(router => {
//     fs.readFile(dirPath, 'utf8', (err, data) => {
//         if (err) {
//             console.log(err);
//         } else {
//             data = data.replace(/componentName/g, (match) => {
//                 console.log('替换', match, '为', router.menu);
//                 return router.menu;
//             });
//             // console.log(data);
//             fs.mkdir(path.resolve(basicPath, `./${router.menu}`), () => {
//                 fs.writeFile(path.resolve(basicPath, `./${router.menu}/${router.menu}.js`), data, (err) => {
//                     if (err) {
//                         console.log(err);
//                     }
//                 });
//             })
//         }
//     });
// });
fs.access('/etc/passwd', fs.constants.R_OK | fs.constants.W_OK, (err) => {
    console.log(err,err ? 'no access!' : 'can read/write');
});



console.log(Router);