const fs = require('fs')
const path = require('path')
const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()
const ejs = require('ejs')
const marked = require('./src/utils/render').default
const parseName = require('./src/utils').parseName
const template = require('./template')
const config = require('./config')

const css = require('./src/pages/components/Post/Post.styl')

function componentFactery(srcFile) {
  const markdown = fs.readFileSync(srcFile, 'utf8')
  return Vue.component('Post', {
    template: `
      <section class="post-view">
        <h1 class="post-title">
          {{ title }}
          <time pubdate="pubdate" :datetime="publishDate | formatDate" :title="publishDate | formatDate" class="post-date">{{ publishDate | timeago }}</time>
        </h1>
        <article v-html="htmlFromMarkdown"></article>
      </section>
    `,

    data: () => {
      const { title, publishDate } = parseName(srcFile)
      return {
        title,
        publishDate,
        markdown
      }
    },
    computed: {
      htmlFromMarkdown() {
        return marked(this.markdown)
      }
    }
  })
}

function createInstance(src) {
  const Component = componentFactery(src)
  return new Component()
}

function createPath(p) {
  const rp = p.replace(/^\//, '').replace(/\.html$/, '.md')
  return path.join('.', 'posts', rp)
}

module.exports = function render(locals, cb) {
  const srcFile = createPath(locals.path)
  renderer.renderToString(createInstance(srcFile), (err, html) => {
    const result = template.PAGE({ ...config, content: html, css })
    cb(err, result)
  })
}
