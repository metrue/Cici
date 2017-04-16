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
  if (matches.length === 3) {
    return {
      publishDate: matches[1],
      title: matches[2],
    }
  }
  throw new Error(`invalid file name: ${filename}`)
}
