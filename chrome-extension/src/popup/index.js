import Vue from 'vue'
import root from './popup.vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import Bulma from 'bulma'
import 'font-awesome/css/font-awesome.min.css'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// import { MdAutocomplete } from 'vue-material/dist/components'
// import 'vue-material/dist/vue-material.min.css'
// Vue.use(MdAutocomplete)

Vue.config.productionTip = false

Vue.use(Bulma)
Vue.use(Vuetify)

new Vue({ // eslint-disable-line no-new
  el: '#root',
  render: h => h(root)
})
