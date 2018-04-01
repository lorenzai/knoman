<template lang="html">
  <div>
    <!-- <b-aside :is-show="isShowAside" :title="item.content" :show-footer="false" placement="right" :backdrop="false" @close="isShowAside=false" :width="600"> -->
    <!-- </b-aside> -->
    <div class="columns">
      <div class="column is-5">
        <SearchList :pToken='token' category='searches' :limit='40' contentName='query' @show='showDetail'></SearchList>
      </div>
      <div class="column websites">
        <a v-for="(item, key) in websites">
          <div class="website">
            <h2>{{ item.url | truncate }}</h2>
            <small>
              <span>Created at {{ item.created }} </span>
              <span> Last visited at {{ item.lastVisited || item.created }}</span>
              <span> Visited {{ item.visited }} times</span>
            </small>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import SearchList from './component/infinitList'
import truncateString from '../ext/utils'
import axios from 'axios'
import constants from '../ext/constants'
axios.defaults.baseURL = constants.REST_API_BASE

export default {
  props: ['token'],
  data () {
    return {
      item: { content: '' },
      websites: [],
      isShowAside: false
    }
  },
  filters: {
    capitalize (v) {
      return v.charAt(0).toUpperCase() + v.slice(1)
    },
    truncate (s) {
      return truncateString.apply(s, [80, false])
    }
  },
  methods: {
    showDetail (item) {
      console.log('Search: ' + JSON.stringify(item))
      this.item = item
      this.isShowAside = !this.isShowAside
      axios.get('/nodes/searches/websites', {
        headers: {
          'content-type': 'application/json',
          'authorization': 'JWT ' + this.token
        },
        params: {
          query: item.query
        }
      }).then(({ data }) => {
        this.websites = data
      })
    }
  },
  components: {
    SearchList
  }
}
</script>

<style lang="css" scoped>
.column.websites {
    border: solid 1px #707070;
    background-color: white;
}
.website {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: solid 1px #707070;
}
</style>