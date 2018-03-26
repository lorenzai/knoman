<template lang="html">
<div class="panel">
  <p class="panel-heading">
    <login></login>
  </p>
  <p class="panel-block">
  </p>
  <div class="panel-block">
    <p class="control has-icons-left">
      <input class="input is-median" type="text" placeholder="search">
      <span class="icon is-median is-left">
        <i class="fa fa-search"></i>
      </span>
    </p>
  </div>
  <p class="panel-tabs">
    <a class="is-active">all</a>
    <a>public</a>
    <a>private</a>
    <a>sources</a>
    <a>forks</a>
  </p>
  <a class="panel-block is-active">
    <span class="panel-icon">
      <i class="fa fa-book"></i>
    </span>
    bulma
  </a>
  <a class="panel-block">
    <span class="panel-icon">
      <i class="fa fa-book"></i>
    </span>
    marksheet
  </a>
  <a class="panel-block">
    <span class="panel-icon">
      <i class="fa fa-code-branch"></i>
    </span>
    mojs
  </a>
  <label class="panel-block">
    <input type="checkbox">
    remember me
  </label>
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
    login: Login
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
</style>
