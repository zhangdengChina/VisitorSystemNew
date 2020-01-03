import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// state状态,定义全局共享的响应式数据
		PASSPORT:"",
		NAME:"",
		VISIT_DATE:"",
		TYPE:"",
	},
	mutations: {
		// 定义方法:  修改状态的方法,state修改的唯一方式
	},
	actions: {
	},
})


// // 调用actions
// store.dispatch({
// 	type: 'goods'
// })

// mutations方法调用

// store.commit('方法名','修改参数')
// store.commit({
// 	type:'方法名称',
// 	count:'修改的值'
// })


// actions 方法调用

// store.dispatch('方法名',"修改参数")

// store.dispatch({
// 	type:'方法名称',
// 	count:'修改的值'
// })


export default store;
