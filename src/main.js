import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import dateFilter from './filters/date'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.filter('date', dateFilter)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
