import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import request from "./plugins/processor/request"
import basics from './config/basics'

Vue.config.productionTip = false
Vue.config.silent = true

Vue.use(ElementUI)

let app = new Vue({
  router,
  render: h => h(App)
})

request.get(basics.server + '/api/login/checkLogin').then(res => {
  if (res) {
    basics.currentUser = res.d
    app.$mount('#app')
  }
})

export default app