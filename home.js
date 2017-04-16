const Vue = require('vue')
const parseName = require('./src/utils').parseName

// TODO key is not set
function componentFactory(title, list) {
  return Vue.component('Home', {
    template: `
      <section class="list-view">
        <header class="header">
          <a href="/">{{ title }}</router-link>
          <div style="clear: both">
          </div>
        </header>
        <div v-if="!lists">loading..</div>
        <ol v-if="lists" class="list">
          <li v-for="{ title, publishDate } in lists" :key="" class="list-item">
            <a v-bind:href="'./' + publishDate + '-' + title + '.html'" class="item-title">
              {{ title }}
            </a>
            <br>
            <time pubdate="pubdate" :datetime="publishDate | formatDate" :title="publishDate | formatDate" class="item-date">{{ publishDate | timeago }}</time>
          </li>
        </ol>
      </section>
    `,
    data: () => {
      const newList = list.map((p) => parseName(p))
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
