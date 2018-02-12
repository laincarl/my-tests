
if (process.env.NODE_ENV === 'production') {
  require('./Router.pro')
} else {
  require('./Router.dev')
}
