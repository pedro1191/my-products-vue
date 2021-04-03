import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuelidate from 'vuelidate'
import VueGtag from 'vue-gtag'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueGtag, {
  config: { id: 'G-63LY7WVZ1P' }
}, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
