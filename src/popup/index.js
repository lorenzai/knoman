import Vue from 'vue'
import root from './popup.vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import Bulma from 'bulma'
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false

Vue.use(Bulma)

new Vue({ // eslint-disable-line no-new
  el: '#root',
  render: h => h(root)
})
