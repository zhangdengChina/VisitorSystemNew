import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home
    },
    {
    	  path: '/personnelcard',
    	  name: '员工刷卡',
    	  component: () => import('../views/PersonnelCard.vue'),
    },
    {
    	  path: '/registererr',
    	  name: '登记失败',
    	  component: () => import('../views/RegisterErr.vue'),
    },
    {
    	  path:'/visitprint',
    	  name:"访问打印",
    	  component: () => import('../views/VisitPrint.vue'),
    },
    {
    	  path:'/visitphoto',
    	  name:"访问拍照",
    	  component: () => import('../views/VisitPhoto.vue'),
    },
    {
    	  path:'/visitcard',
    	  name:"访问刷卡",
    	  component: () => import('../views/VisitCard.vue'),
    },
  ]
})
