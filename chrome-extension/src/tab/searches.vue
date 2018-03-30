<template lang="html">
  <div>
    <InfinitList :pToken='token' category='searches' :limit='40'></InfinitList>
  </div>
</template>

<script>
import InfinitList from './infinitList'

export default {
  props: ['token'],
  data () {
    return {
    }
  },
  components: {
    InfinitList
  }
}
</script>

<style lang="sass" scoped>
</style>