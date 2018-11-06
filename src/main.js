import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import request from "./plugins/config/requestProcessor"
import baseConfig from './plugins/config/baseConfig'

Vue.config.productionTip = false

Vue.use(ElementUI)

let app = new Vue({
  router,
  render: h => h(App)
})

request.get(baseConfig.server + '/api/login/checkLogin').then(res => {
  if (res)
  {
    baseConfig.currentUser=res.d
    app.$mount('#app')
  }
})

export default app