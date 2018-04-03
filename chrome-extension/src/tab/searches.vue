<template lang="html">
  <div>
    <!-- <b-aside :is-show="isShowAside" :title="search.content" :show-footer="false" placement="right" :backdrop="false" @close="isShowAside=false" :width="600"> -->
    <!-- </b-aside> -->
    <!-- <modal :title="website.url" :width="900" :is-show="isShow" transition="fadeDown" :show-footer="false" @close="isShow=false">
        <iframe id="iframe" :src="website.url" width="860" height="400" scrolling="yes" frameborder="0"></iframe>
    </modal> -->
    <b-aside :is-show="isShow" :title="website.url" :show-footer="false" placement="right" :backdrop="true" @close="isShow=false" :width="900">
      <h2>
        <a target="_blank" :href="website.url">View the website in a new tab: {{ website.url }}</a>
      </h2>
      <iframe id="iframe" :src="website.url" width="860" height="400" scrolling="yes" frameborder="0"></iframe>
    </b-aside>
    <div class="columns">
      <div class="column is-5 searches">
        <SearchList :pToken='token' category='searches' :limit='40' contentName='query' @show='showWebsites'></SearchList>
      </div>
      <div class="column websites">
        <div v-for="(item, key) in websites">
          <div class="website">
            <h2>
            <a @click="showWebsite(item)">
              {{ item.url | truncate }}
            </a>
            </h2>
            <small>
              <span>Created at {{ item.created | format }} </span> |
              <span> Last visited at {{ item.lastVisited || item.created | format }}</span> |
              <span> Visited {{ item.visited }} times</span>
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchList from './component/infinitList'
import { truncate as truncateString, formatTime } from '../ext/utils'
import axios from 'axios'
import constants from '../ext/constants'
axios.defaults.baseURL = constants.REST_API_BASE

export default {
  props: ['token'],
  data () {
    return {
      // search: { query: '' },
      websites: [],
      website: '',
      isShow: false,
      isShowAside: false
    }
  },
  filters: {
    capitalize (v) {
      return v.charAt(0).toUpperCase() + v.slice(1)
    },
    truncate (s) {
      return truncateString.apply(s, [80, false])
    },
    format (epoch) {
      return formatTime(epoch / 1000.0, 'DD MMM YYYY HH:mm')
    }
  },
  methods: {
    showWebsite (website) {
      this.isShow = !this.isShow
      this.website = website
    //   alert(JSON.stringify(website))
    //   this.$modal.open({
    //     content: '不显示header',
    //     showHeader: false
    //   })
    },
    showWebsites (search) {
      console.log('Search: ' + JSON.stringify(search))
      // this.search = search
      this.isShowAside = !this.isShowAside
      axios.get('/nodes/searches/websites', {
        headers: {
          'content-type': 'application/json',
          'authorization': 'JWT ' + this.token
        },
        params: {
          query: search.query
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
.column.searches {
    padding: 0px;
    margin-right: 0px;
}
.column.websites {
    /* border: solid 1px #707070; */
    border: solid 1px green;
    background-color: white;
}
.website {
    padding-bottom: 10px;
    margin-bottom: 10px;
    /* border-bottom: solid 1px #707070; */
    border-bottom: solid 1px green;
}
iframe {
    border: solid 1px #707070;
}
</style>