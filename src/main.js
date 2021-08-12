import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'font-awesome/css/font-awesome.css'

import '@/assets/scss/index.scss';

import axios from './api/http';

import { initMenu, getUserInfo } from './api/user';

// 开发环境下使用mockjs模拟数据
// process.env.Mock && require('./mock/index.js');
require('./mock/index.js');

Vue.config.productionTip = true

Vue.prototype.$axios = axios

Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  if (window.sessionStorage.getItem('authToken')) {
    initMenu(router, store);
    getUserInfo();
    next();
  } else {
    if (to.path == '/') {
      next();
    } else {
      next('/?redirect=' + to.path)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
