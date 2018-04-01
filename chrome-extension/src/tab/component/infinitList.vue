<template lang="html">
  <div>
    <div class="columns is-multiline is-gapless">
      <collapse accordion>
      <div class="column list-item" v-for="(item, key) in items" :class="{ active: isActive[key] }">
        <collapse-item :title="item.content">
          <div @click="show(item, key)">
            <div>Created at {{ item.created }} </div>
            <div>Visited {{ item.visited }} times</div>
          </div>
        </collapse-item>
      </div>
      </collapse>
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
          this.isActive = isActive
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
.list-item {
    padding-left: 0px;
}
.column {
  display: flex;
}
.active {
  background-color: forestgreen
}
</style>
