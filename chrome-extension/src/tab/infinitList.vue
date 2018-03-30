<template lang="html">
  <div>
    <div class="list-item" v-for="(item, key) in items">
        <span class="num" v-text="key + 1"></span>
        <!-- <p>
        <a target="_blank" :href="item.url" v-text="item.title"></a>
        </p> -->
        <span>{{ item }}</span>
    </div>
    <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading" spinner="bubbles" :distance="0">
        <span slot="no-more">
        There is no more {{ category }} :)
        </span>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios'
import constants from '../ext/constants'
axios.defaults.baseURL = constants.REST_API_BASE + '/nodes'

export default {
  props: [
    'pToken',
    'category',
    'limit'
  ],
  data () {
    return {
      items: []
    }
  },
  methods: {
    infiniteHandler ($state) {
      axios.get('/' + this.category, {
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
          // this.items.push(...data)
          this.items = this.items.concat(data)
          $state.loaded()
          this.$emit('loading', this.items.length)
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
</style>
