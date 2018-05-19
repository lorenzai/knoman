<template lang="html">
  <div>
  <fab 
    :main-icon="mainIconName"
    :main-tooltip="mainTooltip"
    :position="position"
    :bg-color="bgColor"
    :actions="fabActions"
    @favorite="favorite"
    @good="good"
    @poor="poor"
  ></fab>
  </div>
</template>

<script>
import fab from 'vue-fab'

export default {
  components: {
    fab
  },
  data () {
    return {
      mainIconName: 'edit',
      mainTooltip: 'Feedback',
      bgColor: 'teal',
      position: 'bottom-right',
      fabActions: [
        {
          name: 'favorite',
          icon: 'favorite',
          tooltip: 'Good and relevant',
          color: 'teal'
        },
        {
          name: 'good',
          icon: 'done',
          tooltip: 'Good but unrelevant',
          color: 'teal'
        },
        {
          name: 'poor',
          icon: 'remove',
          tooltip: 'Poor quality',
          color: 'red'
        }
      ]
    }
  },
  methods: {
    favorite () {
      window.parent.postMessage({ type: 'FROM_ACTION', text: 'favorite' }, '*')
    },
    good () {
      window.parent.postMessage({ type: 'FROM_ACTION', text: 'good' }, '*')
    },
    poor () {
      window.parent.postMessage({ type: 'FROM_ACTION', text: 'poor' }, '*')
    }
  }
}
</script>

<style lang="css">
html, body {
  background: none transparent;
}
</style>

