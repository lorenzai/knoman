<template lang="html">
<div id="e3" class="popup">
<v-layout row>
<v-flex xs12>
<v-card>
  <v-toolbar flat color="teal">
    <v-toolbar-title class="white--text">Knoman</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>
  </v-toolbar>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card flat>
        <div class="login">
          <login></login>
        </div>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card class="px-0 elem">
        <a class="teal--text subheading">
        <v-layout row>
          <v-flex xs12>
            <v-text-field
              class="indigo--text"
              name="research"
              id="research"
              prefix="Research: "
              multi-line
              rows=3
              solo
              flat
              autofocus
              readonly
              :value="research"
              prepend-icon="fa fa-gear fa-2x"
              :prepend-icon-cb="settingResearchTopic"
              append-icon="fa fa-times-circle-o fa-2x"
              :append-icon-cb="clearResearchTopic"
            ></v-text-field>
          </v-flex>
        </v-layout>
        </a>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card flat>
        <v-list dense class="pa-0 pb-0">
          <v-list-tile class="elem" @click="">
            <v-list-tile-action>
              <!-- <span class="teal--text">
                <i class="fa fa-ban fa-2x"></i>
              </span> -->
            </v-list-tile-action>
            <v-list-tile-content>
              <span class="teal--text subheading">
                Block this page
              </span>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile class="elem" @click="">
            <v-list-tile-action>
              <!-- <span class="teal--text">
                <i class="fa fa-ban fa-2x"></i>
              </span> -->
            </v-list-tile-action>
            <v-list-tile-content>
              <span class="teal--text subheading">
                Block this domain
              </span>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile class="elem" @click="pauseKnoman()">
            <v-list-tile-action>
              <v-icon class="red--text">
                {{knoman_toggle_icon}}
              </v-icon>
              <!-- <span class="red--text">
                <i :class="knoman_toggle_icon"></i>
              </span> -->
            </v-list-tile-action>
            <v-list-tile-content>
              <span class="red--text subheading">
              {{ pauseMsg }}
              </span>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-spacer></v-spacer>
            <v-btn flat fab small color='teal' @click="openKnoman()">
              <v-icon>fa fa-folder-open-o fa-2x</v-icon>
            </v-btn>
            <v-btn flat fab small color='teal' @click="">
              <v-icon>fa fa-gear fa-2x</v-icon>
            </v-btn>
            <v-btn flat fab small color='teal' @click="">
              <img :src="logo" style="width: 25px; height: 25px"></img>
            </v-btn>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</v-card>
</v-flex>
</v-layout>
</div>
</template>

<script>
import Login from './login.vue'
import ResearchAdd from './researchAdd.vue'

export default {
  data () {
    return {
      logo: '../icons/icon-128.png',
      // knoman_toggle_icon: 'fa fa-toggle-on fa-2x',
      knoman_toggle_icon: 'fa fa-pause-circile-o fa-2x',
      research: 'NULL',
      pauseState: false,
      pauseMsg: ''
    }
  },
  mounted () {
    chrome.runtime.sendMessage({ popupMounted: true }, function (response) {
      this.pauseState = response.state
      if (this.pauseState) {
        this.pauseMsg = 'Resume Knoman'
        // this.knoman_toggle_icon = 'fa fa-toggle-off fa-2x'
        this.knoman_toggle_icon = 'fa fa-play-circle-o fa-2x'
      } else {
        this.pauseMsg = 'Pause Knoman'
        // this.knoman_toggle_icon = 'fa fa-toggle-on fa-2x'
        this.knoman_toggle_icon = 'fa fa-pause-circle-o fa-2x'
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
        // this.knoman_toggle_icon = 'fa fa-toggle-off fa-2x'
        this.knoman_toggle_icon = 'fa fa-play-circle-o fa-2x'
      } else {
        this.pauseMsg = 'Pause Knoman'
        // this.knoman_toggle_icon = 'fa fa-toggle-on fa-2x'
        this.knoman_toggle_icon = 'fa fa-pause-circle-o fa-2x'
      }
    },
    settingResearchTopic () {
    },
    clearResearchTopic () {
    }
  }
}
</script>

<style lang="css" scoped>
.popup {
  margin: 0px;
  padding: 0px;
  min-width: 350px;
  line-height: 1.0;
}
.login {
  padding: 0px;
  border-bottom: solid 0.5px #ccc;
}
.elem {
  border-bottom: solid 1px #ccc;
}
.research {
  border-bottom: solid 1px #ccc;
}
.height {
  height: 40px;
}
</style>
