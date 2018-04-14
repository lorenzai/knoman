<template lang="html">
  <div>
    <div v-for="research in researches">
      {{ research }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import constants from '../ext/constants'
axios.defaults.baseURL = constants.REST_API_BASE

export default {
  props: ['token'],
  data () {
    return {
      skip: 0,
      limit: 20,
      researches: []
    }
  },
  mounted () {
    this.getResearches()
  },
  methods: {
    getResearches () {
      axios.get('/nodes/researches', {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'authorization': 'JWT ' + this.token
        },
        params: {
          skip: this.skip,
          limit: this.limit
        }
      }).then(result => {
        this.skip += this.limit
        this.researches.push(...result.data)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>