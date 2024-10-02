const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
  ? '/https://github.com/mostafamahmoud055/restaurante-vue.git/' // Replace with your repository name
  : '/public'
});
