// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index.js'

import axios from 'axios'
Vue.prototype.axios = axios; 
// import axios from 'axios'
// Vue.prototype.$ajax = axios

import Login from './page/login/Login.vue'

import DomainStep1 from './page/domain/DomainStep1.vue'
import DomainStep2 from './page/domain/DomainStep2.vue'


import Index from './page/index/Index.vue'
import Account from './page/index/Account.vue'
import Dilatation from './page/index/Dilatation.vue'
import Log from './page/index/Log.vue'
import MemberManage from './page/index/MemberManage.vue'
import Paper from './page/index/Paper.vue'
import Spam from './page/index/Spam.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Login,
      name:'login'
    },
    {
      path: '/domainStep1',
      component: DomainStep1,
      name: 'domainStep1'
    },
    {
      path: '/domainStep2',
      component: DomainStep2,
      name: 'domainStep2'
    },
    {
      path: '/index',
      component: Index,
      name:'index',
      redirect:'/account',
      children:[
        {
          path: '/account',
          component: Account
        },
        {
          path: '/dilatation',
          component: Dilatation
        },
        {
          path: '/log',
          component: Log
        },
        {
          path: '/memberManage',
          component: MemberManage
        },
        {
          path: '/paper',
          component: Paper
        },
        {
          path: '/spam',
          component: Spam
        }
      ]
    }
  ]
})
/* eslint-disable no-new */
new Vue({
  router,
  store, 
  template: `
    <div id="page">
      <router-view></router-view>
    </div>
  `,
}).$mount('#app')