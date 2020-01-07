// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI, {
	Message
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/assets/css/reset.css' // 重置样式
import "@/assets/fonts/iconfont.css" // 字体

// import Print from 'vue-print-nb'	// 打印组件
import Print from "@/utils/print";

Vue.use(Print);

Vue.use(ElementUI);

Vue.config.productionTip = false

// 路由守卫
// router.beforeEach((to,from,next)=>{
// 	// console.log("to",to)
// 	// console.log("from",from)
// 	// console.log("next",next)
// 	if(window.sessionStorage.getItem('data')){
// 		next()
// 	}
// 	if(to.path === '/'){
// 		next()
// 	}else{
// 		next({
// 			path:"/"
// 		})
// 	}
// })


// 修复message重复弹出bug

// 为了实现Class的私有属性
const showMessage = Symbol('showMessage')
/** 
 *  重写ElementUI的Message
 *  single默认值true，因为项目需求，默认只弹出一个，可以根据实际需要设置
 */
class DonMessage {
	success(options, single = true) {
		this[showMessage]('success', options, single)
	}
	warning(options, single = true) {
		this[showMessage]('warning', options, single)
	}
	info(options, single = true) {
		this[showMessage]('info', options, single)
	}
	error(options, single = true) {
		this[showMessage]('error', options, single)
	}

	[showMessage](type, options, single) {
		if (single) {
			// 判断是否已存在Message
			if (document.getElementsByClassName('el-message').length === 0) {
				Message[type](options)
			}
		} else {
			Message[type](options)
		}
	}
}

// 实例化对象挂载到原型
Vue.prototype.$message = new DonMessage()



new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
