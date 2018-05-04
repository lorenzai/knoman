<template lang="html">
  <div id="page">
    <div id="left" class="websites">
      <WebsiteList :pToken='localToken' category='websites' :limit='40' contentName='url' @show='showContents' @deleteItem='deleteWebsite'></WebsiteList>
    </div>
    <div id="right" class="contents">
      <iframe :src="website.url" id="websiteFrame" scrolling="yes" frameborder="0" style="position: relative; height: 100%; width: 100%;" sandbox="allow-scripts allow-forms allow-popups allow-same-origin"></iframe>
      <!-- <div v-for="(item, key) in websites">
        <div class="website">
          <div>
          <a @click="">
            {{ item.url | truncate }}
          </a>
          </div>
          <small>
            <span>Created at {{ item.created | format }} </span> |
            <span> Last visited at {{ item.lastVisited || item.created | format }}</span> |
            <span> Visited {{ item.visited }} times</span>
          </small>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import WebsiteList from './component/infinitList'
// import { truncate as truncateString, formatTime } from '../ext/utils'
import axios from 'axios'
import Split from 'split.js'
import constants from '../ext/constants'

axios.defaults.baseURL = constants.REST_API_BASE

export default {
  props: ['token'],
  data () {
    return {
      websites: [],
      website: {},
      iframeWidth: 0
    }
  },
  computed: {
    localToken: {
      get: function () {
        if (this.token || this.token === '') {
          return this.token
        } else {
          return localStorage.getItem('localToken')
        }
      }
    }
  },
  mounted () {
    this.iframeWidth = 800
    // save token to local storage so that browser refresh works
    if (this.token || this.token === '') {
      localStorage.setItem('localToken', this.localToken)
    }
    let sizes = localStorage.getItem('website-split-sizes')
    if (sizes) {
      sizes = JSON.parse(sizes)
    } else {
      sizes = [25, 75] // default sizes
    }
    let split = Split(['#left', '#right'], {
      sizes: sizes,
      onDragEnd: function () {
        localStorage.setItem('website-split-sizes', JSON.stringify(split.getSizes()))
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
  methods: {
    showContents (item) {
      this.website = item
    },
    deleteWebsite (item) {
    }
  },
  components: {
    WebsiteList
  }
}
</script>

<style lang="css" scoped>
#page {
    display: flex;
    flex-direction: row;
}
.websites {
    border: solid 1px green;
    background-color: white;
    height: calc(100vh - 60px);
}
.contents {
    border: solid 1px green;
    background-color: white;
    height: calc(100vh - 60px);
    overflow-y: auto;
    overflow-x: hidden;
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
