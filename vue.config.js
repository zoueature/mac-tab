const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require("path");
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

// 复制文件到指定目录
const copyFiles = [
  {
    from: path.resolve("src/plugins/manifest.json"),
    to: `${path.resolve("dist")}/manifest.json`
  },
  {
    from: path.resolve("src/assets/images/favicon.ico"),
    to: `${path.resolve("dist")}/favicon.ico`
  },
  {
    from: path.resolve("src/assets"),
    to: path.resolve("dist/assets")
  },
  {
    from: path.resolve("src/plugins/inject.js"),
    to: path.resolve("dist/js")
  },
  {
    from: path.resolve("src/_locales"),
    to: path.resolve("dist/_locales")
  }
];

// 复制插件
const plugins = [
  new CopyWebpackPlugin({
    patterns: copyFiles
  }),
  AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),
];

// 页面文件
const pages = {};
// 配置 popup.html 页面
const chromeName = ["popup"];

chromeName.forEach(name => {
  pages[name] = {
    entry: `src/${name}/main.js`,
    template: `src/${name}/index.html`,
    filename: `${name}.html`
  };
});

module.exports = {
  pages,
  productionSourceMap: false,
  // 配置 content.js background.js
  configureWebpack: {
    entry: {
      content: "./src/content/main.js",
      background: "./src/background/main.js"
    },
    output: {
      filename: "js/[name].js"
    },
    plugins,
    devtool: 'inline-source-map'
  },
  // 配置 content.css
  css: {
    extract: {
      filename: "css/[name].css"
    }
  },
  chainWebpack: config => {
    config.plugin('html').use(HtmlWebpackPlugin)
        .tap(args => {
          args.title= ''
          return args
        })
    config.output.filename('js/[name].js').end()
    config.output.chunkFilename('js/[name].js').end()
  }
}