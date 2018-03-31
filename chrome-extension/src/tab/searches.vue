<template lang="html">
  <div>
    <!-- <b-aside :is-show="isShowAside" :title="item.content" :show-footer="false" placement="right" :backdrop="false" @close="isShowAside=false" :width="600"> -->
    <!-- </b-aside> -->
    <div class="columns">
      <div class="column is-5">
        <InfinitList :pToken='token' category='searches' :limit='40' contentName='query' @show='showDetail'></InfinitList>
      </div>
      <div class="column websites">
        <a v-for="(item, key) in websites">
          <div class="website">
            <h2>{{ item.url }}</h2>
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
import InfinitList from './component/infinitList'
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
    InfinitList
  }
}
</script>

<style lang="css" scoped>
.column.websites {
    border: solid 1px #707070;
}
.website {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: solid 1px #707070;
}
</style>