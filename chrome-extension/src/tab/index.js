import Vue from 'vue'
import root from './knoman.vue'
import Bulma from 'bulma'
import 'font-awesome/css/font-awesome.min.css'

import Router from 'vue-router'
import Blacklists from './blacklists.vue'
import Display from './display.vue'

Vue.config.productionTip = false
Vue.use(Bulma)
Vue.use(Router)

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
      path: '/display',
      name: 'display',
      component: Display
    }
  ]
})

new Vue({ // eslint-disable-line no-new
  el: '#root',
  router,
  render: h => h(root)
})
