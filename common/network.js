// const {client,auth} = require("./cloud.js")
import {
	client,
	auth
} from './cloud.js';
// import i18n from '@/common/lang/index.js'
import {
	initVueI18n
} from '@dcloudio/uni-i18n'
import messages from '@/locale/index.js'
const {
	t
} = initVueI18n(messages)
let isShowLoginDialog = false;
/**
 * @param {Object} options
 * 网络请求 模块
 */
const network = (options) => {
	return new Promise((resolve, reject) => {
		let data = {};
		if (options.data) {
			data = options.data;
		}
		let showLoginDialog = false;
		if (options.auth) {
			showLoginDialog = true;
			let uni_id_token_expires = uni.getStorageSync("uni_id_token_expires");
			if (uni_id_token_expires < new Date().getTime()) {
				//没有合理的登录信息，对于必须验证登录的接口，直接返回404
				if (uni_id_token_expires > 0) {}
				console.log("未登录", uni_id_token_expires)
				reject({
					code: 401,
					message: t("common.login.nologoin")
				});
				return;
			}
		}
		if (options.isShowLoading) { //是否需要显示  loading(true:不显示，false:显示)
			uni.showLoading({
				title: t("common.load"),
				mask: options.isShowMask
			});
		}
		console.log("network", JSON.stringify(options));
		client.callFunction({
			name: options.url,
			data: data
		}).then(res => {
			uni.hideLoading()
			console.log(res)
			if (res.result.code !== 200) {
				console.log(options);
				if (res.result.code === 404) {
					//没有数据,message,data
					reject(res.result);
					return;
				} else if (res.result.code === 401) {
					uni.$emit('logoutEvent'); //全局更新购物车
					//登录信息错误,需要重新登录
					if (showLoginDialog && !isShowLoginDialog) {
						isShowLoginDialog = true;
						uni.showModal({
							title: t("common.login.Tips"),
							content: t("common.login.login"),
							cancelText: t("common.cancel"),
							confirmText: t("common.login.gologin"),
							success: (res) => {
								if (res.confirm) {
									uni.navigateTo({
										url: `/pages/public/login`
									});
								}
								isShowLoginDialog = false;
							}
						});
						return;
					}
				}
				return Promise.reject(new Error(res.result.message));
			}
			//token即将过期了，服务器刷新了一下，本地保存下来
			if (res.result.token) {
				uni.setStorageSync('uniIdToken', res.result.token);
				uni.setStorageSync('uni_id_token', res.result.token);
				//本地保持有效期
				uni.setStorageSync('uni_id_token_expires', res.result.tokenExpired);
			}
			resolve(res.result.data);
		}).catch(err => {
			uni.hideLoading()
			reject(err)
			uni.showToast({
				icon: "none",
				title: err.message || t("common.error")
			});
		})
	})
}

export default network;
