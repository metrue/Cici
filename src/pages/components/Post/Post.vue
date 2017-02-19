<template>
  <section class="post-view">
    <h1 class="post-title">
      {{ title }}
      <time pubdate="pubdate" :datetime="publishDate | formatDate" :title="publishDate | formatDate" class="post-date">{{ publishDate | timeago }}</time>
    </h1>
    <article v-html="htmlFromMarkdown"></article>
  </section>
</template>

<style lang="stylus" src="./Post.styl"></style>

<script>
  import Vue from 'vue'
  import marked from '../../utils/render.js'
  import { parseName } from '../../utils'

  export default {
    name: 'postView',
    props: ['filename', 'markdownContent'],

    data () {
      const { title, publishDate } = parseName(this.filename)

      return {
        title: title,
        pubdate: publishDate,
        markdownContent: this.markdownContent,
      }
    },

    computed: {
      htmlFromMarkdown () {
        return marked(this.markdownContent)
      }
    },
  }
</script>
