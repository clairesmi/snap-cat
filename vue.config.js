module.exports = {
  // options...
  // setting up a proxy on the dev server to make requests to the backend and stop cors errors
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '/api' },
        logLevel: 'debug',
      },
    },
  },
  // specifying the entry point of the app and the location of the template to be used
  pages: {
    index: {
      entry: './src/main.js',
      template: './public/index.html',
    },
  },
};
