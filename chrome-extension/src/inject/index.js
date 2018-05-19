import Vue from 'vue'
import root from './actionFrame.vue'
import Bulma from 'bulma'
import 'font-awesome/css/font-awesome.min.css'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(Bulma)
Vue.use(Vuetify)

new Vue({ // eslint-disable-line no-new
  el: '#root',
  render: h => h(root)
})
