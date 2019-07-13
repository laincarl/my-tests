const path = require('path');

module.exports = {
  webpack: {
    output: {
      publicPath: './', // 以保证资源路径正确。
    },  
    resolve: {    
      alias: {
        Loading: path.resolve(__dirname, './src/Loading.js'),
      },
    },
    devServer: {
      open: true,
      port: 3000,
    },
  },
  // envs: {
  //   API: 'http://localhost',
  //   TEST: 'ss',
  // },  
};
