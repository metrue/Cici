const fs = require('fs')
const path = require('path')
const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()
const marked = require('./src/utils/render').default
const parseName = require('./src/utils').parseName

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
    const result = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,user-scalable=no">
  <meta name="renderer" content="webkit">
  <meta name="theme-color" content="#ffffff">
  <link href="/css/build.HomePage.css" rel="stylesheet">
  <link href="/css/build.PostPage.css" rel="stylesheet">
  <title> <%= title %></title>
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', '<%= ga %>', 'auto');
    ga('send', 'pageview');
  </script>
</head>
<body>
  ${html}
  <div id="YoYo"></div>
  <script src="https://yoyo.minghe.me/dist/Yo/index.js"></script>
  <footer class="footer">
    Copyright ©<%= copyRightYear %> <a href="http://<%= %>"> <%= domain %></a> | Powered by <a href="https://github.com/metrue/Cici">Cici</a> on top of <a href="https://vuejs.org" target="_blank">Vue.js</a>
  </footer>
<body>
</html>
    `
    cb(err, result)
  })
}
