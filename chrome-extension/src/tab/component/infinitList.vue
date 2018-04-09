<template lang="html">
  <div class="infinit-wrapper">
  <!-- <div class="infinit-inner" v-el:scroll-container> -->
  <div class="infinit-inner">
    <!-- <div class="columns is-multiline is-gapless">
      <collapse accordion>
      <div class="column list-item" v-for="(item, key) in items" :class="{ active: isActive[key] }">
        <collapse-item :title="item.content">
          <div @click="show(item, key)">
            <div>Created at {{ item.created | format }} </div>
            <div>Last visited at {{ item.lastVisited || item.created | format }} </div>
            <div>Visited {{ item.visited }} times</div>
          </div>
        </collapse-item>
      </div>
      </collapse>
    </div> -->
    <collapse accordion>
      <div v-for="(item, key) in items">
        <collapse-item :title="(item.title || item.content) | truncate" :class="{ active: isActive[key] }">
          <div>
            <span>Created at {{ item.created | format }}</span> |
            <span>Last visited at {{ item.lastVisited || item.created | format }} </span> | 
            <span>Visited {{ item.visited }} times</span>
          </div>
          <div class="button" @click="deleteItem(item, key)">Delete</div>
          <div class="button" @click="show(item, key)">Show websites</div>
        </collapse-item>
      </div>
    </collapse>
    <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading" spinner="bubbles" :distance="0">
        <span slot="no-more">
        There is no more {{ category }} :)
        </span>
    </infinite-loading>
  </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { truncate as truncateString, formatTime } from '../../ext/utils'
import axios from 'axios'
import constants from '../../ext/constants'
axios.defaults.baseURL = constants.REST_API_BASE

export default {
  props: [
    'pToken',
    'category',
    'limit',
    'contentName'
  ],
  data () {
    return {
      isActive: [],
      items: []
    }
  },
  ready () {
    // Disable double scroll for outer element
    this.$els.scrollContainer.addEventListener('mousewheel', (ev) => {
      const elm = ev.currentTarget
      const scrollTop = elm.scrollTop
      const scrollHeight = elm.scrollHeight
      const height = elm.clientHeight
      const event = ev.originalEvent || ev
      const delta = (event.wheelDelta) ? event.wheelDelta : -(event.detail || 0)
      if ((delta > 0 && scrollTop <= delta) ||
          (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
        elm.scrollTop = delta > 0 ? 0 : scrollHeight
        event.preventDefault()
      }
    })
  },
  filters: {
    format (epoch) {
      return formatTime(epoch / 1000.0, 'DD MMM YYYY HH:mm')
    },
    truncate (s) {
      return truncateString.apply(s, [60, false])
    }
  },
  methods: {
    show (item, key) {
      this.$emit('show', item)
      let isActive = []
      for (let i = 0; i < this.isActive.length; i++) {
        isActive.push(false)
      }
      isActive[key] = true
      this.isActive = isActive
    },
    deleteItem (item, key) {
      this.$emit('deleteItem', item)
      this.isActive[key] = false
      // TODO: how to refresh the items?
      this.items = []
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      })
    },
    infiniteHandler ($state) {
      axios.get('/nodes/' + this.category, {
        headers: {
          'content-type': 'application/json',
          'authorization': 'JWT ' + this.pToken
        },
        params: {
          skip: this.items.length,
          limit: this.limit
        }
      }).then(({ data }) => {
        if (data.length) {
          let items = []
          let isActive = []
          data.forEach(element => {
            items.push({
              content: element[this.contentName],
              category: this.category,
              ...element
            })
            isActive.push(false)
          })
          this.items = this.items.concat(items)
          this.isActive = this.isActive.concat(isActive)
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    }
  },
  components: {
    InfiniteLoading
  }
}
</script>

<style lang="css" scoped>
/* .list-item {
  padding-left: 0px;
} */
.column {
  display: flex;
}
/* collapse {
  padding-left: 0px;
} */
.active {
  color: white;
  /* background-color: rgba(0, 193, 200, 0.6); */
  background-color: #1DE9B6;
}
.infinit-wrapper {
  /* width: 301px; */
  /* height: 700px; */
  height: calc(100vh - 60px);
  box-sizing: border-box;
}
.infinit-inner {
  /* width: 261px; */
  /* height: 680px; */
  height: calc(100vh - 62px);
  overflow: auto;
  /* overscroll-behavior: contain; */
}
</style>
