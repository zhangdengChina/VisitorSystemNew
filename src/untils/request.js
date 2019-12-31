// 引入库
import axios from 'axios';
import qs from 'qs';

// 按需引入组件
import {Message} from "element-ui";

// 设置默认请求的接口地址
axios.defaults.baseURL = 'http://172.16.12.194:8181';

// axios的请求拦截器
axios.interceptors.request.use(config => {
		
	// 所有的axios请求在请求发送之前获取本地token,带上token
	let token = window.localStorage.getItem('token');
	config.headers.Authorization = 'Bearer ' + token;
	// config.headers['Access-Control-Allow-Origin']='*';

	
	// 在请求发送出去之前,带上一些东西(token),config是请求的配置对象,如果直接返回就什么都没有
	return config;
}, (error) => {
	// 对请求错误做些什么
	return Promise.reject(error);
});


// axios的响应拦截器
axios.interceptors.response.use(response => {
	// response就是后端响应回来的东西,如果你想做什么统一处理,可以在这里写
	let { success , message }=response.data;
	
	if(success){
		Message({
			type:"success",
			message:message
		})
	}else if(!success){
		Message({
			type:"error",
			message:message
		})
	}
	
	return response;
	
}, (error) => {
	// 响应错误做处理
	Message({
		type:"error",
		message:"网络异常,请检查网络!"
	})
	return Promise.reject(error);
});


// 导出两个方法
export default {
	get(url, params = {}) {
		return new Promise((resolve, reject) => {
			axios.get(url, {
					params
				})
				.then(res => {
					resolve(res.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	post(url, params = {}) {
		return new Promise((resolve, reject) => {
			axios.post(url, qs.stringify(params))
				.then(res => {
					resolve(res.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	}
}