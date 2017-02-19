<section class="list-view">
  <header class="header">
    <a href="/">{{ title }}</router-link>
    <div style="clear: both">
    </div>
  </header>
  <div v-if="!lists">loading..</div>
  <ol v-if="lists" class="list">
    <li v-for="{ title, publishDate } in lists" :key="number" class="list-item">
      <a v-bind:href="'./_posts/' + publishDate + '-' + title + '.html'" class="item-title">
        {{ title }}
      </a>
      <br>
      <time pubdate="pubdate" :datetime="publishDate | formatDate" :title="publishDate | formatDate" class="item-date">{{ publishDate | timeago }}</time>
    </li>
  </ol>
</section>
