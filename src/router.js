import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/user/Login.vue'

Vue.use(Router)

let items = [
  'user-List', 'user-Edit', 'user-Edits'
]
let routeArr = [];
items.forEach(item => {
  let paths = item.split('-')
  routeArr.push({
    path: '/' + item,
    name: item,
    component: () => import('./views/' + paths[0] + '/' + paths[1] + '.vue')
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
    }
  ]
})