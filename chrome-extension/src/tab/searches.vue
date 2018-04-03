<template lang="html">
  <div id="search-page">
    <!-- <b-aside :is-show="isShowAside" :title="search.content" :show-footer="false" placement="right" :backdrop="false" @close="isShowAside=false" :width="600"> -->
    <!-- </b-aside> -->
    <!-- <modal :title="website.url" :width="900" :is-show="isShow" transition="fadeDown" :show-footer="false" @close="isShow=false">
        <iframe id="iframe" :src="website.url" width="860" height="400" scrolling="yes" frameborder="0"></iframe>
    </modal> -->
    <b-aside :is-show="isShow" :title="website.url" :show-footer="false" placement="right" :backdrop="true" @close="isShow=false" :width="asideWidth">
      <h2>
        <a target="_blank" :href="website.url">View the website in a new tab: {{ website.url }}</a>
      </h2>
      <iframe id="iframe" :src="website.url" :width="iframeWidth" height="400" scrolling="yes" frameborder="0"></iframe>
    </b-aside>
    <!-- <div class="columns">
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
    </div> -->
    <div id="left" class="searches">
      <SearchList :pToken='token' category='searches' :limit='40' contentName='query' @show='showWebsites' @deleteItem='deleteSearch'></SearchList>
    </div>
    <div id="right" class="websites">
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
</template>

<script>
import SearchList from './component/infinitList'
import { truncate as truncateString, formatTime } from '../ext/utils'
import axios from 'axios'
import Split from 'split.js'
import constants from '../ext/constants'

axios.defaults.baseURL = constants.REST_API_BASE

export default {
  props: ['token'],
  data () {
    return {
      websites: [],
      website: '',
      asideWidth: 0,
      iframeWidth: 0,
      isShow: false,
      isShowAside: false
    }
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getAsideWidth)
      // Init
      this.getAsideWidth()
    }.bind(this))
    let sizes = localStorage.getItem('split-sizes')
    if (sizes) {
      sizes = JSON.parse(sizes)
    } else {
      sizes = [25, 75] // default sizes
    }
    let split = Split(['#left', '#right'], {
      sizes: sizes,
      onDragEnd: function () {
        localStorage.setItem('split-sizes', JSON.stringify(split.getSizes()))
      },
      elementStyle: function (dimension, size, gutterSize) {
        return {
          'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)',
          'width': 'calc(50% - 20px)'
        }
      },
      gutterStyle: function (dimension, gutterSize) {
        return {
          'flex-basis': gutterSize + 'px',
          'width': '40px'
        }
      }
    })
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
    },
    getAsideWidth (event) {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      this.asideWidth = 0.75 * windowWidth
      this.iframeWidth = 0.75 * windowWidth - 40
    },
    deleteSearch (search) {
      axios.delete('/node/search', {
        headers: {
          'content-type': 'application/json',
          'authorization': 'JWT ' + this.token
        },
        params: {
          query: search.query
        }
      }).then(({ data }) => {
        console.log(data)
      })
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getAsideWidth)
  },
  components: {
    SearchList
  }
}
</script>

<style lang="css" scoped>
.searches {
    border: solid 1px green;
    background-color: white;
    /* padding: 0px; */
    /* margin-right: 0px; */
    /* height: 700px; */
    height: calc(100vh - 60px);
}
.websites {
    /* border: solid 1px #707070; */
    border: solid 1px green;
    background-color: white;
    /* height: 700px; */
    height: calc(100vh - 60px);
    overflow: auto;
}
.website {
    padding: 10px;
    margin-bottom: 10px;
    /* border-bottom: solid 1px #707070; */
    border-bottom: solid 1px green;
}
iframe {
    border: solid 1px #707070;
}
#search-page {
    display: flex;
    flex-direction: row;
}

.gutter {
    background-color: green;
    background-repeat: no-repeat;
    background-position: 50%;
    height: 300px;
}
.gutter.gutter-horizontal {
    /* background-image: url('grips/vertical.png'); */
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
    cursor: ew-resize;
    height: 300px;
}
.split {
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
</style>