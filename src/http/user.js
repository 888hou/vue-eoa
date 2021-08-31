import http from './http';
import { user } from './path';
import { formatRoutes } from '../utils/route';

export const initMenu = (router, store) => {
  if (store.state.routes.length > 0) {
    return;
  }
  http({
    url: user.getUserMenus,
    method: 'post'
  }).then(res => {
    if (res) {
      // 格式化route
      let formatedRoutes = formatRoutes(res.obj.menuList);
      // 添加到router
      router.$addRoutes(formatedRoutes);
      // 将数据存入vuex
      store.commit('initRoutes', formatedRoutes);
    }
  })
}

export const getUserInfo = () => {
  if (!window.sessionStorage.getItem('userInfo')) {
    return http({
      url: user.getUserInfo,
      method: 'post'
    }).then(res => {
      if (res) {
        window.sessionStorage.setItem('userInfo', JSON.stringify(res));
      }
    })
  }
}