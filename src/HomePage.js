import Vue from 'vue'
import List from './components/List'

export default function(list) {
  return new Vue({
    render: h => {
      return (
        <List list={ list } />
      )
    }
  })
}
