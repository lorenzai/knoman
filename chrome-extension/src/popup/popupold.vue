<template lang="html">
<div class="panel">
  <p class="panel-heading">
    <login></login>
  </p>
  <a class="panel-block" @click="pauseKnoman()">
    <span class="panel-icon">
      <i class="fa fa-book"></i>
    </span>
    <span class="pause">
    {{ pauseMsg }}
    </span>
  </a>
  <div class="panel-block">
    <button class="button is-primary is-outlined is-fullwidth" @click="openKnoman()">
      Knoman
    </button>
  </div>
</div>
</template>

<script>
import Login from './login.vue'
import ResearchAdd from './researchAdd.vue'

export default {
  data () {
    return {
      pauseState: false,
      pauseMsg: ''
    }
  },
  mounted () {
    chrome.runtime.sendMessage({ popupMounted: true }, function (response) {
      this.pauseState = response.state
      if (this.pauseState) {
        this.pauseMsg = 'Resume Knoman'
      } else {
        this.pauseMsg = 'Pause Knoman'
      }
    }.bind(this))
  },
  components: {
    Login,
    ResearchAdd
  },
  methods: {
    openKnoman () {
      chrome.tabs.create({ url: 'pages/knoman.html' })
    },
    pauseKnoman () {
      this.pauseState = !this.pauseState
      chrome.runtime.sendMessage({ pauseKnoman: true, state: this.pauseState })
      if (this.pauseState) {
        this.pauseMsg = 'Resume Knoman'
      } else {
        this.pauseMsg = 'Pause Knoman'
      }
    }
  }
}
</script>

<style lang="css">
.pause {
  color: red
}
.research {
  border-bottom: solid 1px #ccc;
}
</style>
