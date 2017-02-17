import Vue from 'vue'
import Post from './components/Post'

export default function(filename, markdownContent) {
  return new Vue({
    render: h => {
      return (
        <Post filename={ filename } markdownContent={ markdownContent } />
      )
    }
  })
}
