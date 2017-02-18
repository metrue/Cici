import fs from 'fs'
import path from 'path'
import { createRenderer } from 'vue-server-renderer'
import CONFIG from '../config/build.json'

import ejs from 'ejs'
import PostPage from '../lib/js/PostPage.build.js'
import HomePage from '../lib/js/HomePage.build.js'

const TEMPLATE_FILE = path.join(__dirname, 'template.ejs')

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

  loadTemplate() {
    return new Promise((resolve, reject) => {
      fs.readFile(TEMPLATE_FILE, 'utf8', (err, data) => {
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
    const tpl = await this.loadTemplate()
    const filename = path.basename(inputFile)
    const markdownContent = await this.getContent(inputFile)

    const html = await this.transform(PostPage, [filename, markdownContent])
    const rets = ejs.render(tpl, { ...CONFIG, pageBody: html })

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
    const tpl = await this.loadTemplate()
    const html = await this.transform(HomePage, [titles])
    const rets = ejs.render(tpl, { ...CONFIG, pageBody: html })
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
