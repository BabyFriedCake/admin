// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store/index.js'

import Index from './page/Index.vue'
import Account from './page/Account.vue'
import Dilatation from './page/Dilatation.vue'
import Log from './page/Log.vue'
import MemberManage from './page/MemberManage.vue'
import Paper from './page/Paper.vue'
import Spam from './page/Spam.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Account
    },
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
    },
    {
      path: '*',
      component: Account
    }
  ]
})
/* eslint-disable no-new */
new Vue({
  router,
  store,
  components: { Index },
  template: '<Index/>'
}).$mount('#app')