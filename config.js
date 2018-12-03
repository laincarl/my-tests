const path = require('path');

module.exports = {
  resolve: {    
    alias: {
      Loading: path.resolve(__dirname, './src/Loading.js'),
    },
  },
  devServer: {
    open: true,
    port: 3030,
  },
};
