import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../views/Login.vue');
const Home = () => import('../views/Home.vue');




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    path: '/login',
    redirect: '/',
    hidden: true
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: Home,
  //   children: []
  // },
]

const router = new VueRouter({
  routes
})

// 自定义addRoutes，避免 Duplicate named routes definition问题
// http://www.bugshouji.com/mybug3/t860
router.$addRoutes = (params) => {
  router.matcher = new VueRouter({
    mode: 'history',
    routes
  }).matcher;
  router.addRoutes(params)
}

export default router
