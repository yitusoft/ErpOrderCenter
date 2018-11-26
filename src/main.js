import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import request from "./plugins/processor/request"
import basics from './config/basics'

Vue.config.productionTip = false
Vue.config.silent = true

Vue.use(ElementUI)

router.beforeEach(function (to, from, next) {
  //验证是否还在锁定页面
  if (store.state.allowBack) {
    router.push({ name: "Lock" });
  }
  //浏览器回退判断
  else if (to.meta.allowBack) {
    next();
    //设置浏览器禁止回退
    history.pushState(null, null, location.href);
    store.dispatch('setAllowBack', { allowBack: true });
  }
  //需求登录判断
  else if (to.meta.auth) {
    sessionStorage.setItem("firstPage", to.name);
    request.get(basics.server + '/api/login/checkLogin').then(res => {
      if (res.c === 0 && res.d) {
        store.dispatch('setCurrentUser', res.d);
        next();
      }
      else {
        router.push({ name: "Login" });
      }
    })
  }
  else {
    next();
  }
})

let app = new Vue({
  router,
  store,
  mounted: function () {
    window.onpopstate = () => { if (store.state.allowBack) { history.go(1); } }
  },
  render: h => h(App)
}).$mount('#app')


export default app