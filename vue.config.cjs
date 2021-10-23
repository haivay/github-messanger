module.exports = {
  devServer: {
    proxy: {
      '/auth/callback': {
        target: 'http://localhost:3000'
      }
    }
  }
}