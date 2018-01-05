const fs = require('fs')
const path = require('path')
const renderer = require('vue-server-renderer').createRenderer()
const template = require('./template')
const config = require('../config')
const home = require('./home')
const post = require('./post')
const styles = require('./styles')

const list = (() => {
  const postsDir = path.join('./posts')
  return fs.readdirSync(postsDir).map((fn) => fn.replace(/\.md/, '.html'))
})()

module.exports = function render(locals, cb) {
  if (locals.path === '/') {
    const List = home(config.siteName, list)
    renderer.renderToString(new List(), (err, html) => {
      const result = template.home({
        ...config,
        content: html,
        css: styles.home,
      })
      cb(err, result)
    })
  } else {
    const Post = post(locals.path)
    renderer.renderToString(new Post(), (err, html) => {
      const result = template.post({
        ...config,
        title: locals.path.replace(/^\//, '').replace(/\.html/, ''),
        content: html,
        css: styles.post,
      })
      cb(err, result)
    })
  }
}
