import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

let items = [
  'user-List', 'user-Edit', 'user-Edits','user-List1','user-List2','user-List3','user-List4','user-List5','user-List6',
]
let routeArr = [];
items.forEach(item => {
  let paths = item.split('-')
  routeArr.push({
    path: '/' + item,
    name: item,
    component: () => import('./views/' + paths[0] + '/' + paths[1] + '.vue'),
    meta: {
      /*标明需要登录*/
      auth: true
    }
  })
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: routeArr
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Lock',
      name: 'Lock',
      component: () => import('./views/Lock.vue'),
      meta: {
        /*浏览器能否回退*/
        allowBack: true
      }
    }
  ]
})