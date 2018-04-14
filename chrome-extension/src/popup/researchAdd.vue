<template>
  <div class="research">
    <v-select
      label="Research"
      autocomplete
      :loading="loading"
      cache-items
      :items="researches"
      :search-input.sync="search"
      v-model="research"
    ></v-select>
  </div>  
</template>

<script>
export default {
  name: 'Research',
  data () {
    return {
      loading: false,
      search: null,
      research: null,
      lists: [
        'research 1',
        'research 2',
        'research 3'
      ],
      researches: []
    }
  },
  watch: {
    search (val) {
      val && this.querySelections(val)
    }
  },
  methods: {
    querySelections (v) {
      this.loading = true
      setTimeout(() => {
        this.researches = this.lists
        this.loading = false
      }, 500)
    },
    getResearches (searchTerm) {
      // this.countries = new Promise(resolve => {
      //   window.setTimeout(() => {
      //     if (!searchTerm) {
      //       resolve(this.countryList)
      //     } else {
      //       const term = searchTerm.toLowerCase()

      //       resolve(this.countryList.filter(({ name }) => name.toLowerCase().includes(term)))
      //     }
      //   }, 500)
      // })
    }
  },
  components: {
  }
}
</script>


<style lang="css" scoped>
.research {
  padding-top: 10px;
  /* min-height: 350px; */
  /* overflow-x: hidden; */
}
</style>
