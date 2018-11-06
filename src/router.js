import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import Login from './views/user/login.vue'

Vue.use(Router)

let items = [
  'user-list', 'user-edit'
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
      name: 'home',
      component: Home,
      children: routeArr
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})