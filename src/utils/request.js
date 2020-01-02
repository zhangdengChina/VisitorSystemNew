// 引入库
import axios from 'axios';
import qs from 'qs';

// 设置默认请求的接口地址
// 上线地址
// axios.defaults.baseURL = 'https://www.hemingbi.com/fangke';
// 测试地址
axios.defaults.baseURL = 'http://192.168.99.22:8081';

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