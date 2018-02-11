const fs = require('fs');
const path = require('path');
const basicPath = path.resolve(__dirname, './src/test-cases');
const dirPath = path.resolve(__dirname, './template');

const CreateFromTemplate = function (replaceCode, replace, originPath) {
    const targetPath=replace.toLowerCase();
    console.log(replaceCode, originPath, targetPath);
    fs.readFile(path.resolve(dirPath, `./${originPath}`), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const reg = new RegExp(`{%${replaceCode}%}`, 'g');
            data = data.replace(reg, (match) => {
                console.log('替换', match, '为', replace);
                return replace;
            });
            fs.mkdir(path.resolve(basicPath, `${targetPath}`), () => {
                fs.writeFile(path.resolve(basicPath, `${targetPath}/${replace}.js`), data, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            })
        }
    });
}
module.exports = {
    CreateFromTemplate
}