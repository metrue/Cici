import fs from 'fs'
import path from 'path'
import { createRenderer } from 'vue-server-renderer'
import CONFIG from '../config/build.json'

import ejs from 'ejs'
import PostPage from '../lib/js/PostPage.build.js'
import HomePage from '../lib/js/HomePage.build.js'

import HOME_TEMPLATE from './home.tpl'
import PAGE_TEMPLATE from './page.tpl'


const DEFAULT_INPUT_DIR = './posts'
const DEFAULT_OUTPUT_DIR = './public'

const BUILD_DONE = 'BUILD_DONE'

const ABS_PATH_REGEX = /^\//
const PWD = process.cwd()

const TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,user-scalable=no">
  <meta name="renderer" content="webkit">
  <meta name="theme-color" content="#ffffff">
  <link href="/css/build.HomePage.css" rel="stylesheet">
  <link href="/css/build.PostPage.css" rel="stylesheet">
  <title> {{ title }}</title>
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
  <%- pageBody %>
  <footer class="footer">
    Copyright ©2014-2017 <a href="<%= website %>"> <%= domain %></a> | Powered by <a href="https://github.com/metrue/Seal">Seal</a> on top of <a href="https://vuejs.org" target="_blank">Vue.js</a>
  </footer>
<body>
</html>
`

export default class Builder {
  constructor(config = {}) {
    this.inputDir = config.inputDir || DEFAULT_INPUT_DIR
    this.outputDir = config.outputDir || DEFAULT_OUTPUT_DIR
  }

  discover() {
    return new Promise((resolve, reject) => {
      fs.readdir(this.inputDir, (err, files) => {
        if (err) {
          reject(err)
        } else {
          let dir = this.inputDir
          if (this.inputDir.match(ABS_PATH_REGEX) === null) {
            dir = path.join(PWD, dir)
          }
          resolve(files.map((file) => path.join(dir, file)))
        }
      })
    })
  }

  loadTemplate(tplPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(tplPath, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data.toString())
        }
      })
    })
  }

  transform(component, props) {
    return new Promise((resolve, reject) => {
      const renderer = createRenderer()
      renderer.renderToString(component.call(this, ...props), (err, html) => {
        if (err) {
          reject(err)
        } else {
          resolve(html)
        }
      })
    })
  }

  build(inputFile) {
    return new Promise((resolve, reject) => {
      fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          const source = data.toString()
          const target = this.transform(source)
          const sourceFileName = path.basename(inputFile)
          const outputFile = path.join(this.outputDir, sourceFileName)
          fs.writeFile(outputFile, target, 'utf8', (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(true)
            }
          })
        }
      })
    })
  }

  async buildPage(inputFile) {
    const filename = path.basename(inputFile)
    const markdownContent = await this.getContent(inputFile)

    const html = await this.transform(PostPage, [filename, markdownContent])
    const rets = ejs.render(PAGE_TEMPLATE, { ...CONFIG, pageBody: html })

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(this.outputDir, '_posts', filename.replace(/\.md$/, '.html')), rets, 'utf8', (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(BUILD_DONE)
        }
      })
    })
  }

  async getContent(inputFile) {
    return new Promise((resolve, reject) => {
      fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data.toString())
        }
      })
    })
  }

  async buildHome(titles) {
    const html = await this.transform(HomePage, [titles])
    const rets = ejs.render(HOME_TEMPLATE, { ...CONFIG, pageBody: html })
    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(this.outputDir, 'index.html'), rets, 'utf8', (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(BUILD_DONE)
        }
      })
    })
  }

  start() {
    this.discover()
      .then((files) => {
        const titles = files.map((f) => path.basename(f))
        this.buildHome(titles)
          .then((res) => {
            console.log(res)
          })
          .catch((e) => {
            console.warn(e)
          })

        files.forEach((file) => {
          this.buildPage(file)
            .then((res) => {
              console.log(res)
            })
            .catch((e) => {
              console.log(e)
            })
        })
      })
      .catch((err) => {
        console.warn(err)
      })
  }
}
