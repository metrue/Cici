import path from 'path'
const Vue = require('vue')
const parseName = require('./utils').parseName

// TODO key is not set
function componentFactory(title, list) {
  return Vue.component('Home', {
    template: `
      <section class="list-view">
        <header class="header">
          <div style="clear: both">
            <a class="site-title" href="/about.html">{{ title }}</a>
          </div>
        </header>
        <div v-if="!lists">loading..</div>
        <ol v-if="lists" class="list">
          <li v-for="{ title, publishDate } in lists" :key="" class="list-item">
            <a v-bind:href="'./' + publishDate + '-' + title + '.html'" class="item-title">
              {{ title }}
            </a>
            <span class="item-date"> {{ publishDate }}</span>
          </li>
        </ol>
      </section>
    `,
    data: () => {
      const newList = list
            .filter((p) => {
              return !/about/.test(p)
            })
            .map((p) => {
              const filepath = path.join('public', p)
              return parseName(filepath)
            })
      const sortedList = newList.sort((a, b) => {
        if (a.publishDate < b.publishDate) {
          return 1
        }

        if (a.publishDate > b.publishDate) {
          return -1
        }

        return 0
      })
      return {
        lists: sortedList,
        title,
      }
    },
  })
}

module.exports = componentFactory
