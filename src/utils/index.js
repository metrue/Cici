import path from 'path'
import fs from 'fs'

export function onlyTitle(title) {
  return title.replace(/\.md$/, '')
              .replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '')
}

export function onlyDate(title) {
  return /^\d{4}-\d{1,2}-\d{1,2}/.exec(title)[0]
}

export function parseName(filename) {
  const re = /(\d\d\d\d-\d\d-\d\d)-(.*)\.[md|html]/
  const matches = filename.match(re)
  if (matches && matches.length === 3) {
    return {
      publishDate: matches[1],
      title: matches[2],
    }
  }
  const date = fs.statSync(filename).ctime.toISOString().split('T')[0]
  return {
    publishDate: date,
    title: path.basename(filename).replace(/\.[^/.]+$/, ''),
  }
}
