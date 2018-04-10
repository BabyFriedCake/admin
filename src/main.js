// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index.js'


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
import axios from './utils/ajax'


//配置表单验证组件
import VeeValidate, { Validator }from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN';
Validator.localize('zh_CN', zh_CN);
Vue.use(VeeValidate);
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
router.beforeEach((to,from,next)=>{
  //从sessionStorage中取出user
  if(store.state.user){
    next();
    return;
  }
  var userJsonStr = sessionStorage.getItem("user");
  if(userJsonStr){
    var user = JSON.parse(userJsonStr);
    store.state.user = user;
  }
  if(to.path!=="/" && !store.state.user){
    next("/");
  }else{
    next();
  }
})
Vue.prototype.$axios = axios;
var bus = new Vue({});
Vue.prototype.bus=bus;
/* eslint-disable no-new */
new Vue({
  router,
  store, 
  template: `
    <div id="page">
      <router-view></router-view>
    </div>
  `,
}).$mount('#app');
