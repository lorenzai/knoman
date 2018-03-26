<template lang="html">
    <vue-splitter :margin="20">
        <div slot="left-pane">
            <div>{{ message }}</div>
        </div>
        <div slot="right-pane">
            <p>
              Some right content here. Some right content here. Some right content here. Some right content here.
              Some right content here. Some right content here. Some right content here. Some right content here.
            </p>
        </div>
    </vue-splitter>
</template>

<script>
import VueSplitter from '@rmp135/vue-splitter'

export default {
  data () {
    return {
      message: 'display'
    }
  },
  components: {
    vueSplitter: VueSplitter
  }
}
</script>

<style lang="css" scoped>
.vue-splitter {
    height: 100vh;
}
.vue-splitter > .splitter {
    width: 1px;
}
</style>
