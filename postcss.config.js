module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      //1rem的大小是   360
      rootValue: 36,
      // * 表示范围为所有
      propList: ['*']
    }
  }
}
