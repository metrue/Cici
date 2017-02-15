import ejs from 'ejs'
import fs from 'fs'
import CONFIG from '../config/deploy.json'

function compileNginxConf() {
  fs.readFile('./devops/nginx.conf.ejs', (err, data) => {
    if (err) {
      console.warn(err)
    } else {
      const tmpString = data.toString()
      const ret = ejs.render(tmpString, CONFIG)
      fs.writeFile('./devops/nginx.conf', ret, 'utf8', (err) => {
        if (err) {
          console.warn('write file error: ', err)
        } else {
          console.log('./devops/nginx.conf built OK')
        }
      })
    }
  })
}

function compileDeployScript() {
  fs.readFile('./devops/deploy.sh.ejs', (err, data) => {
    if (err) {
      console.warn(err)
    } else {
      const tmpString = data.toString()
      const ret = ejs.render(tmpString, CONFIG)
      fs.writeFile('./devops/deploy.sh', ret, 'utf8', (err) => {
        if (err) {
          console.warn('write file error: ', err)
        } else {
          console.log('./devops/deploy.sh built OK')
        }
      })
    }
  })
}

compileNginxConf()
compileDeployScript()
