module.exports = {
  chainWebpack: config => {
    config.module
      .rule("pug")
      .test(/\.pug$/)
      .use("pug-plain-loader");
  },
  devServer: {
    proxy: `http://localhost:${process.env.PORT || 3000}`
  }
};
