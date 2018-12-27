const path = require('path');

module.exports = {
  webpack: {
    resolve: {    
      alias: {
        Loading: path.resolve(__dirname, './src/Loading.js'),
      },
    },
    devServer: {
      open: true,
      port: 3030,
    },
  },
  // envs: {
  //   API: 'http://localhost',
  //   TEST: 'ss',
  // },  
};
