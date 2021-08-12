/**
 * 格式化后端返回的路由信息
 * @param {*} routes 后端返回的动态路由数组
 * @returns 格式化的路由数组，内部组件使用懒加载
 */
export function formatRoutes(routes) {
  let formatedRoutes = [];
  routes.forEach(route => {
    let {
      path,
      src,
      component,
      name,
      iconCls,
      readOnly,
      children
    } = route;
    if (children && children instanceof Array && children.length > 0) {
      // 递归
      children = formatRoutes(children);
    }
    let formatedRoute = {
      path,
      name,
      iconCls,
      readOnly,
      children,
      component(resolve) {
        require(['../' + src + component + '.vue'], resolve);
      }
    };
    formatedRoutes.push(formatedRoute)
  });
  return formatedRoutes;
}

/**
 * 查询路由树中满足条件的路由
 * @param {*} routes 路由数组
 * @param {*} func 查询条件
 * @returns 
 */
export function findRoute(routes, func) {
  for (const route of routes) {
    if (func(route)) return route;
    if (route.children) {
      const res = findRoute(route.children, func);
      if (res) return res;
    }
  }
  return null;
}