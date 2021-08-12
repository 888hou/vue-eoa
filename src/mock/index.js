// 首先引入Mock
const Mock = require('mockjs');

// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600'
  // timeout: '10000'
});



let configArray = [];

// 使用webpack的require.context()遍历所有mock文件
const files = require.context('.', true, /\.js$/);

files.keys().forEach((key) => {
  if (key === './index.js') return;
  configArray = configArray.concat(files(key));
});
