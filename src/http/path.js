// DB中维护的基础数据
export const value = Object.freeze({
  listJobLevelCode: 'api/value/listJobLevelCode'
})

export const menu = Object.freeze({
  add: {
    url: '/api/Menu/add',
    method: 'post'
  },
  getMenuById: {
    url: '/api/Menu/getMenuById',
    method: 'get'
  },
  listMenu: {
    url: '/api/Menu/ListMenu',
    method: 'get'
  }
})

export const captcha = Object.freeze({
  getCaptchaBase64: 'api/captcha/getCaptchaBase64'
})

export const user = Object.freeze({
  login: 'api/user/login',
  logout: 'api/user/logout',
  getUserMenus: 'api/user/getUserMenus',
  getUserInfo: 'api/user/getUserInfo'
})

export const position = Object.freeze({
  add: 'api/position/add',
  del: 'api/position/del',
  edit: 'api/position/edit',
  page: 'api/position/page',
})

export const jobLevel = Object.freeze({
  add: 'api/jobLevel/add',
  del: 'api/jobLevel/del',
  edit: 'api/jobLevel/edit',
  page: 'api/jobLevel/page'
})