import Vue from 'vue'
import App from '~entry'
import VueBarb from '../src/index'
//import {pageTransition} from './transitions.js'

Vue.use(VueBarb)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
