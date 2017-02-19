import fs from 'fs-extra'
import path from 'path'
import ejs from 'ejs'
import mkdirp from 'mkdirp'
import { createRenderer } from 'vue-server-renderer'

import CONFIG from '../../config'
import PostPage from '../pages/js/PostPage.build.js'
import HomePage from '../pages/js/HomePage.build.js'
import { parseName } from '../utils'

import HOME_TEMPLATE from './home.tpl'
import PAGE_TEMPLATE from './page.tpl'

const DEFAULT_INPUT_DIR = './posts'
const DEFAULT_OUTPUT_DIR = './public'

const BUILD_DONE = 'BUILD_DONE'

const ABS_PATH_REGEX = /^\//
const PWD = process.cwd()

export default class Builder {
  constructor(config = {}) {
    this.inputDir = config.inputDir || DEFAULT_INPUT_DIR
    this.outputDir = config.outputDir || DEFAULT_OUTPUT_DIR
  }

  prebuild() {
    mkdirp.sync(path.join(this.outputDir, 'css'))
    mkdirp.sync(path.join(this.outputDir, '_posts'))
    fs.copySync(path.join(__dirname, '../pages/css'), path.join(this.outputDir, 'css'))
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

    const { title } = parseName(filename)
    const html = await this.transform(PostPage, [filename, markdownContent])
    const rets = ejs.render(PAGE_TEMPLATE, { ...CONFIG, pageBody: html, title })

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
    this.prebuild()
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
