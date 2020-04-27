module.exports = {
  // options...
  // setting up a proxy on the dev server to make requests to the backend and stop cors errors
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/api": "/api" },
        logLevel: "debug"
      }
    }
  },

}