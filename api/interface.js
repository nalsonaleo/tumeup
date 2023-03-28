/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */
import tool from '../tool/tool'
export default {
	config: {
		// baseUrl: "http://192.168.1.192:807/",
		baseUrl: "http://192.168.0.94:7079/",
		// baseUrl: "http://7.lazygirlshop.com/",
		header: {
			// 'Content-Type': 'application/json;charset=UTF-8'
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept-Language': uni.getLocale() === "zh-Hans" ? '' : uni.getLocale(),
		},
		data: {},
		method: "GET",
		dataType: "json",
		/* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) {
		if (!options) {
			options = {}
		}
		// let token = uni.getStorageSync('token')
		let requestType = options.url.split('/')
		let typeVal = requestType[requestType.length - 1]
		// console.log(options.url)
		// if (typeVal !== 'login' && typeVal !== 'register' && typeVal !== 'get_code') {
		// 	this.config.header.token = token
		// } else {
		// 	delete this.config.header.token
		// }
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method

		return new Promise((resolve, reject) => {
			uni.showLoading()
			let _config = null
			options.complete = (response) => {
				uni.hideLoading()
				let statusCode = response.statusCode
				response.config = _config
				if (process.env.NODE_ENV === 'development') {
					if (statusCode === 200) {
						// console.log("【" + _config.requestId + "】 结果：" + JSON.stringify(response.data))
					}
				}
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				// 统一的响应日志记录
				// _reslog(response)
				let {
					code,
					msg
				} = response.data
				// console.log(response.data)
				if (response.data.code == 400) {
					tool.msg(msg)
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/public/login'
							})
						}, 800)
					resolve(response.data)
					// reject(response)
				} else if (code == 0) {
					tool.msg(msg)
					// setTimeout(() => {
					// 	uni.reLaunch({
					// 		url: '/pages/login/login'
					// 	})
					// }, 1000)
					resolve(response.data)
					// reject(response)
				} else {
					resolve(response.data)
				}
			}

			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()

			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}

			// 统一的请求日志记录
			// _reqlog(_config)

			// if (process.env.NODE_ENV === 'development') {
			// 	console.log("【" + _config.requestId + "】 地址：" + _config.url)
			// 	if (_config.data) {
			// 		console.log("【" + _config.requestId + "】 参数：" + JSON.stringify(_config.data))
			// 	}
			// }

			uni.request(_config);
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}


/**
 * 请求接口日志记录
 */
// function _reqlog(req) {
// 	if (process.env.NODE_ENV === 'development') {
// 		console.log("【" + req.requestId + "】 地址：" + req.url)
// 		if (req.data) {
// 			console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
// 		}
// 	}
// 	//TODO 调接口异步写入日志数据库
// }

/**
 * 响应接口日志记录
 */
// function _reslog(res) {
// 	let _statusCode = res.statusCode;
// 	if (process.env.NODE_ENV === 'development') {
// 		console.log("【" + res.config.requestId + "】 地址：" + res.config.url)
// 		if (res.config.data) {
// 			console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
// 		}
// 		console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
// 	}
// 	//TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
// 	switch(_statusCode){
// 		case 200:
// 			break;
// 		case 401:
// 			break;
// 		case 404:
// 			break;
// 		default:
// 			break;
// 	}
// }
