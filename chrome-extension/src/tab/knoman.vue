<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="item.heading"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item['icon-prepend']"
            :append-icon="item.model ? item.icon : item['icon-alt']"
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click="clickedChild(item, child, i)"
            >
              <v-list-tile-action>
                <v-icon v-if="child.icon">{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="clickedMain(item)" :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <!-- <v-divider></v-divider> -->
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="teal darken-1"
      dark
      flat
      app
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">
          KNOMAN
        </span>
        <!-- <img width="200" height="80" :src="logo" alt="Knoman: manager for your web knowledge" class="hidden-sm-and-down"> -->
        <!-- <img :src="logo" alt="Knoman: manager for your web knowledge"> -->
        <!-- <span class="hidden-sm-and-down">Google Contacts</span> -->
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn flat>{{ user || 'Please Login' }}</v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            :src="logo"
            alt="Knoman"
            class="logo"
          >
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content class="contents">
      <!-- <v-container fluid fill-height> -->
        <router-view></router-view>
      <!-- </v-container> -->
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      user: '',
      token: {},
      logo: '../icons/icon-white-2.png',
      drawer: null,
      items: [
        { icon: 'fa-ban', text: 'Blacklists', name: 'blacklists' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          'icon-prepend': 'fa-object-group',
          text: 'Main Categories',
          model: true,
          children: [
            { text: 'Researches', name: 'researches' },
            { text: 'Searches', name: 'searches' },
            { text: 'Websites', name: 'websites' }
          ]
        },
        { icon: 'fa-connectdevelop', text: 'Knowledge Graphs', name: 'graphs' }
        // { icon: 'settings', text: 'Settings' },
        // { icon: 'chat_bubble', text: 'Send feedback' }
        // { icon: 'help', text: 'Help' },
        // { icon: 'phonelink', text: 'App downloads' },
        // { icon: 'keyboard', text: 'Go to the old version' }
      ]
    }
  },
  mounted () {
    chrome.runtime.sendMessage({ from: 'knoman' }, function (response) {
      console.log('Response from background:' + JSON.stringify(response))
      if (response && response.type === 'onKnoman') {
        this.user = response.user.username
        this.token = response.token
      }
    }.bind(this))
  },
  methods: {
    clickedMain (item) {
      this.$router.push({ name: item.name, params: { token: this.token.content } })
    },
    clickedChild (item, child, i) {
      this.$router.push({ name: child.name, params: { token: this.token.content } })
    }
  },
  events: {
    show (item) {
      console.log('loading is done:' + JSON.stringify(item))
    }
  }
}
</script>

<style lang="css" scoped>
.contents {
  margin: 10px;
  flex-grow: 1;
  flex-shrink: 0;
}
</style>
