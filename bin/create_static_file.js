import fs from 'fs-extra'
import ejs from 'ejs'
import { createRenderer } from 'vue-server-renderer'
import PostPage from '../lib/js/PostPage.build.js'
import HomePage from '../lib/js/HomePage.build.js'
import CONFIG from '../config/build.json'

async function listPosts(postsPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(postsPath, (err, files) => {
      if (err) {
        reject(err)
      }
      resolve(files)
    })
  })
}

async function readMarkdown(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data.toString())
    })
  })
}

async function renderListToHtml(list) {
  return new Promise((resolve, reject) => {
    createRenderer().renderToString(
      HomePage(list),
      (error, html) => {
        if (error) {
          reject(error)
        } else {
          fs.readFile('./templates/page.ejs', (err, data) => {
            if (err) {
              console.warn(err)
            } else {
              const tplString = data.toString()
              const ret = ejs.render(tplString, { ...CONFIG, pageBody: html })

              fs.writeFile(`${CONFIG.outputDir}/index.html`, ret, (err) => {
                if (err) {
                  reject(err)
                } else {
                  console.log('done')
                  resolve('done render list index')
                }
              })
            }
          })
        }
      }
    )
  })
}

async function renderPostMarkdownToHtml(filename, markdownContent) {
  return new Promise((resolve, reject) => {
    createRenderer().renderToString(
      PostPage(filename, markdownContent),
      (error, html) => {
        if (error) {
          reject(error)
        } else {
          fs.readFile('./templates/page.ejs', (err, data) => {
            if (err) {
              console.warn(err)
            } else {
              const tplString = data.toString()
              const ret = ejs.render(tplString, { ...CONFIG, pageBody: html })

              fs.writeFile(`${CONFIG.outputDir}/_posts/${filename.replace(/\.md$/, '')}.html`, ret, (err) => {
                if (err) {
                  reject(err)
                } else {
                  console.log('done')
                  resolve('done')
                }
              })
            }
          })
        }
      }
    )
  })
}

async function publish(postsPath) {
  const posts = await listPosts(postsPath)
  await renderListToHtml(posts)
  for (const p of posts) {
    const realPath = `${postsPath}/${p}`
    const body = await readMarkdown(realPath)
    await renderPostMarkdownToHtml(p, body)
  }
}

async function main() {
  try {
    [CONFIG.outputDir, `${CONFIG.outputDir}/js`, `${CONFIG.outputDir}/_posts`, `${CONFIG.outputDir}/css`].forEach((d) => {
      fs.ensureDirSync(d)
    })
    fs.copySync('./lib/css', `${CONFIG.outputDir}/css`)
    fs.copySync('./lib/js/ga.build.js', `${CONFIG.outputDir}/js/ga.build.js`)

    await publish(CONFIG.postsDir)
    console.log('done')
  } catch (e) {
    console.log(e)
    process.exit(0)
  }
}

main()
