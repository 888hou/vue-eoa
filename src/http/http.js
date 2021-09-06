import axios from "axios";
import { Message } from 'element-ui';
import { HttpStatusCode, ResponseCode } from './variable'
import router from '../router'

// 创建axios实例
const http = axios.create({
  baseURL:"https://localhost:5001/"
});

// 请求拦截器
http.interceptors.request.use(config => {
  if (window.sessionStorage.getItem('authToken')) {
    config.headers['Authorization'] = window.sessionStorage.getItem('authToken')
  }
  return config;
}, error => {
  console.log(error);
})

// 响应拦截器
http.interceptors.response.use(success => {
  if (success.status && (success.status == HttpStatusCode.OK || success.status == HttpStatusCode.Accepted)) {
    // 业务逻辑码
    switch (success.data.code) {
      case ResponseCode.Error:
        if (success.data.message)
          Message.error({ message: success.data.message });
        break;
      case ResponseCode.Warning:
        if (success.data.message)
          Message.warning({ message: success.data.message });
        break;
      case ResponseCode.Success:
        if (success.data.message)
          Message.success({ message: success.data.message });
        break;
      default:
        if (success.data.message)
          Message.info({ message: success.data });
    }
  }
  return success.data;
}, error => {
  if (error.response) {
    console.log(error.response);
    switch (error.response.status) {
      case error.response.code >= 500:
        Message.error({ message: '服务器错误' });
        break;
      case HttpStatusCode.NotFound:
        Message.error({ message: '资源不见了' });
        break;
      case HttpStatusCode.Forbidden:
        Message.error({ message: '权限不足，请联系管理员' });
        break;
      case HttpStatusCode.Unauthorized:
        Message.error({ message: '尚未登录，请登录' });
        router.replace('/');
        break;
      default:
        if (error.response.data.message) {
          Message.error({ message: error.response.data.message })
        } else {
          Message.error({ message: '未知错误' });
        }
    }
  } else {
    Message.error({ message: '未知错误' });
  }
  return;
})


export default http;