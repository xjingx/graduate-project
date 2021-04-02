const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const isLib = process.env.TYPE === 'lib';

module.exports = {
  chainWebpack(config) {
    if (!isLib) {
      config.plugin('monaco').use(new MonacoWebpackPlugin()); //避免monaco报警告
    }
    config.plugin('circular').use(new CircularDependencyPlugin()); //检查是否有循环引用
  }
};
