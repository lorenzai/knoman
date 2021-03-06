import Vue from 'vue'
import root from './knoman.vue'
import Bulma from 'bulma'
import 'font-awesome/css/font-awesome.min.css'

import VueBlu from 'vue-blu'
import 'vue-blu/dist/css/vue-blu.min.css'

import Router from 'vue-router'
import Blacklists from './blacklists.vue'
import Graphs from './graphs.vue'
import Websites from './websites.vue'
import Researches from './researches.vue'
import Searches from './searches.vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// import { MdAutocomplete } from '../../node_modules/vue-material/dist/components'
// import 'vue-material/dist/vue-material.min.css'

Vue.config.productionTip = false
Vue.use(Bulma)
Vue.use(Router)
Vue.use(VueBlu)
Vue.use(Vuetify)
// Vue.use(MdAutocomplete)

let router = new Router({
  // mode: 'history',
  mode: 'hash',
  routes: [
    {
      path: '/blacklists',
      name: 'blacklists',
      component: Blacklists
    },
    {
      path: '/researches',
      name: 'researches',
      component: Researches,
      props: true
    },
    {
      path: '/searches',
      name: 'searches',
      component: Searches,
      props: true
    },
    {
      path: '/websites',
      name: 'websites',
      component: Websites
    },
    {
      path: '/graphs',
      name: 'graphs',
      component: Graphs
    }
  ]
})

new Vue({ // eslint-disable-line no-new
  el: '#root',
  router,
  render: h => h(root)
})
