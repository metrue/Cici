import Vue from 'vue'
import List from './components/List'

export default function(title, list) {
  return new Vue({
    render: h => {
      return (
        <List list={ list } title={ title }/>
      )
    }
  })
}
