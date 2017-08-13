const Vue = require('vue')
const fs = require('fs')
const path = require('path')
const parseName = require('./utils').parseName
const marked = require('./utils/render').default

function componentFactery(srcFile) {
  const markdown = fs.readFileSync(srcFile, 'utf8')
  return Vue.component('Post', {
    template: `
      <section class="post-view">
        <h1 class="post-title">
          {{ title }}
        </h1>
        <article v-html="htmlFromMarkdown"></article>
      </section>
    `,

    data: () => {
      const { title, publishDate } = parseName(srcFile)
      return {
        title,
        publishDate,
        markdown,
      }
    },
    computed: {
      htmlFromMarkdown() {
        return marked(this.markdown)
      },
    },
  })
}

function createInstance(src) {
  return componentFactery(src)
}

function createPath(p) {
  const rp = p.replace(/^\//, '').replace(/\.html$/, '.md')
  return path.join('.', 'posts', rp)
}

module.exports = (p) => {
  const srcFile = createPath(p)
  return createInstance(srcFile)
}
